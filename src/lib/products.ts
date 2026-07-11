import { createServerFn } from "@tanstack/react-start";
import {
  normalizePrice,
  toDisplayImageUrl,
  SECTION_IDS,
  type Product,
} from "./product-utils";

// --- Read: list all products (newest first) ---
export const getProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    try {
      const { getProductsCollection } = await import("./mongodb");
      const col = await getProductsCollection();
      const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
      return docs.map((d) => ({
        id: String(d._id),
        name: d.name,
        price: d.price,
        compare: d.compare,
        img: d.img,
        tag: d.tag,
        section: d.section,
      }));
    } catch (err) {
      // Don't take the whole homepage down if the DB is unreachable.
      console.error("getProducts failed:", err);
      return [];
    }
  },
);

// --- Auth: check the admin password (for the login gate) ---
export const verifyAdmin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { getAdminPassword } = await import("./mongodb");
    return { ok: data.password === getAdminPassword() };
  });

type AddInput = {
  password: string;
  name: string;
  section: string;
  img: string;
  price: string;
  compare?: string;
  tag?: string;
};

// --- Create: admin-only insert ---
export const addProduct = createServerFn({ method: "POST" })
  .validator((data: AddInput) => data)
  .handler(async ({ data }): Promise<{ ok: true; id: string }> => {
    const { getProductsCollection, getAdminPassword } = await import("./mongodb");

    if (data.password !== getAdminPassword()) {
      throw new Error("Wrong admin password.");
    }

    const name = data.name?.trim();
    const section = data.section?.trim();
    const price = normalizePrice(data.price);
    const compare = data.compare ? normalizePrice(data.compare) : undefined;
    const img = toDisplayImageUrl(data.img?.trim() ?? "");
    const tag = data.tag?.trim() || undefined;

    if (!name) throw new Error("Product name is required.");
    if (!SECTION_IDS.includes(section as (typeof SECTION_IDS)[number])) {
      throw new Error("Invalid product section.");
    }
    if (!img) throw new Error("Image link is required.");
    if (!price) throw new Error("A valid price is required.");

    const col = await getProductsCollection();
    const res = await col.insertOne({
      name,
      section,
      img,
      price,
      compare,
      tag,
      createdAt: new Date(),
    });
    return { ok: true, id: String(res.insertedId) };
  });

// --- Delete: admin-only remove ---
export const deleteProduct = createServerFn({ method: "POST" })
  .validator((data: { password: string; id: string }) => data)
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { getProductsCollection, getAdminPassword } = await import("./mongodb");
    const { ObjectId } = await import("mongodb");

    if (data.password !== getAdminPassword()) {
      throw new Error("Wrong admin password.");
    }
    const col = await getProductsCollection();
    await col.deleteOne({ _id: new ObjectId(data.id) });
    return { ok: true };
  });
