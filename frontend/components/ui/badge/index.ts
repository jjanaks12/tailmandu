import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] duration-150',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary',
        secondary:
          'border-transparent bg-secondary/10 text-secondary',
        destructive:
          'border-transparent bg-destructive/10 text-destructive',
        success:
          'border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
        info:
          'border-transparent bg-blue-500/10 text-blue-700 dark:text-blue-400',
        outline:
          'border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
