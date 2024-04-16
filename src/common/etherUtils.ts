import { type Config, getClient, getConnectorClient } from '@wagmi/core';
import { BrowserProvider, FallbackProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { wagmiConfig } from '@/common/provider';

function clientToProvider(client: Client<Transport, Chain>) {
	const { chain, transport } = client;
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	};
	if (transport.type === 'fallback') {
		const providers = (transport.transports as ReturnType<Transport>[]).map(
			({ value }) => new JsonRpcProvider(value?.url, network),
		);
		if (providers.length === 1) return providers[0];
		return new FallbackProvider(providers);
	}
	return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
function getEthersProvider(config: Config, { chainId }: { chainId?: number } = {}) {
	const client = getClient(config, { chainId });
	return clientToProvider(client!);
}

function clientToSigner(client: Client<Transport, Chain, Account>) {
	const { account, chain, transport } = client;
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	};
	const provider = new BrowserProvider(transport, network);
	return new JsonRpcSigner(provider, account.address);
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
async function getEthersSigner(config: Config, { chainId }: { chainId?: number } = {}) {
	const client = await getConnectorClient(config, { chainId });
	return clientToSigner(client);
}

export async function getProvider(chainId: number) {
	return getEthersProvider(wagmiConfig, { chainId });
}

export async function getSinger(chainId: number) {
	return getEthersSigner(wagmiConfig, { chainId });
}
