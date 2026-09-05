import { ArrowLeft, Check, Heart, MoreHorizontal, ShoppingBag, Sparkles, Star, Store, Zap } from 'lucide-react'
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
  return (
    <section className={`product-stage ${mode === 'adaptive' ? 'is-adaptive' : ''}`}>
      <div className="product-toolbar"><button className="back-button" onClick={onBack} type="button"><ArrowLeft size={16} /> Back to profile</button><div className="adaptive-explainer"><Sparkles size={14} /><span>Adaptive for <strong>{persona.name}</strong> · {persona.profile.primaryLabel}</span></div><AdaptiveViewToggle mode={mode} onChange={onModeChange} /></div>
      <div className="product-demo-banner"><div className="banner-icon"><Zap size={17} fill="currentColor" /></div><div><strong>{mode === 'adaptive' ? `${persona.profile.primaryLabel} changes what comes first.` : 'A familiar product page — before personalization.'}</strong><span>{mode === 'adaptive' ? persona.profile.summary : 'Every signal is available, but every signal has the same visual weight.'}</span></div><span className="banner-tag">{mode === 'adaptive' ? 'AFTER' : 'BEFORE'}</span></div>
      <div className="product-overview">
        <HeadphoneVisual />
        <div className="product-copy"><div className="product-rating"><span className="stars">★★★★★</span> <strong>{product.rating}</strong> ({product.reviews.toLocaleString()})</div><h1>{product.name}</h1><p>{product.description}</p><div className="product-tags"><span>Top rated</span><span>New release</span><span>Noise cancelling</span></div><div className="product-seller"><Store size={15} /><span>Sold by <strong>Soundhouse Official</strong></span><span className="seller-verified"><Check size={12} /> Verified seller</span></div></div>
        <div className="purchase-rail"><div className="rail-label">Ready when you are</div><div className="rail-price">NT${product.currentPrice.toLocaleString()}</div><div className="rail-shipping"><span className="status-dot" /> {product.shipping} shipping</div><button className="buy-button" type="button"><ShoppingBag size={17} /> Add to bag</button><button className="save-button" type="button"><Heart size={16} /> Save for later</button></div>
      </div>
      <ProductSections product={product} mode={mode} primaryKey={persona.profile.primaryKey} />
      <div className="product-footnote"><span className="footnote-mark">✦</span><span>Same product. Different decision priorities.</span><span className="footnote-line" /></div>
    </section>
  )
}
