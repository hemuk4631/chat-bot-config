import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactFlowProvider } from '@xyflow/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactFlowProvider>
      <Component {...pageProps} />
    </ReactFlowProvider>
  );
}
