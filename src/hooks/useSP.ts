import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import {
	findAttestation,
	getAttestationDetail,
	IParsedAttestation,
	queryAttestations,
	SchemaIdMap,
} from '@/common/sp/signProtocol';
import { useEffect, useMemo, useState } from 'react';

const useSP = () => {
	const { chainId } = useAccount();

	const schemaId = useMemo(() => {
		return chainId ? SchemaIdMap[chainId!]?.fullId : '';
	}, [chainId]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['queryAttestations', schemaId],
		queryFn: () => queryAttestations({ schemaId }),
		retry: false,
		enabled: !!schemaId,
	});

	const attestationList = useMemo(() => {
		return data?.attestations || [];
	}, [data]);

	const parseDataList = useMemo(() => {
		return attestationList.map((item: any) => findAttestation('ddd', [item]));
	}, [attestationList]);

	useEffect(() => {
		if (parseDataList) {
			console.log('parseData', parseDataList);
		}
	}, [parseDataList]);

	return {
		schemaId,
		attestationList: attestationList,
		parseDataList: parseDataList as IParsedAttestation[],
	};
};

export default useSP;
