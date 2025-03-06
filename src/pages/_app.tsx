import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactFlowProvider } from '@xyflow/react';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ReactFlowProvider>
        <Component {...pageProps} />
      </ReactFlowProvider>
    </Layout>
  );
}
