import { ArrowLeft, Check, Heart, MoreHorizontal, ShoppingBag, Sparkles, Star, Store } from 'lucide-react'
import type { Persona, ProductData, ViewMode } from '../types'
import { AdaptiveViewToggle } from './AdaptiveViewToggle'
import { HeadphoneVisual } from './HeadphoneVisual'
import { ProductSections } from './ProductSections'

interface ProductPageProps {
  persona: Persona
  product: ProductData
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
  onBack: () => void
}

export function ProductPage({ persona, product, mode, onModeChange, onBack }: ProductPageProps) {
  const primaryInformationLabel = {
    price: '價格與優惠',
    trust: '評價與信任',
    specs: '商品規格',
    convenience: '配送與退貨',
  }[persona.profile.primaryKey]

  return (
    <section className={`product-stage ${mode === 'adaptive' ? 'is-adaptive' : ''}`}>
      <div className="product-toolbar"><button className="back-button" onClick={onBack} type="button"><ArrowLeft size={16} /> 返回偏好</button><div className="adaptive-explainer"><Sparkles size={14} /><span>為 <strong>{persona.name}</strong> 個人化 · {persona.profile.primaryLabel}</span></div><AdaptiveViewToggle mode={mode} onChange={onModeChange} /></div>
      <div className="product-demo-banner"><span className="product-banner-message">{mode === 'adaptive' ? <><span className="priority-context">✦</span> {persona.name} 目前優先：<strong>{primaryInformationLabel}</strong></> : '預設介面 · 所有資訊以相近層級呈現'}</span><span className="banner-tag">{mode === 'adaptive' ? '個人化' : '預設'}</span></div>
      <div className="product-overview">
        <HeadphoneVisual />
        <div className="product-copy"><div className="product-rating"><span className="stars">★★★★★</span> <strong>{product.rating}</strong> ({product.reviews.toLocaleString()})</div><h1>{product.name}</h1><p>{product.description}</p><div className="product-tags"><span>熱門評價</span><span>最新上市</span><span>主動降噪</span></div><div className="product-seller"><Store size={15} /><span>賣家 <strong>Soundhouse Official</strong></span><span className="seller-verified"><Check size={12} /> 認證賣家</span></div></div>
        <div className="purchase-rail"><div className="rail-label">目前售價</div><div className="rail-price">NT${product.currentPrice.toLocaleString()}</div><div className="rail-shipping"><span className="status-dot" /> {product.shipping}</div><button className="buy-button" type="button"><ShoppingBag size={17} /> 加入購物袋</button><button className="save-button" type="button"><Heart size={16} /> 稍後再看</button></div>
      </div>
      <ProductSections product={product} mode={mode} primaryKey={persona.profile.primaryKey} />
      <div className="product-footnote"><span className="footnote-mark">✦</span><span>同一件商品，不同的決策優先順序。</span><span className="footnote-line" /></div>
    </section>
  )
}
