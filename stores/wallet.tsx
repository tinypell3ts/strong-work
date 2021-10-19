import create from 'zustand';

type WalletState = {
    connecting: boolean;
    address: string;
    network: string;
    balance: string;
    wallet: {
        provider?: object;
    };
    onboard: any;
    notify: any;
    setAddress: (item?: string) => void;
    setConnecting: (item?: boolean) => void;
    setNetwork: (item: string) => void;
    setBalance: (item: string) => void;
    setWallet: (item?: string) => void;
    setOnboard: (item?: object) => void;
    setNotify: (item?: object) => void;
    resetWallet: () => void;
};

export default create<WalletState>((set: any) => ({
    onboard: null,
    notify: null,
    connecting: false,
    address: '',
    network: '',
    balance: '',
    wallet: {},
    setAddress: (item) => set({ address: item }),
    setConnecting: (item) => set({ connecting: item }),
    setNetwork: (item) => set({ network: item }),
    setBalance: (item) => set({ balance: item }),
    setWallet: (item) => set({ wallet: item }),
    setOnboard: (item) => set({ onboard: item }),
    setNotify: (item) => set({ notify: item }),
    resetWallet: () =>
        set({ address: '', network: '', balance: '', wallet: {} }),
}));
