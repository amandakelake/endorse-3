import {
	EvmChains,
	SignProtocolClient,
	SpMode,
	IndexService,
	AttestationResult,
} from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts';

import { decodeAbiParameters } from 'viem';
import { AttestationInfo } from '@/common/sp/indexService';

import { baseSepolia, polygonMumbai, sepolia, opBNBTestnet } from 'wagmi/chains';
import { getSinger } from '@/common/etherUtils';

const privateKey = generatePrivateKey();

export interface ISchema {
	id: string;
	fullId: string;
}

export const SchemaIdMap: Record<string, ISchema> = {
	// https://testnet-scan.sign.global/schema/onchain_evm_84532_0x3f
	[baseSepolia.id]: {
		id: '0x3f',
		fullId: 'onchain_evm_84532_0x3f',
	},
	// https://testnet-scan.sign.global/schema/onchain_evm_5611_0x8
	[opBNBTestnet.id]: {
		id: '0x8',
		fullId: 'onchain_evm_5611_0x8',
	},
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
		const signer = await getSinger(chainId);
		return await client.createAttestation({
			schemaId: SchemaIdMap[String(chainId)].id,
			data,
			indexingValue: signer.address,
			recipients: [data.wallet],
		});
	} catch (err: any) {
		console.error('createAttestation', err);
		throw new Error('createAttestation error', err);
	}
}

import axios from 'axios';

// Generate a function for making requests to the Sign Protocol Indexing Service
async function makeAttestationRequest(endpoint: string, options: any) {
	const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
	const res = await axios.request({
		url,
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		...options,
	});
	// throw API errors
	if (res.status !== 200) {
		throw new Error(JSON.stringify(res));
	}
	// return original response
	return res.data;
}

export interface IGetAttestationParams {
	schemaId: string;
	page?: number;
	size?: number;
	mode?: 'onchain' | 'offchain';
	/**
	 * Attestation Id
	 */
	id?: string;
	/**
	 * signer address
	 */
	indexingValue?: string;
	/**
	 * address
	 */
	attester?: string;
}

export async function queryAttestations(params: IGetAttestationParams) {
	const response = await makeAttestationRequest('index/attestations', {
		method: 'GET',
		params: params,
	});

	// Make sure the request was successfully processed.
	if (!response.success) {
		return { success: false, message: response?.message ?? 'Attestation query failed.' };
	}

	// Return a message if no attestations are found.
	if (response.data?.total === 0) {
		return { success: false, message: 'No attestation for this address found.' };
	}

	// Return all attestations that match our query.
	return {
		success: true,
		attestations: response.data.rows,
	};
}

export async function getAttestationDetail(id: string) {
	const response = await makeAttestationRequest(`index/attestations/${id}`, {
		method: 'GET',
	});
	// Make sure the request was successfully processed.
	if (!response.success) {
		return { success: false, message: response?.message ?? 'Attestation query failed.' };
	}

	// Return a message if no attestations are found.
	if (response.data?.total === 0) {
		return { success: false, message: 'No attestation for this address found.' };
	}

	console.log('getAttestationDetail response', response);

	// Return all attestations that match our query.
	return {
		success: true,
		attestations: response.data.rows,
	};
}

export interface IParsedAttestation {
	parsedData: Record<string, any>;
	attestation: AttestationInfo;
}

export function findAttestation(
	message: string,
	attestations: any[],
): IParsedAttestation | undefined {
	// Iterate through the list of attestations
	for (const att of attestations) {
		if (!att.data) continue;

		let parsedData: any = {};

		// Parse the data.
		if (att.mode === 'onchain') {
			// Looking for nested items in the on-chain schema
			try {
				const data = decodeAbiParameters(
					[
						att.dataLocation === 'onchain'
							? { components: att.schema.data, type: 'tuple' }
							: { type: 'string' },
					],
					att.data,
				);
				parsedData = data[0];
			} catch (error) {
				// Looking for a regular schema format if the nested parse fails
				try {
					const data = decodeAbiParameters(
						att.dataLocation === 'onchain' ? att.schema.data : [{ type: 'string' }],
						att.data,
					);
					const obj: any = {};
					data.forEach((item: any, i: number) => {
						obj[att.schema.data[i].name] = item;
					});
					parsedData = obj;
				} catch (error) {
					continue;
				}
			}
		} else {
			// Try parsing as a string (off-chain attestation)
			try {
				parsedData = JSON.parse(att.data);
			} catch (error) {
				console.log(error);
				continue;
			}
		}

		return { parsedData, attestation: att };

		// what's this???
		// Return the correct attestation and its parsed data.
		// if(parsedData?.contractDetails === message) {
		// 	return { parsedData, attestation: att };
		// }
	}

	// Did not find the attestation we are looking for.
	return undefined;
}
