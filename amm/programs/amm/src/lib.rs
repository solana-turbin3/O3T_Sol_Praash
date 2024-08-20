pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("5yA9R7mFhaGARqBDtexjY5Kkea5niKunm4Y1rKCNH3PE");

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(ctx: Context<InitializeConfig>, seed: u64, fee: u16) -> Result<()> {
        ctx.accounts.initialize_config(seed, fee, ctx.bumps)
    }
}