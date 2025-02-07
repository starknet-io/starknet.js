use core::circuit::u96;

#[starknet::interface]
trait ITestU96<TContractState> {
    //fn test_u384(self:@TContractState)->u384;
    fn test_u96(self: @TContractState, inp: u96) -> u96;
}

#[starknet::contract]
mod test_u96 {
    use core::circuit::u96;

    #[storage]
    struct Storage {
        gift_id: u128,
    }

    #[abi(embed_v0)]
    impl TestU96 of super::ITestU96<ContractState> {
        fn test_u96(self: @ContractState, inp: u96) -> u96 {
            let a: felt252 = inp.into();
            let b = a + 1;
            let c: u96 = b.try_into().unwrap();
            c
        }
    }
}
