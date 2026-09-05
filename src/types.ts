export type PersonaId = 'alex' | 'jamie' | 'taylor'
export type StageId = 'behavior' | 'profile' | 'product'
export type ViewMode = 'default' | 'adaptive'
export type PreferenceKey = 'price' | 'trust' | 'specs' | 'convenience'

/**
 * The three adaptive information-hierarchy styles supported by the prototype.
 * This is deliberately distinct from `PreferenceKey`: convenience can be
 * scored, but it is not an adaptive style or persona.
 */
export type PreferenceStyle = 'value_focused' | 'trust_focused' | 'specs_focused'

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

/** Raw, observable ecommerce actions sent to the future inference service. */
export type BehaviorAction =
  | 'open_reviews'
  | 'read_negative_reviews'
  | 'open_buyer_photos'
  | 'compare_sellers'
  | 'check_return_policy'
  | 'check_price'
  | 'open_verified_reviews'
  | 'check_seller_rating'
  | 'check_battery_life'
  | 'check_compatibility'
  | 'check_weight'
  | 'compare_models'
  | 'check_coupon'
  | 'read_technical_details'

export interface RawBehaviorEvent {
  action: BehaviorAction
  target: string
}

export interface AnalyzeBehaviorRequest {
  user_id: string
  events: RawBehaviorEvent[]
}

export interface PreferenceScores {
  price: number
  trust: number
  specs: number
  convenience: number
}

/** Structured response returned by the future inference service. */
export interface AnalyzeBehaviorResponse {
  primary_style: PreferenceStyle
  confidence: number
  scores: PreferenceScores
  reasoning: string[]
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
