import { ArrowLeftRight, Sparkles } from 'lucide-react'
import type { ViewMode } from '../types'

interface AdaptiveViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function AdaptiveViewToggle({ mode, onChange }: AdaptiveViewToggleProps) {
  return (
    <div className="view-toggle-wrap"><div className="toggle-label"><ArrowLeftRight size={14} /> 比較資訊層級</div><div className="view-toggle" role="group" aria-label="商品介面模式"><button className={mode === 'default' ? 'is-active' : ''} onClick={() => onChange('default')} type="button">預設介面</button><button className={mode === 'adaptive' ? 'is-active' : ''} onClick={() => onChange('adaptive')} type="button"><Sparkles size={13} /> 個人化介面</button></div></div>
  )
}
