import { Badge, Button, Card, Heading, Stack, Text } from '@orvella/ui'
import { appointments } from '../data'

export function Appointments() {
  return (
    <Stack gap="normal">
      <Heading level={1}>Appointments</Heading>
      {appointments.map((a) => (
        <Card key={a.id}>
          <Card.Header>
            <Heading level={2}>{a.with}</Heading>
            <Badge tone={a.status === 'confirmed' ? 'success' : 'attention'}>{a.status === 'confirmed' ? 'Confirmed' : 'Pending'}</Badge>
          </Card.Header>
          <Card.Body>
            <Stack gap="condensed">
              <Text tone="muted">{a.when} · {a.place}</Text>
              <Stack direction="horizontal" gap="condensed">
                <Button>Reschedule</Button>
                <Button variant="danger">Cancel</Button>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  )
}
