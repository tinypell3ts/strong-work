import { useEffect } from 'react';
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

    useEffect(() => {
        if (wallet?.provider) {
            addNetwork();
        }
    }, [wallet]);

    async function addNetwork() {
        const params = [
            {
                chainId: '0x13881',
                chainName: 'Matic(Polygon) Testnet Mumbai',
                nativeCurrency: {
                    name: 'tMATIC',
                    symbol: 'tMATIC',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc-mumbai.matic.today'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com'],
            },
        ];
        if ((window as any).ethereum) {
            (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params,
            });
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
