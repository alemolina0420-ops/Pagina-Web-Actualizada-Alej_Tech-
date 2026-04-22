/**
 * firestoreService.ts
 *
 * Capa de acceso a datos — Firestore.
 * Todas las operaciones CRUD de productos, categorías y configuración
 * pasan por este archivo. El contexto (ProductsContext) solo llama
 * estas funciones; no toca el SDK de Firebase directamente.
 *
 * Colecciones en Firestore:
 *   - products    → documentos con ID = product.id
 *   - categories  → documentos con ID = category.id
 *   - config      → un solo documento "siteConfig"
 */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product, Category, SiteConfig } from '@/types';

// ─── Nombres de colecciones ──────────────────────────────────────────────────
const PRODUCTS_COL    = 'products';
const CATEGORIES_COL  = 'categories';
const CONFIG_COL      = 'config';
const SITE_CONFIG_DOC = 'siteConfig';

// ─── Comprobación de configuración ───────────────────────────────────────────
/**
 * Devuelve true si las variables de entorno de Firebase están presentes.
 * Úsalo para mostrar un error claro si el .env no está configurado.
 */
export function isFirebaseConfigured(): boolean {
  return !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

// ─── PRODUCTOS ────────────────────────────────────────────────────────────────

/** Suscripción en tiempo real a la colección de productos */
export function subscribeToProducts(
  onData: (products: Product[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, PRODUCTS_COL),
    (snapshot) => {
      const products = snapshot.docs.map((d) => d.data() as Product);
      onData(products);
    },
    onError
  );
}

/** Añade o reemplaza un producto (usa el ID del producto como ID de documento) */
export async function saveProduct(product: Product): Promise<void> {
  await setDoc(doc(db, PRODUCTS_COL, product.id), product);
}

/** Actualización parcial de un producto */
export async function patchProduct(id: string, updates: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, PRODUCTS_COL, id), updates as Record<string, unknown>);
}

/** Elimina un producto por ID */
export async function removeProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COL, id));
}

// ─── CATEGORÍAS ───────────────────────────────────────────────────────────────

/** Suscripción en tiempo real a la colección de categorías */
export function subscribeToCategories(
  onData: (categories: Category[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, CATEGORIES_COL),
    (snapshot) => {
      const categories = snapshot.docs.map((d) => d.data() as Category);
      onData(categories);
    },
    onError
  );
}

/** Guarda una categoría (upsert) */
export async function saveCategory(category: Category): Promise<void> {
  await setDoc(doc(db, CATEGORIES_COL, category.id), category);
}

/** Actualización parcial de una categoría */
export async function patchCategory(id: string, updates: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, CATEGORIES_COL, id), updates as Record<string, unknown>);
}

/** Elimina una categoría por ID */
export async function removeCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, CATEGORIES_COL, id));
}

// ─── CONFIGURACIÓN DEL SITIO ──────────────────────────────────────────────────

/** Suscripción en tiempo real al documento de configuración */
export function subscribeToSiteConfig(
  onData: (config: SiteConfig) => void,
  onError: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    doc(db, CONFIG_COL, SITE_CONFIG_DOC),
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as SiteConfig);
      }
    },
    onError
  );
}

/** Guarda/reemplaza la configuración del sitio */
export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  await setDoc(doc(db, CONFIG_COL, SITE_CONFIG_DOC), config);
}

/** Actualización parcial de la configuración */
export async function patchSiteConfig(updates: Partial<SiteConfig>): Promise<void> {
  await updateDoc(
    doc(db, CONFIG_COL, SITE_CONFIG_DOC),
    updates as Record<string, unknown>
  );
}

// ─── SEMILLA DE DATOS INICIALES ───────────────────────────────────────────────

/**
 * Comprueba si las colecciones están vacías y, de ser así, carga los datos
 * predeterminados en Firestore (solo ocurre una vez, en el primer arranque).
 */
export async function seedInitialDataIfEmpty(
  defaultProducts: Product[],
  defaultCategories: Category[],
  defaultSiteConfig: SiteConfig
): Promise<void> {
  const [productsSnap, categoriesSnap, configSnap] = await Promise.all([
    getDocs(collection(db, PRODUCTS_COL)),
    getDocs(collection(db, CATEGORIES_COL)),
    getDocs(collection(db, CONFIG_COL)),
  ]);

  const batch = writeBatch(db);
  let hasChanges = false;

  if (productsSnap.empty) {
    defaultProducts.forEach((p) => {
      batch.set(doc(db, PRODUCTS_COL, p.id), p);
    });
    hasChanges = true;
  }

  if (categoriesSnap.empty) {
    defaultCategories.forEach((c) => {
      batch.set(doc(db, CATEGORIES_COL, c.id), c);
    });
    hasChanges = true;
  }

  if (configSnap.empty) {
    batch.set(doc(db, CONFIG_COL, SITE_CONFIG_DOC), defaultSiteConfig);
    hasChanges = true;
  }

  if (hasChanges) {
    await batch.commit();
    console.info('[TecnoStore] Datos iniciales cargados en Firestore ✅');
  }
}
