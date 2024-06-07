//Cairo 2.6.3
// class : 0x2338d4a957a80b9a618f39a4b79ce4e78b89479ed31ae8c732d287946969405

#[derive(Copy, Drop, Serde)]
struct Point {
    x: u16,
    y: u16,
    z: NonZero::<u256>
}

#[derive(Copy, Drop, Serde)]
struct InFlight {
    position: Point
}

#[starknet::interface]
trait ITestZeroable<TContractState> {
    fn get_nonZero_u128(self: @TContractState) -> NonZero::<u128>;
    fn send_nonZero_u64(self: @TContractState, inp: NonZero::<u64>) -> u64;
    fn get_nonZero_felt(self: @TContractState) -> NonZero::<felt252>;
    fn send_nonZero_felt(self: @TContractState, inp: NonZero::<felt252>) -> felt252;
    fn get_nonZero_u256(self: @TContractState) -> NonZero::<u256>;
    fn send_nonZero_u256(self: @TContractState, inp: NonZero::<u256>) -> u256;
    fn get_nonZero_struct(self: @TContractState) -> InFlight;
    fn send_nonZero_struct(self: @TContractState, where: InFlight) -> bool;
}

#[starknet::contract]
mod MyTestZEROABLE {
    use core::option::OptionTrait;
    use core::zeroable::NonZero;

    use super::{Point, InFlight};


    #[storage]
    struct Storage {
        counter: u8,
    }


    #[abi(embed_v0)]
    impl TestZEROABLE of super::ITestZeroable<ContractState> {
        fn get_nonZero_u128(self: @ContractState) -> NonZero::<u128> {
            let x: NonZero::<u128> = 500;
            x
        }

        fn send_nonZero_u64(self: @ContractState, inp: NonZero::<u64>) -> u64 {
            inp.into()
        }

        fn send_nonZero_u256(self: @ContractState, inp: NonZero::<u256>) -> u256 {
            inp.into()
        }

        fn get_nonZero_u256(self: @ContractState) -> NonZero::<u256> {
            let x: NonZero::<u256> = 0x04656236523452345234523524524510abcabcabcabcabcabcabacabcabbacab;
            x
        }

        fn get_nonZero_felt(self: @ContractState) -> NonZero::<felt252> {
            let x: NonZero::<felt252> = 80000000000;
            x
        }

        fn send_nonZero_felt(self: @ContractState, inp: NonZero::<felt252>) -> felt252 {
            inp.into()
        }

        fn get_nonZero_struct(self: @ContractState) -> InFlight {
            let altitude: NonZero::<u256> = 0x08656236523452345234523524524510abcabcabcabcabcabcabacabcabbacab;
            let coord = Point { x: 10000_u16, y: 3000_u16, z: altitude };
            let posi = InFlight { position: coord };
            posi
        }

        fn send_nonZero_struct(self: @ContractState, where: InFlight) -> bool {
            let altitude = where.position.z;
            altitude.into() != 0_u256
        }

    }
}
