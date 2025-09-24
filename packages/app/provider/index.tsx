import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import i18n from '#services/localisation';
import { persistor, store } from '#state';

import { SafeArea } from './safeArea';

type ProviderProps = PropsWithChildren & {
  queryClient: QueryClient;
};

export function Provider({ children, queryClient }: ProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <QueryClientProvider client={queryClient}>
            <SafeArea>{children}</SafeArea>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </I18nextProvider>
  );
}
