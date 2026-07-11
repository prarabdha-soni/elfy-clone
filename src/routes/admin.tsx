import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Plus, Trash2, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";

import {
  getProducts,
  addProduct,
  deleteProduct,
  verifyAdmin,
} from "@/lib/products";
import {
  SECTIONS,
  sectionLabel,
  toDisplayImageUrl,
  normalizePrice,
  type Product,
} from "@/lib/product-utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin · rajshrimahal" }],
  }),
  component: Admin,
});

function Admin() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Gate password={password} setPassword={setPassword} onUnlock={() => setUnlocked(true)} />;
  }
  return <Dashboard password={password} />;
}

function Gate({
  password,
  setPassword,
  onUnlock,
}: {
  password: string;
  setPassword: (v: string) => void;
  onUnlock: () => void;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await verifyAdmin({ data: { password } });
      if (res.ok) onUnlock();
      else setError("Incorrect password.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm text-center">
        <Lock className="size-7 mx-auto text-accent" strokeWidth={1.5} />
        <h1 className="font-serif italic text-4xl mt-4">rajshrimahal admin</h1>
        <p className="text-sm text-muted-foreground mt-2">Enter the admin password to manage products.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          className="mt-6 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-4 w-full bg-primary text-primary-foreground py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />} Unlock
        </button>
        <Link to="/" className="mt-6 inline-block text-xs text-muted-foreground hover:text-accent">
          ← Back to store
        </Link>
      </form>
    </div>
  );
}

const empty = {
  name: "",
  section: SECTIONS[0].id as string,
  img: "",
  price: "",
  compare: "",
  tag: "",
};

function Dashboard({ password }: { password: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const load = async () => {
    try {
      setProducts(await getProducts());
    } catch {
      setMessage({ kind: "err", text: "Could not load products." });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await addProduct({ data: { password, ...form } });
      setMessage({ kind: "ok", text: `"${form.name}" added.` });
      setForm({ ...empty, section: form.section });
      await load();
    } catch (err) {
      setMessage({ kind: "err", text: err instanceof Error ? err.message : "Failed to add product." });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct({ data: { password, id } });
      await load();
    } catch {
      setMessage({ kind: "err", text: "Failed to delete." });
    }
  };

  const previewImg = form.img ? toDisplayImageUrl(form.img) : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-[1100px] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-serif italic text-2xl leading-none">rajshrimahal admin</p>
            <p className="text-xs text-muted-foreground mt-1">Add products — they appear on the store instantly.</p>
          </div>
          <Link to="/" className="text-[11px] uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
            View store
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-10 grid lg:grid-cols-2 gap-12">
        {/* Add form */}
        <section>
          <h2 className="font-serif text-2xl mb-5">Add a product</h2>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Product name">
              <input required value={form.name} onChange={set("name")} placeholder="e.g. Kundan Rani Haar" className={inputCls} />
            </Field>

            <Field label="Product section">
              <select value={form.section} onChange={set("section")} className={inputCls}>
                {SECTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Image link" hint="Paste a Google Drive share link (set to 'Anyone with the link') or any direct image URL.">
              <input required value={form.img} onChange={set("img")} placeholder="https://drive.google.com/file/d/.../view" className={inputCls} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price" hint="Selling price">
                <input required value={form.price} onChange={set("price")} placeholder="4620" className={inputCls} />
              </Field>
              <Field label="Original price" hint="Optional — shown struck-through">
                <input value={form.compare} onChange={set("compare")} placeholder="6600" className={inputCls} />
              </Field>
            </div>

            <Field label="Tag" hint="Optional badge, e.g. Bestseller / New">
              <input value={form.tag} onChange={set("tag")} placeholder="New" className={inputCls} />
            </Field>

            {previewImg && (
              <div className="flex items-center gap-4 border border-border p-3">
                <img src={previewImg} alt="preview" className="size-16 object-cover bg-secondary" />
                <div className="text-xs text-muted-foreground">
                  <p className="text-foreground">{normalizePrice(form.price) || "—"} {form.compare && <span className="line-through ml-1">{normalizePrice(form.compare)}</span>}</p>
                  <a href={previewImg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-1 hover:text-accent">
                    Open image <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            )}

            {message && (
              <p className={`text-sm inline-flex items-center gap-2 ${message.kind === "ok" ? "text-accent" : "text-destructive"}`}>
                {message.kind === "ok" && <CheckCircle2 className="size-4" />}
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-primary-foreground py-3.5 text-[12px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Add product
            </button>
          </form>
        </section>

        {/* Existing products */}
        <section>
          <h2 className="font-serif text-2xl mb-5">Products ({products.length})</h2>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products added yet.</p>
          ) : (
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.id} className="flex items-center gap-4 border border-border p-3">
                  <img src={p.img} alt={p.name} className="size-14 object-cover bg-secondary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base leading-tight truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {sectionLabel(p.section ?? "")} · {p.price}
                      {p.compare && <span className="line-through ml-1">{p.compare}</span>}
                    </p>
                  </div>
                  <button aria-label="Delete" onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="size-4" strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted-foreground mt-1">{hint}</span>}
    </label>
  );
}
