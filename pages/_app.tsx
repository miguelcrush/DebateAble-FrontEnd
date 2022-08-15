
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Layout } from '../components/Layout';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
