import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Appointments } from './pages/Appointments'
import { Prescriptions } from './pages/Prescriptions'
import { Messages } from './pages/Messages'
import { Profile } from './pages/Profile'
import { Billing } from './legacy/billing/Billing'

const pages = { home: Home, appointments: Appointments, prescriptions: Prescriptions, messages: Messages, billing: Billing, profile: Profile }
export type PageId = keyof typeof pages

const current = (): PageId => {
  const id = window.location.hash.slice(1)
  return id in pages ? (id as PageId) : 'home'
}

export function App() {
  const [page, setPage] = useState<PageId>(current)
  useEffect(() => {
    const onHash = () => setPage(current())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const Page = pages[page]
  return (
    <Layout current={page}>
      <Page />
    </Layout>
  )
}
