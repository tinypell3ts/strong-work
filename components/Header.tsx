import { useEffect } from 'react';
import { Button } from '../components';
import { initOnboard } from '../services/onboard';
import { initNotify } from '../services/notify';
import { useOnboard } from '../hooks';

export default function Header() {
    const {
        address,
        connect,
        disconnect,
        onboard,
        setAddress,
        setNetwork,
        setBalance,
        setWallet,
        setOnboard,
        setNotify,
        readyToTransact,
    } = useOnboard();

    useEffect(() => {
        const onboard = initOnboard({
            address: setAddress,
            network: setNetwork,
            balance: setBalance,
            wallet: (wallet: any) => {
                if (wallet.provider) {
                    setWallet(wallet);
                    window.localStorage.setItem('selectedWallet', wallet.name);
                } else {
                    //@ts-ignore
                    setWallet();
                }
            },
        });

        const notify = initNotify();

        setOnboard(onboard);
        setNotify(notify);
    }, []);

    useEffect(() => {
        const previouslySelectedWallet =
            window.localStorage.getItem('selectedWallet');

        if (previouslySelectedWallet && onboard) {
            readyToTransact(previouslySelectedWallet);
        }
    }, [onboard]);

    const isConnected = Boolean(address);

    return (
        <div className="flex items-center justify-end">
            <p>{isConnected && address}</p>
            {isConnected ? (
                <Button onClick={disconnect}>Disconnect</Button>
            ) : (
                <Button onClick={connect}>Connect</Button>
            )}
        </div>
    );
}
