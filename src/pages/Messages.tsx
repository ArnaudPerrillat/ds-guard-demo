import { Badge, Card, Heading, Link, Stack, Text } from '@orvella/ui'
import { messages } from '../data'

export function Messages() {
  return (
    <Stack gap="normal">
      <Heading level={1}>Messages</Heading>
      <Card>
        <Card.Body>
          <Stack gap="normal">
            {messages.map((m) => (
              <Stack key={m.id} direction="horizontal" gap="condensed" align="center">
                {m.unread && <Badge tone="critical">New</Badge>}
                <Link href={`#messages/${m.id}`}>{m.subject}</Link>
                <Text as="span" tone="muted">{m.from} · {m.received}</Text>
              </Stack>
            ))}
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  )
}
