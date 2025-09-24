import { useFonts } from 'expo-font';
import { PropsWithChildren } from 'react';

export function Fonts({ children }: PropsWithChildren) {
  const [ready] = useFonts({
    'Inter-Regular': require('../next/public/font/Inter/Inter-Regular.otf'),
    'Inter-Bold': require('../next/public/font/Inter/Inter-Bold.otf'),
    'Inter-Black': require('../next/public/font/Inter/Inter-Black.otf'),
  });

  if (!ready) {
    return null;
  }

  return children;
}
