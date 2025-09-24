import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient } from 'react-query';

import { Provider } from '#provider';
import { Any } from '#types/any';

import { Fonts } from '../Fonts';

const queryClient = new QueryClient();

export default function Root() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef as Any);
  useReactQueryDevTools(queryClient);

  return (
    <Provider queryClient={queryClient}>
      <Fonts>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </Fonts>
    </Provider>
  );
}
