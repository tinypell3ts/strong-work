import { ethers } from 'ethers';
import Contract from '../abis/strongWork.json';

declare let window: any;

export default async function handleParticipation(slackID: string) {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (typeof (window as any).ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const StrongWorkContract = new ethers.Contract(
            contractAddress,
            Contract.abi,
            signer,
        );

        const tx = await StrongWorkContract.functions.update(slackID);

        const receipt = await tx.wait();

        return receipt;
    }
}
