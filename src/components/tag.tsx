'use client';

import { Button, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { closeGlobalLoading, openGlobalLoading } from '@/store/utils';
import { createTag, getAllTags } from '@/services/tag';
import useSWR, { useSWRConfig } from 'swr';

const Tag = () => {
	const { mutate } = useSWRConfig();

	const [tagName, setTagName] = useState('');

	const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTagName(event.target.value);
	};

	const onCreateTag = async () => {
		if (!tagName) return;
		try {
			openGlobalLoading();
			const res = await createTag(tagName);
			setTagName('');
			await mutate('/api/tag/all');
			console.log('onCreateTag', res);
		} catch (err) {
			console.error('onCreateTag', err);
		} finally {
			closeGlobalLoading();
		}
	};

	return (
		<TagContainer>
			<TextField
				variant={'outlined'}
				value={tagName}
				onChange={handleTagNameChange}
				placeholder={'name'}
			/>
			<Button variant={'contained'} onClick={onCreateTag} sx={{ marginLeft: '20px' }}>
				Create Tag
			</Button>
		</TagContainer>
	);
};

export default Tag;

const TagContainer = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	margin: '20px 0',
});
