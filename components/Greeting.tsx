import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

export default function Greeting({ session }) {
    const { t } = useTranslation('common');

    return (
        <div>
            {session ? (
                <div className="flex flex-col justify-center items-center">
                    <Image
                        className="rounded-full"
                        src={session.picture}
                        width={100}
                        height={100}
                    />
                    <p className="text-2xl tracking-tight">
                        {t('greeting.welcome', { name: session.name })}
                    </p>
                </div>
            ) : null}
        </div>
    );
}
