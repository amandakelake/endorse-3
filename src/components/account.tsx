'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { setChainId } from '@/store/network';

export default function Account() {
	const account = useAccount();
	const { address, chainId } = account;

	useEffect(() => {
		if (chainId) {
			setChainId(chainId);
		}
	}, [chainId]);

	return (
		<div>
			<ConnectButton />
			<div>
				<p>Address: {address}</p>
				<p>chainId: {chainId}</p>
			</div>
		</div>
	);
}
