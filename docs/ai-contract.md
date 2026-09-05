# AI integration contract

This document defines the narrow integration boundary for the adaptive-ui prototype. It estimates a user's **current information preference for this purchase decision** from observable ecommerce behavior. It does not identify a person or infer lasting traits.

## Flow

```text
Raw behavior events
  -> AI preference inference
  -> structured JSON (AnalyzeBehaviorResponse)
  -> frontend adaptive information hierarchy
```

The React UI continues to call `src/services/analyzeBehavior.ts`. The stable named-persona Demo uses its deterministic mock, while the Live AI validation control calls the local backend through that same service boundary. No presentation component calls a backend directly.

## Input schema

TypeScript source of truth: `AnalyzeBehaviorRequest` and `RawBehaviorEvent` in `src/types.ts`.

```ts
interface RawBehaviorEvent {
  action: BehaviorAction
  target: string
}

interface AnalyzeBehaviorRequest {
  user_id: string
  events: RawBehaviorEvent[]
}
```

`user_id` is an integration identifier, not a persona label. `events` contains only observed actions and their product-page target. It must not contain a demo persona, a preference style, an expected answer, demographics, personality, or other inferred fields.

`action` is a controlled event name, such as `open_reviews`, `check_price`, or `check_compatibility`. `target` identifies the UI or information area acted on, such as `reviews` or `return_policy`. The prototype intentionally has no timestamp, product ID, session history, or metadata requirement at this boundary; production can version the contract if those become necessary.

Example request:

```json
{
  "user_id": "unknown_01",
  "events": [
    { "action": "open_reviews", "target": "reviews" },
    { "action": "read_negative_reviews", "target": "reviews" },
    { "action": "check_return_policy", "target": "return_policy" }
  ]
}
```

## Output schema

TypeScript source of truth: `AnalyzeBehaviorResponse` in `src/types.ts`.

```ts
type PreferenceStyle =
  | 'value_focused'
  | 'trust_focused'
  | 'specs_focused'

interface PreferenceScores {
  price: number
  trust: number
  specs: number
  convenience: number
}

interface AnalyzeBehaviorResponse {
  primary_style: PreferenceStyle
  confidence: number
  scores: PreferenceScores
  reasoning: string[]
}
```

Field rules:

- `primary_style` is exactly one of `value_focused`, `trust_focused`, or `specs_focused`. `convenience` is a score only; it must never become a fourth style or persona.
- `confidence` and every `scores` value are numbers from 0 through 1 inclusive. Scores are independent signals and do not need to sum to 1.
- `reasoning` contains 2–4 short statements, each grounded in one or more supplied events. It must not introduce facts absent from the request.

Example response:

```json
{
  "primary_style": "trust_focused",
  "confidence": 0.82,
  "scores": {
    "price": 0.35,
    "trust": 0.82,
    "specs": 0.27,
    "convenience": 0.44
  },
  "reasoning": [
    "Opened reviews and read negative reviews.",
    "Checked buyer photos and seller options.",
    "Reviewed the return policy before purchase."
  ]
}
```

## Frontend integration point

`src/services/analyzeBehavior.ts` is the current integration boundary:

```text
React UI -> analyzeBehavior(...) -> mock today / backend later -> structured result -> adaptive UI
```

The stable demo currently passes its display-oriented `BehaviorEvent` and `PreferenceProfile` view model to the mock service. The new request/response types are the backend-facing contract for a future adapter. That adapter should translate raw events into `AnalyzeBehaviorRequest`, validate `AnalyzeBehaviorResponse`, then map the response to the existing UI view model:

- `value_focused` -> existing `price` primary key
- `trust_focused` -> existing `trust` primary key
- `specs_focused` -> existing `specs` primary key
- 0–1 scores and confidence -> existing 0–100 display values
- `reasoning` -> existing reasoning list

The implemented Live AI adapter posts only `AnalyzeBehaviorRequest` to `/api/analyze-behavior`. Its server-side API key remains outside Vite and the React bundle; the response is validated on the server before it is returned to the adapter.

## Unknown-user validation

Development-only request fixtures live in `src/data/unknownUsers.ts`. They are not imported by the demo UI, and the request objects contain no expected result.

- `unknown_01` includes one price check but has predominantly review, seller, and return-policy evidence. Development validation expectation: `trust_focused`.
- `unknown_02` mixes price, coupon, and review signals with battery, compatibility, weight, model-comparison, and technical-detail behavior. Development validation expectation: `specs_focused`.

For each fixture, send only the request object to the inference service. Compare the returned `primary_style`, score ranges, confidence range, and behavior-grounded 2–4 reasoning statements against these separate development expectations. This verifies that inference is not hard-coded to Alex, Jamie, or Taylor.

## Ambiguous behavior

The service must always select one of the three supported `primary_style` values, but it must not manufacture certainty. Mixed or weak evidence can legitimately return, for example, `value_focused` with `confidence: 0.54`. A future frontend may use confidence to decide adaptation strength; this prototype does not change UI behavior based on it.

## Prompt draft

```text
You analyze observed ecommerce browsing behavior and estimate which information
the user currently prioritizes when making a purchase decision.

Infer preferences only from the provided behavioral events. Do not infer
demographics, personality, income, identity, sensitive attributes, or long-term
psychological traits.

Primary style must be exactly one of: value_focused, trust_focused, specs_focused.

Estimate independent scores from 0 to 1 for price, trust, specs, and convenience.
Return primary_style, confidence, scores, and 2–4 short reasoning statements.
Reasoning must be grounded in the provided behavior and must not claim facts
that are absent from the input. If behavior is ambiguous, lower confidence
rather than inventing a strong preference.

Return structured JSON only, matching the required response schema.
```

Use structured output or JSON Schema validation when the backend is added. The model receives only the raw request JSON, never the separate validation expectation.

## Prototype limits and data disclosure

This Hackathon prototype uses synthetic behavioral data to demonstrate different decision patterns, test preference inference, and avoid real-user privacy issues. It does not represent Shopee data or any other real ecommerce-user data.

Current prototype: synthetic behavior -> preference inference -> adaptive UI.

Future production version: consented first-party behavioral events -> inference service -> adaptive UI. Production work must define consent, retention, access, security, and contract-versioning requirements before collecting or processing events.

