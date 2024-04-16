import { proxy, useSnapshot } from 'valtio';

export interface StoreTypes {
	chainId: number;
}

export const NetworkStore = proxy<StoreTypes>({
	chainId: 84532, // default: base sepolia
});

export const useNetworkStore = () => useSnapshot(NetworkStore);

export function setChainId(chainId: number) {
	NetworkStore.chainId = chainId;
}
