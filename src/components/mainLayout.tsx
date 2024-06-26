'use client';

import React from 'react';
import { AppBar, styled } from '@mui/material';
import Account from '@/components/account';
import Image from 'next/image';
import SignProtocol from '@/components/signProtocol';
import Tag from '@/components/tag';
import AttestationList from '@/components/attestationList';

const MainLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<MainContainer>
			<AppBar
				position="fixed"
				sx={{
					height: '64px',
					boxShadow: 'none',
					backgroundColor: 'transparent',
					backgroundImage: 'none',
				}}
				enableColorOnDark={true}
			>
				<Account />
			</AppBar>

			<ContentContainer>{children}</ContentContainer>
		</MainContainer>
	);
};

export default MainLayout;

const MainContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingTop: '80px',
	minHeight: '100vh',
	width: '1000px',
	margin: '0 auto',
	backgroundImage: 'url(/images/bg.png)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% auto',
});

const ContentContainer = styled('div')({
	marginTop: '120px',
});
