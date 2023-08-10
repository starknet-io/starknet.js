//Cairo 2.1.0

#[starknet::interface]
trait ITestC210<TContractState> {
    fn test_felt(
        self: @TContractState,
        p1: felt252,
        p2: u128,
        p3: u8
    ) -> u128;
}

#[starknet::contract]
mod MyTestFelt {
    

    #[storage]
    struct Storage {
        counter: u128, 
    }

    #[external(v0)]
    impl TestFelt of super::ITestC210<ContractState> {
        fn test_felt(
            self: @ContractState,
            p1: felt252,
        p2: u128,
        p3: u8
        ) -> u128 {
            p2+1
        }
    }
}
