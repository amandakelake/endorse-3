'use client';

import useSP from '@/hooks/useSP';
import { useEffect } from 'react';
import { styled } from '@mui/material';
import Image from 'next/image';

const AttestationList = () => {
	const { attestationList, parseDataList } = useSP();

	useEffect(() => {
		console.log('attestationList', attestationList);
	}, [attestationList]);

	return (
		<div style={{ minWidth: '800px', marginTop: '20px' }}>
			<h3 style={{ marginBottom: '20px' }}>All endorsements</h3>
			{parseDataList.map((item, idx: number) => {
				return (
					<AttestationItem key={item.attestation.id}>
						<div>
							<Image
								src={`/images/avatar/nft-avatar-${(idx % 8) + 1}.png`}
								alt={'avatar'}
								width={40}
								height={40}
								style={{ borderRadius: '100%', marginRight: '10px' }}
							/>
							<span>{item.parsedData.name}</span>
						</div>
						<TagContainer style={{ marginTop: '10px' }}>
							{item.parsedData.tags.map((tag: string) => (
								<TagItem key={tag} style={{ marginRight: '4px' }}>
									{tag}
								</TagItem>
							))}
						</TagContainer>
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
	background: '#FFFFFF05',
});

const TagContainer = styled('div')({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '10px',
});
const TagItem = styled('div')({
	background: '#FFFFFF0D',
	padding: '8px 16px',
	borderRadius: '40px',
});
