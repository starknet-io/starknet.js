// Cairo 2.9.2

#[starknet::interface]
trait ITestFixedArray<TContractState> {
    //fn test_u384(self:@TContractState)->u384;
    fn fixed_array(self: @TContractState, x: [core::integer::u32; 8]) -> [core::integer::u32; 8];
}

#[starknet::contract]
mod testfixed_array {

    #[storage]
    struct Storage {
    }

    #[abi(embed_v0)]
    impl TestFixed of super::ITestFixedArray<ContractState> {
        fn fixed_array(self: @ContractState, x: [core::integer::u32; 8]) -> [core::integer::u32; 8] {
            x
        }
    }
}
