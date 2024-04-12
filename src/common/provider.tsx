'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig, Theme, darkTheme } from '@rainbow-me/rainbowkit';

// @ts-ignore
import merge from 'lodash.merge';
import { WagmiProvider } from 'wagmi';
import { baseSepolia, opBNBTestnet } from 'wagmi/chains';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const wagmiConfig = getDefaultConfig({
	appName: 'Endorse',
	projectId: '7188673890c272bd9021dd19e64c9b7e', // lgc
	chains: [baseSepolia, opBNBTestnet],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

declare module 'wagmi' {
	interface Register {
		config: typeof wagmiConfig;
	}
}

const queryClient = new QueryClient();

const myTheme = merge(darkTheme(), {
	colors: {
		accentColor: '#0F172A',
		connectButtonBackground: '#0F172A',
	},
} as Theme);

export function RainbowProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={myTheme}>{mounted && children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
