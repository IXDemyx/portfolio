import {
    FaReact,
    FaVuejs,
    FaAngular,
    FaPython,
    FaJava,
    FaDocker,
    FaGitAlt,
} from "react-icons/fa";

import { SiMysql, SiCplusplus } from "react-icons/si";

import type { IconType } from "react-icons";

interface SkillCardProps {
  title: string;
  description: string;
}

const skillIcons: Record<
  string,
  {
    icon: IconType;
    color: string;
  }
> = {
  React: {
    icon: FaReact,
    color: "text-sky-400",
  },

  "Vue.js": {
    icon: FaVuejs,
    color: "text-green-500",
  },

  Angular: {
    icon: FaAngular,
    color: "text-red-500",
  },

  Python: {
    icon: FaPython,
    color: "text-yellow-500",
  },

  Java: {
    icon: FaJava,
    color: "text-orange-500",
  },

  "C++": {
    icon: SiCplusplus,
    color: "text-blue-500",
  },

  Docker: {
    icon: FaDocker,
    color: "text-sky-500",
  },

  SQL: {
    icon: SiMysql,
    color: "text-cyan-600",
  },

  Git: {
    icon: FaGitAlt,
    color: "text-orange-600",
  },
};

function SkillCard({
  title,
  description,
}: SkillCardProps) {
  const skill = skillIcons[title];

  const Icon = skill?.icon;

  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition group-hover:scale-110">
        {Icon && <Icon className={`text-3xl ${skill.color}`} />}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </article>
  );
}

export default SkillCard;
