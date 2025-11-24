/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsxm } from '@zolplay/utils'
import Link from 'next/link'

const variantStyles = {
  primary:
    'bg-zinc-800 font-medium text-zinc-100 hover:bg-zinc-700 hover:shadow-lg hover:-translate-y-0.5 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300/70 transition-all duration-300',
  secondary:
    'group rounded-full bg-white/80 text-zinc-800 shadow-ceramic hover:shadow-ceramic-hover hover:-translate-y-0.5 backdrop-blur transition-all duration-300 dark:bg-zinc-800/80 dark:text-zinc-200 dark:shadow-none dark:hover:bg-zinc-700',
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}
type NativeLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type SharedProps = {
  variant?: keyof typeof variantStyles
  className?: string
}
type ButtonProps = SharedProps & (NativeButtonProps | NativeLinkProps)
export function Button({
  variant = 'primary',
  className,
  href,
  ...props
}: ButtonProps) {
  const cn = clsxm(
    'inline-flex items-center gap-2 justify-center rounded-full py-2 px-4 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={cn} {...(props as any)} />
  ) : (
    <button className={cn} {...(props as any)} />
  )
}
