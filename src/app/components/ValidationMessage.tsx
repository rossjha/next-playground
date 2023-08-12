import { cn } from '@/utils/tailwindcss'

type ValidationMessageProps = {
  children: React.ReactNode
  className?: string
  props?: unknown
}

export default function ValidationMessage({
  children,
  className,
  ...props
}: ValidationMessageProps) {
  return (
    <div
      className={cn(
        'ValidationMessage group mt-1 text-xs text-red-500',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
