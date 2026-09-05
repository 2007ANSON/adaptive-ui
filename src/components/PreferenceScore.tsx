interface PreferenceScoreProps {
  label: string
  value: number
  color: string
  isPrimary: boolean
}

export function PreferenceScore({ label, value, color, isPrimary }: PreferenceScoreProps) {
  return (
    <div className={`preference-score ${isPrimary ? 'is-primary' : ''}`}>
      <div className="score-label"><span className="score-color" style={{ background: color }} /><strong>{label}</strong><b>{value}%</b></div>
      <div className="score-track"><span style={{ width: `${value}%`, background: color }} /></div>
    </div>
  )
}
