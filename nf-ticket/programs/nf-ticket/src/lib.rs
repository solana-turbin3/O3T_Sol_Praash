use anchor_lang::prelude::*;
mod state;
mod error;
declare_id!("8efrrukFSizUBDoEMx6wuT67ZJQEikfcJLW9cC9b4eBu");

#[program]
pub mod nf_ticket {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name:String, fee:u16) -> Result<()> {
        // ctx.accounts.initialize(name, fee);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
