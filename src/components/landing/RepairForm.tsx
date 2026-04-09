/**
 * RepairForm.tsx
 * 
 * Formulario de solicitud de presupuesto de reparación.
 * Sanitiza inputs antes de construir URL de WhatsApp.
 * Labels con htmlFor, inputs con id (WCAG 2.1).
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductsContext';
import { buildRepairInquiryLink } from '@/utils/whatsapp';

interface RepairFormData {
  model: string;
  fault: string;
  phone: string;
}

export function RepairForm() {
  const { siteConfig } = useProducts();
  const [formData, setFormData] = useState<RepairFormData>({
    model: '',
    fault: '',
    phone: '',
  });

  const handleFieldChange = (field: keyof RepairFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildRepairInquiryLink(
      formData.model,
      formData.fault,
      formData.phone,
      siteConfig.whatsappNumber,
    );
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative" aria-labelledby="repair-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

          <div className="text-center mb-10 relative z-10">
            <h2 id="repair-title" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Tu equipo falla? <span className="text-emerald-400">Servicio y Reparaciones</span>
            </h2>
            <p className="text-slate-400">
              Soluciones rápidas y con garantía. Describe tu problema detalladamente para poder ofrecerte un presupuesto de reparación por WhatsApp.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10 max-w-2xl mx-auto"
            aria-label="Formulario de solicitud de presupuesto de reparación"
          >
            <div>
              <label htmlFor="repair-model" className="block text-sm font-medium text-slate-300 mb-2">
                1. Modelo exacto del equipo <span className="text-amber-500" aria-label="campo obligatorio">*</span>
              </label>
              <input
                id="repair-model"
                required
                type="text"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Ej: iPhone 13 Pro, Xiaomi Poco X3..."
                value={formData.model}
                onChange={(e) => handleFieldChange('model', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="repair-fault" className="block text-sm font-medium text-slate-300 mb-2">
                2. Descripción de la falla <span className="text-amber-500" aria-label="campo obligatorio">*</span>
              </label>
              <textarea
                id="repair-fault"
                required
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                placeholder="Ej: No carga, se apaga solo, la pantalla está rota..."
                value={formData.fault}
                onChange={(e) => handleFieldChange('fault', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="repair-phone" className="block text-sm font-medium text-slate-300 mb-2">
                3. Teléfono de contacto <span className="text-amber-500" aria-label="campo obligatorio">*</span>
              </label>
              <input
                id="repair-phone"
                required
                type="tel"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Ej: 0412-1234567"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                autoComplete="tel"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 text-lg rounded-xl shadow-lg shadow-emerald-900/20"
              aria-label="Enviar solicitud de presupuesto técnico por WhatsApp"
            >
              Solicitar Presupuesto Técnico
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
