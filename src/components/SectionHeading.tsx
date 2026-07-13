interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
}

function SectionHeading({
  subtitle,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
        {subtitle}
      </p>

      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;