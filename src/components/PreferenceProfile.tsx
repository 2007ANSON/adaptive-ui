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
        <div className="eyebrow"><span className="eyebrow-dot" /> 02 <span className="eyebrow-rule" /> 推論偏好</div>
        <h1>從行為推論<br /><em>資訊偏好。</em></h1>
        <p className="stage-lede">根據觀察到的行為，整理 {persona.name} 下一次決策的資訊偏好。</p>
        <div className="inference-note"><BrainCircuit size={17} /><span>AI 會根據觀察到的行為，推論目前的資訊偏好。</span></div>
        <div className="confidence-stamp"><div className="confidence-ring" style={{ '--confidence': `${profile.confidence}%` } as React.CSSProperties}><span>{profile.confidence}%</span></div><div><strong>判斷信心度</strong></div></div>
      </div>
      <div className="profile-card surface-card">
        <div className="profile-header"><div><div className="card-kicker"><BrainCircuit size={15} /> 決策模型</div><h2>決策偏好輪廓</h2></div><span className="model-badge"><span /> 結構化結果</span></div>
        <div className="primary-preference"><div className="primary-icon"><Lightbulb size={20} /></div><div><span>主要偏好</span><strong>{profile.primaryLabel}</strong></div></div>
        <div className="score-grid">{profile.scores.map((score) => <PreferenceScore key={score.key} label={score.label} value={score.value} color={score.color} isPrimary={score.key === profile.primaryKey} />)}</div>
        <div className="reasoning-block"><div className="reasoning-title"><ShieldCheck size={16} /> AI 為什麼這樣判斷</div><div className="reasoning-list">{profile.reasoning.map((reason) => <div key={reason}><Check size={14} /><span>{reason}</span></div>)}</div></div>
        <div className="card-action-row"><span className="subtle-copy">{profile.summary}</span><button className="primary-button" onClick={onGenerate} type="button">產生個人化介面 <ArrowRight size={17} /></button></div>
      </div>
    </section>
  )
}
