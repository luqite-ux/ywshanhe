import { cva, type VariantProps } from 'class-variance-authority'

export const buttonStyles = cva(
  'group/btn inline-flex items-center justify-center gap-2 rounded-[0.35rem_1.25rem_0.35rem_1.25rem] font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-evergreen text-primary-foreground hover:bg-evergreen-hover',
        outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
        light: 'bg-white text-ink hover:bg-stage',
        outlineLight: 'border border-white/70 text-white hover:bg-white hover:text-ink',
      },
      size: {
        md: 'h-12 px-6 text-[0.95rem]',
        sm: 'h-10 px-4 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonStyleProps = VariantProps<typeof buttonStyles>
