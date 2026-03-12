"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-display font-bold transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95 group relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
        secondary: "bg-zinc-900 text-white border border-white/10 hover:border-white/20 hover:bg-zinc-800",
        outline: "bg-transparent border border-white/10 text-white hover:border-white/30 hover:bg-white/5",
        ghost: "bg-transparent text-zinc-500 hover:text-white hover:bg-white/5",
        link: "text-white underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-9 px-4 rounded-lg text-xs",
        lg: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, ...props }, ref) => {
    const internalRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);

    React.useEffect(() => {
      if (!magnetic || !internalRef.current) return;

      const btn = internalRef.current;
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);
      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }, [magnetic]);

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={internalRef}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
