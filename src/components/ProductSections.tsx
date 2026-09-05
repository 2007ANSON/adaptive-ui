import { BadgeCheck, BatteryCharging, ChevronRight, CircleDollarSign, ClipboardCheck, Gift, HeartHandshake, Images, Info, RotateCcw, ShieldCheck, SlidersHorizontal, Star, Tag, Truck, UsersRound, Wrench } from 'lucide-react'
import type { PreferenceKey, ProductData, ViewMode } from '../types'

interface ProductSectionsProps {
  product: ProductData
  mode: ViewMode
  primaryKey: PreferenceKey
}

interface SectionMeta { key: PreferenceKey; title: string; eyebrow: string; icon: typeof Tag }

const sectionMeta: SectionMeta[] = [
  { key: 'price', title: 'Price & value', eyebrow: 'Your total today', icon: CircleDollarSign },
  { key: 'trust', title: 'Trust & reviews', eyebrow: 'Proof from the community', icon: ShieldCheck },
  { key: 'specs', title: 'Specifications', eyebrow: 'Know the fit', icon: SlidersHorizontal },
  { key: 'convenience', title: 'Delivery & returns', eyebrow: 'Low-friction ownership', icon: Truck },
]

function SectionShell({ meta, mode, primaryKey, children }: { meta: SectionMeta; mode: ViewMode; primaryKey: PreferenceKey; children: React.ReactNode }) {
  const isPrimary = mode === 'adaptive' && primaryKey === meta.key
  const order = mode === 'default' ? sectionMeta.findIndex((item) => item.key === meta.key) : [primaryKey, ...sectionMeta.map((item) => item.key).filter((key) => key !== primaryKey)].indexOf(meta.key)
  return <article className={`product-section ${isPrimary ? 'is-primary' : ''} section-${meta.key}`} style={{ '--section-order': order, '--section-span': isPrimary ? 8 : mode === 'adaptive' ? 4 : 6 } as React.CSSProperties}><div className="section-heading"><div className="section-icon"><meta.icon size={17} /></div><div><span>{meta.eyebrow}</span><h3>{meta.title}</h3></div>{isPrimary && <span className="priority-pill"><SparkleMark /> Priority signal</span>}</div>{children}</article>
}

function SparkleMark() { return <span className="sparkle-mark">✦</span> }

export function ProductSections({ product, mode, primaryKey }: ProductSectionsProps) {
  return <div className={`product-sections ${mode === 'adaptive' ? 'is-adaptive' : ''}`}>
    <SectionShell meta={sectionMeta[0]} mode={mode} primaryKey={primaryKey}>
      <div className="price-layout"><div><span className="original-price">Original <s>NT${product.originalPrice.toLocaleString()}</s></span><div className="current-price">NT${product.currentPrice.toLocaleString()}</div><div className="save-badge">Save NT${(product.originalPrice - product.currentPrice).toLocaleString()}</div></div><div className="coupon-box"><Tag size={15} /><div><span>Coupon unlocked</span><strong>- NT${product.coupon.toLocaleString()}</strong></div><ChevronRight size={16} /></div></div>
      <div className="effective-price"><span>Effective price after coupon</span><strong>NT${(product.currentPrice - product.coupon).toLocaleString()}</strong><small>before any membership benefits</small></div>
      <div className="seller-comparison"><UsersRound size={15} /><span><strong>{product.sellerCount} sellers</strong> have this product</span><button type="button">Compare sellers <ChevronRight size={14} /></button></div>
    </SectionShell>
    <SectionShell meta={sectionMeta[1]} mode={mode} primaryKey={primaryKey}>
      <div className="rating-hero"><strong>{product.rating}</strong><div><div className="stars">★★★★★</div><span>{product.reviews.toLocaleString()} verified reviews</span></div></div>
      <div className="trust-metrics"><div><span>Seller rating</span><strong>{product.sellerRating}%</strong></div><div><span>Buyer photos</span><strong>{product.buyerPhotos}</strong></div><div><span>Verified</span><strong><BadgeCheck size={16} /></strong></div></div>
      <div className="review-quotes">{product.reviewHighlights.map((quote) => <div key={quote}><Star size={13} fill="currentColor" />{quote}</div>)}</div>
      <button className="text-action" type="button">Read all reviews <ChevronRight size={14} /></button>
    </SectionShell>
    <SectionShell meta={sectionMeta[2]} mode={mode} primaryKey={primaryKey}>
      <div className="spec-feature"><Wrench size={16} /><div><span>Compatibility</span><strong>{product.compatibility}</strong></div></div>
      <div className="spec-list">{product.specs.map((spec) => <div key={spec}><span className="spec-check">✓</span>{spec}</div>)}</div>
      <div className="material-note"><Info size={14} /> {product.materials}</div>
    </SectionShell>
    <SectionShell meta={sectionMeta[3]} mode={mode} primaryKey={primaryKey}>
      <div className="delivery-line"><div className="delivery-icon"><Gift size={17} /></div><div><span>Shipping</span><strong>{product.shipping}</strong></div><span className="delivery-tag">Arrives this week</span></div>
      <div className="delivery-line"><div className="delivery-icon"><RotateCcw size={17} /></div><div><span>Returns</span><strong>{product.returnDays}-day returns</strong></div></div>
      <div className="delivery-line"><div className="delivery-icon"><HeartHandshake size={17} /></div><div><span>Purchase support</span><strong>Local warranty included</strong></div></div>
    </SectionShell>
  </div>
}
