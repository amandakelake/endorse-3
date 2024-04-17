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
		<div style={{minWidth: '800px'}}>
			<h3 style={{ marginBottom: '20px' }}>All endorsements</h3>
			{parseDataList.map((item, idx: number) => {
				return (
					<AttestationItem key={item.attestation.id}>
						{/*<p>attestationId: {item.attestation.id}</p>*/}
						<p>{item.parsedData.name}</p>
						{/*<p>wallet: {item.parsedData.wallet}</p>*/}
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
	border: '1px solid #FFFFFF0D',
	borderRadius: '10px',
	padding: '24px',
	marginBottom: '16px',
	backgroundColor: 'transparent',
	background: '#FFFFFF05'
});
