import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl';
import kp from './keypair.json'
import { GIFS } from './store';


// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)
// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
    preflightCommitment: "processed"
}

export const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
        connection, window.solana, opts.preflightCommitment,
    );
    return provider;
}

export const getGifList = async () => {
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

        console.log("Got the account", account)
        console.log(account.gifList, "giflist")
        GIFS.set(account.gifList)
        console.log(account)

        // pubKey.set(account)


    } catch (error) {
        console.log("Error in getGifList: ", error)
        GIFS.set(null);
    }
}

export const createGifAccount = async () => {
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        console.log("ping")
        console.log(provider.wallet.privateKey)

        await program.rpc.startStuffOff({
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [baseAccount]
        });
        console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
        await getGifList();

    } catch (error) {
        console.log("Error creating BaseAccount account:", error)
    }
}


export async function sendGif(link) {
    if (link.length === 0) {
        console.log("No gif link given!")
        return
    }
    console.log('Gif link:', link);
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);

        await program.rpc.addGif(link, {
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
            },
        });
        console.log("GIF successfully sent to program", link)

        await getGifList();
    } catch (error) {
        console.log("Error sending GIF:", error)
    }
};