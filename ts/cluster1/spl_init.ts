import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// my pub Key -> 5AoDpP6Vo7HfzTgxQPfgkx8MbShCjaK2YdgF6Wk1Lv2W

// Import our keypair from the wallet file 
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        const decimals = 6;
        const mint = await createMint(connection, keypair, keypair.publicKey, null, decimals);
        console.log(mint.toBase58()); // E8QHaqTa1aiwswHcDj43gv1izPeNpHKGrwGJV1zGNBia
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
