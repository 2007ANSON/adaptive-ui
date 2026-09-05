import { BadgeDollarSign, BatteryMedium, CheckCircle2, ChevronRight, CircleDollarSign, FileCheck2, Gauge, History, Image, RotateCcw, Search, Settings2, ShoppingBag, Star, Truck } from 'lucide-react'
import type { BehaviorEvent as BehaviorEventType } from '../types'

const icons = {
  sort: CircleDollarSign,
  coupon: BadgeDollarSign,
  compare: Search,
  shipping: Truck,
  history: History,
  review: Star,
  photo: Image,
  return: RotateCcw,
  spec: Settings2,
  compatibility: CheckCircle2,
  material: FileCheck2,
  battery: BatteryMedium,
}

interface BehaviorEventProps {
  event: BehaviorEventType
  index: number
}

export function BehaviorEvent({ event, index }: BehaviorEventProps) {
  const Icon = icons[event.type]
  return (
    <div className="behavior-event" style={{ '--event-delay': `${index * 35}ms` } as React.CSSProperties}>
      <div className="event-icon"><Icon size={16} strokeWidth={2.1} /></div>
      <div className="event-copy"><strong>{event.label}</strong><span>{event.context}</span></div>
      <time>{event.time}</time>
      <ChevronRight className="event-arrow" size={15} />
    </div>
  )
}
