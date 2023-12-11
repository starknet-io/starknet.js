//Cairo 2.4.0

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
    struct Storage {
        counter: u8
    }

    #[external(v0)]
    impl TestReject of super::ITestReject<ContractState> {
        fn proceed_bytes31(self: @ContractState, str: bytes31) -> bytes31 {
            let mut mess: ByteArray = "azertzertrty dfghfghj dfgh dfghazert sdfgsdf ";
            mess.append_byte(55_u8);
            let mot: felt252 = ' Zorg';
            str
        }

        fn get_string(self: @ContractState) -> ByteArray {
            let mut mess: ByteArray = "azertzertrty dfghfghj dfgh dfghazert sdfgsdf ";
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
