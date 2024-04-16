'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { setChainId } from '@/store/network';
import { styled } from '@mui/material';

export default function Account() {
	const account = useAccount();
	const { address, chainId } = account;

	useEffect(() => {
		if (chainId) {
			setChainId(chainId);
		}
	}, [chainId]);

	return (
		<Container>
			<ConnectButton />
		</Container>
	);
}

const Container = styled('div')({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	height: '100%',
	paddingRight: '16px',
});
