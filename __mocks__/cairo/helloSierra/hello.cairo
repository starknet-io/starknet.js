use array::ArrayTrait;
use array::SpanTrait;
use option::OptionTrait;
use traits::TryInto;
use serde::Serde;

#[derive(Drop)]
struct Foo {
    val: felt252
}

impl FooSerde of Serde::<Foo> {
    fn serialize(ref serialized: Array<felt252>, input: Foo) {
        Serde::<felt252>::serialize(ref serialized, input.val);
    }

    fn deserialize(ref serialized: Span<felt252>) -> Option<Foo> {
        let val: felt252 = *serialized.pop_front()?;
        Option::Some(Foo { val } )
    }
}

#[contract]
mod HelloStarknet {
    //  libs
    use starknet::ContractAddress;
    use super::Foo;
    
    struct Storage {
        balance: felt252,
        balance_u8: u8,
        status: bool,
        ca: ContractAddress,
    }

    // Felt252 test.
    #[external]
    fn increase_balance(amount: felt252) {
        balance::write(balance::read() + amount);
    }

    #[view]
    fn get_balance() -> felt252 {
        balance::read()
    }

    // Bool Test
    #[external]
    fn set_status(new_status: bool) {
        status::write(new_status);
    }

    #[view]
    fn get_status() -> bool {
        status::read()
    }

    // ContractAddress
    #[external]
    fn set_ca(address: ContractAddress) {
        ca::write(address);
    }

    #[view]
    fn get_ca() -> ContractAddress {
        ca::read()
    }

    // u8 Test.
    #[external]
    fn increase_balance_u8(amount: u8) {
        balance_u8::write(balance_u8::read() + amount);
    }

    #[view]
    fn get_balance_u8() -> u8 {
        balance_u8::read()
    }

    // echo Array
    #[view]
    fn echo_array(data: Array<u8>) -> Array<u8> {
        data
    }

    // unamed Tuple
    #[view]
    fn echo_un_tuple(a:(felt252, u16)) -> (felt252, u16) {
        a
    }

    // echo Struct
    #[view]
    fn echo_struct(tt: Foo) -> Foo {
        tt
    }

}
