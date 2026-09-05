import { ArrowLeftRight, Sparkles } from 'lucide-react'
import type { ViewMode } from '../types'

interface AdaptiveViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function AdaptiveViewToggle({ mode, onChange }: AdaptiveViewToggleProps) {
  return (
    <div className="view-toggle-wrap"><div className="toggle-label"><ArrowLeftRight size={14} /> Compare hierarchy</div><div className="view-toggle" role="group" aria-label="Product view mode"><button className={mode === 'default' ? 'is-active' : ''} onClick={() => onChange('default')} type="button">Default view</button><button className={mode === 'adaptive' ? 'is-active' : ''} onClick={() => onChange('adaptive')} type="button"><Sparkles size={13} /> Adaptive view</button></div></div>
  )
}
