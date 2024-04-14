'use client';

import { Button, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { closeGlobalLoading, openGlobalLoading } from '@/store/utils';
import { useQuery } from '@tanstack/react-query';

const Tag = () => {
	const [tagName, setTagName] = useState('');

	const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTagName(event.target.value);
	};

	const { data: allTags } = useQuery({
		queryKey: ['/api/tag', 'getAll'],
		queryFn: () => fetch('/api/tag', { method: 'GET' }),
	});

	const onCreateTag = async () => {
		if (!tagName) return;
		try {
			openGlobalLoading();
			const data = {
				name: tagName,
			};
			const res = await fetch('/api/tag', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			}).then((res) => res.json());
			setTagName('');
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
			<Button variant={'contained'} onClick={onCreateTag} sx={{marginLeft: '20px'}}>
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
	margin: '20px 0'
})
