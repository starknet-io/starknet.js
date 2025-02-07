#[starknet::contract]
pub mod OnlyConstructor {
    use starknet::ContractAddress;
    use starknet::storage::Map;

    #[storage]
    struct Storage {
        names: Map::<ContractAddress, felt252>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, name: felt252, address: ContractAddress) {
        self.names.write(address, name);
    }
}
