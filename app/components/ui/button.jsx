import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// 1. Varyantları düz bir nesne olarak tanımlıyoruz
const variants = {
  variant: {
    default: "bg-primary text-primary-foreground border border-primary-border",
    destructive: "bg-destructive text-destructive-foreground border border-destructive-border",
    outline: "border [border-color:var(--button-outline)] shadow-xs active:shadow-none",
    secondary: "border bg-secondary text-secondary-foreground border border-secondary-border",
    ghost: "border border-transparent",
  },
  size: {
    default: "min-h-9 px-4 py-2",
    sm: "min-h-8 rounded-md px-3 text-xs",
    lg: "min-h-10 rounded-md px-8",
    icon: "h-9 w-9",
  },
};

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // 2. Temel sınıfları bir değişkene alıyoruz
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2";

    // 3. Seçilen varyant ve boyuta göre sınıfları çekiyoruz
    const variantStyles = variants.variant[variant] || variants.variant.default;
    const sizeStyles = variants.size[size] || variants.size.default;

    // 4. Tüm sınıfları temiz bir şekilde birleştiriyoruz
    // (Filtreleme işlemi undefined veya null değerlerin class listesine eklenmesini önler)
    const combinedClasses = [
      baseStyles,
      variantStyles,
      sizeStyles,
      className
    ].filter(Boolean).join(" ");

    return (
      <Comp
        className={combinedClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };