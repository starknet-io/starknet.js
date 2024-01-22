//Cairo 2.5.0

#[starknet::interface]
trait ITestReject<TContractState> {
    fn proceed_bytes31(self: @TContractState, str: bytes31) -> bytes31;
    fn get_string(self: @TContractState) -> ByteArray;
    fn proceed_string(self: @TContractState, mess: ByteArray) -> ByteArray;
}

#[starknet::contract]
mod MyTestReject {
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use core::bytes_31::Bytes31Trait;
    use core::byte_array::ByteArrayTrait;
    #[storage]
    struct Storage {}
    // To be tested with special characters (!@#$%^&*_+{}|:";./,\[];'<>?~`)
    #[abi(embed_v0)]
    impl TestReject of super::ITestReject<ContractState> {
        fn proceed_bytes31(self: @ContractState, str: bytes31) -> bytes31 {
            let mut mess: ByteArray = "Cairo has become the most popular language for developers!@#$%^&*_+|:'<>?~`";
            mess.append_byte(55_u8);
            str
        }

        fn get_string(self: @ContractState) -> ByteArray {
            let mess: ByteArray = "Cairo has become the most popular language for developers" + " + charizards !@#$%^&*_+|:'<>?~`";
            mess
        }

        fn proceed_string(self: @ContractState, mess: ByteArray) -> ByteArray {
            let mut res = mess;
            let add: ByteArray = " Zorg is back";
            res.append(@add);
            res
        }
    }
}
