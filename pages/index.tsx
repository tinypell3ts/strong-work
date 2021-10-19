import { useState } from 'react';
import Confetti from 'react-confetti';
import { Button, Greeting, Login } from '../components';
import { useSession } from 'next-auth/client';
import { handleParticipation } from '../helpers';

function HomePage() {
    const [session] = useSession();
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
        <div className="flex flex-col items-center justify-start">
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
                <Login />
            )}
            {confetti && !isLoading && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
        </div>
    );
}

export default HomePage;
