import type { BehaviorEvent, PreferenceProfile } from '../types'

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
