// Coded with Cairo 2.11.4
#[derive(Drop, Serde)]
struct Point {
    x: u16,
    y: u16,
}
#[derive(Drop, Serde)]
struct Nested {
    p1: Point,
    p2: Point,
    extra: u8,
}

#[starknet::interface]
trait INameStarknet<TContractState> {
    fn request_felt(ref self: TContractState, name1: felt252);
    fn request_array_of_felts(ref self: TContractState, name1: Array<felt252>);
    fn request_struct(ref self: TContractState, name1: Point);
    fn request_array_of_structs(ref self: TContractState, name1: Array<Point>);
    fn request_nested_structs(ref self: TContractState, name1: Nested);
    fn request_tuple(ref self: TContractState, name1: (u8, u32));
    fn request_mixed_types(
        ref self: TContractState, name1: u128, name2: Point, name3: Array<felt252>,
    );
    fn get_felt(self: @TContractState) -> felt252;
    fn get_array_of_felts(self: @TContractState) -> Array<felt252>;
    fn get_struct(self: @TContractState) -> Point;
    fn get_array_of_structs(self: @TContractState) -> Array<Point>;
    fn get_nested_structs(self: @TContractState) -> Nested;
    fn get_tuple(self: @TContractState) -> (u8, u16, u32);
    fn get_mixed_types(self: @TContractState) -> ((u8, u16), felt252, Array<u128>, Point);
}

#[starknet::contract]
mod NameStarknet {
    use super::{Nested, Point};

    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl ContractImpl of super::INameStarknet<ContractState> {
        fn request_felt(ref self: ContractState, name1: felt252) {}
        fn request_array_of_felts(ref self: ContractState, name1: Array<felt252>) {}
        fn request_struct(ref self: ContractState, name1: Point) {}
        fn request_array_of_structs(ref self: ContractState, name1: Array<Point>) {}
        fn request_nested_structs(ref self: ContractState, name1: Nested) {}
        fn request_tuple(ref self: ContractState, name1: (u8, u32)) {}
        fn request_mixed_types(
            ref self: ContractState, name1: u128, name2: Point, name3: Array<felt252>,
        ) {}

        fn get_felt(self: @ContractState) -> felt252 {
            4_felt252
        }
        fn get_array_of_felts(self: @ContractState) -> Array<felt252> {
            array![4_felt252, 5_felt252]
        }
        fn get_struct(self: @ContractState) -> Point {
            Point { x: 1_u16, y: 2_u16 }
        }
        fn get_array_of_structs(self: @ContractState) -> Array<Point> {
            array![Point { x: 1_u16, y: 2_u16 }]
        }
        fn get_nested_structs(self: @ContractState) -> Nested {
            Nested {
                p1: Point { x: 1_u16, y: 2_u16 }, p2: Point { x: 3_u16, y: 4_u16 }, extra: 5_u8,
            }
        }
        fn get_tuple(self: @ContractState) -> (u8, u16, u32) {
            (1_u8, 2_u16, 3_u32)
        }
        fn get_mixed_types(self: @ContractState) -> ((u8, u16), felt252, Array<u128>, Point) {
            ((1_u8, 2_u16), 3_felt252, array![4_u128], Point { x: 1_u16, y: 2_u16 })
        }
    }
}
