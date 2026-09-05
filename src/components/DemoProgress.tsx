import { Check, ChevronRight, Circle } from 'lucide-react'
import type { StageId } from '../types'

const steps: { id: StageId; number: string; label: string }[] = [
  { id: 'behavior', number: '01', label: 'Observe Behavior' },
  { id: 'profile', number: '02', label: 'Infer Preference' },
  { id: 'product', number: '03', label: 'Adapt Interface' },
]

interface DemoProgressProps {
  currentStep: StageId
  onSelect: (step: StageId) => void
  isSummary?: boolean
}

export function DemoProgress({ currentStep, onSelect, isSummary = false }: DemoProgressProps) {
  const activeIndex = steps.findIndex((step) => step.id === currentStep)
  const progressWidth = isSummary ? '100%' : `${(activeIndex / (steps.length - 1)) * 100}%`

  return (
    <nav className="progress-rail" aria-label="Demo progress">
      <div className="progress-rail-line" aria-hidden="true"><span style={{ width: progressWidth }} /></div>
      {steps.map((step, index) => {
        const completed = isSummary || index < activeIndex
        const active = !isSummary && step.id === currentStep
        return (
          <button
            className={`progress-step ${active ? 'is-active' : ''} ${completed ? 'is-complete' : ''}`}
            key={step.id}
            onClick={() => onSelect(step.id)}
            type="button"
          >
            <span className="progress-dot">{completed ? <Check size={14} strokeWidth={3} /> : active ? <span className="progress-dot-core" /> : <Circle size={10} />}</span>
            <span className="progress-copy"><small>{step.number}</small><strong>{step.label}</strong></span>
            {index < steps.length - 1 && <ChevronRight className="progress-chevron" size={14} />}
          </button>
        )
      })}
    </nav>
  )
}
