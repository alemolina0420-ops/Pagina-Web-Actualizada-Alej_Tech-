/**
 * ProductsContext.tsx — Firestore version
 * Productos, categorías y configuración se sincronizan en tiempo real
 * con Firestore. Cualquier dispositivo ve los cambios al instante.
 */

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Product, Category, SiteConfig, SystemLog } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getWhatsAppNumber } from '@/config/site.config';
import {
  isFirebaseConfigured,
  seedInitialDataIfEmpty,
  subscribeToProducts,
  subscribeToCategories,
  subscribeToSiteConfig,
  saveProduct,
  patchProduct,
  removeProduct,
  saveCategory,
  patchCategory,
  removeCategory,
  saveSiteConfig,
  patchSiteConfig,
} from '@/lib/firestoreService';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProductsContextType {
  products: Product[];
  categories: Category[];
  siteConfig: SiteConfig;
  logs: SystemLog[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateSiteConfig: (config: Partial<SiteConfig>) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  addLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  exportData: () => string;
  importData: (jsonData: string) => Promise<boolean>;
}

// ─── Default data ─────────────────────────────────────────────────────────────
export const defaultSiteConfig: SiteConfig = {
  brandName: 'TECH_SHOP',
  tagline: 'Técnico Especializado en Dispositivos Móviles',
  technicianTitle: 'Técnico Especializado en Dispositivos Móviles',
  location: 'Santa Lucía, Valles del Tuy',
  warrantyDays: 15,
  whatsappNumber: getWhatsAppNumber(),
  email: 'contacto@tecnostore.com',
  deliveryZones: ['Santa Lucía', 'Charallave', 'Cúa', 'Ocumare del Tuy', 'Zonas aledañas'],
  heroTitle: '¿Tu dispositivo merece accesorios que no han sido verificados por un técnico?',
  heroSubtitle: 'Soy Técnico Especializado en Dispositivos Móviles con taller de servicio en Santa Lucía. Cada producto es revisado antes de ofrecerlo.',
  ctaText: 'Contáctanos hoy mismo',
  primaryColor: '#f59e0b',
  accentColor: '#10b981',
  developerMode: false,
  maintenanceMode: false,
  allowRegistration: true,
};

export const defaultCategories: Category[] = [
  { id: '1', name: 'Cargadores', icon: 'Zap', description: 'Cargadores certificados y validados' },
  { id: '2', name: 'Cables', icon: 'Usb', description: 'Cables de alta durabilidad' },
  { id: '3', name: 'Audífonos', icon: 'Headphones', description: 'Audio de calidad profesional' },
  { id: '4', name: 'Accesorios', icon: 'Package', description: 'Otros accesorios esenciales' },
  { id: '5', name: 'Herramientas', icon: 'Shield', description: 'Herramientas de precisión' },
  { id: '6', name: 'Almacenamiento', icon: 'Monitor', description: 'Cases y dispositivos de almacenamiento' },
  { id: '7', name: 'Domótica', icon: 'Battery', description: 'Cámaras y dispositivos inteligentes' },
  { id: '8', name: 'Consumibles', icon: 'Package', description: 'Productos de uso general' },
];

export const defaultProducts: Product[] = [
  { id: 'CARG0208', name: 'Cargador 2 en 1 Tecno 33W Tipo C UI80XEE', category: '1', price: 3.00, images: ['/placeholder-product.jpg'], description: 'Cargador dual 2 en 1 para dispositivos Tecno con 33W de potencia.', shortDescription: 'Cargador 33W 2 en 1 para Tecno con puerto Tipo C', specs: [{ label: 'Potencia', value: '33W' }, { label: 'Conector', value: 'Tipo C' }], features: ['Carga rápida 33W', 'Compatible con dispositivos Tecno'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CARG0207', name: 'Cargador 2 en 1 Infinix 33W Tipo C UI80XEE', category: '1', price: 3.00, images: ['/placeholder-product.jpg'], description: 'Cargador dual 2 en 1 para dispositivos Infinix con 33W.', shortDescription: 'Cargador 33W 2 en 1 para Infinix con puerto Tipo C', specs: [{ label: 'Potencia', value: '33W' }, { label: 'Conector', value: 'Tipo C' }], features: ['Carga rápida 33W', 'Compatible con dispositivos Infinix'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'AUPO0341', name: 'Audífono Inalámbrico A9 Pro Touch', category: '3', price: 11.00, images: ['/placeholder-product.jpg'], description: 'Audífonos inalámbricos A9 Pro con control táctil.', shortDescription: 'Audífonos inalámbricos A9 Pro con control touch', specs: [{ label: 'Conectividad', value: 'Bluetooth' }], features: ['Control táctil', 'Sonido de alta fidelidad'], inStock: true, isNew: true, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CARG0212', name: 'Cargador 2 en 1 iPhone 15 Pro Max 50W', category: '1', price: 5.50, images: ['/cargador-hero.jpg'], description: 'Cargador dual USB-C con 50W para iPhone 15 Pro Max.', shortDescription: 'Cargador 50W 2 en 1 para iPhone 15 Pro Max', specs: [{ label: 'Potencia', value: '50W' }, { label: 'Conector', value: 'USB-C' }], features: ['Carga rápida 50W', 'Revisado por el técnico'], inStock: true, isNew: true, isBestseller: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CARG0213', name: 'Cargador 2 en 1 iPhone 15 Pro Max 35W', category: '1', price: 4.80, images: ['/placeholder-product.jpg'], description: 'Cargador dual 2 en 1 para iPhone 15 Pro Max con 35W.', shortDescription: 'Cargador 35W 2 en 1 para iPhone 15 Pro Max', specs: [{ label: 'Potencia', value: '35W' }], features: ['Carga rápida 35W', 'Compatible iPhone 15 Pro Max'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'ACCE0194', name: 'Micrófono Balita Inalámbrico Combo K11', category: '4', price: 6.60, images: ['/placeholder-product.jpg'], description: 'Micrófono inalámbrico de solapa Combo K11.', shortDescription: 'Micrófono inalámbrico de solapa Combo K11', specs: [{ label: 'Tipo', value: 'Balita / Solapa' }], features: ['Conexión inalámbrica', 'Ideal para creadores de contenido'], inStock: true, isNew: true, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CABL0237', name: 'Cable USB-C a Lightning Silicon 2 en 1', category: '2', price: 1.80, images: ['/placeholder-product.jpg'], description: 'Cable 2 en 1 USB-C y Lightning de silicona.', shortDescription: 'Cable 2 en 1 USB-C/Lightning de silicona', specs: [{ label: 'Conectores', value: 'USB-C / Lightning' }], features: ['Diseño 2 en 1', 'Material de silicona duradero'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'AUPO0364', name: 'Audífonos In Ear QKZ SK8 Monitor', category: '3', price: 4.50, images: ['/placeholder-product.jpg'], description: 'Audífonos in-ear QKZ SK8 tipo monitor.', shortDescription: 'Audífonos in-ear QKZ SK8 Monitor profesional', specs: [{ label: 'Tipo', value: 'In-Ear Monitor' }], features: ['Sonido de monitor profesional', 'Aislamiento de ruido'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CARG0102', name: 'Cargador Adaptador para Tablet y Laptop 12-24V', category: '1', price: 5.60, images: ['/placeholder-product.jpg'], description: 'Cargador adaptador universal para tablets y laptops.', shortDescription: 'Adaptador universal 12-24V para tablet y laptop', specs: [{ label: 'Voltaje', value: '12-24V' }], features: ['Voltaje ajustable', 'Compatible múltiples dispositivos'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'AUPO0394', name: 'Audífono Inalámbrico Ambie', category: '3', price: 9.00, images: ['/placeholder-product.jpg'], description: 'Audífonos inalámbricos Ambie Bluetooth.', shortDescription: 'Audífonos inalámbricos Ambie Bluetooth', specs: [{ label: 'Conectividad', value: 'Bluetooth' }], features: ['Diseño moderno', 'Sonido de alta calidad'], inStock: true, isNew: true, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CABL0198', name: 'Cable Xiaomi Tipo C a C', category: '2', price: 1.30, images: ['/placeholder-product.jpg'], description: 'Cable original Xiaomi Tipo C a C.', shortDescription: 'Cable Xiaomi Tipo C a C original', specs: [{ label: 'Marca', value: 'Xiaomi' }], features: ['Soporta carga rápida', 'Transferencia de datos'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CABL0213', name: 'Cable Samsung Tipo C-C 3A', category: '2', price: 1.40, images: ['/placeholder-product.jpg'], description: 'Cable Samsung Tipo C a C con soporte 3A.', shortDescription: 'Cable Samsung Tipo C-C 3A carga rápida', specs: [{ label: 'Corriente', value: '3A' }], features: ['Soporta hasta 3A', 'Carga rápida'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'HERR0062', name: 'Kit de Destornilladores de Precisión BA-3338', category: '5', price: 12.00, images: ['/placeholder-product.jpg'], description: 'Kit completo de destornilladores de precisión BA-3338.', shortDescription: 'Kit destornilladores de precisión BA-3338', specs: [{ label: 'Modelo', value: 'BA-3338' }], features: ['Set completo de puntas', 'Alta precisión'], inStock: true, isNew: true, isBestseller: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CABL0168', name: 'Cable USB iPhone (1M)', category: '2', price: 1.00, images: ['/placeholder-product.jpg'], description: 'Cable USB para iPhone de 1 metro.', shortDescription: 'Cable USB para iPhone 1 metro', specs: [{ label: 'Longitud', value: '1 metro' }], features: ['Carga y sincronización', 'Compatible iPhone'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'AUPO0260', name: 'Audífono Inalámbrico AirPods Pro', category: '3', price: 10.00, images: ['/placeholder-product.jpg'], description: 'Audífonos inalámbricos estilo AirPods Pro.', shortDescription: 'Audífonos inalámbricos AirPods Pro style', specs: [{ label: 'Conectividad', value: 'Bluetooth' }], features: ['Diseño tipo AirPods Pro', 'Cancelación de ruido'], inStock: true, isNew: true, isBestseller: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'COMP0011', name: 'Case Externo 2.5 HDD-SSD Tipo C', category: '6', price: 5.50, images: ['/placeholder-product.jpg'], description: 'Case externo para HDD y SSD de 2.5 pulgadas.', shortDescription: 'Case externo 2.5" HDD/SSD con Tipo C', specs: [{ label: 'Conexión', value: 'Tipo C' }], features: ['Compatible HDD y SSD', 'Fácil instalación'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'COMP0010', name: 'Case Externo 2.5 HDD Tipo C', category: '6', price: 4.20, images: ['/placeholder-product.jpg'], description: 'Case externo para HDD de 2.5 pulgadas USB 3.0.', shortDescription: 'Case externo 2.5" HDD con Tipo C', specs: [{ label: 'Conexión', value: 'Tipo C USB 3.0' }], features: ['Para discos HDD 2.5"', 'Alta velocidad'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'ACCE0224', name: 'Cinta Colgante para Teléfonos', category: '4', price: 1.30, images: ['/placeholder-product.jpg'], description: 'Cinta colgante para teléfonos móviles.', shortDescription: 'Cinta colgante para teléfonos móviles', specs: [{ label: 'Tipo', value: 'Colgante' }], features: ['Diseño práctico', 'Evita caídas'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'OTRO0003', name: 'Llaveros Acrílicos Campanita Mix', category: '4', price: 0.70, images: ['/placeholder-product.jpg'], description: 'Llaveros acrílicos diseño campanita, pack mixto.', shortDescription: 'Llaveros acrílicos campanita mix', specs: [{ label: 'Material', value: 'Acrílico' }], features: ['Material acrílico', 'Varios modelos'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'CONS0004', name: 'Gel Multiuso Yaxun Y-3000 (110ml)', category: '8', price: 3.40, images: ['/placeholder-product.jpg'], description: 'Gel multiuso Yaxun Y-3000 110ml para reparaciones.', shortDescription: 'Gel multiuso Yaxun Y-3000 110ml', specs: [{ label: 'Capacidad', value: '110ml' }], features: ['Uso multiuso', 'Ideal para reparaciones'], inStock: true, isNew: false, isBestseller: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'DOMO0001', name: 'Cámara 360 FHD Doble V380 Pro', category: '7', price: 14.50, images: ['/placeholder-product.jpg'], description: 'Cámara de seguridad 360° FHD doble lente V380 Pro.', shortDescription: 'Cámara 360° FHD doble lente V380 Pro', specs: [{ label: 'Resolución', value: 'FHD' }, { label: 'Ángulo', value: '360°' }], features: ['Visión 360° completa', 'Resolución FHD'], inStock: true, isNew: true, isBestseller: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

// ─── Context ──────────────────────────────────────────────────────────────────
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useLocalStorage<SystemLog[]>('systemLogs', []);

  // ── Bootstrap: seed + subscribe ────────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.error(
        '[TecnoStore] ⚠️ Firebase no está configurado. ' +
        'Copia .env.example como .env y añade tus credenciales de Firebase.'
      );
      toast.error('Firebase no configurado. Revisa las variables de entorno.');
      setIsLoading(false);
      return;
    }

    let unsubProducts: (() => void) | undefined;
    let unsubCategories: (() => void) | undefined;
    let unsubConfig: (() => void) | undefined;

    const init = async () => {
      try {
        // Seed initial data if Firestore is empty (first run only)
        await seedInitialDataIfEmpty(defaultProducts, defaultCategories, defaultSiteConfig);

        // Real-time subscriptions
        unsubProducts = subscribeToProducts(
          (data) => { setProducts(data); setIsLoading(false); },
          (err) => console.error('Products subscription error:', err)
        );

        unsubCategories = subscribeToCategories(
          (data) => setCategories(data),
          (err) => console.error('Categories subscription error:', err)
        );

        unsubConfig = subscribeToSiteConfig(
          (data) => setSiteConfig(data),
          (err) => console.error('SiteConfig subscription error:', err)
        );
      } catch (err) {
        console.error('[TecnoStore] Error initializing Firestore:', err);
        toast.error('Error conectando con la base de datos.');
        setIsLoading(false);
      }
    };

    init();

    return () => {
      unsubProducts?.();
      unsubCategories?.();
      unsubConfig?.();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Logs (local — datos de sesión, no de negocio) ─────────────────────────
  const addLog = useCallback((log: Omit<SystemLog, 'id' | 'timestamp'>) => {
    const newLog: SystemLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 100));
  }, [setLogs]);

  const clearLogs = useCallback(() => setLogs([]), [setLogs]);

  // ── Products CRUD ─────────────────────────────────────────────────────────
  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveProduct(newProduct);
    addLog({ type: 'success', message: `Producto creado: ${product.name}` });
  }, [addLog]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const patch = { ...updates, updatedAt: new Date().toISOString() };
    await patchProduct(id, patch);
    addLog({ type: 'info', message: `Producto actualizado: ID ${id}` });
  }, [addLog]);

  const deleteProduct = useCallback(async (id: string) => {
    await removeProduct(id);
    addLog({ type: 'warning', message: `Producto eliminado: ID ${id}` });
  }, [addLog]);

  // ── Categories CRUD ───────────────────────────────────────────────────────
  const addCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...category, id: Date.now().toString() };
    await saveCategory(newCategory);
    addLog({ type: 'success', message: `Categoría creada: ${category.name}` });
  }, [addLog]);

  const updateCategory = useCallback(async (id: string, updates: Partial<Category>) => {
    await patchCategory(id, updates);
    addLog({ type: 'info', message: `Categoría actualizada: ID ${id}` });
  }, [addLog]);

  const deleteCategory = useCallback(async (id: string) => {
    await removeCategory(id);
    addLog({ type: 'warning', message: `Categoría eliminada: ID ${id}` });
  }, [addLog]);

  // ── Site Config ───────────────────────────────────────────────────────────
  const updateSiteConfig = useCallback(async (updates: Partial<SiteConfig>) => {
    await patchSiteConfig(updates);
    addLog({ type: 'info', message: 'Configuración del sitio actualizada' });
  }, [addLog]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getProductById = useCallback((id: string) => products.find((p) => p.id === id), [products]);
  const getProductsByCategory = useCallback((categoryId: string) => products.filter((p) => p.category === categoryId), [products]);

  // ── Import / Export ───────────────────────────────────────────────────────
  const exportData = useCallback(() => {
    return JSON.stringify({ products, categories, siteConfig, exportDate: new Date().toISOString() }, null, 2);
  }, [products, categories, siteConfig]);

  const importData = useCallback(async (jsonData: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonData);
      if (data.products) {
        for (const p of data.products as Product[]) await saveProduct(p);
      }
      if (data.categories) {
        for (const c of data.categories as Category[]) await saveCategory(c);
      }
      if (data.siteConfig) await saveSiteConfig(data.siteConfig as SiteConfig);
      addLog({ type: 'success', message: 'Datos importados correctamente' });
      return true;
    } catch {
      addLog({ type: 'error', message: 'Error al importar datos' });
      return false;
    }
  }, [addLog]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        siteConfig,
        logs,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSiteConfig,
        getProductById,
        getProductsByCategory,
        addLog,
        clearLogs,
        exportData,
        importData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
}
