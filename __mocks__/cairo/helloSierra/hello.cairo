#[contract]
mod HelloStarknet {
    struct Storage {
        balance: felt252,
        balance_u8: u8
    }

    // Increases the balance by the given amount.
    #[external]
    fn increase_balance(amount: felt252) {
        balance::write(balance::read() + amount);
    }

    #[external]
    fn increase_balance_u8(amount: u8) {
        balance_u8::write(balance_u8::read() + amount);
    }

    // Returns the current balance.
    #[view]
    fn get_balance() -> felt252 {
        balance::read()
    }

    #[view]
    fn get_balance_u8() -> u8 {
        balance_u8::read()
    }
}
