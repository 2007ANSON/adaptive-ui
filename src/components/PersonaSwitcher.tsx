import { ArrowRightLeft, Check, UsersRound } from 'lucide-react'
import type { Persona, PersonaId } from '../types'

interface PersonaSwitcherProps {
  personas: Persona[]
  selectedId: PersonaId
  onSelect: (id: PersonaId) => void
  onCompareAll: () => void
}

export function PersonaSwitcher({ personas, selectedId, onSelect, onCompareAll }: PersonaSwitcherProps) {
  return (
    <aside className="persona-panel">
      <div className="panel-eyebrow"><UsersRound size={14} /> 示範使用者</div>
      <p className="panel-helper">同一件商品，不同的決策優先順序。</p>
      <div className="persona-list">
        {personas.map((persona) => {
          const selected = persona.id === selectedId
          return (
            <button
              className={`persona-option ${selected ? 'is-selected' : ''}`}
              key={persona.id}
              onClick={() => onSelect(persona.id)}
              style={{ '--persona-color': persona.color, '--persona-soft': persona.softColor } as React.CSSProperties}
              type="button"
            >
              <span className="persona-avatar">{persona.initials}</span>
              <span className="persona-copy"><strong>{persona.name}</strong><small>{persona.role}</small></span>
              {selected && <span className="persona-check"><Check size={13} /></span>}
            </button>
          )
        })}
      </div>
      <button className="compare-personas-button" onClick={onCompareAll} type="button">
        <ArrowRightLeft size={15} />
        比較三種使用者
      </button>
      <div className="principle-lockup"><span className="principle-dot" /> 操作位置維持不變 <span className="principle-divider">·</span> 資訊重點因人而異</div>
    </aside>
  )
}
