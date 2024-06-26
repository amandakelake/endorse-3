import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import './globals.css';
import { RainbowProvider } from '@/common/provider';
import GlobalLoading from '@/components/globalLoading';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Endorse',
	description: 'An endorse DApp, built with SignProtocol',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<RainbowProvider>
							<GlobalLoading />
							{children}
						</RainbowProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
