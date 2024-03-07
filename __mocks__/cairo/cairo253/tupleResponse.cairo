// Use Cairo 2.5.3
use starknet::eth_address::EthAddress;
use starknet::eth_address::{EthAddressSerde, Felt252TryIntoEthAddress};

#[derive(Drop, Serde)]
struct Order2 {
    p1: felt252,
    p2: Array<felt252>,
}

#[derive(Drop, Serde)]
enum Direction {
    North,
    East: Result<u16, felt252>
}

#[starknet::interface]
trait ITupleStarknet<TContractState> {
    fn simple(self: @TContractState) -> u8;
    fn get_tuple1(self: @TContractState) -> (u8, Array<u16>, bool);
    fn get_tuple2(self: @TContractState) -> (bytes31, ByteArray);
    fn get_tuple3(self: @TContractState) -> (u256, Order2);
    fn get_tuple4(self: @TContractState) -> (EthAddress, u256);
    fn get_tuple5(self: @TContractState) -> (Result<u64, u8>, u8);
    fn get_tuple6(self: @TContractState) -> (Option<u64>, u8);
    fn get_tuple7(self: @TContractState) -> (Direction, u8);
    fn get_tuple8(self: @TContractState) -> ((u256, Array<u16>), u8);
    fn get_tuple9(
        self: @TContractState, l0: ((u256, (u16, Order2)), u8)
    ) -> ((u256, (u16, Order2)), u8);
    fn get_tuple10(self: @TContractState) -> (u256,Array<Result<u256, u8>>);
    fn get_tuple11(self: @TContractState) -> (u16,Option<Result<u16, felt252>>);
    fn get_tuple12(self: @TContractState) -> (Direction, u8);
}


#[starknet::contract]
mod HelloStarknet {
    use starknet::eth_address::EthAddress;
    use starknet::eth_address::{EthAddressSerde, Felt252TryIntoEthAddress};
    use super::{Order2, Direction};

    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl HelloStarknetImpl of super::ITupleStarknet<ContractState> {
        fn simple(self: @ContractState) -> u8 {
            26_u8
        }

        fn get_tuple1(self: @ContractState) -> (u8, Array<u16>, bool) {
            let arr = array![5000_u16, 6000_u16];
            let a: (u8, Array<u16>, bool) = (100_u8, arr, true);
            a
        }

        fn get_tuple2(self: @ContractState) -> (bytes31, ByteArray) {
            //let str:bytes31="a";
            let mess: bytes31 = bytes31_const::<0x496e707574>(); // "Input"
            let long_mess: ByteArray = "Zorg is very verbose and creates only long sentences.";
            let a: (bytes31, ByteArray) = (mess, long_mess);
            a
        }

        fn get_tuple3(self: @ContractState) -> (u256, Order2) {
            let arr = array![1_felt252, 2_felt252, 3_felt252];
            let structure = Order2 { p1: 10_felt252, p2: arr };
            let a: (u256, Order2) = (123456_u256, structure);
            a
        }

        fn get_tuple4(self: @ContractState) -> (EthAddress, u256) {
            let ethA: EthAddress = 123_felt252.try_into().unwrap();
            let a: (EthAddress, u256) = (ethA, 500_u256);
            a
        }

        fn get_tuple5(self: @ContractState) -> (Result<u64, u8>, u8) {
            let r: Result<u64, u8> = Result::Ok(18_u64);
            let a: (Result<u64, u8>, u8) = (r, 4_u8);
            a
        }

        fn get_tuple6(self: @ContractState) -> (Option<u64>, u8) {
            let o: Option<u64> = Option::Some(18_u64);
            let a: (Option<u64>, u8) = (o, 4_u8);
            a
        }

        fn get_tuple7(self: @ContractState) -> (Direction, u8) {
            let r: Direction = Direction::North;
            let a: (Direction, u8) = (r, 4_u8);
            a
        }

        fn get_tuple8(self: @ContractState) -> ((u256, Array<u16>), u8) {
            let arr = array![1_u16, 2_u16, 3_u16];
            let t: (u256, Array<u16>) = (600_u256, arr);
            let a: ((u256, Array<u16>), u8) = (t, 8_u8);
            a
        }

        fn get_tuple9(
            self: @ContractState, l0: ((u256, (u16, Order2)), u8)
        ) -> ((u256, (u16, Order2)), u8) {
            let ((my_u256, (my_u16, my_order2)), my_u8) = l0;
            let arr = my_order2.p2;
            let o = Order2 { p1: my_order2.p1, p2: arr };
            let r: (u16, Order2) = (my_u16, o);
            let t: (u256, (u16, Order2)) = (my_u256, r);
            let a: ((u256, (u16, Order2)), u8) = (t, my_u8);
            a
        }

        fn get_tuple10(self: @ContractState) -> (u256,Array<Result<u256, u8>>) {
            let r1: Result<u256, u8> = Result::Ok(6000_u256);
            let r2: Result<u256, u8> = Result::Ok(7000_u256);
            let arr = array![r1, r2];
            let a: (u256,Array<Result<u256, u8>>) = (8000_u256,arr);
            a
        }

        fn get_tuple11(self: @ContractState) -> (u16,Option<Result<u16, felt252>>) {
            let r: Result<u16, felt252> = Result::Ok(2000_u16);
            let o: Option<Result<u16, felt252>> = Option::Some(r);
            let a: (u16,Option<Result<u16, felt252>>) = (400_u16,o);
            a
        }

        fn get_tuple12(self: @ContractState) -> (Direction, u8) {
            let r: Result<u16, felt252> = Result::Ok(2000_u16);
            let e: Direction = Direction::East(r);
            let a: (Direction, u8) = (e, 4_u8);
            a
        }

    }
}
