'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#5B64F8',
		},
		secondary: {
			main: '#ADB2FC',
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
});

export default theme;
