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
      <div className="panel-eyebrow"><UsersRound size={14} /> Demo personas</div>
      <p className="panel-helper">Same product. Different decision priorities.</p>
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
        Compare all personas
      </button>
      <div className="principle-lockup"><span className="principle-dot" /> Stable navigation <span className="principle-divider">·</span> Adaptive emphasis</div>
    </aside>
  )
}
