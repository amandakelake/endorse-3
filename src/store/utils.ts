import { proxy, useSnapshot } from 'valtio';

export interface StoreTypes {
	globalLoading: boolean;

	[key: string]: any;
}

export const UtilsStore = proxy<StoreTypes>({
	globalLoading: false,
});

export const useUtilsStore = () => useSnapshot(UtilsStore);

export function openGlobalLoading() {
	UtilsStore.globalLoading = true;
}

export function closeGlobalLoading() {
	UtilsStore.globalLoading = false;
}
