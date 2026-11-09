import { Heading, Text } from '@orvella/ui'

/** Seasonal welcome banner. Its large top spacing was approved in design review (see EXC-002). */
export function WelcomeHero({ name }: { name: string }) {
  return (
    // ds-exception: EXC-002
    <section className="welcome-hero" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <Heading level={1}>Good morning, {name}</Heading>
      <Text tone="muted">Here is what is coming up in your care.</Text>
    </section>
  )
}
