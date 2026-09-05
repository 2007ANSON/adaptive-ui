import type { AnalyzeBehaviorRequest } from '../types'

/**
 * Development-only raw-event fixtures for validating inference without using
 * a named demo persona. Expected outcomes live in docs/ai-contract.md so they
 * cannot be sent as part of an inference request.
 */
export const unknownUserRequests: AnalyzeBehaviorRequest[] = [
  {
    user_id: 'unknown_01',
    events: [
      { action: 'open_reviews', target: 'reviews' },
      { action: 'read_negative_reviews', target: 'reviews' },
      { action: 'open_buyer_photos', target: 'buyer_photos' },
      { action: 'compare_sellers', target: 'seller_options' },
      { action: 'check_return_policy', target: 'return_policy' },
      { action: 'check_price', target: 'price' },
      { action: 'open_verified_reviews', target: 'reviews' },
      { action: 'check_seller_rating', target: 'seller_rating' },
    ],
  },
  {
    user_id: 'unknown_02',
    events: [
      { action: 'check_battery_life', target: 'battery_life' },
      { action: 'check_price', target: 'price' },
      { action: 'check_compatibility', target: 'compatibility' },
      { action: 'open_reviews', target: 'reviews' },
      { action: 'check_weight', target: 'weight' },
      { action: 'compare_models', target: 'models' },
      { action: 'check_coupon', target: 'coupon' },
      { action: 'read_technical_details', target: 'technical_details' },
    ],
  },
]
