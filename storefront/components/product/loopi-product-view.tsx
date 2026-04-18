'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import { Loader2, Check, ChevronDown, Zap, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils/format-price'
import { trackAddToCart } from '@/lib/analytics'
import type { Product } from '@/types'
import type { VariantExtension } from './product-price'

interface Props {
  product: Product
  variantExtensions?: Record<string, VariantExtension>
}

interface VariantOption {
  option_id?: string
  option?: { id: string }
  value: string
}

interface ProductVariantLike {
  id: string
  options?: VariantOption[]
  calculated_price?: { calculated_amount?: number; currency_code?: string } | number
}

interface ProductOptionLike {
  id: string
  title: string
  values?: Array<string | { id?: string; value: string }>
}

const COLOR_HEX: Record<string, string> = {
  'grey melange': '#9ca3af',
  grey: '#6b7280',
  black: '#111827',
  white: '#f3f4f6',
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  beige: '#d2b48c',
  navy: '#1e3a8a',
  brown: '#78350f',
}

function colorFor(value: string): string {
  return COLOR_HEX[value.toLowerCase()] || '#9ca3af'
}

function matchOption(
  options: ProductOptionLike[],
  keywords: string[],
): ProductOptionLike | undefined {
  return options.find((o) =>
    keywords.some((k) => o.title.toLowerCase().includes(k.toLowerCase())),
  )
}

export default function LoopiProductView({ product, variantExtensions }: Props) {
  const variants = (product.variants || []) as unknown as ProductVariantLike[]
  const options = (product.options || []) as unknown as ProductOptionLike[]

  const zustandOption = matchOption(options, ['zustand', 'condition'])
  const colorOption = matchOption(options, ['color', 'farbe', 'colour'])
  const laufzeitOption = matchOption(options, ['laufzeit', 'duration', 'term'])

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    const first = variants[0]
    if (first?.options) {
      for (const opt of first.options) {
        const id = opt.option_id || opt.option?.id
        if (id && opt.value) defaults[id] = opt.value
      }
    }
    return defaults
  })

  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const { addItem, isAddingItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const selectedVariant = useMemo(() => {
    return (
      variants.find((v) =>
        v.options?.every((o) => {
          const id = o.option_id || o.option?.id
          return id ? selected[id] === o.value : false
        }),
      ) || variants[0]
    )
  }, [variants, selected])

  const cp = selectedVariant?.calculated_price
  const amount =
    cp == null ? null : typeof cp === 'number' ? cp : cp.calculated_amount ?? null
  const currency =
    cp && typeof cp !== 'number' ? cp.currency_code || 'usd' : 'usd'

  const ext = selectedVariant?.id ? variantExtensions?.[selectedVariant.id] : null
  const inventory = ext?.inventory_quantity
  const allowBackorder = ext?.allow_backorder ?? false
  const soldOut = !allowBackorder && inventory != null && inventory <= 0

  const laufzeitValue = laufzeitOption ? selected[laufzeitOption.id] : null
  const isRental = !!laufzeitValue && laufzeitValue.toLowerCase() !== 'kaufen'

  const setOption = (id: string, value: string) =>
    setSelected((prev) => ({ ...prev, [id]: value }))

  const handleAddToCart = () => {
    if (!selectedVariant?.id || soldOut) return
    addItem(
      { variantId: selectedVariant.id, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success('Zum Warenkorb hinzugefügt')
          trackAddToCart(product.id, selectedVariant.id, 1, amount ?? undefined)
          setTimeout(() => setJustAdded(false), 2200)
        },
        onError: (e: Error) => toast.error(e.message || 'Fehler'),
      },
    )
  }

  const getValues = (option: ProductOptionLike): string[] =>
    (option.values || [])
      .map((v) => (typeof v === 'string' ? v : v.value))
      .filter(Boolean) as string[]

  const image =
    product.thumbnail ||
    (product.images && product.images[0]?.url) ||
    '/placeholder.png'

  const brand = 'BUGABOO'

  const reviews = [
    {
      name: 'Nico R',
      date: 'Apr 8, 2026',
      text:
        'Ein wirklich tolles, zeitgemässes Angebot – ideal für alle Eltern, die herausfinden möchten, was zu ihrem Lebensstil passt und nicht in Kinderwagen investieren möchten, die nach kurzer Zeit wieder verkauft werden müssen.',
    },
    {
      name: 'Sarah M',
      date: 'Mar 22, 2026',
      text:
        'Super unkompliziert – der Kinderwagen kam in neuwertigem Zustand und die Beratung per WhatsApp war erstklassig. Absolute Empfehlung!',
    },
    {
      name: 'Thomas K',
      date: 'Feb 15, 2026',
      text:
        'Flexibilität ohne grosse Investition. Genau das haben wir gesucht für unsere Zwillinge. Service top.',
    },
  ]

  return (
    <div className="container-custom py-6 lg:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span>›</span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#fff0e0] text-foreground text-[11px]">
          {product.title.split(':')[0] || product.title}
        </span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square bg-white rounded-md overflow-hidden flex items-center justify-center">
          <Image
            src={image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Brand */}
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
            {brand}
          </p>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-balance">
            {product.title}
          </h1>

          {/* Info link */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4 text-foreground"
          >
            Neu / Pre-loved, was heisst das? <span>ℹ️</span>
          </a>

          {/* Zustand */}
          {zustandOption && (
            <div>
              <p className="text-sm font-medium mb-2">Zustand</p>
              <div className="flex gap-2">
                {getValues(zustandOption).map((v) => {
                  const isSelected = selected[zustandOption.id] === v
                  return (
                    <button
                      key={v}
                      onClick={() => setOption(zustandOption.id, v)}
                      className={`px-5 py-2 rounded-full border text-sm transition-all ${
                        isSelected
                          ? 'bg-[#4e6b3e] text-white border-[#4e6b3e]'
                          : 'bg-white border-neutral-300 hover:border-neutral-500 text-foreground'
                      }`}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Color */}
          {colorOption && (
            <div>
              <p className="text-sm font-medium mb-2">
                Color: <span className="font-normal">{selected[colorOption.id]}</span>
              </p>
              <div className="flex gap-2.5">
                {getValues(colorOption).map((v) => {
                  const isSelected = selected[colorOption.id] === v
                  return (
                    <button
                      key={v}
                      onClick={() => setOption(colorOption.id, v)}
                      aria-label={v}
                      className={`h-9 w-9 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'border-foreground ring-2 ring-offset-2 ring-foreground/20'
                          : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                      style={{ backgroundColor: colorFor(v) }}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Laufzeit */}
          {laufzeitOption && (
            <div>
              <p className="text-sm font-medium mb-2">Laufzeit</p>
              <div className="flex flex-wrap gap-2">
                {getValues(laufzeitOption).map((v) => {
                  const isSelected = selected[laufzeitOption.id] === v
                  return (
                    <button
                      key={v}
                      onClick={() => setOption(laufzeitOption.id, v)}
                      className={`px-5 py-2 rounded-full border text-sm transition-all ${
                        isSelected
                          ? 'bg-[#4e6b3e] text-white border-[#4e6b3e]'
                          : 'bg-white border-neutral-300 hover:border-neutral-500 text-foreground'
                      }`}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Laufzeit ist die Mindestdauer, danach einfach monatlich weitermieten.
              </p>
            </div>
          )}

          {/* Price */}
          <div>
            {amount != null ? (
              <p className="text-2xl font-semibold">
                <span className="font-heading">{formatPrice(amount, currency)}</span>
                {isRental && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    pro Monat
                  </span>
                )}
              </p>
            ) : (
              <p className="text-muted-foreground">Preis nicht verfügbar</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Inkl. Steuern. Alle Versandkosten inbegriffen.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={soldOut || isAddingItem}
            className={`w-full py-4 rounded-full text-white font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              soldOut
                ? 'bg-neutral-400 cursor-not-allowed'
                : justAdded
                ? 'bg-green-700'
                : 'bg-[#ff6b2c] hover:bg-[#ff5a14]'
            }`}
          >
            {isAddingItem ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : justAdded ? (
              <>
                <Check className="h-5 w-5" /> Hinzugefügt
              </>
            ) : soldOut ? (
              'Ausverkauft'
            ) : (
              'In den Warenkorb legen'
            )}
          </button>

          {/* Payment methods */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <PaymentBadge label="TWINT" color="#000000" accent="#ee3124" />
            <PaymentBadge label="Mastercard" color="#ffffff" accent="#eb001b" variant="mc" />
            <PaymentBadge label="VISA" color="#1a1f71" accent="#ffffff" variant="visa" />
          </div>

          {/* How it works accordion */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setHowItWorksOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-muted/40 transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-[#ff6b2c]" strokeWidth={2.5} />
                So funktioniert&apos;s bei loopi
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${howItWorksOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {howItWorksOpen && (
              <div className="px-4 pb-4 text-sm text-muted-foreground space-y-3 border-t pt-4">
                <div className="flex gap-3">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#fff0e0] text-[#ff6b2c] font-semibold text-xs flex items-center justify-center">1</span>
                  <p>Wähle Zustand, Farbe und Laufzeit – dann lege den Artikel in den Warenkorb.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#fff0e0] text-[#ff6b2c] font-semibold text-xs flex items-center justify-center">2</span>
                  <p>Wir liefern versichert und inklusive Rückversand – und reinigen das Produkt vor dem Versand.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#fff0e0] text-[#ff6b2c] font-semibold text-xs flex items-center justify-center">3</span>
                  <p>Nach der Mindestlaufzeit jederzeit monatlich kündbar – oder behalten zum Restwert.</p>
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp card */}
          <div className="flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-[#25d366] flex items-center justify-center text-white">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="font-medium flex items-center gap-2">
                loopi business
                <span className="inline-flex items-center gap-1 text-[10px] text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" /> Online
                </span>
              </p>
              <p className="text-muted-foreground">Fragen? Einfach schreiben!</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="text-sm">
                  <p className="font-semibold">Exzellent</p>
                  <div className="flex text-yellow-500 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Bezogen auf 81 Rezensionen
                  </p>
                </div>
                <div className="text-xs font-bold tracking-tight text-muted-foreground">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                  className="p-1.5 rounded-full border hover:bg-muted"
                  aria-label="Vorherige Bewertung"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
                  className="p-1.5 rounded-full border hover:bg-muted"
                  aria-label="Nächste Bewertung"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-full bg-purple-200 text-purple-800 text-xs font-semibold flex items-center justify-center">
                  {reviews[reviewIndex].name[0]}
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-semibold">{reviews[reviewIndex].name}</p>
                  <p className="text-muted-foreground">{reviews[reviewIndex].date}</p>
                </div>
                <span className="text-xs font-bold tracking-tight">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </span>
              </div>
              <div className="flex text-yellow-500 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-foreground/90">{reviews[reviewIndex].text}</p>
              <button className="text-xs text-muted-foreground mt-2 hover:text-foreground">
                Mehr lesen
              </button>
            </div>

            <div className="flex justify-center gap-1.5 mt-3">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === reviewIndex ? 'w-5 bg-foreground' : 'w-1.5 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold mb-4">Details</h2>
          <div
            className="prose prose-sm max-w-none text-foreground/90"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* Floating WhatsApp */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-40"
        aria-label="WhatsApp chat"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}

function PaymentBadge({
  label,
  color,
  accent,
  variant,
}: {
  label: string
  color: string
  accent: string
  variant?: 'mc' | 'visa'
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="h-10 w-full rounded-md border flex items-center justify-center"
        style={{ backgroundColor: variant === 'visa' ? color : '#ffffff' }}
      >
        {variant === 'mc' ? (
          <div className="flex items-center">
            <span className="h-5 w-5 rounded-full bg-[#eb001b]" />
            <span className="h-5 w-5 rounded-full bg-[#f79e1b] -ml-2" />
          </div>
        ) : variant === 'visa' ? (
          <span className="text-white font-extrabold italic tracking-tighter text-sm">
            VISA
          </span>
        ) : (
          <span
            className="font-bold text-xs tracking-wide"
            style={{ color: accent }}
          >
            TWINT
          </span>
        )}
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}
