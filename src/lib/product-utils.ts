// Shared, dependency-free helpers usable on both client and server.

export const SECTIONS = [
  { id: "tika", label: "Tika", short: "Tika" },
  { id: "earrings", label: "Earrings", short: "Earrings" },
  { id: "haar", label: "Haar / Ranihaar / Choker", short: "Haar" },
  { id: "mangalsutra", label: "Mangalsutra", short: "Mangalsutra" },
  { id: "ring", label: "Rings", short: "Rings" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const SECTION_IDS = SECTIONS.map((s) => s.id) as SectionId[];

export function sectionLabel(id: string): string {
  return SECTIONS.find((s) => s.id === id)?.label ?? id;
}

// A public product as consumed by the storefront UI.
export type Product = {
  id?: string;
  name: string;
  price: string;
  compare?: string;
  img: string;
  tag?: string;
  section?: string;
};

// Turn a Google Drive share link into something usable as an <img src>.
// e.g. https://drive.google.com/file/d/FILE_ID/view?... -> a thumbnail URL.
// (The file must be shared as "Anyone with the link".)
export function toDisplayImageUrl(url: string): string {
  if (!url) return url;
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const byQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const id = byPath?.[1] ?? byQuery?.[1];
  if (id && url.includes("drive.google.com")) {
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
  }
  return url;
}

// Accepts "6600", "6600/-", "Rs. 6,600" etc. -> "Rs. 6,600". Empty -> "".
export function normalizePrice(input: string): string {
  const digits = String(input ?? "").replace(/[^\d]/g, "");
  if (!digits) return "";
  return "Rs. " + parseInt(digits, 10).toLocaleString("en-IN");
}
