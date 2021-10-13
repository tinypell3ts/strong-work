import Onboard from 'bnc-onboard';

const networkId = 80001;
const networkName = 'Mumbai';
const dappId = process.env.ONBOARD_API_KEY;

export function initOnboard(subscriptions: any) {
    return Onboard({
        dappId,
        hideBranding: true,
        networkId,
        networkName,
        darkMode: false,
        subscriptions,
        walletSelect: {
            wallets: [{ walletName: 'metamask' }],
        },
        walletCheck: [
            { checkName: 'connect' },
            { checkName: 'accounts' },
            { checkName: 'network' },
        ],
    });
}
