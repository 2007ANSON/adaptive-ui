import { Check, CircleDollarSign, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'
import type { Persona, ProductData } from '../types'

interface ComparisonSummaryViewProps {
  personas: Persona[]
  product: ProductData
}

interface ComparisonCardProps {
  persona: Persona
  product: ProductData
}

function ComparisonCard({ persona, product }: ComparisonCardProps) {
  const price = `NT$${product.currentPrice.toLocaleString('en-US')}`
  const savings = `NT$${(product.originalPrice - product.currentPrice).toLocaleString('en-US')}`
  const PrimaryIcon = persona.id === 'alex' ? CircleDollarSign : persona.id === 'jamie' ? ShieldCheck : SlidersHorizontal

  const details = persona.id === 'alex'
    ? ['Save NT$2,000', `Coupon -NT$${product.coupon.toLocaleString('en-US')}`, 'Free shipping', 'Compare sellers']
    : persona.id === 'jamie'
      ? ['1,284 verified reviews', 'Buyer photos', 'Recent negative reviews', '7-day return policy', 'Verified seller']
      : ['Bluetooth 5.3 · 254g', 'Multipoint', 'Noise cancelling', 'Compatibility: iOS · Android · Windows · macOS']

  const primaryValue = persona.id === 'alex' ? price : persona.id === 'jamie' ? `${product.rating}/5` : '30-hour battery'
  const primaryLabel = persona.id === 'alex' ? 'Price & value' : persona.id === 'jamie' ? 'Trust & reviews' : 'Specifications'
  const supportingValue = persona.id === 'alex'
    ? `Save ${savings}`
    : persona.id === 'jamie'
      ? `${product.rating} rating · ${price}`
      : `${price} · ${product.rating} rating`

  return (
    <article
      className={`comparison-card comparison-card--${persona.id}`}
      style={{ '--persona-color': persona.color, '--persona-soft': persona.softColor } as React.CSSProperties}
    >
      <div className="comparison-card-head">
        <div className="comparison-persona-mark">
          <span className="comparison-avatar">{persona.initials}</span>
          <div><strong>{persona.name}</strong><span>{persona.role}</span></div>
        </div>
        <span className="comparison-focus">{persona.id === 'alex' ? 'VALUE' : persona.id === 'jamie' ? 'TRUST' : 'SPECS'}</span>
      </div>

      <div className="comparison-product-name">{product.name}<span>{product.category}</span></div>

      <div className="comparison-primary">
        <span className="comparison-primary-icon"><PrimaryIcon size={19} /></span>
        <div><span>{primaryLabel}</span><strong>{primaryValue}</strong></div>
      </div>

      <ul className="comparison-detail-list">
        {details.map((detail) => <li key={detail}><Check size={16} strokeWidth={3} />{detail}</li>)}
      </ul>

      <div className="comparison-supporting">
        <span>Adaptive emphasis</span>
        <strong>{supportingValue}</strong>
      </div>
    </article>
  )
}

export function ComparisonSummaryView({ personas, product }: ComparisonSummaryViewProps) {
  return (
    <section className="comparison-view" aria-label="Comparison summary">
      <div className="comparison-view-header">
        <div>
          <div className="comparison-kicker"><Sparkles size={15} /> DEMO RESULT · COMPARISON SUMMARY</div>
          <h1>Same product. <span>Different decision priorities.</span></h1>
          <p>The interface keeps its structure — only the information emphasis changes.</p>
        </div>
        <div className="comparison-same-product"><span className="status-dot" /> One product · three adaptive views</div>
      </div>

      <div className="comparison-grid">
        {personas.map((persona) => <ComparisonCard key={persona.id} persona={persona} product={product} />)}
      </div>

      <div className="comparison-view-footer">
        <span><span className="footer-pip" /> Behavior → Preference → Adaptive UI</span>
        <span>Same underlying information · different visual priorities</span>
      </div>
    </section>
  )
}
