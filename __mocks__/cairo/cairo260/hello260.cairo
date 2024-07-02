// Cairo 2.6.0
#[starknet::interface]
trait IHelloStarknet<TContractState> {
    fn set_name(ref self: TContractState, name1: felt252);
    fn get_name(self: @TContractState) -> felt252;
}


#[starknet::contract]
mod HelloStarknet {
    #[storage]
    struct Storage {
        name: felt252,
    }

    #[abi(embed_v0)]
    impl HelloStarknetImpl of super::IHelloStarknet<ContractState> {
        fn set_name(ref self: ContractState, name1: felt252) {
            assert(name1 != '', 'Enter a name');
            self.name.write(name1);
        }

        fn get_name(self: @ContractState) -> felt252 {
            self.name.read()
        }
    }
}