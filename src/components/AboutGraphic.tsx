import { FaCode, FaGamepad, FaDumbbell } from "react-icons/fa";

function AboutGraphic() {
  return (
    <div className="relative mx-auto flex min-h-97.5 w-full max-w-md items-center justify-center">
      <div className="absolute h-72 w-72"/>

      <div className="relative">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-1.5 dark:border-(--accent-border) dark:bg-(--bg-secondary)">
          <img
            src="/profile.png"
            alt="Daniel Keller"
            className="h-60 w-52 rounded-[20px] object-cover"
          />
        </div>

        <InfoBadge
          className="-left-20 top-8 animate-float-1"
          icon={<FaCode />}
          label="Clean Code"
        />

        <InfoBadge
          className="-right-20 top-24 animate-float-2"
          icon={<FaGamepad />}
          label="Gaming"
        />

        <InfoBadge
          className="-bottom-6 left-1/2 -translate-x-1/2 animate-float-3"
          icon={<FaDumbbell />}
          label="Fitness"
        />

        <div className="animate-glow absolute -right-5 -top-5 rounded-full border border-emerald-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-emerald-700 shadow-md dark:border-emerald-800 dark:bg-(--bg-secondary) dark:text-emerald-400">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Open to Work
        </div>
      </div>
    </div>
  );
}

interface InfoBadgeProps {
  className: string;
  icon: React.ReactNode;
  label: string;
}

function InfoBadge({ className, icon, label }: InfoBadgeProps) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-md backdrop-blur dark:border-slate-700 dark:bg-(--bg-secondary)/90 ${className}`}
    >
      <span className="text-(--accent)">{icon}</span>

      <span className="whitespace-nowrap font-mono text-xs text-slate-700 dark:text-slate-300">
        {label}
      </span>
    </div>
  );
}

export default AboutGraphic;
