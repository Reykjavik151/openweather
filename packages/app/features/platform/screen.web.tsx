import { useTranslation } from 'react-i18next';

import { Container } from '#design/layout';
import { H1 } from '#design/typography';

export function PlatformScreen() {
  const { t } = useTranslation();

  return (
    <Container className="justify-center">
      <H1 className="text-primary-light mb-2">This is a screen for the browser. {t('greeting', { name: 'Roman' })}</H1>
    </Container>
  );
}
