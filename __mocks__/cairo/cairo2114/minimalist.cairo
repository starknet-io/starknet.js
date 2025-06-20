// Coded with Cairo 2.11.4
#[starknet::interface]
trait INameStarknet<TContractState> {
    fn set_name4(ref self: TContractState, name1: felt252);
    fn get_name4(self: @TContractState) -> felt252;
}


#[starknet::contract]
mod NameStarknet {
    use starknet::storage::StoragePointerReadAccess;
    use starknet::storage::StoragePointerWriteAccess;

    #[storage]
    struct Storage {
        name: felt252,
    }

    #[abi(embed_v0)]
    impl HelloStarknetImpl of super::INameStarknet<ContractState> {
        fn set_name4(ref self: ContractState, name1: felt252) {
            assert(name1 != '', 'Enter a name');
            self.name.write(name1);
        }

        fn get_name4(self: @ContractState) -> felt252 {
            self.name.read()
        }
    }
}