import { Container } from '#design/layout';
import { H1 } from '#design/typography';

export function PlatformScreen() {
  return (
    <Container className="justify-center">
      <H1 className="text-primary-light mb-2 text-center">This is a screen for mobile devices.</H1>
    </Container>
  );
}
