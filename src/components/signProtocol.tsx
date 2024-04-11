'use client';
// base sepolia test schema : https://testnet-scan.sign.global/schema/onchain_evm_84532_0x3f

import { Button, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createAttestation } from '@/common/signProtocol';
import { closeGlobalLoading, openGlobalLoading } from '@/store/utils';

export interface IProps {}

const SignProtocol = (props: IProps) => {
	const [name, setName] = useState('');
	const [wallet, setWallet] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState('');

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handleWalletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWallet(event.target.value);
	};
	const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTag(event.target.value);
	};
	const onClear = () => {
		setName('');
		setWallet('');
		setTag('');
	};
	const onCreateAttestation = async () => {
		if (!name || !wallet || !tag) return;
		try {
			openGlobalLoading();
			const res = await createAttestation({ name, wallet, tags: [tag] });
			console.log('Attestation Result', res);
			onClear();
		} catch (err) {
		} finally {
			closeGlobalLoading();
		}
	};
	return (
		<FormContainer>
			<TextField
				variant={'outlined'}
				value={name}
				onChange={handleNameChange}
				placeholder={'name'}
			/>
			<TextField
				value={wallet}
				onChange={handleWalletChange}
				placeholder={'wallet address'}
			/>
			<TextField value={tag} onChange={handleTagChange} placeholder={'tag'} />
			<Button variant={'contained'} onClick={onCreateAttestation} size={'large'}>
				CreateAttestation
			</Button>
		</FormContainer>
	);
};

export default SignProtocol;

const FormContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: '20px',
});
