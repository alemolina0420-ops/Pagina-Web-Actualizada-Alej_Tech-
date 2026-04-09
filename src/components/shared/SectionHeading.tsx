/**
 * SectionHeading.tsx
 * 
 * Componente reutilizable de encabezado de sección.
 * Garantiza consistencia tipográfica y semántica HTML.
 */

interface SectionHeadingProps {
  /** Título principal */
  title: React.ReactNode;
  /** Subtítulo opcional */
  subtitle?: string;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  /** Alineación */
  align?: 'center' | 'left';
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} mb-12 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-400 ${align === 'center' ? 'max-w-2xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
