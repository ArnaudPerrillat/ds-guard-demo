import { Badge, Button, Heading, Stack, Text } from '@orvella/ui'
import { prescriptions } from '../data'
import styles from './Prescriptions.module.css'

export function Prescriptions() {
  return (
    <Stack gap="medium">
      <Heading level={1}>Prescriptions</Heading>
      <ul className={styles.list}>
        {prescriptions.map((p) => (
          <li key={p.id} className={styles.item}>
            <div>
              <Text>{p.name}</Text>
              <Text tone="muted" size="small">{p.dosage}</Text>
            </div>
            <div className={styles.meta}>
              <Badge tone={p.refillsLeft ? 'neutral' : 'attention'}>{p.refillsLeft} refills left</Badge>
              <span className={styles.renew}>Renew by {p.renewBy}</span>
              <Button size="small">Request renewal</Button>
            </div>
          </li>
        ))}
      </ul>
    </Stack>
  )
}
