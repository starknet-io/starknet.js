#[contract]
mod HelloStarknet {
    // The Storage struct defines the contract's persistent state variables.
    // In Cairo 1.0, storage variables are accessed via `read()` and `write()` helpers.
    struct Storage {
        // 'balance' stores the main value. felt252 is Cairo's native field element type.
        balance: felt252,
    }

    // --- External Functions (State Changing) ---

    // The #[external] attribute marks this function as callable from other contracts or externally,
    // which requires a transaction and costs fees (gas).
    // The function modifies the contract's state (storage).
    #[external]
    fn increase_balance(amount: felt252) {
        // Read the current balance from storage, add the input amount, and write the new value back.
        // The read/write functions are automatically generated based on the Storage struct definition.
        balance::write(balance::read() + amount);
    }

    // --- View Functions (Read Only) ---

    // The #[view] attribute marks this function as read-only.
    // It can be called externally without a transaction and does not cost any fees.
    #[view]
    fn get_balance() -> felt252 {
        // Read and return the current balance from storage.
        balance::read()
    }
}
