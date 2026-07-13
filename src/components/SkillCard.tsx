interface SkillCardProps {
  title: string;
}

function SkillCard({ title }: SkillCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>
    </div>
  );
}

export default SkillCard;