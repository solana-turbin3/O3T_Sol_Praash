use anchor_lang::prelude::*;
mod context;
use context::*;
mod stake;
use stake::*;

declare_id!("wgtFgMdtVdjdjFVkz3RJ11T2Q6Wxb4JPCB67UHahCpe");

#[program]
pub mod escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed:u64, amount: u64, recieve: u64) -> Result<()> {
        // init escrow
        ctx.accounts.save_escrow(seed, recieve, ctx.bumps.escrow)?;
        ctx.accounts.deposit_to_vault(amount)
    }
    pub fn take(ctx: Context<Take>) -> Result<()> {
         
        ctx.accounts.transfer_to_maker()?;
        ctx.accounts.withdrow_and_close()
    }
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.withdrow_and_close()
    }
}

