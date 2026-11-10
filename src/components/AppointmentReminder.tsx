import { useState } from 'react'
import { Badge, Button, Stack, Text } from '@orvella/ui'

/** Reminder shown on the home page the day before an appointment. */
export function AppointmentReminder({ what, when }: { what: string; when: string }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div style={{ background: '#e8eafd', padding: 16, borderRadius: 8, borderLeft: '4px solid #3b45c4' }}>
      <Stack gap="small">
        <Badge tone="warning">Tomorrow</Badge>
        <Text>{what}, {when}</Text>
        <Stack direction="horizontal" gap="small">
          <button className="reminder__confirm" onClick={() => setDismissed(true)}>I'll be there</button>
          <Button destructive onClick={() => (window.location.hash = 'appointments')}>Cancel appointment</Button>
        </Stack>
      </Stack>
    </div>
  )
}
