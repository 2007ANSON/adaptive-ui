import type { AnalyzeBehaviorRequest, AnalyzeBehaviorResponse, BehaviorEvent, PreferenceKey, PreferenceProfile, PreferenceStyle } from '../types'

/**
 * API seam: replace this deterministic mock with a POST /api/analyze-behavior
 * without changing any presentation component.
 */
export async function analyzeBehavior(events: BehaviorEvent[], profile: PreferenceProfile): Promise<PreferenceProfile> {
  await new Promise((resolve) => window.setTimeout(resolve, 550))
  return {
    ...profile,
    reasoning: profile.reasoning.map((reason) => `${reason}`),
    summary: `${profile.summary} 根據 ${events.length} 筆觀察到的行為。`,
  }
}

const styleToPreference: Record<PreferenceStyle, { key: PreferenceKey; label: string; summary: string }> = {
  value_focused: { key: 'price', label: '價格導向', summary: '這個介面會優先呈現價格、優惠與賣家比較資訊。' },
  trust_focused: { key: 'trust', label: '信任導向', summary: '這個介面會優先呈現評價、賣家與退貨政策資訊。' },
  specs_focused: { key: 'specs', label: '規格導向', summary: '這個介面會優先呈現相容性與技術規格資訊。' },
}

const scorePresentation: Record<PreferenceKey, { label: string; color: string }> = {
  price: { label: '價格與優惠', color: '#d46a42' },
  trust: { label: '評價與信任', color: '#567b9e' },
  specs: { label: '商品規格', color: '#7d6b9d' },
  convenience: { label: '購買便利性', color: '#4d9a86' },
}

function toPreferenceProfile(analysis: AnalyzeBehaviorResponse): PreferenceProfile {
  const preference = styleToPreference[analysis.primary_style]
  return {
    primaryKey: preference.key,
    primaryLabel: preference.label,
    confidence: Math.round(analysis.confidence * 100),
    scores: (Object.keys(scorePresentation) as PreferenceKey[]).map((key) => ({
      key,
      label: scorePresentation[key].label,
      color: scorePresentation[key].color,
      value: Math.round(analysis.scores[key] * 100),
    })),
    reasoning: analysis.reasoning,
    summary: preference.summary,
  }
}

/** Calls the local server endpoint; no credential is ever sent to the browser. */
export async function analyzeBehaviorLive(request: AnalyzeBehaviorRequest): Promise<PreferenceProfile> {
  const response = await fetch('/api/analyze-behavior', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  const payload: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null && 'error' in payload && typeof payload.error === 'string'
      ? payload.error
      : 'Live AI analysis failed.'
    throw new Error(message)
  }
  return toPreferenceProfile(payload as AnalyzeBehaviorResponse)
}
