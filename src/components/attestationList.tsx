'use client';

import useSP from '@/hooks/useSP';
import { useEffect } from 'react';
import { styled } from '@mui/material';

const AttestationList = () => {
	const { attestationList, parseDataList } = useSP();

	useEffect(() => {
		console.log('attestationList', attestationList);
	}, [attestationList]);

	return (
		<div>
			<h1 style={{ marginBottom: '20px' }}>AttestationList</h1>
			{parseDataList.map((item, idx: number) => {
				return (
					<AttestationItem key={item.attestation.id}>
						<p>attestationId: {item.attestation.id}</p>
						<p>name: {item.parsedData.name}</p>
						<p>wallet: {item.parsedData.wallet}</p>
						<p>
							tag:{' '}
							{item.parsedData.tags.map((tag: string) => (
								<span key={tag} style={{ marginRight: '4px' }}>
									{tag}
								</span>
							))}
						</p>
					</AttestationItem>
				);
			})}
		</div>
	);
};

export default AttestationList;

const AttestationItem = styled('div')({
	border: '1px solid #c1c1c1',
	borderRadius: '10px',
	padding: '16px',
	marginBottom: '16px',
});
