import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "small";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}

function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  external = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-semibold shadow-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-700 hover:shadow-md",
  };

  const sizeClasses = {
    default: "px-6 py-3 text-sm",
    small: "px-4 py-2 text-sm",
  };

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
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