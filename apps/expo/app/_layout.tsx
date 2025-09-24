import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { QueryClient } from 'react-query';

import { Provider } from '#provider';

import { Fonts } from '../Fonts';

const queryClient = new QueryClient();

export default function Root() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  return (
    <Provider queryClient={queryClient}>
      <Fonts>
        <Stack />
      </Fonts>
    </Provider>
  );
}
