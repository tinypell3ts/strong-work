import { useState } from 'react';
import Confetti from 'react-confetti';
import { Button, Greeting, Login, Steps } from '../components';
import { useWalletStore } from '../stores';
import { useSession } from 'next-auth/client';
import { handleParticipation } from '../helpers';
import useTranslation from 'next-translate/useTranslation';

function HomePage() {
    const isServer = () => typeof window === 'undefined';
    if (isServer()) return null;

    const [session] = useSession();
    const { address } = useWalletStore();
    const { t } = useTranslation('common');
    const [confetti, setConfetti] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [onSuccess, setSuccess] = useState<boolean>(false);

    async function handleAdd(userID) {
        setLoading(true);
        const tx = await handleParticipation(userID);
        if (tx.status) {
            setSuccess(true);
            setLoading(false);
            setConfetti(true);
        }
    }

    return (
        <div className="flex flex-col justify-start mx-8">
            {session ? (
                <div>
                    {onSuccess ? (
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-9xl font-bold tracking-tighter">
                                Success!
                            </h1>
                            <h6 className="text-2xl tracking-tighter">
                                Now go build some cool shit!
                            </h6>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <Greeting session={session} />

                            <Button
                                disabled={isLoading}
                                onClick={() => handleAdd(session.sub)}
                            >
                                {isLoading
                                    ? 'Waiting for confirmation...'
                                    : 'Participate'}
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <h1 className="text-3xl tracking-tighter font-bold">
                        {t('greeting.about.title')}
                    </h1>
                    <p>{t('greeting.about.content')}</p>
                    {address && <Login />}
                </>
            )}
            {confetti && !isLoading && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
            <Steps onSuccess={onSuccess} />
        </div>
    );
}

export default HomePage;
