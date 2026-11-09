import { Banner, Button, Card, Heading, Stack, Text } from '@orvella/ui'
import { appointments, messages } from '../data'

export function Home() {
  const next = appointments[0]!
  const unread = messages.filter((m) => m.unread).length
  return (
    <Stack gap="spacious">
      <Heading level={1}>Good morning, Sam</Heading>
      <Banner title="Flu vaccination season">Book a slot at your clinic before the end of November.</Banner>
      <Stack direction="horizontal" gap="normal">
        <Card elevation="raised">
          <Card.Header>
            <Heading level={2}>Next appointment</Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap="condensed">
              <Text>{next.with}</Text>
              <Text tone="muted">{next.when} · {next.place}</Text>
              <Button variant="primary" onClick={() => (window.location.hash = 'appointments')}>See details</Button>
            </Stack>
          </Card.Body>
        </Card>
        <Card elevation="raised">
          <Card.Header>
            <Heading level={2}>Messages</Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap="condensed">
              <Text>{unread} unread</Text>
              <Button onClick={() => (window.location.hash = 'messages')}>Open inbox</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    </Stack>
  )
}
