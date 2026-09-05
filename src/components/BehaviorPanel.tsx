import { Activity, ArrowRight, Database, Sparkles } from 'lucide-react'
import type { Persona } from '../types'
import { BehaviorEvent } from './BehaviorEvent'

interface BehaviorPanelProps {
  persona: Persona
  onAnalyze: () => void
  isAnalyzing: boolean
}

export function BehaviorPanel({ persona, onAnalyze, isAnalyzing }: BehaviorPanelProps) {
  return (
    <section className="stage-layout behavior-layout">
      <div className="stage-intro">
        <div className="eyebrow"><span className="eyebrow-dot" /> Step 01 <span className="eyebrow-rule" /> User behavior</div>
        <h1>Understand how<br /><em>this user decides.</em></h1>
        <p className="stage-lede">Behavior reveals what information matters most.</p>
        <div className="user-chip">
          <span className="large-avatar" style={{ background: persona.softColor, color: persona.color }}>{persona.initials}</span>
          <span><strong>{persona.name}</strong><small>{persona.role} · synthetic profile</small></span>
          <span className="live-tag">LIVE DEMO</span>
        </div>
        <div className="metric-row">
          <div className="metric"><strong>{persona.events.length}</strong><span>observed events</span></div>
          <div className="metric"><strong>30</strong><span>day window</span></div>
          <div className="metric"><strong>3</strong><span>signal groups</span></div>
        </div>
      </div>
      <div className="behavior-card surface-card">
        <div className="card-topline"><div><div className="card-kicker"><Activity size={15} /> Activity feed</div><h2>Recent decision signals</h2></div><span className="source-pill"><Database size={13} /> {persona.behaviorSource}</span></div>
        <div className="event-list">
          {persona.events.map((event, index) => <BehaviorEvent event={event} index={index} key={event.id} />)}
        </div>
        <div className="card-action-row"><span><Sparkles size={15} /> Mock data, ready for API integration</span><button className="primary-button" disabled={isAnalyzing} onClick={onAnalyze} type="button">{isAnalyzing ? 'Analyzing signals…' : 'Analyze behavior'} <ArrowRight size={17} /></button></div>
      </div>
    </section>
  )
}
