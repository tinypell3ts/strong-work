import { useWalletStore } from '../stores';
export default function useOnboard() {
    const {
        address,
        network,
        balance,
        wallet,
        onboard,
        notify,
        connecting,
        setAddress,
        setNetwork,
        setBalance,
        setWallet,
        setOnboard,
        setNotify,
        setConnecting,
    } = useWalletStore();

    async function readyToTransact(previouslySelectedWallet: any) {
        if (onboard) {
            await onboard.walletSelect(previouslySelectedWallet);
            await onboard.walletCheck();
        }
    }

    async function connect() {
        setConnecting(true);
        if (onboard) {
            await onboard.walletSelect();
            await onboard.walletCheck();
        }
        setConnecting(false);
    }

    async function disconnect() {
        await onboard.walletReset();
        //@ts-ignore
        setWallet();
        window.localStorage.removeItem('selectedWallet');
    }

    return {
        address,
        network,
        balance,
        wallet,
        onboard,
        notify,
        connecting,
        setAddress,
        setNetwork,
        setBalance,
        setWallet,
        setOnboard,
        setNotify,
        readyToTransact,
        connect,
        disconnect,
    };
}
