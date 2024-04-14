export type PageInfo = {
	total: number;
	size: number;
	page: number;
};

export type SchemaInfo = {
	id: string;
	mode: 'onchain' | 'offchain';
	chainType: 'evm';
	chainId: string;
	schemaId: string;
	transactionHash: string;
	name: string;
	description: string;
	revocable: boolean;
	maxValidFor: string;
	resolver: string;
	registerTimestamp: string;
	registrant: string;
	data: {
		name: string;
		type: string;
	}[];
};

export type AttestationInfo = {
	id: string;
	mode: 'onchain' | 'offchain';
	chainType: 'evm';
	chainId: string;
	attestationId: string;
	transactionHash: string;
	indexingValue: string;
	schemaId: string;
	fullSchemaId: string;
	linkedAttestation: string;
	attester: string;
	from: string;
	attestTimestamp: string;
	validUntil: string;
	revoked: boolean;
	revokeTimestamp: string;
	revokeReason: string;
	revokeTransactionHash: string;
	data: string;
	dataLocation: 'onchain' | 'offchain';
	extra: Record<string, any>;
	syncAt: string;
	lastSyncAt: string;
	recipients: string[];
	schema: SchemaInfo & {
		originalData: string;
		extra: Record<string, any>;
		syncAt: string;
	};
};

import { IndexService } from '@ethsign/sp-sdk';

async function getSchemaListFromIndexService() {
	const indexService = new IndexService('testnet');
	const res = await indexService.querySchemaList({ page: 1 });
}

async function getSchemaFromIndexService() {
	const indexService = new IndexService('testnet');
	const res = await indexService.querySchema('onchain_evm_80001_0x1');
}

async function getAttestationListFromIndexService(schemaId: string) {
	const indexService = new IndexService('testnet');
	const res = await indexService.queryAttestationList({ page: 1, schemaId });
}

async function getAttestationFromIndexService() {
	const indexService = new IndexService('testnet');
	const res = await indexService.queryAttestation('onchain_evm_80001_0x1');
}
