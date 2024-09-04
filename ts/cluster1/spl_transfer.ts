import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer, getAccount } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("H8LKPx5k3h7fwN4hDqAZxvxnQv4DvrGaLZnabnqfd1mA");

// Recipient address
const to = new PublicKey("9kQGWWmror3KP7nhe6hiYpWMjJn5GcAHDoRbPdXvKn6u");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ataFromWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`ataFromWallet ata is: ${ataFromWallet.address.toBase58()}`);
        console.log(keypair.publicKey)
        // Get the token account of the toWallet address, and if it does not exist, create it
        const ataToWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log(`ataToWallet ata is: ${ataToWallet.address.toBase58()}`);

        // Check the balance of the ataFromWallet account
        const fromWalletAccountInfo = await getAccount(connection, ataFromWallet.address);
        const balance = fromWalletAccountInfo.amount; // Token balance in the smallest unit (not in SOL)

        console.log(`Token balance in the fromWallet: ${balance}`);

        // Check if there are enough tokens to transfer
        const amountToTransfer = 0.1 * LAMPORTS_PER_SOL; // Adjust the amount if necessary

        if (balance < amountToTransfer) {
            throw new Error(`Insufficient funds: Required ${amountToTransfer}, but only ${balance} available.`);
        }

        // Transfer the tokens to the ataToWallet account
        const signature = await transfer(
            connection,
            keypair,
            ataFromWallet.address,
            ataToWallet.address,
            keypair,
            amountToTransfer
        );

        console.log(`Transfer signature: ${signature}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
