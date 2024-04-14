export const getAllTags = () => fetch('/api/tag', { method: 'GET' }).then((res) => res.json());

export const createTag = (name: string) =>
	fetch('/api/tag', {
		method: 'POST',
		body: JSON.stringify({ name }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
