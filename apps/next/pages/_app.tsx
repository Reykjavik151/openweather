import 'raf/polyfill';
import 'setimmediate';
import '../global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient } from 'react-query';

import { Provider } from '#provider';

const queryClient = new QueryClient();

function RootWebApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js Boilerplate</title>
        <meta
          content="Expo + Next.js Boilerplate"
          name="description"
        />
        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>
      <Provider queryClient={queryClient}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default RootWebApp;
