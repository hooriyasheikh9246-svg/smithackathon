export interface Provider {
  id: string
  name: string
  service: string
  category: string
  location: string
  experience: string
  price: string
  rating: number
  avatar: string
  description: string
}

export interface Booking {
  id: string
  providerId: string
  providerName: string
  customerName: string
  service: string
  date: string
  time: string
  location: string
  description: string
  status: 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Rejected'
  price: string
  hasReviewed?: boolean
  rating?: number
  reviewText?: string
}

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'PRV-101',
    name: 'Zubair Ahmed',
    service: 'Master Electrician',
    category: 'Electrical',
    location: 'Gulshan-e-Iqbal, Karachi',
    experience: '6 Years',
    price: '$25/hr',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
    description: 'Expert in residential wiring, short-circuit troubleshooting, and UPS/generator backup setup.'
  },
  {
    id: 'PRV-102',
    name: 'Saima Khan',
    service: 'Deep Home Cleaning',
    category: 'Cleaning',
    location: 'PECHS, Karachi',
    experience: '4 Years',
    price: '$40/visit',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    description: 'Full house sanitization, sofa steam cleaning, and post-renovation cleanup services.'
  },
  {
    id: 'PRV-103',
    name: 'Tariq Mehmood',
    service: 'AC Repair & Inverter Servicing',
    category: 'HVAC',
    location: 'Clifton, Karachi',
    experience: '8 Years',
    price: '$30/unit',
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    description: 'Gas leakage fixing, cooling efficiency tuning, and full master servicing for all inverter brands.'
  },
  {
    id: 'PRV-104',
    name: 'Bilal Hassan',
    service: 'Plumbing Specialist',
    category: 'Plumbing',
    location: 'DHA Phase 6, Karachi',
    experience: '5 Years',
    price: '$20/hr',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    description: 'Pipeline leakage repair, motor pump installations, and sanitary fitting services.'
  },
  {
    id: 'PRV-105',
    name: 'Ayesha Raza',
    service: 'Brand Identity & Web UI Design',
    category: 'Design & Web',
    location: 'Johar, Karachi',
    experience: '3 Years',
    price: '$50/project',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    description: 'Crafting responsive website layouts, Next.js UI kits, and custom logo branding.'
  },
  {
    id: 'PRV-106',
    name: 'Usman Ali',
    service: 'Carpenter & Furniture Assembly',
    category: 'Carpentry',
    location: 'Nazimabad, Karachi',
    experience: '7 Years',
    price: '$35/visit',
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    description: 'Custom cabinet repair, door lock installations, and flat-pack furniture assembly.'
  }
]

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-801',
    providerId: 'PRV-101',
    providerName: 'Zubair Ahmed',
    customerName: 'Hooriya Sheikh',
    service: 'Master Electrician',
    date: '2026-09-02',
    time: '11:00 AM',
    location: 'Gulshan-e-Iqbal Block 5',
    description: 'Main breaker trips whenever the inverter AC switches on.',
    status: 'Pending',
    price: '$25'
  },
  {
    id: 'BK-802',
    providerId: 'PRV-103',
    providerName: 'Tariq Mehmood',
    customerName: 'Ayesha Khan',
    service: 'AC Repair & Inverter Servicing',
    date: '2026-09-01',
    time: '03:00 PM',
    location: 'Clifton Block 2',
    description: 'Annual master servicing before summer ends.',
    status: 'Completed',
    price: '$30',
    hasReviewed: false
  }
]

export const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Accepted: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-purple-50 text-purple-700 border-purple-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200'
}