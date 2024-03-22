// Cairo 2.6.0

use core::integer::u512;

#[starknet::interface]
trait IUint512<TContractState> {
    fn get_u512(self: @TContractState) -> u512;
    fn return_u512(self: @TContractState, my_u512: u512) -> u512;
    fn div_u512(self: @TContractState, my_u512: u512, divisor: u256) -> (u512, u256);
}


#[starknet::contract]
mod TestUint512 {
    use core::integer::{u512, u512_safe_div_rem_by_u256};

    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl Uint512 of super::IUint512<ContractState> {
        fn get_u512(self: @ContractState) -> u512 {
            u512 {
                limb0: 0x00000000000000000000000000000000,
                limb1: 0x11111111111111111111111111111111,
                limb2: 0x22222222222222222222222222222222,
                limb3: 0x33333333333333333333333333333333,
            }
        }

        fn return_u512(self: @ContractState, my_u512: u512) -> u512 {
            my_u512
        }

        fn div_u512(self: @ContractState, my_u512: u512, divisor: u256) -> (u512, u256) {
            let (q, r) = u512_safe_div_rem_by_u256(my_u512, divisor.try_into().unwrap());
            (q, r)
        }
    }
}

