/**
 * TrustFeatures.tsx
 * 
 * Sección "¿Por qué comprar con un técnico especializado?"
 * Principio: datos como constantes fuera del componente.
 */

import { Cpu, Shield, Thermometer, type LucideIcon } from 'lucide-react';

interface TrustFeature {
  icon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
  colorClass: {
    iconBg: string;
    iconText: string;
    badgeBg: string;
    badgeText: string;
  };
}

const TRUST_FEATURES: TrustFeature[] = [
  {
    icon: Cpu,
    title: 'Productos Testeados',
    highlight: 'Control de Calidad',
    description:
      'Cada accesorio es probado personalmente por nuestro taller técnico para garantizar su correcto funcionamiento antes de llegar a tus manos.',
    colorClass: {
      iconBg: 'bg-amber-500/10',
      iconText: 'text-amber-400',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-400',
    },
  },
  {
    icon: Shield,
    title: 'Garantía Real',
    highlight: 'Respaldo Técnico',
    description:
      'Ofrecemos garantía de 15 días en todos nuestros accesorios. Un respaldo gestionado directamente por nuestro taller para tu total tranquilidad.',
    colorClass: {
      iconBg: 'bg-emerald-500/10',
      iconText: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-400',
    },
  },
  {
    icon: Thermometer,
    title: 'Compra Segura',
    highlight: 'Asesoría Profesional',
    description:
      'No gastes dinero en accesorios incompatibles o de dudosa procedencia. Te asesoramos técnicamente para que adquieras exactamente lo que tu dispositivo necesita.',
    colorClass: {
      iconBg: 'bg-blue-500/10',
      iconText: 'text-blue-400',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-400',
    },
  },
];

export function TrustFeatures() {
  return (
    <section className="py-24 bg-slate-950" aria-labelledby="trust-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="trust-title" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Por qué comprar con un <span className="text-blue-400">técnico especializado</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            No es marketing. Cada producto es validado antes de ofrecerlo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TRUST_FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 card-hover"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.colorClass.iconBg}`}>
                <feature.icon className={`w-7 h-7 ${feature.colorClass.iconText}`} aria-hidden="true" />
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${feature.colorClass.badgeBg} ${feature.colorClass.badgeText}`}>
                {feature.highlight}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
