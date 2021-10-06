import Head from 'next/head';
import { useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { AppProps } from 'next/dist/shared/lib/router/router';
import theme from '@/theme';
import { AppProvider } from '@/context';
import createEmotionCache from '@/createEmotionCache';

import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Consulta Tabela FIPE</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <AppProvider>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </AppProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
