import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import forHer from "@/assets/for-her.jpg";
import forHim from "@/assets/for-him.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catPendants from "@/assets/cat-pendants.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import pCharmChain from "@/assets/p-charm-chain.jpg";
import pGardenRing from "@/assets/p-garden-ring.jpg";
import pGoldenEarrings from "@/assets/p-golden-earrings.jpg";
import pLeafPendant from "@/assets/p-leaf-pendant.jpg";
import pCharmBracelet from "@/assets/p-charm-bracelet.jpg";
import pNomadRing from "@/assets/p-nomad-ring.jpg";
import banner from "@/assets/banner-collection.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "elfy — Pure 925 Sterling Silver Jewellery" },
      {
        name: "description",
        content:
          "Handcrafted sterling silver jewellery — rings, pendants, earrings, bracelets and charms. Silver which brings souls together.",
      },
      { property: "og:title", content: "elfy — Pure 925 Sterling Silver Jewellery" },
      {
        property: "og:description",
        content: "Silver which brings souls together. Handcrafted in pure 925.",
      },
    ],
  }),
  component: Home,
});

type Product = {
  name: string;
  price: string;
  compare?: string;
  img: string;
  tag?: string;
};

const charms: Product[] = [
  { name: "Paperclip Charm Chain", price: "Rs. 7,999", compare: "Rs. 9,999", img: pCharmChain, tag: "Bestseller" },
  { name: "Paperclip Charm Bracelet", price: "Rs. 1,999", compare: "Rs. 2,299", img: pCharmBracelet },
  { name: "Watch Charm Chain", price: "Rs. 999", compare: "Rs. 1,299", img: pCharmChain },
  { name: "Star Trail Bracelet", price: "Rs. 2,499", compare: "Rs. 2,899", img: pCharmBracelet, tag: "New" },
];

const evermore: Product[] = [
  { name: "Garden Whisper Ring", price: "Rs. 8,499", img: pGardenRing, tag: "Editor's Pick" },
  { name: "Nomad's Treasure Ring", price: "Rs. 5,999", img: pNomadRing },
  { name: "Golden Petals Earrings", price: "Rs. 9,999", img: pGoldenEarrings },
  { name: "Pleasant Leaf Pendant", price: "Rs. 2,499", compare: "Rs. 2,999", img: pLeafPendant },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <Hero />
      <Marquee />
      <ForHerHim />
      <Collections />
      <ShopByPrice />
      <ProductRail title="Charms" eyebrow="New In" items={charms} />
      <FullBanner />
      <ProductRail title="Evermore by elfy" eyebrow="Signature Edit" items={evermore} />
      <Promise />
      <Footer />
    </div>
  );
}

/* ---------- Components ---------- */

function AnnouncementBar() {
  const messages = [
    "Pure 925 Sterling Silver",
    "Flat 10% off your first order — code ELFY10",
    "Free shipping across India",
    "Lifetime Buyback up to 40%",
  ];
  return (
    <div className="bg-primary text-primary-foreground text-[11px] tracking-[0.18em] uppercase">
      <div className="overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-2.5">
          {[...messages, ...messages, ...messages].map((m, i) => (
            <span key={i} className="px-8 inline-flex items-center gap-3">
              <span className="size-1 rounded-full bg-accent" />
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide">
            <NavItem label="Shop" />
            <NavItem label="Collections" />
            <NavItem label="Category" />
            <a href="#" className="hover:text-accent transition-colors">Buyback</a>
          </nav>

          {/* Logo */}
          <a href="#" className="justify-self-center font-serif italic text-4xl tracking-tight leading-none">
            elfy
          </a>

          {/* Right icons */}
          <div className="justify-self-end flex items-center gap-5 text-foreground">
            <button aria-label="Search" className="hover:text-accent transition-colors">
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="hover:text-accent transition-colors hidden sm:block">
              <User className="size-[18px]" strokeWidth={1.5} />
            </button>
            <button aria-label="Wishlist" className="hover:text-accent transition-colors hidden sm:block">
              <Heart className="size-[18px]" strokeWidth={1.5} />
            </button>
            <button aria-label="Bag" className="relative hover:text-accent transition-colors">
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 text-[10px] bg-accent text-accent-foreground rounded-full size-4 grid place-items-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 hover:text-accent transition-colors uppercase tracking-[0.14em] text-[11px]">
      {label} <ChevronDown className="size-3" strokeWidth={1.5} />
    </button>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[78vh] min-h-[560px] w-full">
        <img
          src={hero}
          alt="Hands adorned with sterling silver rings"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-background/40" />
        <div className="relative z-10 mx-auto max-w-[1400px] h-full px-6 lg:px-10 flex flex-col justify-end pb-20 lg:pb-28">
          <p className="uppercase tracking-[0.32em] text-[11px] text-foreground/80 mb-5">
            Spring Capsule · MMXXV
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] max-w-[14ch] italic">
            Silver which brings <span className="text-accent">souls</span> together.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground text-base">
            Heirloom-grade 925 sterling, handcrafted in small batches.
            Designed to be worn, layered and passed on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Shop the edit <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-foreground/40 px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              For Him
            </a>
          </div>
        </div>

        {/* slide indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-10 w-px ${i === 0 ? "bg-foreground" : "bg-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Pure 925 Silver", "Hypoallergenic", "Anti-Tarnish", "Lifetime Buyback", "Handcrafted in India"];
  return (
    <div className="border-y border-border bg-secondary/40 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-4">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="px-10 font-serif italic text-2xl text-foreground/70 inline-flex items-center gap-10">
            {t}
            <Sparkles className="size-3 text-accent" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ForHerHim() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
      <SectionHeading
        eyebrow="The Collections"
        title="Made for every soul"
        sub="Two muses, one silver story."
      />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12">
        <FeatureTile img={forHer} title="For Her" subtitle="Delicate, devotional, daily-wear." />
        <FeatureTile img={forHim} title="For Him" subtitle="Quiet weight. Considered edges." />
      </div>
    </section>
  );
}

function FeatureTile({ img, title, subtitle }: { img: string; title: string; subtitle: string }) {
  return (
    <a href="#" className="group relative block overflow-hidden hover-zoom aspect-[4/5]">
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 text-background">
        <h3 className="font-serif italic text-5xl lg:text-6xl leading-none">{title}</h3>
        <p className="mt-3 text-sm tracking-wide text-background/80">{subtitle}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-background/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
          Explore <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </span>
      </div>
    </a>
  );
}

function Collections() {
  const cats = [
    { name: "Rings", img: catRings, count: "120 pieces" },
    { name: "Pendants", img: catPendants, count: "84 pieces" },
    { name: "Earrings", img: catEarrings, count: "96 pieces" },
    { name: "Bracelets", img: catBracelets, count: "72 pieces" },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28 border-t border-border">
      <SectionHeading eyebrow="Browse" title="Shop by category" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 mt-12">
        {cats.map((c) => (
          <a key={c.name} href="#" className="group block hover-zoom">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img src={c.img} alt={c.name} loading="lazy" className="size-full object-cover" />
            </div>
            <div className="pt-5 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl">{c.name}</h3>
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {c.count}
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View all collections <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}

function ShopByPrice() {
  const tiers = [
    { label: "Under ₹2,000", note: "Everyday silver" },
    { label: "Under ₹5,000", note: "Layering staples" },
    { label: "Under ₹10,000", note: "Statement pieces" },
    { label: "Above ₹10,000", note: "Heirloom edit" },
  ];
  return (
    <section className="bg-secondary/50 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-24">
        <SectionHeading eyebrow="Gifting" title="Shop by price" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {tiers.map((t, i) => (
            <a
              key={t.label}
              href="#"
              className="group relative border border-border bg-background p-8 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="font-serif italic text-[11px] block text-accent group-hover:text-accent">
                0{i + 1}
              </span>
              <h3 className="font-serif text-3xl mt-2 leading-tight">{t.label}</h3>
              <p className="text-sm mt-2 opacity-70">{t.note}</p>
              <ArrowRight
                className="size-5 absolute bottom-6 right-6 -rotate-45 group-hover:rotate-0 transition-transform"
                strokeWidth={1.25}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: Product[];
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <p className="uppercase tracking-[0.28em] text-[11px] text-accent">{eyebrow}</p>
          <h2 className="font-serif text-4xl lg:text-5xl mt-3 italic">{title}</h2>
        </div>
        <a
          href="#"
          className="text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View all
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
        {items.map((p, idx) => (
          <ProductCard key={idx} product={p} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-secondary hover-zoom">
        <img src={product.img} alt={product.name} loading="lazy" className="size-full object-cover" />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-background/95 text-foreground text-[10px] uppercase tracking-[0.18em] px-2.5 py-1">
            {product.tag}
          </span>
        )}
        <button
          aria-label="Wishlist"
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 size-9 grid place-items-center bg-background/90 hover:bg-background transition-colors"
        >
          <Heart
            className={`size-4 ${liked ? "fill-accent text-accent" : "text-foreground"}`}
            strokeWidth={1.5}
          />
        </button>
        <a
          href="#"
          className="absolute inset-x-3 bottom-3 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.22em] py-3 text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-accent"
        >
          Quick add
        </a>
      </div>
      <div className="pt-4">
        <h3 className="font-serif text-lg leading-snug">{product.name}</h3>
        <div className="mt-1.5 flex items-baseline gap-2 text-sm">
          <span className="font-medium">{product.price}</span>
          {product.compare && (
            <span className="text-muted-foreground line-through text-xs">{product.compare}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function FullBanner() {
  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={banner}
          alt="Sterling silver collection laid on satin"
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative z-10 mx-auto max-w-[1400px] h-full px-6 lg:px-10 flex flex-col items-start justify-center text-background">
          <p className="uppercase tracking-[0.3em] text-[11px] text-background/80">
            Heirloom Edit
          </p>
          <h2 className="font-serif italic text-5xl lg:text-7xl mt-4 max-w-3xl leading-[1]">
            Made to be<br />remembered.
          </h2>
          <p className="mt-6 max-w-md text-background/80">
            Pieces forged in pure 925 silver, set with ethically sourced stones —
            built for the next thirty years of wear.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 bg-background text-foreground px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Discover the edit <ArrowRight className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Promise() {
  const items = [
    { icon: ShieldCheck, label: "Pure 925 Silver", note: "Certified & hallmarked" },
    { icon: RefreshCcw, label: "Lifetime Buyback", note: "Up to 40% returned" },
    { icon: Truck, label: "Free Shipping", note: "Across India · Insured" },
    { icon: Sparkles, label: "Crafted by hand", note: "In small batches" },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(({ icon: Icon, label, note }) => (
          <div key={label} className="flex items-start gap-4">
            <Icon className="size-7 text-accent shrink-0" strokeWidth={1.25} />
            <div>
              <p className="font-serif text-xl leading-tight">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Shop",
      links: ["Rings", "Pendants", "Earrings", "Bracelets", "Charms", "Mangalsutra"],
    },
    {
      title: "Help",
      links: ["Contact", "Shipping", "Returns", "Care Guide", "Size Guide", "FAQs"],
    },
    {
      title: "About",
      links: ["Our Story", "Buyback Policy", "Sustainability", "Press", "Careers"],
    },
  ];
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-serif italic text-6xl leading-none">elfy</p>
            <p className="mt-6 max-w-sm text-primary-foreground/75">
              Join the souls list. Early access to drops, private sales and
              quiet rituals from the studio.
            </p>
            <form className="mt-6 flex border border-primary-foreground/30 focus-within:border-accent transition-colors">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent flex-1 px-4 py-3 text-sm placeholder:text-primary-foreground/50 outline-none"
              />
              <button className="px-6 bg-accent text-accent-foreground text-[11px] uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
            <div className="flex gap-5 mt-8 text-primary-foreground/80">
              <a href="#" aria-label="Instagram" className="hover:text-accent">
                <Instagram className="size-5" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-accent">
                <Facebook className="size-5" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-accent">
                <Youtube className="size-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="uppercase tracking-[0.22em] text-[11px] text-accent">
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-accent transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/15 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} elfy · Pure 925 Sterling Silver.</p>
          <p className="font-serif italic">Silver with soul.</p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="uppercase tracking-[0.28em] text-[11px] text-accent">{eyebrow}</p>
      <h2 className="font-serif italic text-4xl lg:text-5xl mt-4">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}
