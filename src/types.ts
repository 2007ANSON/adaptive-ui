export type PersonaId = 'alex' | 'jamie' | 'taylor'
export type StageId = 'behavior' | 'profile' | 'product'
export type ViewMode = 'default' | 'adaptive'
export type PreferenceKey = 'price' | 'trust' | 'specs' | 'convenience'

export type BehaviorEventType =
  | 'sort'
  | 'coupon'
  | 'compare'
  | 'shipping'
  | 'history'
  | 'review'
  | 'photo'
  | 'return'
  | 'spec'
  | 'compatibility'
  | 'material'
  | 'battery'

export interface BehaviorEvent {
  id: string
  type: BehaviorEventType
  label: string
  context: string
  time: string
}

export interface PreferenceScore {
  key: PreferenceKey
  label: string
  value: number
  color: string
}

export interface PreferenceProfile {
  scores: PreferenceScore[]
  primaryKey: PreferenceKey
  primaryLabel: string
  confidence: number
  reasoning: string[]
  summary: string
}

export interface Persona {
  id: PersonaId
  name: string
  initials: string
  role: string
  description: string
  color: string
  softColor: string
  behaviorSource: string
  events: BehaviorEvent[]
  profile: PreferenceProfile
}

export interface ProductData {
  name: string
  category: string
  description: string
  originalPrice: number
  currentPrice: number
  coupon: number
  shipping: string
  rating: number
  reviews: number
  sellerRating: number
  returnDays: number
  specs: string[]
  sellerCount: number
  reviewHighlights: string[]
  buyerPhotos: number
  compatibility: string
  materials: string
}
