import { useEffect, useState } from 'react';
import { Button } from '../components';
import { initOnboard } from '../services/onboard';
import { initNotify } from '../services/notify';
import { useOnboard } from '../hooks';
import { DuplicateIcon } from '@heroicons/react/solid';

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
    const [copied, setCopied] = useState(false);

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
                    setWallet();
                }
            },
        });

        const notify = initNotify();

        setOnboard(onboard);
        setNotify(notify);
    }, []);

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 1500);
        }
    }, [copied]);

    useEffect(() => {
        const previouslySelectedWallet =
            window.localStorage.getItem('selectedWallet');

        if (previouslySelectedWallet && onboard) {
            readyToTransact(previouslySelectedWallet);
        }
    }, [onboard]);

    function handleCopy() {
        navigator.clipboard.writeText(address);
        setCopied(true);
    }

    const isConnected = Boolean(address);

    return (
        <div className="flex items-center justify-end">
            {copied ? (
                <p className="flex items-center justify-center">
                    Address copied!
                </p>
            ) : (
                <p className="flex items-center justify-center">
                    {isConnected && (
                        <>
                            {address}
                            <DuplicateIcon
                                onClick={handleCopy}
                                className="h-5 w-5 text-white ml-2"
                            />
                        </>
                    )}
                </p>
            )}
            {isConnected ? (
                <Button onClick={disconnect}>Disconnect</Button>
            ) : (
                <Button onClick={connect}>Connect</Button>
            )}
        </div>
    );
}
