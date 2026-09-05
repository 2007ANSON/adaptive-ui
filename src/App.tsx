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
import { analyzeBehavior } from './services/analyzeBehavior'
import type { PersonaId, StageId, ViewMode } from './types'

export function App() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<PersonaId>('alex')
  const [currentStep, setCurrentStep] = useState<StageId>('behavior')
  const [isComparisonVisible, setIsComparisonVisible] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('default')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [profileReady, setProfileReady] = useState(false)
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [demoMessage, setDemoMessage] = useState('')
  const demoTimers = useRef<number[]>([])
  const demoRunId = useRef(0)
  const persona = getPersona(selectedPersonaId)

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
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    const nextProfile = await analyzeBehavior(persona.events, persona.profile)
    if (nextProfile) setProfileReady(true)
    setIsAnalyzing(false)
    setCurrentStep('profile')
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
  }

  const runGuidedDemo = () => {
    demoRunId.current += 1
    clearDemoTimers()
    const runId = demoRunId.current
    setIsComparisonVisible(false)

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
      compressedBehavior: 2800,
      compressedProfile: 2800,
      compressedAdaptive: 4800,
      taylorAdaptive: 4800,
      comparisonSummary: 7000,
    }

    showBehaviorStep('alex', 'Alex · observe behavior')
    setIsDemoRunning(true)

    scheduleDemoStep(runId, () => {
      setIsAnalyzing(true)
      setDemoMessage('Analyzing behavioral signals…')

      scheduleDemoStep(runId, () => {
        setIsAnalyzing(false)
        setProfileReady(true)
        setCurrentStep('profile')
        setViewMode('default')
        setDemoMessage('Alex · infer preference')

        scheduleDemoStep(runId, () => {
          setCurrentStep('product')
          setViewMode('default')
          setDemoMessage('Alex · default interface')

          scheduleDemoStep(runId, () => {
            setViewMode('adaptive')
            setDemoMessage('Alex · adaptive interface · value first')

            scheduleDemoStep(runId, () => {
              showBehaviorStep('jamie', 'Jamie · observe behavior')

              scheduleDemoStep(runId, () => {
                setProfileReady(true)
                setCurrentStep('profile')
                setDemoMessage('Jamie · infer preference')

                scheduleDemoStep(runId, () => {
                  setCurrentStep('product')
                  setViewMode('adaptive')
                  setDemoMessage('Jamie · adaptive interface · trust first')

                  scheduleDemoStep(runId, () => {
                    showBehaviorStep('taylor', 'Taylor · observe behavior')

                    scheduleDemoStep(runId, () => {
                      setProfileReady(true)
                      setCurrentStep('profile')
                      setDemoMessage('Taylor · infer preference')

                      scheduleDemoStep(runId, () => {
                        setCurrentStep('product')
                        setViewMode('adaptive')
                        setDemoMessage('Taylor · adaptive interface · specs first')

                        scheduleDemoStep(runId, () => {
                          setIsComparisonVisible(true)
                          setDemoMessage('Comparison summary · same product, different priorities')

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
      <header className="topbar"><Logo /><div className="topbar-context"><span className="context-dot" /> Hackathon prototype <span className="context-slash">/</span> Adaptive information hierarchy</div><div className="topbar-actions"><button className={`demo-mode-button ${isDemoRunning ? 'is-running' : ''}`} onClick={runGuidedDemo} type="button"><span className="demo-play-icon"><Play size={11} fill="currentColor" /></span>{isDemoRunning ? 'Demo running' : 'Run demo mode'}</button><button className="icon-button" title="Prototype notes" type="button"><Info size={17} /></button></div></header>
      <main>
        <div className="hero-bar"><div><div className="hero-kicker"><Sparkles size={14} /> THE PERSONALIZATION LAYER</div><p>Every user decides differently. Why should every interface prioritize the same information?</p></div><div className="hero-caption">01 — 03 <span /></div></div>
        <div className="workspace"><PersonaSwitcher personas={personas} selectedId={selectedPersonaId} onSelect={selectPersona} onCompareAll={showComparisonSummary} /><div className="demo-canvas"><DemoProgress currentStep={currentStep} isSummary={isComparisonVisible} onSelect={goToStep} />{demoMessage && <div className="demo-toast"><span className="status-dot" /> {demoMessage}</div>}{isComparisonVisible ? <ComparisonSummaryView personas={personas} product={product} /> : currentStep === 'behavior' ? <BehaviorPanel persona={persona} onAnalyze={runAnalysis} isAnalyzing={isAnalyzing} /> : currentStep === 'profile' ? <PreferenceProfile persona={persona} profile={persona.profile} onGenerate={() => { setViewMode('adaptive'); setCurrentStep('product') }} /> : <ProductPage persona={persona} product={product} mode={viewMode} onModeChange={setViewMode} onBack={() => setCurrentStep('profile')} />}</div></div>
      </main>
      <footer className="app-footer"><span>Layer / 2026</span><span className="footer-center"><span className="footer-pip" /> Stable navigation, adaptive emphasis</span><button onClick={resetDemo} type="button"><RotateCcw size={13} /> Reset demo</button></footer>
    </div>
  )
}
