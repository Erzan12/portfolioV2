import Link from "next/link";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "primary"
  | "secondary"
  | "ghost"
  | "link";

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
};

export default function HeroButton({
  children,
  href,
  variant = "primary",
  external = false,
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-lg font-medium transition inline-block";

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    primary:
      "bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
    secondary:
      "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900",
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}