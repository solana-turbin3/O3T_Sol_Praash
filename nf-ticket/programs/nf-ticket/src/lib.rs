use anchor_lang::prelude::*;

declare_id!("8efrrukFSizUBDoEMx6wuT67ZJQEikfcJLW9cC9b4eBu");

#[program]
pub mod nf_ticket {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
