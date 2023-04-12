#[contract]
mod HelloStarknet {
    struct Storage {
        balance: felt252,
        balance_u8: u8,
        status: bool,
    }

    // Felt252 test.
    #[external]
    fn increase_balance(amount: felt252) {
        balance::write(balance::read() + amount);
    }

    #[view]
    fn get_balance() -> felt252 {
        balance::read()
    }

    // Bool Test
    #[external]
    fn set_status(new_status: bool) {
        status::write(new_status);
    }

    #[view]
    fn get_status() -> bool {
        status::read()
    }

    // u8 Test.
    #[external]
    fn increase_balance_u8(amount: u8) {
        balance_u8::write(balance_u8::read() + amount);
    }

    #[view]
    fn get_balance_u8() -> u8 {
        balance_u8::read()
    }
}
