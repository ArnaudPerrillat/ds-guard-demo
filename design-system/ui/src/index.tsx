import type { ReactNode, MouseEventHandler, ChangeEventHandler } from 'react'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

interface BaseProps {
  className?: string
  children?: ReactNode
  id?: string
}

export interface ButtonProps extends BaseProps {
  /** Visual weight. */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  /** @deprecated Use `variant="danger"` instead. */
  destructive?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export function Button({ variant = 'secondary', size = 'medium', destructive, className, children, type = 'button', ...rest }: ButtonProps) {
  const v = destructive ? 'danger' : variant
  return <button type={type} className={cx('orv-button', `orv-button--${v}`, `orv-button--${size}`, className)} {...rest}>{children}</button>
}

export interface IconButtonProps {
  icon: ReactNode
  /** Required: an icon alone has no accessible name. */
  'aria-label': string
  variant?: 'secondary' | 'ghost'
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}
export function IconButton({ icon, variant = 'ghost', className, ...rest }: IconButtonProps) {
  return <button type="button" className={cx('orv-icon-button', `orv-button--${variant}`, className)} {...rest}>{icon}</button>
}

export interface TextProps extends BaseProps {
  as?: 'p' | 'span' | 'label'
  tone?: 'default' | 'muted' | 'critical' | 'success'
  /** @deprecated Typography sizes come from the role: use `Heading`, or `tone` for emphasis. Removed in 3.0. */
  size?: 'small' | 'body' | 'large'
}
export function Text({ as: Tag = 'p', tone = 'default', size = 'body', className, children }: TextProps) {
  return <Tag className={cx('orv-text', `orv-text--${tone}`, `orv-text--${size}`, className)}>{children}</Tag>
}

export interface HeadingProps extends BaseProps {
  level: 1 | 2 | 3
}
export function Heading({ level, className, children }: HeadingProps) {
  const Tag = `h${level}` as const
  return <Tag className={cx('orv-heading', `orv-heading--${level}`, className)}>{children}</Tag>
}

export interface LinkProps extends BaseProps {
  href: string
  tone?: 'accent' | 'muted'
}
export function Link({ href, tone = 'accent', className, children }: LinkProps) {
  return <a href={href} className={cx('orv-link', `orv-link--${tone}`, className)}>{children}</a>
}

export interface TextInputProps {
  label: string
  value?: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'search'
  validation?: 'error' | 'success'
  onChange?: ChangeEventHandler<HTMLInputElement>
  id?: string
}
export function TextInput({ label, validation, id, ...rest }: TextInputProps) {
  const inputId = id ?? `orv-${label.toLowerCase().replace(/\W+/g, '-')}`
  return (
    <div className={cx('orv-field', validation && `orv-field--${validation}`)}>
      <label htmlFor={inputId} className="orv-field__label">{label}</label>
      <input id={inputId} className="orv-field__input" {...rest} />
    </div>
  )
}

export interface CardProps extends BaseProps {
  elevation?: 'flat' | 'raised'
}
function CardRoot({ elevation = 'flat', className, children }: CardProps) {
  return <section className={cx('orv-card', `orv-card--${elevation}`, className)}>{children}</section>
}
function CardHeader({ className, children }: BaseProps) {
  return <header className={cx('orv-card__header', className)}>{children}</header>
}
function CardBody({ className, children }: BaseProps) {
  return <div className={cx('orv-card__body', className)}>{children}</div>
}
export const Card: typeof CardRoot & { Header: typeof CardHeader; Body: typeof CardBody } = Object.assign(CardRoot, { Header: CardHeader, Body: CardBody })

export interface StackProps extends BaseProps {
  gap?: 'none' | 'condensed' | 'normal' | 'spacious'
  direction?: 'vertical' | 'horizontal'
  align?: 'start' | 'center' | 'end'
}
export function Stack({ gap = 'normal', direction = 'vertical', align = 'start', className, children }: StackProps) {
  return <div className={cx('orv-stack', `orv-stack--${direction}`, `orv-stack--gap-${gap}`, `orv-stack--align-${align}`, className)}>{children}</div>
}

export interface BadgeProps extends BaseProps {
  tone?: 'neutral' | 'success' | 'attention' | 'critical'
  /** @deprecated Use `tone` instead. */
  variant?: 'neutral' | 'success' | 'attention' | 'critical'
}
export function Badge({ tone, variant, className, children }: BadgeProps) {
  return <span className={cx('orv-badge', `orv-badge--${tone ?? variant ?? 'neutral'}`, className)}>{children}</span>
}

export interface AvatarProps {
  src: string
  alt: string
  size?: 'small' | 'medium' | 'large'
}
export function Avatar({ src, alt, size = 'medium' }: AvatarProps) {
  return <img src={src} alt={alt} className={cx('orv-avatar', `orv-avatar--${size}`)} />
}

export interface BannerProps extends BaseProps {
  tone?: 'info' | 'attention' | 'critical'
  title: string
}
export function Banner({ tone = 'info', title, className, children }: BannerProps) {
  return (
    <div role={tone === 'critical' ? 'alert' : 'status'} className={cx('orv-banner', `orv-banner--${tone}`, className)}>
      <strong className="orv-banner__title">{title}</strong>
      {children}
    </div>
  )
}
