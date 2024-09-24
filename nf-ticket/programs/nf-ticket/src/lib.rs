use anchor_lang::prelude::*;
mod state;
mod error;
declare_id!("8efrrukFSizUBDoEMx6wuT67ZJQEikfcJLW9cC9b4eBu");

#[program]
pub mod nf_ticket {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name:String, fee:u16) -> Result<()> {
        ctx.accounts.initialize(name, fee);
        Ok(())
    }

    pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
        ctx.accounts.list(price, ctx.bumps)
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        ctx.accounts.delist(ctx.bumps)
    }

    pub fn buy(ctx: Context<Buy>) -> Result<()> {
        ctx.accounts.buy(ctx.bumps)
    }
}
