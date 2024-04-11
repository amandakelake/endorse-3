'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Account() {
	const account = useAccount();
	const { address, chainId } = account;
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
