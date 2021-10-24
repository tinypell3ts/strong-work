import { useSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { CheckIcon } from '@heroicons/react/solid';

import { useWalletStore } from '../stores';

export default function Steps() {
    const isServer = () => typeof window === 'undefined';
    if (isServer()) return null;

    const { address, balance } = useWalletStore();
    const [session] = useSession();
    const { t } = useTranslation('common');

    console.log({ balance });

    const timeline = [
        {
            title: t('steps.install-metamask.title'),
            content: t('steps.install-metamask.content'),
            url: 'https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047',
            iconBackground: 'bg-green-400',
            conditional: (window as any).ethereum,
        },
        {
            title: t('steps.connect-wallet.title'),
            content: t('steps.connect-wallet.content'),
            iconBackground: 'bg-green-400',
            conditional: address,
        },
        {
            title: t('steps.get-matic.title'),
            content: t('steps.get-matic.content'),
            url: 'https://faucet.polygon.technology',
            iconBackground: 'bg-green-400',
            conditional: balance,
        },
        {
            title: t('steps.sign-in-with-slack.title'),
            content: t('steps.sign-in-with-slack.content'),
            iconBackground: 'bg-green-400',
            conditional: session,
        },
        {
            title: t('steps.participate.title'),
            content: t('steps.participate.content'),
            iconBackground: 'bg-green-400',
            conditional: false,
        },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function isComplete(conditional) {
        return conditional ? 'bg-green-400' : 'bg-green-400 opacity-30';
    }

    return (
        <div className="flow-root mt-5">
            <h1 className="text-3xl tracking-tighter font-bold">
                Instructions
            </h1>
            <ul role="list" className="-mb-8">
                {timeline.map((event, eventIdx) => (
                    <li key={eventIdx}>
                        <a href={event.url} target="_blank">
                            <div className="relative pb-8">
                                <div className="relative flex items-center space-x-3">
                                    <div>
                                        <span
                                            className={classNames(
                                                isComplete(event.conditional),
                                                'h-8 w-8 rounded-full flex items-center justify-center',
                                            )}
                                        >
                                            <CheckIcon
                                                className={classNames(
                                                    'h-5 w-5 text-white',
                                                )}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-lg tracking-tighter text-black-500 font-semibold">
                                                {event.title}
                                            </p>
                                            <p className="text-black-500">
                                                {event.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
