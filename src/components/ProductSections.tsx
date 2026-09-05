import { BadgeCheck, BatteryCharging, ChevronRight, CircleDollarSign, ClipboardCheck, Gift, HeartHandshake, Images, Info, RotateCcw, ShieldCheck, SlidersHorizontal, Star, Tag, Truck, UsersRound, Wrench } from 'lucide-react'
import type { PreferenceKey, ProductData, ViewMode } from '../types'

interface ProductSectionsProps {
  product: ProductData
  mode: ViewMode
  primaryKey: PreferenceKey
}

interface SectionMeta { key: PreferenceKey; title: string; eyebrow: string; icon: typeof Tag }

const sectionMeta: SectionMeta[] = [
  { key: 'price', title: '價格與優惠', eyebrow: '今日總價', icon: CircleDollarSign },
  { key: 'trust', title: '評價與信任', eyebrow: '使用者真實回饋', icon: ShieldCheck },
  { key: 'specs', title: '商品規格', eyebrow: '確認是否適合', icon: SlidersHorizontal },
  { key: 'convenience', title: '配送與退貨', eyebrow: '安心購買', icon: Truck },
]

function SectionShell({ meta, mode, primaryKey, children }: { meta: SectionMeta; mode: ViewMode; primaryKey: PreferenceKey; children: React.ReactNode }) {
  const isPrimary = mode === 'adaptive' && primaryKey === meta.key
  const order = sectionMeta.findIndex((item) => item.key === meta.key)
  return <article className={`product-section ${isPrimary ? 'is-primary' : ''} section-${meta.key}`} style={{ '--section-order': order, '--section-span': 6 } as React.CSSProperties}><div className="section-heading"><div className="section-icon"><meta.icon size={17} /></div><div><span>{meta.eyebrow}</span><h3>{meta.title}</h3></div>{isPrimary && <span className="priority-pill"><SparkleMark /> 優先資訊</span>}</div>{children}</article>
}

function SparkleMark() { return <span className="sparkle-mark">✦</span> }

export function ProductSections({ product, mode, primaryKey }: ProductSectionsProps) {
  const isPricePrimary = mode === 'adaptive' && primaryKey === 'price'
  const isTrustPrimary = mode === 'adaptive' && primaryKey === 'trust'
  const isSpecsPrimary = mode === 'adaptive' && primaryKey === 'specs'
  const discountedPrice = product.currentPrice - product.coupon
  const batteryLife = product.specs.find((spec) => spec.includes('小時')) ?? product.specs[0]
  const supportingSpecs = product.specs.filter((spec) => spec !== batteryLife)

  return <div className={`product-sections ${mode === 'adaptive' ? 'is-adaptive' : ''}`}>
    <SectionShell meta={sectionMeta[0]} mode={mode} primaryKey={primaryKey}>
      {isPricePrimary ? <div className="primary-price-content"><div className="primary-answer"><span>使用優惠券後實付</span><strong>NT${discountedPrice.toLocaleString()}</strong><small>原價 <s>NT${product.originalPrice.toLocaleString()}</s> · 售價 NT${product.currentPrice.toLocaleString()} · {product.shipping}</small></div><div className="primary-detail-grid"><div><span>優惠券</span><strong>- NT${product.coupon.toLocaleString()}</strong></div><div><span>本次省下</span><strong>NT${(product.originalPrice - product.currentPrice).toLocaleString()}</strong></div></div><div className="seller-comparison"><UsersRound size={15} /><span><strong>{product.sellerCount} 家賣家</strong>提供這項商品</span><button type="button">比較賣家 <ChevronRight size={14} /></button></div></div> : <><div className="price-layout"><div><span className="original-price">原價 <s>NT${product.originalPrice.toLocaleString()}</s></span><div className="current-price">NT${product.currentPrice.toLocaleString()}</div><div className="save-badge">現省 NT${(product.originalPrice - product.currentPrice).toLocaleString()}</div></div><div className="coupon-box"><Tag size={15} /><div><span>優惠券已解鎖</span><strong>- NT${product.coupon.toLocaleString()}</strong></div><ChevronRight size={16} /></div></div><div className="effective-price"><span>使用優惠券後價格</span><strong>NT${discountedPrice.toLocaleString()}</strong><small>未含會員優惠</small></div><div className="seller-comparison"><UsersRound size={15} /><span><strong>{product.sellerCount} 家賣家</strong>提供這項商品</span><button type="button">比較賣家 <ChevronRight size={14} /></button></div></>}
    </SectionShell>
    <SectionShell meta={sectionMeta[1]} mode={mode} primaryKey={primaryKey}>
      {isTrustPrimary ? <div className="primary-trust-content"><div className="primary-answer"><span>整體評價</span><strong>{product.rating}<small> / 5</small></strong><p>{product.reviews.toLocaleString()} 則已驗證評論</p></div><div className="primary-detail-grid trust-detail-grid"><div><span>賣家評分</span><strong>{product.sellerRating}%</strong></div><div><span>買家照片</span><strong>{product.buyerPhotos}</strong></div><div><span>評論狀態</span><strong><BadgeCheck size={17} /> 已驗證</strong></div></div><div className="review-quotes">{product.reviewHighlights.map((quote) => <div key={quote}><Star size={13} fill="currentColor" />{quote}</div>)}</div><div className="trust-assurance"><BadgeCheck size={15} /> 已驗證評論 · {product.returnDays} 天退貨</div></div> : <><div className="rating-hero"><strong>{product.rating}</strong><div><div className="stars">★★★★★</div><span>{product.reviews.toLocaleString()} 則已驗證評論</span></div></div><div className="trust-metrics"><div><span>賣家評分</span><strong>{product.sellerRating}%</strong></div><div><span>買家照片</span><strong>{product.buyerPhotos}</strong></div><div><span>已驗證</span><strong><BadgeCheck size={16} /></strong></div></div><div className="review-quotes">{product.reviewHighlights.map((quote) => <div key={quote}><Star size={13} fill="currentColor" />{quote}</div>)}</div><button className="text-action" type="button">查看全部評論 <ChevronRight size={14} /></button></>}
    </SectionShell>
    <SectionShell meta={sectionMeta[2]} mode={mode} primaryKey={primaryKey}>
      {isSpecsPrimary ? <div className="primary-specs-content"><div className="primary-answer"><strong>{batteryLife}</strong><span>電池續航</span><p>一次充電的可用時間</p></div><div className="primary-spec-grid">{supportingSpecs.map((spec) => <div key={spec}><span>✓</span>{spec}</div>)}</div><div className="compatibility-summary"><Wrench size={15} /><div><span>支援裝置</span><strong>{product.compatibility}</strong></div></div><div className="material-note"><Info size={14} /> {product.materials}</div></div> : <><div className="spec-feature"><Wrench size={16} /><div><span>相容性</span><strong>{product.compatibility}</strong></div></div><div className="spec-list">{product.specs.map((spec) => <div key={spec}><span className="spec-check">✓</span>{spec}</div>)}</div><div className="material-note"><Info size={14} /> {product.materials}</div></>}
    </SectionShell>
    <SectionShell meta={sectionMeta[3]} mode={mode} primaryKey={primaryKey}>
      <div className="delivery-line"><div className="delivery-icon"><Gift size={17} /></div><div><span>配送</span><strong>{product.shipping}</strong></div><span className="delivery-tag">本週送達</span></div>
      <div className="delivery-line"><div className="delivery-icon"><RotateCcw size={17} /></div><div><span>退貨</span><strong>{product.returnDays} 天退貨</strong></div></div>
      <div className="delivery-line"><div className="delivery-icon"><HeartHandshake size={17} /></div><div><span>購買支援</span><strong>含本地保固</strong></div></div>
    </SectionShell>
  </div>
}
