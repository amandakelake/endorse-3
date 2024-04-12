import { EvmChains, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts';

const privateKey = generatePrivateKey();
import { baseSepolia, polygonMumbai, sepolia, opBNBTestnet } from 'wagmi/chains';
import { getSinger } from '@/common/etherUtils';

const SchemaIdMap: Record<string, string> = {
	// https://testnet-scan.sign.global/schema/onchain_evm_84532_0x3f
	[baseSepolia.id]: '0x3f',
	// https://testnet-scan.sign.global/schema/onchain_evm_5611_0x8
	[opBNBTestnet.id]: '0x8',
};

export interface IAttestationData {
	name: string;
	wallet: string;
	tags: string[];
}

const client = new SignProtocolClient(SpMode.OnChain, {
	chain: EvmChains.baseSepolia,
	// account: privateKeyToAccount(privateKey), // can not use this, use default window.Ethereum
});

export async function createAttestation(data: IAttestationData, chainId: number) {
	try {
		return await client.createAttestation({
			schemaId: SchemaIdMap[String(chainId)],
			data,
			indexingValue: (Math.random() * 10000000).toFixed().toString(),
			recipients: [data.wallet],
		});
	} catch (err: any) {
		console.error('createAttestation', err);
		throw new Error('createAttestation error', err);
	}
}
