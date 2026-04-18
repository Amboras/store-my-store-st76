'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Leaf,
  Droplet,
  Mountain,
  PawPrint,
  Compass,
  Star,
  Check,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=80'
const LIFESTYLE_IMAGE =
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&q=80'
const EDITORIAL_IMAGE =
  'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1600&q=80'
const FIELD_IMAGE =
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1600&q=80'

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubscribed(true)
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-custom relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 lg:py-28">
          {/* Text column */}
          <div className="lg:col-span-6 space-y-7 animate-fade-in-up relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[hsl(var(--primary))]">
                New — The Summit Flask
              </span>
            </div>

            <h1 className="font-heading font-semibold text-balance leading-[0.95] text-[clamp(2.75rem,6vw,5.25rem)]">
              Adventure{' '}
              <span className="italic font-normal text-[hsl(var(--accent))]">
                fuel
              </span>
              <br />
              for dogs who{' '}
              <span className="italic font-normal">never stop</span>.
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              The 2-in-1 portable water bottle engineered from 304 stainless steel.
              One squeeze, zero spills — hydration anywhere the trail takes you.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-[hsl(var(--primary))]/90 transition-all shadow-sm"
                prefetch={true}
              >
                Shop The Flask
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[hsl(var(--primary))]/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] hover:border-[hsl(var(--primary))] transition-colors"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Proof row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-[hsl(var(--border))]">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.9</span>
                <span className="text-sm text-muted-foreground">
                  · 12,400+ happy pups
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-[hsl(var(--primary))]" strokeWidth={1.75} />
                Lifetime guarantee
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-sm bg-muted grain-overlay">
              <Image
                src={HERO_IMAGE}
                alt="Dog on the trail with Trailhound flask"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge — urgency */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[260px] bg-background/95 backdrop-blur-sm border border-[hsl(var(--border))] p-4 rounded-sm shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent))]/15 flex-shrink-0">
                    <Droplet
                      className="h-5 w-5 text-[hsl(var(--accent))]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-[hsl(var(--primary))]">
                      Trailhound №1
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Leak-proof guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="hidden lg:block absolute -top-6 -right-4 w-24 h-24 rounded-full bg-[hsl(var(--accent))]/15 -z-0" />
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-[hsl(var(--primary))]/20 -z-0" />
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60 overflow-hidden">
          <div className="flex whitespace-nowrap marquee-track">
            {[...Array(2)].map((_, loop) => (
              <div
                key={loop}
                className="flex items-center gap-10 py-3 pr-10 text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--primary))]/80 font-medium"
              >
                <span className="flex items-center gap-3">
                  <PawPrint className="h-3.5 w-3.5" /> Built For The Trail
                </span>
                <span className="divider-dot" />
                <span className="flex items-center gap-3">
                  <Mountain className="h-3.5 w-3.5" /> 304 Stainless Steel
                </span>
                <span className="divider-dot" />
                <span className="flex items-center gap-3">
                  <Droplet className="h-3.5 w-3.5" /> Zero-Leak Technology
                </span>
                <span className="divider-dot" />
                <span className="flex items-center gap-3">
                  <Compass className="h-3.5 w-3.5" /> Trusted By 12,400+ Pups
                </span>
                <span className="divider-dot" />
                <span className="flex items-center gap-3">
                  <Leaf className="h-3.5 w-3.5" /> 1% Back To Shelters
                </span>
                <span className="divider-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE PROP GRID ============ */}
      <section className="py-section">
        <div className="container-custom">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--accent))] mb-3 font-semibold">
              Built different
            </p>
            <h2 className="font-heading font-semibold text-[clamp(2rem,4vw,3rem)] leading-tight text-balance">
              Everything a thirsty adventurer needs —{' '}
              <span className="italic font-normal text-muted-foreground">
                nothing they don&apos;t.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(var(--border))] border border-[hsl(var(--border))]">
            {[
              {
                icon: Droplet,
                title: 'One-handed pour',
                copy: 'Squeeze the bottle, water flows into the built-in bowl. Back in the bottle with a flip.',
              },
              {
                icon: ShieldCheck,
                title: 'Zero leaks',
                copy: 'Silicone-sealed spout locks tight. Clips to your pack, pocket, or leash — stays dry.',
              },
              {
                icon: Mountain,
                title: 'Trail-proof build',
                copy: 'Food-grade 304 stainless steel body. Survives drops, freezes, and muddy paws.',
              },
              {
                icon: Leaf,
                title: 'Plastic-negative',
                copy: 'Every flask replaces ~240 single-use bottles a year. We plant a tree with each order.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-background p-8 hover:bg-[hsl(var(--muted))]/40 transition-colors"
              >
                <f.icon
                  className="h-7 w-7 text-[hsl(var(--accent))] mb-5"
                  strokeWidth={1.5}
                />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map(
            (
              collection: {
                id: string
                handle: string
                title: string
                metadata?: Record<string, unknown>
              },
              index: number,
            ) => (
              <CollectionSection
                key={collection.id}
                collection={collection}
                alternate={index % 2 === 1}
              />
            ),
          )}
        </>
      ) : null}

      {/* ============ EDITORIAL / STORY ============ */}
      <section className="py-section bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={EDITORIAL_IMAGE}
                alt="Dog exploring the outdoors"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--accent))] font-semibold">
                Why we built this
              </p>
              <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-balance">
                Six summits, one dehydrated dog, zero decent gear.
              </h2>
              <p className="leading-relaxed text-[hsl(var(--primary-foreground))]/80">
                We started Trailhound after a wild 14-mile loop in the Cascades
                where our husky, Juno, drank from a puddle because our bowl
                wouldn&apos;t pack. We spent two years engineering the flask we
                wished we&apos;d had — then tested it with a rescue crew of 200
                dogs across four continents.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  '14,000+ hours of real-world trail testing',
                  'Every flask ships carbon-neutral',
                  'Lifetime replacement — no questions asked',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] pt-2 border-b border-[hsl(var(--accent))] pb-1 hover:gap-3 transition-all"
                prefetch={true}
              >
                The full story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'We took the flask to the Grand Canyon rim-to-rim. Forty miles, three refills, one ecstatic pointer. No leaks, no drama.',
                name: 'Maya R.',
                location: 'Flagstaff, AZ',
                image: FIELD_IMAGE,
              },
              {
                quote:
                  'Finally a dog bottle that doesn&apos;t look like a kid\'s toy. The stainless feels like a Yeti and it fits in my cup holder.',
                name: 'Dan L.',
                location: 'Brooklyn, NY',
                image: LIFESTYLE_IMAGE,
              },
              {
                quote:
                  'Bought two — one for the car, one for my hip belt. My vet actually asked where I got it.',
                name: 'Priya S.',
                location: 'Boulder, CO',
                image:
                  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))] p-6 flex flex-col"
              >
                <div className="flex mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                    />
                  ))}
                </div>
                <blockquote
                  className="font-heading italic text-lg leading-snug flex-1 text-balance"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                />
                <figcaption className="mt-5 flex items-center gap-3 pt-5 border-t border-[hsl(var(--border))]">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="py-section-sm border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                copy: 'On orders over $49',
              },
              {
                icon: ShieldCheck,
                title: 'Lifetime Guarantee',
                copy: 'Break it, we replace it',
              },
              {
                icon: PawPrint,
                title: '30-Day Trial',
                copy: 'Unhappy? Full refund',
              },
              {
                icon: Leaf,
                title: 'Gives Back',
                copy: '1% to rescue shelters',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4"
              >
                <item.icon
                  className="h-6 w-6 flex-shrink-0 text-[hsl(var(--primary))] mt-0.5"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-section">
        <div className="container-custom max-w-2xl text-center">
          <PawPrint className="h-8 w-8 mx-auto mb-5 text-[hsl(var(--accent))]" strokeWidth={1.5} />
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.5rem)] text-balance">
            Get <span className="italic">$10 off</span> your first adventure.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join the pack. Early access to drops, trail stories, and the
            occasional very good dog.
          </p>

          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-5 py-3 text-sm font-medium">
              <Check className="h-4 w-4" /> You&apos;re in. Check your inbox.
            </div>
          ) : (
            <form
              className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 border border-[hsl(var(--border))] bg-background px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:border-[hsl(var(--primary))] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity"
              >
                Sign Me Up
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime. We love you.
          </p>
        </div>
      </section>
    </>
  )
}
