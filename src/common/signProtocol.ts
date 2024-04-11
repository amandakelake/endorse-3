import { EvmChains, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts';
const privateKey = generatePrivateKey();

const client = new SignProtocolClient(SpMode.OnChain, {
	chain: EvmChains.baseSepolia,
	account: privateKeyToAccount(privateKey),
});

const SchemaId = '0x3f';
const SchemaData = [
	{ name: 'name', type: 'string' },
	{ name: 'wallet', type: 'address' },
	{ name: 'tags', type: 'array' },
];

export interface IAttestationData {
	name: string;
	wallet: string;
	tags: string[];
}

export async function createAttestation(data: IAttestationData) {
	try {
		return await client.createAttestation({
			schemaId: SchemaId,
			data,
			indexingValue: '?????',
		});
	} catch (err: any) {
		console.error('createAttestation', err);
		throw new Error('createAttestation error', err);
	}
}
