import { useEffect, useRef, useState } from 'react'
import { Info, Play, RotateCcw, Sparkles } from 'lucide-react'
import { BehaviorPanel } from './components/BehaviorPanel'
import { ComparisonSummaryView } from './components/ComparisonSummaryView'
import { DemoProgress } from './components/DemoProgress'
import { Logo } from './components/Logo'
import { PersonaSwitcher } from './components/PersonaSwitcher'
import { PreferenceProfile } from './components/PreferenceProfile'
import { ProductPage } from './components/ProductPage'
import { getPersona, personas, product } from './data/mockData'
import { unknownUserRequests } from './data/unknownUsers'
import { analyzeBehavior, analyzeBehaviorLive } from './services/analyzeBehavior'
import type { PersonaId, PreferenceProfile as PreferenceProfileType, StageId, ViewMode } from './types'

export function App() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<PersonaId>('alex')
  const [currentStep, setCurrentStep] = useState<StageId>('behavior')
  const [isComparisonVisible, setIsComparisonVisible] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('default')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [profileReady, setProfileReady] = useState(false)
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [demoMessage, setDemoMessage] = useState('')
  const [liveProfile, setLiveProfile] = useState<PreferenceProfileType | null>(null)
  const [liveError, setLiveError] = useState('')
  const demoTimers = useRef<number[]>([])
  const demoRunId = useRef(0)
  const persona = getPersona(selectedPersonaId)
  const displayPersona = liveProfile
    ? { ...persona, name: 'Unknown 01', initials: 'U1', role: 'Live AI 驗證', behaviorSource: 'unknown_01 · raw behavior', profile: liveProfile }
    : persona

  const clearDemoTimers = () => {
    demoTimers.current.forEach((timer) => window.clearTimeout(timer))
    demoTimers.current = []
  }

  const scheduleDemoStep = (runId: number, callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      demoTimers.current = demoTimers.current.filter((activeTimer) => activeTimer !== timer)
      if (runId !== demoRunId.current) return
      callback()
    }, delay)
    demoTimers.current.push(timer)
  }

  useEffect(() => () => {
    demoRunId.current += 1
    clearDemoTimers()
  }, [])

  const selectPersona = (id: PersonaId) => {
    demoRunId.current += 1
    clearDemoTimers()
    setIsDemoRunning(false)
    setIsComparisonVisible(false)
    setSelectedPersonaId(id)
    setCurrentStep('behavior')
    setViewMode('default')
    setProfileReady(false)
    setIsAnalyzing(false)
    setDemoMessage('')
    setLiveProfile(null)
    setLiveError('')
  }

  const runAnalysis = async () => {
    setLiveProfile(null)
    setLiveError('')
    setIsAnalyzing(true)
    const nextProfile = await analyzeBehavior(persona.events, persona.profile)
    if (nextProfile) setProfileReady(true)
    setIsAnalyzing(false)
    setCurrentStep('profile')
  }

  const runLiveAnalysis = async () => {
    demoRunId.current += 1
    clearDemoTimers()
    setIsDemoRunning(false)
    setIsComparisonVisible(false)
    setLiveProfile(null)
    setLiveError('')
    setIsAnalyzing(true)
    try {
      const nextProfile = await analyzeBehaviorLive(unknownUserRequests[0])
      setLiveProfile(nextProfile)
      setProfileReady(true)
      setViewMode('default')
      setCurrentStep('profile')
    } catch (error) {
      setLiveError(error instanceof Error ? error.message : 'Live AI analysis failed.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const goToStep = (nextStep: StageId) => {
    if (nextStep !== 'behavior' && !profileReady) return
    setIsComparisonVisible(false)
    setCurrentStep(nextStep)
    if (nextStep !== 'product') setViewMode('default')
  }

  const resetDemo = () => {
    demoRunId.current += 1
    clearDemoTimers()
    setIsDemoRunning(false)
    setIsComparisonVisible(false)
    setSelectedPersonaId('alex')
    setCurrentStep('behavior')
    setViewMode('default')
    setProfileReady(false)
    setIsAnalyzing(false)
    setDemoMessage('')
    setLiveProfile(null)
    setLiveError('')
  }

  const runGuidedDemo = () => {
    demoRunId.current += 1
    clearDemoTimers()
    const runId = demoRunId.current
    setIsComparisonVisible(false)
    setLiveProfile(null)
    setLiveError('')

    const showBehaviorStep = (personaId: PersonaId, message: string) => {
      setSelectedPersonaId(personaId)
      setCurrentStep('behavior')
      setViewMode('default')
      setProfileReady(false)
      setIsAnalyzing(false)
      setDemoMessage(message)
    }

    const demoTiming = {
      alexBehavior: 5000,
      analyze: 1500,
      alexProfile: 5000,
      alexDefault: 3000,
      alexAdaptive: 6000,
      compressedBehavior: 3800,
      compressedProfile: 3000,
      compressedAdaptive: 5000,
      taylorAdaptive: 5000,
      comparisonSummary: 7000,
    }

    showBehaviorStep('alex', 'Alex · 觀察行為')
    setIsDemoRunning(true)

    scheduleDemoStep(runId, () => {
      setIsAnalyzing(true)
      setDemoMessage('正在分析使用者行為…')

      scheduleDemoStep(runId, () => {
        setIsAnalyzing(false)
        setProfileReady(true)
        setCurrentStep('profile')
        setViewMode('default')
        setDemoMessage('Alex · 推論偏好')

        scheduleDemoStep(runId, () => {
          setCurrentStep('product')
          setViewMode('default')
          setDemoMessage('Alex · 預設介面')

          scheduleDemoStep(runId, () => {
            setViewMode('adaptive')
            setDemoMessage('Alex · 個人化介面 · 價格優先')

            scheduleDemoStep(runId, () => {
              showBehaviorStep('jamie', 'Jamie · 觀察行為')

              scheduleDemoStep(runId, () => {
                setProfileReady(true)
                setCurrentStep('profile')
                setDemoMessage('Jamie · 推論偏好')

                scheduleDemoStep(runId, () => {
                  setCurrentStep('product')
                  setViewMode('adaptive')
                  setDemoMessage('Jamie · 個人化介面 · 信任優先')

                  scheduleDemoStep(runId, () => {
                    showBehaviorStep('taylor', 'Taylor · 觀察行為')

                    scheduleDemoStep(runId, () => {
                      setProfileReady(true)
                      setCurrentStep('profile')
                      setDemoMessage('Taylor · 推論偏好')

                      scheduleDemoStep(runId, () => {
                        setCurrentStep('product')
                        setViewMode('adaptive')
                        setDemoMessage('Taylor · 個人化介面 · 規格優先')

                        scheduleDemoStep(runId, () => {
                          setIsComparisonVisible(true)
                          setDemoMessage('比較總覽 · 不同的資訊優先順序')

                          scheduleDemoStep(runId, () => {
                            setIsDemoRunning(false)
                            setDemoMessage('')
                          }, demoTiming.comparisonSummary)
                        }, demoTiming.taylorAdaptive)
                      }, demoTiming.compressedProfile)
                    }, demoTiming.compressedBehavior)
                  }, demoTiming.compressedAdaptive)
                }, demoTiming.compressedProfile)
              }, demoTiming.compressedBehavior)
            }, demoTiming.alexAdaptive)
          }, demoTiming.alexDefault)
        }, demoTiming.alexProfile)
      }, demoTiming.analyze)
    }, demoTiming.alexBehavior)
  }

  const showComparisonSummary = () => {
    demoRunId.current += 1
    clearDemoTimers()
    setIsDemoRunning(false)
    setIsComparisonVisible(true)
    setCurrentStep('product')
    setViewMode('adaptive')
    setProfileReady(true)
    setDemoMessage('')
  }

  return (
    <div className={`app-shell ${isComparisonVisible ? 'is-summary' : ''}`}>
      <header className="topbar"><Logo /><div className="topbar-context"><span className="context-dot" /> Hackathon 展示 <span className="context-slash">/</span> 個人化資訊層級</div><div className="topbar-actions"><button className={`demo-mode-button ${isDemoRunning ? 'is-running' : ''}`} onClick={runGuidedDemo} type="button"><span className="demo-play-icon"><Play size={11} fill="currentColor" /></span>{isDemoRunning ? 'Demo 進行中' : '開始 Demo'}</button><button className="icon-button" title="Prototype 備註" type="button"><Info size={17} /></button></div></header>
      <main>
        <div className="hero-bar"><div><div className="hero-kicker"><Sparkles size={14} /> 個人化資訊層</div><p>每個人的購買決策方式都不同，為什麼介面要用相同的資訊優先順序？</p></div><div className="hero-caption">01 — 03 <span /></div></div>
        <div className="workspace"><PersonaSwitcher personas={personas} selectedId={selectedPersonaId} onSelect={selectPersona} onCompareAll={showComparisonSummary} /><div className="demo-canvas"><DemoProgress currentStep={currentStep} isSummary={isComparisonVisible} onSelect={goToStep} />{demoMessage && <div className="demo-toast"><span className="status-dot" /> {demoMessage}</div>}{isComparisonVisible ? <ComparisonSummaryView personas={personas} product={product} /> : currentStep === 'behavior' ? <BehaviorPanel persona={persona} onAnalyze={runAnalysis} onAnalyzeLive={runLiveAnalysis} isAnalyzing={isAnalyzing} isLiveAvailable={!isDemoRunning} liveError={liveError} /> : currentStep === 'profile' ? <PreferenceProfile persona={displayPersona} profile={displayPersona.profile} onGenerate={() => { setViewMode('adaptive'); setCurrentStep('product') }} /> : <ProductPage persona={displayPersona} product={product} mode={viewMode} onModeChange={setViewMode} onBack={() => setCurrentStep('profile')} />}</div></div>
      </main>
      <footer className="app-footer"><span>Layer / 2026</span><span className="footer-center"><span className="footer-pip" /> 操作位置維持不變，資訊重點因人而異。</span><button onClick={resetDemo} type="button"><RotateCcw size={13} /> 重設 Demo</button></footer>
    </div>
  )
}
