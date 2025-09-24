import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { Container } from '#design/layout';
import { H1, Text, TextLink } from '#design/typography';
import { View } from '#design/view';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Container
      className="pt-4"
      edges={['bottom']}
    >
      <H1 className="text-primary-light font-inter-bold mb-2">Beyond Codeline</H1>
      <Text className="text-accent mb-8 text-xl">Expo + Next.js</Text>

      <View className="gap-4">
        <Text className="text-accent">TRANSLATION: {t('greeting', { name: 'Roman' })}</Text>
        <TextLink
          className="text-grey"
          href="/posts"
        >
          Go to posts
        </TextLink>
        <TextLink
          className="text-grey"
          href="/platform"
        >
          Go to {Platform.OS.toUpperCase()} screen
        </TextLink>
      </View>
    </Container>
  );
}
