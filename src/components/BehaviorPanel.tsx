import { Activity, ArrowRight, Database, Sparkles } from 'lucide-react'
import type { Persona } from '../types'
import { BehaviorEvent } from './BehaviorEvent'

interface BehaviorPanelProps {
  persona: Persona
  onAnalyze: () => void
  onAnalyzeLive: () => void
  isAnalyzing: boolean
  isLiveAvailable: boolean
  liveError: string
}

export function BehaviorPanel({ persona, onAnalyze, onAnalyzeLive, isAnalyzing, isLiveAvailable, liveError }: BehaviorPanelProps) {
  return (
    <section className="stage-layout behavior-layout">
      <div className="stage-intro">
        <div className="eyebrow"><span className="eyebrow-dot" /> 01 <span className="eyebrow-rule" /> 觀察行為</div>
        <h1>了解使用者<br /><em>如何做決策。</em></h1>
        <p className="stage-lede">行為會透露使用者最在意哪些資訊。</p>
        <div className="user-chip">
          <span className="large-avatar" style={{ background: persona.softColor, color: persona.color }}>{persona.initials}</span>
          <span><strong>{persona.name}</strong><small>{persona.role} · 模擬資料</small></span>
          <span className="live-tag">現場 DEMO</span>
        </div>
        <div className="metric-row">
          <div className="metric"><strong>{persona.events.length}</strong><span>筆行為紀錄</span></div>
          <div className="metric"><strong>30</strong><span>天觀察期</span></div>
          <div className="metric"><strong>3</strong><span>訊號群組</span></div>
        </div>
      </div>
      <div className="behavior-card surface-card">
        <div className="card-topline"><div><div className="card-kicker"><Activity size={15} /> 行為紀錄</div><h2>近期決策訊號</h2></div><span className="source-pill"><Database size={13} /> {persona.behaviorSource}</span></div>
        <div className="event-list">
          {persona.events.map((event, index) => <BehaviorEvent event={event} index={index} key={event.id} />)}
        </div>
        <div className="card-action-row"><span><Sparkles size={15} /> 模擬資料</span><div className="analysis-actions"><button className="secondary-button" disabled={isAnalyzing || !isLiveAvailable} onClick={onAnalyzeLive} type="button">{isAnalyzing ? '正在分析使用者行為…' : '使用 Live AI 分析 unknown_01'}</button><button className="primary-button" disabled={isAnalyzing} onClick={onAnalyze} type="button">{isAnalyzing ? '正在分析使用者行為…' : '分析使用者行為'} <ArrowRight size={17} /></button></div></div>
        {liveError && <p className="live-error" role="alert">{liveError} 請改用「分析使用者行為」繼續示範模式。</p>}
      </div>
    </section>
  )
}
