'use client';
// base sepolia test schema : https://testnet-scan.sign.global/schema/onchain_evm_84532_0x3f

import {
	Box,
	Button,
	Chip,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	styled,
	TextField,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { createAttestation } from '@/common/sp/signProtocol';
import { closeGlobalLoading, openGlobalLoading } from '@/store/utils';
import { useNetworkStore } from '@/store/network';
import useSP from '@/hooks/useSP';
import useSWR, { useSWRConfig } from 'swr';
import { getAllTags } from '@/services/tag';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export interface IProps {}

const SignProtocol = (props: IProps) => {
	const { chainId } = useNetworkStore();
	const { schemaId } = useSP();
	const { mutate } = useSWRConfig();

	const [name, setName] = useState('');
	const [wallet, setWallet] = useState('');

	const { data } = useSWR('/api/tag/all', () => getAllTags());

	const allTags = useMemo(() => {
		// @ts-ignore
		const tags = data ? data?.tags : [];
		return tags as Record<string, any>[];
	}, [data]);

	const [tags, setTags] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof tags>) => {
		const {
			target: { value },
		} = event;
		console.log('handleChange', value);
		setTags(typeof value === 'string' ? value.split(',') : value);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handleWalletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWallet(event.target.value);
	};
	const onClear = () => {
		setName('');
		setWallet('');
	};
	const onCreateAttestation = async () => {
		if (!name || !wallet) return;
		try {
			openGlobalLoading();
			const res = await createAttestation({ name, wallet, tags: tags }, chainId);
			console.log('Attestation Result', res);
			onClear();
			await mutate(`queryAttestations/${schemaId}`);
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
				placeholder={'nickname'}
			/>
			<TextField
				value={wallet}
				onChange={handleWalletChange}
				placeholder={'wallet address'}
			/>
			<Select
				labelId="demo-multiple-chip-label"
				id="demo-multiple-chip"
				multiple
				value={tags}
				onChange={handleChange}
				disabled={!allTags || allTags.length === 0}
				input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value} label={value} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
				placeholder={'select your endorsement'}
			>
				{allTags?.map((tag) => (
					<MenuItem key={tag.id} value={tag.name}>
						{tag.name}
					</MenuItem>
				))}
			</Select>
			<Button variant={'contained'} onClick={onCreateAttestation} size={'large'}>
				CreateAttestation
			</Button>
		</FormContainer>
	);
};

export default SignProtocol;

const FormContainer = styled('div')({
	marginTop: '40px',
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: '20px',
});
