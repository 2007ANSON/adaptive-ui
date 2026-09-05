import { ArrowRight, BrainCircuit, Check, Lightbulb, ShieldCheck } from 'lucide-react'
import type { Persona, PreferenceProfile as PreferenceProfileType } from '../types'
import { PreferenceScore } from './PreferenceScore'

interface PreferenceProfileProps {
  persona: Persona
  profile: PreferenceProfileType
  onGenerate: () => void
}

export function PreferenceProfile({ persona, profile, onGenerate }: PreferenceProfileProps) {
  return (
    <section className="stage-layout profile-layout">
      <div className="stage-intro">
        <div className="eyebrow"><span className="eyebrow-dot" /> Step 02 <span className="eyebrow-rule" /> AI preference profile</div>
        <h1>Turn behavior<br /><em>into emphasis.</em></h1>
        <p className="stage-lede">A structured signal profile for {persona.name}’s next decision.</p>
        <div className="inference-note"><BrainCircuit size={17} /><span>AI estimates this user's current information preference based on observed behavior.</span></div>
        <div className="confidence-stamp"><div className="confidence-ring" style={{ '--confidence': `${profile.confidence}%` } as React.CSSProperties}><span>{profile.confidence}%</span></div><div><span>Confidence</span><strong>High signal quality</strong></div></div>
      </div>
      <div className="profile-card surface-card">
        <div className="profile-header"><div><div className="card-kicker"><BrainCircuit size={15} /> Decision model</div><h2>Decision preference profile</h2></div><span className="model-badge"><span /> Structured output</span></div>
        <div className="primary-preference"><div className="primary-icon"><Lightbulb size={20} /></div><div><span>Primary preference</span><strong>{profile.primaryLabel}</strong></div><span className="primary-confidence">{profile.confidence}% match</span></div>
        <div className="score-grid">{profile.scores.map((score) => <PreferenceScore key={score.key} label={score.label} value={score.value} color={score.color} isPrimary={score.key === profile.primaryKey} />)}</div>
        <div className="reasoning-block"><div className="reasoning-title"><ShieldCheck size={16} /> Why Layer thinks this</div><div className="reasoning-list">{profile.reasoning.map((reason) => <div key={reason}><Check size={14} /><span>{reason}</span></div>)}</div></div>
        <div className="card-action-row"><span className="subtle-copy">{profile.summary}</span><button className="primary-button" onClick={onGenerate} type="button">Generate adaptive view <ArrowRight size={17} /></button></div>
      </div>
    </section>
  )
}
