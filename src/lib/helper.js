import { walletAddress } from "./store";
export async function checkIfWalletIsConnected() {
    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                console.log('Phantom wallet found!');
                const response = await solana.connect({ onlyIfTrusted: true });
                console.log('Connected with Public Key:', response.publicKey.toString());
                walletAddress.set(response.publicKey.toString());
            }
        } else {
            alert('Solana object not found! Get a Phantom Wallet 👻');
        }
    } catch (error) {
        console.error(error);

    }
};

export async function connectWallet() {
    const { solana } = window;
    if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        walletAddress.set(response.publicKey.toString());
    }
}


export async function connectifnotconnected() {
    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                console.log('Phantom wallet found!');
                const response = await solana.connect({ onlyIfTrusted: true });
                console.log('Connected with Public Key:', response.publicKey.toString());
                walletAddress.set(response.publicKey.toString());
            }
        } else {
            alert('Solana object not found! Get a Phantom Wallet 👻');
        }
    } catch (error) {
        console.error(error);
        if (error.code === 4001) {
            connectWallet()

        }

    }

}