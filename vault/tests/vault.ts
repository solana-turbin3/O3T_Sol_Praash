import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVaultQ32024 } from "../target/types/anchor_vault_q3_2024";
import { expect } from "chai";

describe("vault_q3_2024", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorVaultQ32024 as Program<AnchorVaultQ32024>;

  const vaultState = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), provider.publicKey.toBytes()],
    program.programId
  )[0];

  const vault = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), vaultState.toBytes()],
    program.programId
  )[0];

  async function checkTransaction(amount: Number) {
    return (await provider.connection.getAccountInfo(vault)).lamports === amount;
  }

  it("Init Vault", async () => {
    try {
      await provider.connection.requestAirdrop(provider.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL);
      const tx = await program.methods.initialize().accountsPartial(
        {
          user: provider.wallet.publicKey,
          vaultState,
          vault,
          systemProgram: anchor.web3.SystemProgram.programId
        }
      ).rpc();

      console.log("Your transaction signature", tx);
      console.log("Init Test Cases Passsed ✅")
    } catch (error) {
      throw (error)
    }

  });

  it("Deposite", async () => {
    try {
      const tx = await program.methods.deposit(new anchor.BN(500000000)).accountsPartial(
        {
          user: provider.wallet.publicKey,
          vaultState,
          vault,
          systemProgram: anchor.web3.SystemProgram.programId
        }
      ).rpc();
      console.log("Your transaction signature", tx);
      if (checkTransaction(new anchor.BN(500000000).toNumber())) {
        console.log("Deposite Test Cases Passsed ✅")
      } else {
        console.log("something wrong with amount or vault balance");
      }

    } catch (error) {
      throw (error)
    }
  });

  it("Withdrow", async () => {
    try {
      const tx = await program.methods.withdraw(new anchor.BN(500000000)).accountsPartial(
        {
          user: provider.wallet.publicKey,
          vaultState,
          vault,
          systemProgram: anchor.web3.SystemProgram.programId
        }
      ).rpc();
      console.log("Your transaction signature", tx);
      if (checkTransaction(new anchor.BN(500000000).toNumber())) {
        console.log("Withdrow Test Cases Passsed ✅")
      } else {
        console.log("something wrong with amount or vault balance");
      }
    } catch (error) {
      throw (error)
    }
  });

it("Close", async()=>{
  try {
     const tx = await program.methods.close().accountsPartial(
      {
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).rpc();
    console.log("Your transaction signature", tx);
    if((await provider.connection.getAccountInfo(vault)) === null) console.log("Close Test Case Passed ✅");
    else console.log("something went wrong with close account function!");
  } catch (error) {
    throw(error) 
  }
})
});