interface SkillCardProps {
  title: string;
}

function SkillCard({ title }: SkillCardProps) {
  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 font-mono text-sm font-semibold text-cyan-700 transition group-hover:bg-cyan-100">
        {title.slice(0, 2).toUpperCase()}
      </div>

      <div>
        <p className="font-mono text-xs text-cyan-700">
          Technology
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-950">
          {title}
        </h3>
      </div>
    </article>
  );
}

export default SkillCard;