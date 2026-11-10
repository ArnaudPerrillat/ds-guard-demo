import type { ReactNode } from 'react'
import { Avatar, Link, Stack, Text } from '@orvella/ui'
import type { PageId } from '../App'

const nav: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'prescriptions', label: 'Prescriptions' },
  { id: 'messages', label: 'Messages' },
  { id: 'billing', label: 'Billing' },
  { id: 'profile', label: 'Profile' },
]

export function Layout({ current, children }: { current: PageId; children: ReactNode }) {
  return (
    <div className="app">
      <header className="app__header">
        <Text as="span" className="app__brand">Orvella</Text>
        <Stack direction="horizontal" gap="condensed" align="center">
          <Text as="span" tone="muted">Sam Taylor</Text>
          <Avatar src="./avatar.svg" alt="Your profile picture" size="small" />
        </Stack>
      </header>
      <nav className="app__nav" aria-label="Main">
        {nav.map((n) => (
          <Link key={n.id} href={`#${n.id}`} tone={n.id === current ? 'accent' : 'muted'}>{n.label}</Link>
        ))}
      </nav>
      <main className="app__main">{children}</main>
    </div>
  )
}
