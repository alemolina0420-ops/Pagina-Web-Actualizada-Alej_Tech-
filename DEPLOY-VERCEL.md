# 🚀 GUÍA DE DESPLIEGUE EN VERCEL

Esta guía te llevará paso a paso para desplegar ALEJ_TECH | TecnoStore en Vercel con dominio personalizado.

---

## 📋 REQUISITOS PREVIOS

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta de GitHub (gratuita)
- ✅ Cuenta de Vercel (gratuita) - [vercel.com](https://vercel.com)
- ✅ Dominio personalizado (opcional pero recomendado)
- ✅ Código del proyecto listo y probado localmente
- ✅ Checklist de pre-deploy completado

---

## 🔧 PASO 1: PREPARAR EL REPOSITORIO EN GITHUB

### 1.1. Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"New"** (verde) para crear un nuevo repositorio
3. Configura el repositorio:
   - **Repository name:** `tecnostore` (o el nombre que prefieras)
   - **Description:** "ALEJ_TECH | TecnoStore - Tienda y Servicio Técnico"
   - **Visibility:** Private (recomendado) o Public
   - **NO** marques "Initialize this repository with a README"
4. Haz clic en **"Create repository"**

### 1.2. Subir el Código a GitHub

Abre una terminal en la carpeta `app` de tu proyecto y ejecuta:

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - ALEJ_TECH TecnoStore"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/tecnostore.git

# Subir el código
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANTE:** Verifica que el archivo `.env` NO se haya subido (debe estar en `.gitignore`).

---

## 🌐 PASO 2: CONECTAR VERCEL CON GITHUB

### 2.1. Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel para acceder a tu cuenta de GitHub

### 2.2. Importar el Proyecto

1. En el dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**
2. Busca tu repositorio `tecnostore` en la lista
3. Haz clic en **"Import"**

### 2.3. Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica la configuración:

- **Framework Preset:** Vite
- **Root Directory:** `./` (raíz del proyecto)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**NO hagas clic en "Deploy" todavía.** Primero configuraremos las variables de entorno.

---

## 🔐 PASO 3: CONFIGURAR VARIABLES DE ENTORNO

### 3.1. Agregar Variables en Vercel

1. En la página de configuración del proyecto, busca la sección **"Environment Variables"**
2. Agrega las siguientes variables:

#### Variable 1: VITE_WHATSAPP_NUMBER
- **Key:** `VITE_WHATSAPP_NUMBER`
- **Value:** `584123979581` (tu número de WhatsApp sin +)
- **Environment:** Production, Preview, Development (marca las 3)

#### Variable 2: VITE_SITE_URL
- **Key:** `VITE_SITE_URL`
- **Value:** `https://tu-dominio.com` (o `https://tecnostore.vercel.app` si no tienes dominio)
- **Environment:** Production, Preview, Development (marca las 3)

3. Haz clic en **"Add"** para cada variable

### 3.2. Verificar Variables

Asegúrate de que ambas variables estén listadas correctamente antes de continuar.

---

## 🚀 PASO 4: DESPLEGAR EL PROYECTO

### 4.1. Primer Deploy

1. Haz clic en el botón **"Deploy"**
2. Vercel comenzará a:
   - Clonar tu repositorio
   - Instalar dependencias (`npm install`)
   - Compilar el proyecto (`npm run build`)
   - Desplegar a producción

3. Espera 2-3 minutos (primera vez puede tardar más)

### 4.2. Verificar el Deploy

Una vez completado, verás:
- ✅ **Status:** Ready
- 🌐 **URL:** `https://tecnostore-xxx.vercel.app`

Haz clic en **"Visit"** para ver tu sitio en vivo.

---

## 🌍 PASO 5: CONFIGURAR DOMINIO PERSONALIZADO (OPCIONAL)

Si tienes un dominio propio (ej: `tecnostore.com`), sigue estos pasos:

### 5.1. Agregar Dominio en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en **"Settings"** → **"Domains"**
3. Ingresa tu dominio (ej: `tecnostore.com`)
4. Haz clic en **"Add"**

### 5.2. Configurar DNS

Vercel te mostrará los registros DNS que debes agregar. Hay dos opciones:

#### Opción A: Nameservers (Recomendado)
Si puedes cambiar los nameservers de tu dominio:
1. Ve al panel de tu proveedor de dominio (GoDaddy, Namecheap, etc.)
2. Cambia los nameservers a los que Vercel te indica
3. Espera 24-48 horas para propagación

#### Opción B: Registros A y CNAME
Si no puedes cambiar nameservers:
1. Agrega un registro **A** apuntando a la IP de Vercel
2. Agrega un registro **CNAME** para `www` apuntando a `cname.vercel-dns.com`
3. Espera 1-2 horas para propagación

### 5.3. Verificar Dominio

1. Espera a que Vercel verifique el dominio (puede tardar hasta 48h)
2. Una vez verificado, verás un ✅ verde junto al dominio
3. SSL se configurará automáticamente

### 5.4. Actualizar Variable de Entorno

1. Ve a **"Settings"** → **"Environment Variables"**
2. Edita `VITE_SITE_URL`
3. Cambia el valor a tu dominio real: `https://tecnostore.com`
4. Guarda los cambios
5. Ve a **"Deployments"** y haz clic en **"Redeploy"** para aplicar cambios

---

## ✅ PASO 6: VERIFICACIÓN POST-DEPLOY

### 6.1. Checklist de Verificación

Visita tu sitio y verifica:

- [ ] El sitio carga correctamente
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Todas las imágenes se cargan
- [ ] Los botones de WhatsApp funcionan
- [ ] Puedes crear una cuenta
- [ ] Puedes hacer login
- [ ] Las rutas funcionan (tienda, servicios, admin)
- [ ] Los documentos legales son accesibles

### 6.2. Probar en Diferentes Dispositivos

- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Móvil (iOS Safari, Android Chrome)
- [ ] Tablet

### 6.3. Verificar SEO

- [ ] Visita `https://tu-dominio.com/robots.txt`
- [ ] Visita `https://tu-dominio.com/sitemap.xml`
- [ ] Comparte el link en WhatsApp y verifica que aparezca la preview

---

## 🔄 PASO 7: ACTUALIZACIONES FUTURAS

### 7.1. Despliegue Automático

Vercel está configurado para desplegar automáticamente cada vez que hagas push a GitHub:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente en 2-3 minutos
```

### 7.2. Rollback (Revertir Deploy)

Si algo sale mal:

1. Ve a Vercel Dashboard → **"Deployments"**
2. Encuentra el deploy anterior que funcionaba
3. Haz clic en los 3 puntos → **"Promote to Production"**

### 7.3. Ver Logs de Errores

Si hay errores:

1. Ve a Vercel Dashboard → **"Logs"**
2. Filtra por **"Errors"**
3. Revisa los mensajes de error

---

## 🛠️ TROUBLESHOOTING (SOLUCIÓN DE PROBLEMAS)

### Problema: Build Falla

**Síntoma:** El deploy falla con error de compilación

**Solución:**
1. Verifica que `npm run build` funcione localmente
2. Revisa los logs de Vercel para ver el error específico
3. Asegúrate de que todas las dependencias estén en `package.json`

### Problema: Variables de Entorno No Funcionan

**Síntoma:** El número de WhatsApp no aparece o es incorrecto

**Solución:**
1. Ve a **Settings** → **Environment Variables**
2. Verifica que las variables tengan el prefijo `VITE_`
3. Asegúrate de que estén marcadas para "Production"
4. Haz un **Redeploy** después de cambiar variables

### Problema: Rutas 404

**Síntoma:** Al recargar una página interna aparece 404

**Solución:**
1. Verifica que `vercel.json` esté en la raíz del proyecto
2. Asegúrate de que tenga la configuración de rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Problema: Imágenes No Cargan

**Síntoma:** Las imágenes aparecen rotas

**Solución:**
1. Verifica que las imágenes estén en la carpeta `public/`
2. Asegúrate de que las rutas empiecen con `/` (ej: `/cargador-hero.jpg`)
3. Verifica que los nombres de archivo coincidan exactamente (case-sensitive)

### Problema: Dominio No Verifica

**Síntoma:** El dominio personalizado no se verifica después de 48h

**Solución:**
1. Usa una herramienta como [whatsmydns.net](https://www.whatsmydns.net) para verificar propagación DNS
2. Asegúrate de haber configurado los registros correctamente
3. Contacta al soporte de tu proveedor de dominio
4. Contacta al soporte de Vercel si persiste

---

## 📊 MONITOREO Y ANALYTICS

### Vercel Analytics (Opcional)

1. Ve a tu proyecto en Vercel
2. Haz clic en **"Analytics"** en el menú lateral
3. Habilita **"Web Analytics"** (gratis para proyectos hobby)
4. Verás métricas de:
   - Visitantes únicos
   - Page views
   - Tiempos de carga
   - Core Web Vitals

### Google Search Console (Recomendado)

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu sitio
3. Verifica la propiedad
4. Envía tu sitemap: `https://tu-dominio.com/sitemap.xml`

---

## 🎉 ¡FELICIDADES!

Tu sitio está ahora en producción y accesible para todo el mundo.

### Próximos Pasos Recomendados:

1. **Promoción:**
   - Comparte el link en redes sociales
   - Agrega el link a tu perfil de WhatsApp Business
   - Imprime tarjetas con el dominio

2. **Mantenimiento:**
   - Revisa los logs semanalmente
   - Actualiza productos regularmente
   - Responde consultas de WhatsApp rápidamente

3. **Mejoras Futuras:**
   - Agregar más productos
   - Implementar sistema de pagos online
   - Agregar blog o noticias
   - Integrar con redes sociales

---

## 📞 SOPORTE

Si necesitas ayuda:

- **Documentación de Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Soporte de Vercel:** [vercel.com/support](https://vercel.com/support)
- **Comunidad de Vercel:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**¡Éxito con tu negocio! 🚀**

*ALEJ_TECH | TecnoStore*
