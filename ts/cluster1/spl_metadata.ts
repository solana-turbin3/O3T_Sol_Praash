import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey, createGenericFile } from "@metaplex-foundation/umi";
import bs58 from "bs58"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

import { readFile } from "fs/promises";
// Define our Mint address
const mint = publicKey("E8QHaqTa1aiwswHcDj43gv1izPeNpHKGrwGJV1zGNBia")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com', "confirmed");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here

        // const image = await readFile("/home/praash/Desktop/solana-starter/ts/cluster1/myrug.png");

        // const umiImageFile = createGenericFile(image, "my-rug.png", {
        //     tags: [{ name: "Content-Type", value: "image/png" }],
        //   });

        //   const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        //     throw new Error(err);
        //   });

        //   console.log("Your image URI: ", imageUri[0]);
          // https://arweave.net/JUcLTlBz-WYwkG47fur_fEhPt69Kz6rluaKyYM1UC3Q
        
          const metadata = {
            name: 'Explore JAPAN',
            symbol: 'EXJAP',
            description: 'test token',
            uri: 'https://github.com/user-attachments/assets/54855d6e-5383-45c9-bb39-60797c84c346',
            creators: [
              {
                address: 'CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u',
              },
            ],
         };
         
        const umiJSOnFile = createGenericFile(JSON.stringify(metadata), "explore japan metadata", {
            tags: [{ name: "Content-Type", value: "JSON" }],
          });

        const Uri = await umi.uploader.upload([umiJSOnFile]).catch((err) => {
            throw new Error(err);
          });
        console.log("Your metadata URI: ", Uri);


        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
          };
          let data: DataV2Args = {
            name: "explore japan",
            symbol: "EXJAP",
            uri: Uri[0],
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          };
          let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null,
          };
          let tx = createMetadataAccountV3(umi, {
            ...accounts,
            ...args,
          });
          let result = await tx.sendAndConfirm(umi);
          console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
