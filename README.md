# 🛠️ ALEJ_TECH | TecnoStore

**Tienda de Accesorios Tecnológicos y Servicio Técnico de Reparación de Dispositivos Móviles**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://tecnostore.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

---

## 📍 Ubicación

**Santa Lucía del Tuy, Miranda, Venezuela**  
Entregas personales en Charallave, Santa Teresa y zonas aledañas.

---

## 🎯 Descripción del Proyecto

ALEJ_TECH es una plataforma web profesional que combina:

1. **🛒 Tienda Virtual** - Catálogo de accesorios tecnológicos validados térmicamente por un técnico especializado
2. **🔧 Servicio Técnico** - Reparación profesional de dispositivos móviles con garantía de 15 días

### Público Objetivo

- **Empresas**: Servicio corporativo con atención personalizada
- **Gamers/Jóvenes**: Productos gaming con especificaciones técnicas detalladas
- **Urgencias**: Reparación rápida con respuesta en menos de 30 minutos

---

## 🚀 Stack Tecnológico

### Frontend
- **React 19.2.0** - Biblioteca UI con las últimas características
- **TypeScript 5.9.3** - Tipado estático para mayor seguridad
- **Vite 7.2.4** - Build tool ultrarrápido
- **React Router 7.13.2** - Enrutamiento SPA con code splitting

### Estilos
- **Tailwind CSS 3.4.19** - Framework CSS utility-first
- **Shadcn/ui** - 53 componentes UI profesionales basados en Radix UI
- **Lucide React** - Iconografía moderna

### Seguridad
- **bcryptjs** - Hashing de contraseñas con 10 salt rounds
- **Zod** - Validación de esquemas
- **Headers de seguridad** - CSP, HSTS, X-Frame-Options, etc.

### Gestión de Estado
- **Context API** - AuthContext y ProductsContext
- **LocalStorage** - Persistencia de datos (frontend-only)

---

## 📦 Instalación

### Prerrequisitos
- Node.js 20.x o superior
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone <tu-repositorio>
cd app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus datos reales

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (Vite)

# Producción
npm run build        # Compila TypeScript y genera build optimizado
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

---

## 🌐 Despliegue en Vercel

### Configuración Automática

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Vite
3. Configura las variables de entorno en el dashboard:
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_SITE_URL`

### Variables de Entorno

```bash
VITE_WHATSAPP_NUMBER=584123979581
VITE_SITE_URL=https://tu-dominio.com
```

### Headers de Seguridad

El archivo `vercel.json` incluye:
- Content Security Policy (CSP)
- X-Frame-Options (protección contra clickjacking)
- X-Content-Type-Options (prevención de MIME sniffing)
- Strict-Transport-Security (HSTS)
- Referrer-Policy

---

## 🔐 Seguridad

### Autenticación
- Contraseñas hasheadas con bcrypt (10 rounds)
- Sesiones con expiración de 24 horas
- Sistema RBAC (Role-Based Access Control)
- Rutas protegidas con guards

### Roles de Usuario
- **user**: Acceso básico (registro, compras)
- **admin**: Gestión de productos y categorías
- **developer**: Acceso completo al sistema

### Credenciales Iniciales
En el primer arranque, se genera automáticamente una cuenta de desarrollador:
- **Email**: `dev@tecnostore.com`
- **Contraseña**: Se muestra en consola (solo una vez)

⚠️ **IMPORTANTE**: Guarda la contraseña del desarrollador cuando aparezca en consola.

---

## 📂 Estructura del Proyecto

```
app/
├── public/                    # Assets estáticos
│   ├── cargador-hero.jpg
│   ├── perfil-tecnico.jpg
│   └── IMAGEN-REQUERIDA.md   # Documentación de imagen faltante
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # 53 componentes Shadcn
│   │   ├── layout/          # Navbar, Footer, Layouts
│   │   ├── landing/         # Componentes de landing
│   │   ├── products/        # Componentes de productos
│   │   └── shared/          # Componentes compartidos
│   ├── contexts/            # Context API
│   │   ├── AuthContext.tsx
│   │   └── ProductsContext.tsx
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades
│   │   ├── security.ts     # Funciones de seguridad
│   │   ├── permissions.ts  # Sistema RBAC
│   │   └── utils.ts        # Utilidades generales
│   ├── pages/               # Páginas de la aplicación
│   │   ├── home/
│   │   ├── auth/
│   │   ├── tienda/
│   │   ├── servicios/
│   │   └── admin/
│   ├── types/               # Definiciones TypeScript
│   ├── utils/               # Utilidades específicas
│   ├── config/              # Configuración
│   ├── App.tsx              # Enrutador principal
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── .env.example             # Template de variables de entorno
├── vercel.json              # Configuración de Vercel
├── vite.config.ts           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias
```

---

## 🎨 Características

### Tienda Virtual
- ✅ Catálogo de productos con filtros por categoría
- ✅ Búsqueda de productos
- ✅ Detalles de producto con galería de imágenes
- ✅ Especificaciones técnicas detalladas
- ✅ Sistema de garantía (15 días)
- ✅ Integración con WhatsApp para consultas

### Servicio Técnico
- ✅ Formulario de solicitud de reparación
- ✅ Contacto directo por WhatsApp
- ✅ Información de ubicación y horarios
- ✅ Garantía de servicio

### Panel de Administración
- ✅ Gestión de productos (CRUD completo)
- ✅ Gestión de categorías
- ✅ Configuración del sitio
- ✅ Panel de desarrollador (logs, exportación de datos)
- ✅ Sistema de permisos por roles

### Optimizaciones
- ✅ Code splitting con React.lazy
- ✅ Responsive design (mobile-first)
- ✅ SEO optimizado (meta tags, Open Graph)
- ✅ Accesibilidad (ARIA labels, semántica HTML5)
- ✅ Performance (Vite, tree-shaking)

---

## 📱 Contacto

- **WhatsApp**: +58 412 397 9581
- **Email**: dev@tecnostore.com
- **Ubicación**: Santa Lucía del Tuy, Miranda, Venezuela

---

## 📄 Licencia

Este proyecto es propiedad de ALEJ_TECH. Todos los derechos reservados.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ por ALEJ_TECH para ofrecer el mejor servicio técnico y productos de calidad en los Valles del Tuy.

---

**Última actualización**: Abril 2026
