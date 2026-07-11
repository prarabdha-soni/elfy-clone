import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useMemo, useState } from "react";
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
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import necklaceCoinSet from "@/assets/necklace/necklace-coin-set.jpg";
import necklaceChoker from "@/assets/necklace/necklace-choker.jpg";
import necklacePearlPendant from "@/assets/necklace/necklace-pearl-pendant.jpg";
import earringRoseJhumka from "@/assets/earrings/earring-rose-jhumka.jpg";
import earringRoseStud from "@/assets/earrings/earring-rose-stud.jpg";
import earringLotusJhumka from "@/assets/earrings/earring-lotus-jhumka.jpg";
import earringFloralJhumka from "@/assets/earrings/earring-floral-jhumka.jpg";
import earringPeacockJhumka from "@/assets/earrings/earring-peacock-jhumka.jpg";
import earringEmeraldJhumka from "@/assets/earrings/earring-emerald-jhumka.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rajshrimahal — Handcrafted Gold Jewellery" },
      {
        name: "description",
        content:
          "Handcrafted gold-finish jewellery — temple necklaces, kundan sets, chokers and jhumka earrings. Gold which brings souls together.",
      },
      { property: "og:title", content: "rajshrimahal — Handcrafted Gold Jewellery" },
      {
        property: "og:description",
        content: "Gold which brings souls together. Handcrafted necklaces & jhumkas.",
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

const necklaces: Product[] = [
  { name: "Lakshmi Kasu Necklace Set", price: "Rs. 14,999", compare: "Rs. 17,999", img: necklaceCoinSet, tag: "Bestseller" },
  { name: "Rajwadi Gold Choker", price: "Rs. 18,999", img: necklaceChoker, tag: "New" },
  { name: "Moti Polki Pendant Set", price: "Rs. 9,999", compare: "Rs. 11,999", img: necklacePearlPendant },
];

const earrings: Product[] = [
  { name: "Gulabi Rose Jhumka", price: "Rs. 2,799", img: earringRoseJhumka, tag: "Bestseller" },
  { name: "Petite Rose Jhumki", price: "Rs. 1,899", img: earringRoseStud },
  { name: "Golden Lotus Jhumka", price: "Rs. 2,999", img: earringLotusJhumka },
  { name: "Marigold Bell Jhumka", price: "Rs. 2,699", compare: "Rs. 3,199", img: earringFloralJhumka },
  { name: "Emerald Drop Jhumka", price: "Rs. 3,499", img: earringEmeraldJhumka, tag: "Editor's Pick" },
  { name: "Mor Temple Jhumka", price: "Rs. 3,299", img: earringPeacockJhumka, tag: "New" },
];

/* ---------- Cart ---------- */

// WhatsApp business number (India). wa.me needs the country code, no "+".
const WHATSAPP_NUMBER = "918118898113";

type CartItem = Product & { qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product) => void;
  setQty: (name: string, qty: number) => void;
  remove: (name: string) => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// "Rs. 14,999" -> 14999
function priceToNumber(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function formatINR(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-IN");
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) => (i.name === product.name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const setQty = (name: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.name !== name)
        : prev.map((i) => (i.name === name ? { ...i, qty } : i)),
    );
  };

  const remove = (name: string) => setItems((prev) => prev.filter((i) => i.name !== name));

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.count += i.qty;
        acc.subtotal += priceToNumber(i.price) * i.qty;
        return acc;
      },
      { count: 0, subtotal: 0 },
    );
  }, [items]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    add,
    setQty,
    remove,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    isOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function Home() {
  return (
    <CartProvider>
      <div id="top" className="min-h-screen bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <Hero />
        <Marquee />
        <Categories />
        <ShopByPrice />
        <ProductRail id="necklaces" title="The Necklace Edit" eyebrow="Handcrafted" items={necklaces} columns={3} />
        <FullBanner />
        <ProductRail id="earrings" title="Jhumkas & Earrings" eyebrow="Best Loved" items={earrings} columns={3} />
        <Promise />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

/* ---------- Components ---------- */

function AnnouncementBar() {
  const messages = [
    "22K Gold-Finish Jewellery",
    "Flat 10% off your first order — code RAJSHRI10",
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
            <NavItem label="Necklaces" href="#necklaces" />
            <NavItem label="Earrings" href="#earrings" />
            <NavItem label="Collections" href="#collections" />
            <a href="#buyback" className="uppercase tracking-[0.14em] text-[11px] hover:text-accent transition-colors">Buyback</a>
          </nav>

          {/* Logo */}
          <a href="#top" className="justify-self-center font-serif italic text-3xl lg:text-4xl tracking-tight leading-none">
            rajshrimahal
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
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function CartButton() {
  const { count, open } = useCart();
  return (
    <button aria-label="Bag" onClick={open} className="relative hover:text-accent transition-colors">
      <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
      <span className="absolute -top-1.5 -right-2 text-[10px] bg-accent text-accent-foreground rounded-full size-4 grid place-items-center">
        {count}
      </span>
    </button>
  );
}

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-1 hover:text-accent transition-colors uppercase tracking-[0.14em] text-[11px]">
      {label} <ChevronDown className="size-3" strokeWidth={1.5} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[78vh] min-h-[560px] w-full">
        <img
          src={necklacePearlPendant}
          alt="Handcrafted gold and pearl pendant necklace"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover object-[50%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-background/25" />
        <div className="relative z-10 mx-auto max-w-[1400px] h-full px-6 lg:px-10 flex flex-col justify-end pb-20 lg:pb-28">
          <p className="uppercase tracking-[0.32em] text-[11px] text-foreground/80 mb-5">
            The Heritage Edit · MMXXV
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] max-w-[14ch] italic">
            Gold which brings <span className="text-accent">souls</span> together.
          </h1>
          <p className="mt-6 max-w-md text-foreground/90 text-base font-medium drop-shadow-sm">
            Handcrafted 22K gold-finish jewellery — temple necklaces, kundan
            sets and jhumkas, made in small batches to be worn and passed on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Shop necklaces <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-foreground/40 px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              Shop earrings
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
  const items = ["22K Gold Finish", "Hypoallergenic", "Anti-Tarnish", "Lifetime Buyback", "Handcrafted in India"];
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

function Categories() {
  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
      <SectionHeading
        eyebrow="The Collections"
        title="Necklaces & Earrings"
        sub="Two heirloom edits, one golden story."
      />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12">
        <FeatureTile img={necklaceChoker} title="Necklaces" subtitle="Chokers, temple sets & pendants." />
        <FeatureTile img={earringEmeraldJhumka} title="Earrings" subtitle="Jhumkas, studs & statement drops." />
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

function ShopByPrice() {
  const tiers = [
    { label: "Under ₹2,000", note: "Everyday gold" },
    { label: "Under ₹5,000", note: "Jhumka staples" },
    { label: "Under ₹10,000", note: "Statement sets" },
    { label: "Above ₹10,000", note: "Bridal edit" },
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
  id,
  title,
  eyebrow,
  items,
  columns = 4,
}: {
  id?: string;
  title: string;
  eyebrow: string;
  items: Product[];
  columns?: 3 | 4;
}) {
  const grid = columns === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4";
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
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
      <div className={`grid ${grid} gap-5 lg:gap-7`}>
        {items.map((p, idx) => (
          <ProductCard key={idx} product={p} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const { add } = useCart();
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary hover-zoom">
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
        <button
          type="button"
          onClick={() => add(product)}
          className="absolute inset-x-3 bottom-3 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.22em] py-3 text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-accent"
        >
          Add to cart
        </button>
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
          src={earringPeacockJhumka}
          alt="Model wearing a handcrafted gold peacock jhumka"
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative z-10 mx-auto max-w-[1400px] h-full px-6 lg:px-10 flex flex-col items-start justify-center text-background">
          <p className="uppercase tracking-[0.3em] text-[11px] text-background/80">
            Heirloom Edit
          </p>
          <h2 className="font-serif italic text-5xl lg:text-7xl mt-4 max-w-3xl leading-[1]">
            Made to be<br />remembered.
          </h2>
          <p className="mt-6 max-w-md text-background/80">
            Pieces handcrafted in 22K gold-finish, set with kundan, polki and
            coloured stones — made for weddings, festivals and the years between.
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
    { icon: ShieldCheck, label: "22K Gold Finish", note: "Certified & hallmarked" },
    { icon: RefreshCcw, label: "Lifetime Buyback", note: "Up to 40% returned" },
    { icon: Truck, label: "Free Shipping", note: "Across India · Insured" },
    { icon: Sparkles, label: "Crafted by hand", note: "In small batches" },
  ];
  return (
    <section id="buyback" className="border-y border-border bg-secondary/40">
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
      links: ["Necklaces", "Earrings", "Chokers", "Jhumkas", "Pendant Sets", "Bridal"],
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
            <p className="font-serif italic text-5xl lg:text-6xl leading-none">rajshrimahal</p>
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
          <p>© {new Date().getFullYear()} rajshrimahal · Handcrafted Gold-Finish Jewellery.</p>
          <p className="font-serif italic">Gold with soul.</p>
        </div>
      </div>
    </footer>
  );
}

function CartDrawer() {
  const { items, subtotal, count, setQty, remove, isOpen, close } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const canOrder = items.length > 0 && name.trim() && phone.trim() && address.trim();

  const placeOrder = () => {
    if (items.length === 0) {
      setError("Your bag is empty.");
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in your name, phone and address.");
      return;
    }
    setError("");

    const lines = items
      .map(
        (i) =>
          `• ${i.name}  ×${i.qty}  —  ${formatINR(priceToNumber(i.price) * i.qty)}`,
      )
      .join("\n");

    const message =
      `Hello rajshrimahal! I'd like to place an order.\n\n` +
      `*Order details*\n${lines}\n\n` +
      `*Subtotal:* ${formatINR(subtotal)}\n\n` +
      `*Delivery details*\n` +
      `Name: ${name.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      `Address: ${address.trim()}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif italic text-2xl">
            Your bag {count > 0 && <span className="text-accent not-italic text-base">({count})</span>}
          </h2>
          <button aria-label="Close" onClick={close} className="hover:text-accent transition-colors">
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-muted-foreground">
              <div>
                <ShoppingBag className="size-8 mx-auto mb-4 text-accent" strokeWidth={1} />
                <p>Your bag is empty.</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((i) => (
                <li key={i.name} className="flex gap-4">
                  <img src={i.img} alt={i.name} className="size-20 object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base leading-snug">{i.name}</h3>
                    <p className="text-sm mt-0.5">{i.price}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(i.name, i.qty - 1)}
                          className="p-1.5 hover:text-accent transition-colors"
                        >
                          <Minus className="size-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(i.name, i.qty + 1)}
                          className="p-1.5 hover:text-accent transition-colors"
                        >
                          <Plus className="size-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        aria-label="Remove"
                        onClick={() => remove(i.name)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="size-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium whitespace-nowrap">
                    {formatINR(priceToNumber(i.price) * i.qty)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.18em] text-[11px] text-muted-foreground">Subtotal</span>
              <span className="font-serif text-xl">{formatINR(subtotal)}</span>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address"
                rows={3}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {error && <p className="text-destructive text-xs">{error}</p>}

            <button
              type="button"
              onClick={placeOrder}
              disabled={!canOrder}
              className="w-full bg-primary text-primary-foreground py-3.5 text-[12px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:hover:bg-primary disabled:hover:text-primary-foreground"
            >
              Buy now · Order on WhatsApp
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              You'll be taken to WhatsApp to confirm your order.
            </p>
          </div>
        )}
      </aside>
    </>
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
