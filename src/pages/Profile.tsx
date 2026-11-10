import { useState } from 'react'
import { Avatar, Button, Card, Heading, Stack, TextInput } from '@orvella/ui'

export function Profile() {
  const [email, setEmail] = useState('sam.taylor@example.test')
  return (
    <Stack gap="normal">
      <Heading level={1}>Profile</Heading>
      <Card>
        <Card.Body>
          <Stack gap="normal">
            <Avatar src="./avatar.svg" alt="Your profile picture" size="large" />
            <TextInput label="Full name" value="Sam Taylor" />
            <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="primary" type="submit">Save changes</Button>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  )
}
