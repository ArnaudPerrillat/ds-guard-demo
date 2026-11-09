import { Badge, Card, Heading, Link, Stack, Text } from '@orvella/ui'
import { messages } from '../data'

export function Messages() {
  return (
    <Stack gap="medium">
      <Heading level={1}>Messages</Heading>
      <Card>
        <Card.Body>
          <Stack gap="medium">
            {messages.map((m) => (
              <Stack key={m.id} direction="horizontal" gap="small" align="center">
                {m.unread && <Badge tone="critical">New</Badge>}
                <Link href={`#messages/${m.id}`}>{m.subject}</Link>
                <Text as="span" tone="muted" size="small">{m.from} · {m.received}</Text>
              </Stack>
            ))}
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  )
}
