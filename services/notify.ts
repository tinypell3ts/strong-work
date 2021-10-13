import Notify from 'bnc-notify';

const networkId = 80001;
const dappId = process.env.NEXT_PUBLIC_ONBOARD_API_KEY;

export function initNotify() {
    return Notify({
        dappId,
        networkId,
        onerror: (error) => console.log(`Notify error: ${error.message}`),
    });
}
