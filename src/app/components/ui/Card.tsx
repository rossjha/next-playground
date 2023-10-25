import { cn } from '@/app/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
  props?: unknown
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('Card group rounded bg-white p-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
