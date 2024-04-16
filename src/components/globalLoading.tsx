'use client';

import React from 'react';
import { Backdrop, Button, CircularProgress, styled, Typography } from '@mui/material';
import { useUtilsStore } from '@/store/utils';

export default function GlobalLoading() {
	const { globalLoading } = useUtilsStore();
	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: '9999' }} open={globalLoading}>
				<LoadingBlock>
					<CircularProgress sx={{ color: '#0F172A' }} />
					<Typography sx={{ color: '#0F172A', marginTop: '8px' }}>Loading...</Typography>
				</LoadingBlock>
			</Backdrop>
		</div>
	);
}

const LoadingBlock = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#FFFFFF',
	boxShadow: '0px 6px 6px -3px #0F172A1F',
	width: '444px',
	height: '244px',
	borderRadius: '4px',
});
