'use client'

import { useState, useEffect } from 'react'
import { X, Truck, ShieldCheck, Leaf } from 'lucide-react'

const messages = [
  { icon: Truck, text: 'Free shipping on orders over $49' },
  { icon: ShieldCheck, text: 'Lifetime guarantee — built for the trail' },
  { icon: Leaf, text: '1% of every order goes to rescue shelters' },
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4500)
    return () => clearInterval(id)
  }, [])

  if (!isVisible) return null

  const { icon: Icon, text } = messages[index]

  return (
    <div className="relative bg-[hsl(150_25%_14%)] text-[hsl(36_35%_95%)]">
      <div className="container-custom flex items-center justify-center py-2.5 text-xs tracking-wide">
        <div
          key={index}
          className="flex items-center gap-2 animate-fade-in"
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
          <p className="font-medium">{text}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
