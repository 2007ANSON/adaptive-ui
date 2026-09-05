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
    ? ['現省 NT$2,000', `優惠券 -NT$${product.coupon.toLocaleString('en-US')}`, '免運', '比較賣家']
    : persona.id === 'jamie'
      ? ['1,284 則已驗證評論', '買家照片', '近期負評', '7 天退貨', '認證賣家']
      : ['Bluetooth 5.3 · 254g', '多點連線', '主動降噪', '相容性：iOS · Android · Windows · macOS']

  const primaryValue = persona.id === 'alex' ? price : persona.id === 'jamie' ? `${product.rating}/5` : '30 小時續航'
  const primaryLabel = persona.id === 'alex' ? '價格與優惠' : persona.id === 'jamie' ? '評價與信任' : '商品規格'
  const supportingValue = persona.id === 'alex'
    ? `現省 ${savings}`
    : persona.id === 'jamie'
      ? `${product.rating} 分評價 · ${price}`
      : `${price} · ${product.rating} 分評價`

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
        <span className="comparison-focus">{persona.id === 'alex' ? '價格' : persona.id === 'jamie' ? '信任' : '規格'}</span>
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
        <span>個人化重點</span>
        <strong>{supportingValue}</strong>
      </div>
    </article>
  )
}

export function ComparisonSummaryView({ personas, product }: ComparisonSummaryViewProps) {
  return (
    <section className="comparison-view" aria-label="比較總覽">
      <div className="comparison-view-header">
        <div>
          <div className="comparison-kicker"><Sparkles size={15} /> DEMO 結果 · 比較總覽</div>
          <h1>同一件商品，不同的決策優先順序。</h1>
          <p>介面結構保持一致，只調整資訊的視覺優先順序。</p>
        </div>
        <div className="comparison-same-product"><span className="status-dot" /> 同一件商品 · 三種個人化介面</div>
      </div>

      <div className="comparison-grid">
        {personas.map((persona) => <ComparisonCard key={persona.id} persona={persona} product={product} />)}
      </div>

      <div className="comparison-view-footer">
        <span><span className="footer-pip" /> 行為 → 偏好 → 個人化介面</span>
        <span>同一份商品資訊 · 不同的視覺優先順序</span>
      </div>
    </section>
  )
}
