import { createServer } from 'node:http'
import OpenAI from 'openai'

const port = 3001
const allowedActions = new Set([
  'open_reviews',
  'read_negative_reviews',
  'open_buyer_photos',
  'compare_sellers',
  'check_return_policy',
  'check_price',
  'open_verified_reviews',
  'check_seller_rating',
  'check_battery_life',
  'check_compatibility',
  'check_weight',
  'compare_models',
  'check_coupon',
  'read_technical_details',
])

const responseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['primary_style', 'confidence', 'scores', 'reasoning'],
  properties: {
    primary_style: { type: 'string', enum: ['value_focused', 'trust_focused', 'specs_focused'] },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
    scores: {
      type: 'object',
      additionalProperties: false,
      required: ['price', 'trust', 'specs', 'convenience'],
      properties: {
        price: { type: 'number', minimum: 0, maximum: 1 },
        trust: { type: 'number', minimum: 0, maximum: 1 },
        specs: { type: 'number', minimum: 0, maximum: 1 },
        convenience: { type: 'number', minimum: 0, maximum: 1 },
      },
    },
    reasoning: {
      type: 'array',
      minItems: 2,
      maxItems: 4,
      items: { type: 'string', minLength: 1, maxLength: 180 },
    },
  },
}

const instructions = `You analyze observed ecommerce browsing behavior and estimate which information the user currently prioritizes when making a purchase decision.

Infer preferences only from the supplied behavioral events. Do not infer demographics, personality, income, identity, sensitive attributes, or long-term psychological traits.

Choose exactly one primary style from the schema. Estimate independent scores for price, trust, specs, and convenience. Keep confidence and every score between 0 and 1.

The reasoning array must contain 2 to 4 concise statements written in Traditional Chinese (Taiwan). Each reasoning statement must be grounded only in the supplied behavioral events. Do not output English reasoning.

If behavior is ambiguous, lower confidence rather than inventing certainty.`

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidRequest(value) {
  return isObject(value)
    && typeof value.user_id === 'string'
    && value.user_id.length > 0
    && Array.isArray(value.events)
    && value.events.length > 0
    && value.events.every((event) => isObject(event)
      && typeof event.action === 'string'
      && allowedActions.has(event.action)
      && typeof event.target === 'string'
      && event.target.length > 0)
}

function isScore(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1
}

function isValidResponse(value) {
  return isObject(value)
    && ['value_focused', 'trust_focused', 'specs_focused'].includes(value.primary_style)
    && isScore(value.confidence)
    && isObject(value.scores)
    && isScore(value.scores.price)
    && isScore(value.scores.trust)
    && isScore(value.scores.specs)
    && isScore(value.scores.convenience)
    && Array.isArray(value.reasoning)
    && value.reasoning.length >= 2
    && value.reasoning.length <= 4
    && value.reasoning.every((reason) => typeof reason === 'string' && reason.trim().length > 0 && reason.length <= 180)
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(body))
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > 100_000) throw new Error('Request body is too large.')
  }
  return JSON.parse(body)
}

const server = createServer(async (request, response) => {
  if (request.method !== 'POST' || request.url !== '/api/analyze-behavior') {
    sendJson(response, 404, { error: 'Not found.' })
    return
  }

  let payload
  try {
    payload = await readJson(request)
  } catch {
    sendJson(response, 400, { error: 'Request body must be valid JSON.' })
    return
  }

  if (!isValidRequest(payload)) {
    sendJson(response, 400, { error: 'Request must match AnalyzeBehaviorRequest.' })
    return
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 503, { error: 'Live AI is not configured. Add OPENAI_API_KEY to .env and restart the API server.' })
    return
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.responses.create({
      model: 'gpt-5.6-terra',
      store: false,
      instructions,
      input: JSON.stringify(payload),
      text: {
        format: {
          type: 'json_schema',
          name: 'analyze_behavior_response',
          strict: true,
          schema: responseSchema,
        },
      },
    })

    if (!completion.output_text) throw new Error('The model returned no structured output.')
    const analysis = JSON.parse(completion.output_text)
    if (!isValidResponse(analysis)) throw new Error('The model response did not match AnalyzeBehaviorResponse.')

    sendJson(response, 200, analysis)
  } catch (error) {
    const message = error instanceof Error && error.message === 'The model response did not match AnalyzeBehaviorResponse.'
      ? error.message
      : 'Live AI inference could not be completed. Please try again.'
    sendJson(response, 502, { error: message })
  }
})

server.listen(port, () => {
  console.log(`Live AI API listening on http://localhost:${port}`)
})
