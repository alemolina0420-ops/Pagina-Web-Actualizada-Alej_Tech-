# ✅ CHECKLIST DE PRE-DEPLOY - ALEJ_TECH | TecnoStore

Este checklist debe completarse **ANTES** de desplegar a producción en Vercel.

---

## 📋 FASE 1: VERIFICACIÓN DE CÓDIGO

### Build y Compilación
- [ ] `npm run build` ejecuta sin errores
- [ ] No hay errores de TypeScript
- [ ] No hay warnings críticos de ESLint
- [ ] El bundle size es aceptable (< 700 KB)

### Seguridad
- [ ] No hay contraseñas hardcodeadas en el código
- [ ] No hay API keys expuestas
- [ ] Archivo `.env` está en `.gitignore`
- [ ] Variables de entorno están documentadas en `.env.example`
- [ ] Headers de seguridad configurados en `vercel.json`

### Funcionalidad Core
- [ ] Sistema de autenticación funciona (login/registro)
- [ ] Rate limiting activo en login
- [ ] Validación de contraseñas implementada
- [ ] Rutas protegidas funcionan correctamente
- [ ] Sanitización XSS activa en formularios admin

---

## 📋 FASE 2: CONTENIDO Y ASSETS

### Imágenes
- [ ] Todas las imágenes referenciadas existen en `/public`
- [ ] Imagen Open Graph presente (`/mesa-tecnica.jpg` o alternativa)
- [ ] Imágenes optimizadas (< 500 KB cada una)
- [ ] Favicon configurado

### Textos y Contenido
- [ ] Todos los textos están en español
- [ ] No hay "Lorem ipsum" o placeholders
- [ ] Información de contacto actualizada
- [ ] Precios de productos actualizados

### SEO
- [ ] `robots.txt` presente y configurado
- [ ] `sitemap.xml` presente y actualizado
- [ ] Meta tags en todas las páginas
- [ ] Open Graph configurado
- [ ] Canonical URLs correctas

---

## 📋 FASE 3: EXPERIENCIA DE USUARIO

### Diseño y Responsividad
- [ ] Se ve bien en desktop (1920x1080)
- [ ] Se ve bien en tablet (768x1024)
- [ ] Se ve bien en móvil (375x667)
- [ ] Navegación funciona en todos los dispositivos
- [ ] Botones flotantes (WhatsApp, Urgente) funcionan

### Navegación
- [ ] Todos los enlaces funcionan
- [ ] No hay enlaces rotos (404)
- [ ] Breadcrumbs funcionan (si aplica)
- [ ] Menú hamburger funciona en móvil

### Formularios
- [ ] Formulario de registro funciona
- [ ] Formulario de login funciona
- [ ] Validaciones de formularios activas
- [ ] Mensajes de error claros

### Performance
- [ ] Tiempo de carga inicial < 3 segundos
- [ ] Imágenes con lazy loading
- [ ] No hay bloqueos de renderizado

---

## 📋 FASE 4: LEGAL Y CUMPLIMIENTO

### Documentos Legales
- [ ] Política de Privacidad publicada (`/privacidad`)
- [ ] Términos y Condiciones publicados (`/terminos`)
- [ ] Enlaces legales en el Footer
- [ ] Fechas de actualización correctas

### Datos de Usuario
- [ ] Sistema de cuentas funcional
- [ ] Contraseñas cifradas con bcrypt
- [ ] Sesiones con expiración (24h)
- [ ] LocalStorage con cifrado opcional

---

## 📋 FASE 5: CONFIGURACIÓN DE VERCEL

### Variables de Entorno
- [ ] `VITE_WHATSAPP_NUMBER` configurada
- [ ] `VITE_SITE_URL` configurada con dominio real
- [ ] Variables verificadas en dashboard de Vercel

### Dominio
- [ ] Dominio personalizado conectado (si aplica)
- [ ] SSL/HTTPS activo
- [ ] Redirects configurados en `vercel.json`
- [ ] Rewrites para SPA configurados

### Headers de Seguridad
- [ ] Content-Security-Policy activo
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security (HSTS)
- [ ] Referrer-Policy configurado

---

## 📋 FASE 6: TESTING FINAL

### Funcionalidad
- [ ] Crear cuenta nueva funciona
- [ ] Login con cuenta creada funciona
- [ ] Logout funciona
- [ ] Navegación entre secciones funciona
- [ ] Botones de WhatsApp abren correctamente
- [ ] Formularios envían datos correctamente

### Seguridad
- [ ] Intentar acceder a `/admin` sin login redirige
- [ ] Rate limiting bloquea después de 5 intentos
- [ ] Sesión expira después de 24 horas
- [ ] XSS no funciona en formularios

### SEO
- [ ] Google puede indexar el sitio
- [ ] Meta tags aparecen en previews de redes sociales
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`

---

## 📋 FASE 7: MONITOREO POST-DEPLOY

### Inmediatamente Después del Deploy
- [ ] Sitio carga correctamente en producción
- [ ] No hay errores en la consola del navegador
- [ ] Todas las rutas funcionan
- [ ] Assets se cargan correctamente

### Primeras 24 Horas
- [ ] Monitorear errores en Vercel Dashboard
- [ ] Verificar tiempos de carga (Analytics)
- [ ] Revisar logs de errores
- [ ] Probar en diferentes navegadores

### Primera Semana
- [ ] Verificar que usuarios puedan registrarse
- [ ] Monitorear consultas por WhatsApp
- [ ] Revisar feedback de usuarios
- [ ] Ajustar según necesidad

---

## 🚨 BLOQUEADORES CRÍTICOS

**NO DESPLEGAR SI:**
- ❌ El build falla
- ❌ Hay contraseñas hardcodeadas
- ❌ Faltan documentos legales
- ❌ Variables de entorno no configuradas
- ❌ Headers de seguridad no configurados

---

## ✅ APROBACIÓN FINAL

- [ ] Todos los checkboxes anteriores están marcados
- [ ] He probado el sitio en al menos 3 navegadores diferentes
- [ ] He probado el sitio en móvil y desktop
- [ ] He revisado los documentos legales
- [ ] Estoy listo para desplegar

**Fecha de verificación:** _______________

**Verificado por:** _______________

**Notas adicionales:**
```
[Espacio para notas]
```

---

## 📞 CONTACTO DE EMERGENCIA

Si algo falla después del deploy:

1. **Revertir deploy:** Ir a Vercel Dashboard → Deployments → Rollback
2. **Revisar logs:** Vercel Dashboard → Logs
3. **Contactar soporte:** Si es problema de Vercel

---

**¡Éxito en tu lanzamiento! 🚀**
