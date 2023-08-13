import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/tailwindcss'
import { VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-slate-800 text-white hover:bg-slate-600 disabled:bg-slate-400',
        outline: 'bg-transparent border border-slate-500 hover:bg-slate-100',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
  props?: unknown
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
