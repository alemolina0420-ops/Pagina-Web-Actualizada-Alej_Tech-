/**
 * PresupuestoPage.tsx
 *
 * Formulario expandido de solicitud de presupuesto técnico.
 * Evolución del RepairForm — ahora con más campos y categorías.
 * Vive exclusivamente en /servicios/presupuesto.
 * Envía la solicitud por WhatsApp.
 */

import { useState } from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/shared/SeoHead';
import { buildWhatsAppLink } from '@/utils/whatsapp';
import { getWhatsAppNumber } from '@/config/site.config';

/** Categorías de servicio */
const SERVICE_CATEGORIES = [
  { id: 'pantalla', label: 'Pantalla / Display' },
  { id: 'bateria', label: 'Cambio de Batería' },
  { id: 'puerto', label: 'Puerto de Carga' },
  { id: 'software', label: 'Software / Sistema' },
  { id: 'camara', label: 'Cámara' },
  { id: 'audio', label: 'Audio / Altavoz' },
  { id: 'otro', label: 'Otro problema' },
];

interface BudgetFormData {
  name: string;
  phone: string;
  deviceBrand: string;
  deviceModel: string;
  serviceCategory: string;
  faultDescription: string;
}

export function PresupuestoPage() {
  const [formData, setFormData] = useState<BudgetFormData>({
    name: '',
    phone: '',
    deviceBrand: '',
    deviceModel: '',
    serviceCategory: '',
    faultDescription: '',
  });

  const handleChange = (field: keyof BudgetFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabel = SERVICE_CATEGORIES.find((c) => c.id === formData.serviceCategory)?.label || formData.serviceCategory;

    const message = [
      `🔧 *SOLICITUD DE PRESUPUESTO TÉCNICO*`,
      ``,
      `👤 *Nombre:* ${formData.name}`,
      `📱 *Teléfono:* ${formData.phone}`,
      ``,
      `📱 *Dispositivo:* ${formData.deviceBrand} ${formData.deviceModel}`,
      `🔩 *Tipo de servicio:* ${categoryLabel}`,
      ``,
      `📝 *Descripción de la falla:*`,
      formData.faultDescription,
      ``,
      `_Solicitud enviada desde la web ALEJ_TECH_`,
    ].join('\n');

    const url = buildWhatsAppLink(message, getWhatsAppNumber());
    window.open(url, '_blank');
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.deviceBrand.trim() &&
    formData.deviceModel.trim() &&
    formData.serviceCategory &&
    formData.faultDescription.trim();

  return (
    <>
      <SeoHead
        title="Solicitar Presupuesto de Reparación"
        description="Solicita un presupuesto gratuito para la reparación de tu dispositivo móvil. Diagnóstico profesional en Santa Lucía del Tuy, Valles del Tuy. Respuesta rápida por WhatsApp."
        canonicalPath="/servicios/presupuesto"
      />

      <div className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-6">
              <FileText className="w-8 h-8 text-purple-400" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Solicitar <span className="text-purple-400">Presupuesto</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Completa el formulario y recibirás un presupuesto detallado por WhatsApp.
              Diagnóstico de fallas sin compromiso.
            </p>
          </header>

          {/* Form Card */}
          <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />

            <form
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
              aria-label="Formulario de solicitud de presupuesto técnico"
            >
              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget-name" className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                  </label>
                  <input
                    id="budget-name"
                    required
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="budget-phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Teléfono <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                  </label>
                  <input
                    id="budget-phone"
                    required
                    type="tel"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                    placeholder="0412-1234567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Device Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget-brand" className="block text-sm font-medium text-slate-300 mb-2">
                    Marca del dispositivo <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                  </label>
                  <input
                    id="budget-brand"
                    required
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                    placeholder="Ej: Samsung, iPhone, Xiaomi..."
                    value={formData.deviceBrand}
                    onChange={(e) => handleChange('deviceBrand', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="budget-model" className="block text-sm font-medium text-slate-300 mb-2">
                    Modelo exacto <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                  </label>
                  <input
                    id="budget-model"
                    required
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                    placeholder="Ej: Galaxy S24, iPhone 15 Pro..."
                    value={formData.deviceModel}
                    onChange={(e) => handleChange('deviceModel', e.target.value)}
                  />
                </div>
              </div>

              {/* Service Category */}
              <div>
                <label htmlFor="budget-category" className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo de servicio <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                </label>
                <select
                  id="budget-category"
                  required
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                  value={formData.serviceCategory}
                  onChange={(e) => handleChange('serviceCategory', e.target.value)}
                >
                  <option value="" disabled className="text-slate-600">
                    Selecciona el tipo de servicio...
                  </option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fault Description */}
              <div>
                <label htmlFor="budget-fault" className="block text-sm font-medium text-slate-300 mb-2">
                  Descripción de la falla <span className="text-amber-500" aria-label="campo obligatorio">*</span>
                </label>
                <textarea
                  id="budget-fault"
                  required
                  rows={4}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none placeholder:text-slate-600"
                  placeholder="Describe el problema con el mayor detalle posible: ¿Qué sucede? ¿Cuándo comenzó? ¿Se cayó o mojó el equipo?"
                  value={formData.faultDescription}
                  onChange={(e) => handleChange('faultDescription', e.target.value)}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 disabled:opacity-40 disabled:cursor-not-allowed text-white py-6 text-lg rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-300"
                aria-label="Enviar solicitud de presupuesto técnico por WhatsApp"
              >
                <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                Enviar Solicitud por WhatsApp
              </Button>

              <p className="text-center text-xs text-slate-600">
                Al enviar, se abrirá WhatsApp con tu solicitud pre-llenada. No almacenamos datos personales.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
