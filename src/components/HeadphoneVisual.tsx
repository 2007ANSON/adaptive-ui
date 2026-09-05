export function HeadphoneVisual() {
  return (
    <div className="product-visual" aria-label="Sony WH-1000XM6 耳機示意圖" role="img">
      <div className="visual-noise noise-one" /><div className="visual-noise noise-two" />
      <svg viewBox="0 0 360 260" className="headphone-svg" aria-hidden="true">
        <defs>
          <linearGradient id="cup" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#30383d" /><stop offset="1" stopColor="#0f1417" /></linearGradient>
          <linearGradient id="band" x1="0" x2="1"><stop stopColor="#59636a" /><stop offset=".5" stopColor="#161d21" /><stop offset="1" stopColor="#6b7479" /></linearGradient>
          <filter id="shadow"><feGaussianBlur stdDeviation="8" /></filter>
        </defs>
        <ellipse cx="180" cy="221" rx="108" ry="12" fill="#162126" opacity=".22" filter="url(#shadow)" />
        <path d="M88 159 C66 69, 103 25, 180 25 C257 25, 294 69, 272 159" fill="none" stroke="url(#band)" strokeWidth="18" strokeLinecap="round" />
        <path d="M91 72 C105 42, 131 30, 180 30 C229 30, 255 42, 269 72" fill="none" stroke="#aab1b4" strokeOpacity=".25" strokeWidth="3" />
        <rect x="58" y="121" width="62" height="107" rx="27" fill="url(#cup)" transform="rotate(-9 58 121)" />
        <rect x="240" y="121" width="62" height="107" rx="27" fill="url(#cup)" transform="rotate(9 240 121)" />
        <rect x="69" y="138" width="39" height="78" rx="18" fill="#222b2f" transform="rotate(-9 69 138)" />
        <rect x="252" y="138" width="39" height="78" rx="18" fill="#222b2f" transform="rotate(9 252 138)" />
        <circle cx="87" cy="160" r="5" fill="#7f8b91" opacity=".7" /><circle cx="273" cy="160" r="5" fill="#7f8b91" opacity=".7" />
        <path d="M76 202 Q89 218 105 208" fill="none" stroke="#899398" strokeOpacity=".35" strokeWidth="2" /><path d="M254 208 Q271 218 284 202" fill="none" stroke="#899398" strokeOpacity=".35" strokeWidth="2" />
      </svg>
      <div className="visual-label"><span className="status-dot" /> WH-1000XM6</div>
    </div>
  )
}
