import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
}

function Button({
  children,
  href,
  variant = "primary",
  external = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition";

  const variantClasses = {
    primary:
      "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-600",
  };

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...(external
        ? {
            target: "_blank",
            rel: "noreferrer",
          }
        : {})}
    >
      {children}
    </a>
  );
}

export default Button;