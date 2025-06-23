// Coded with Cairo 2.11.4
#[derive(Drop, Serde)]
struct Struct1 {
    discount_fix_bps: u64, // fix discount in BPS
    discount_transfer_bps: u64 // transfer % discount in BPS
}

#[derive(Drop, Serde)]
struct Struct2 {
    info: Struct1,
    data: felt252,
    data2: (u16, u16),
}

#[derive(Drop, Serde)]
struct Struct32 {
    b: u32,
    c: (u16, u32, u64, u128),
}

#[derive(Drop, Serde)]
struct Struct3 {
    a: u8,
    b: Struct32,
}

#[derive(Drop, Serde)]
struct StructY {
    y1: u64,
    y2: u64,
}

#[derive(Drop, Serde)]
struct StructX {
    x1: u64,
    x2: StructY,
    x3: ((u8, u8), ((u32, u32), (u16, u16))),
}

#[starknet::interface]
trait IEcho<TContractState> {
    fn echo(
        self: @TContractState,
        t1: felt252,
        n1: felt252,
        tl2: Array<felt252>,
        k1: Array<Struct3>,
        k2: (felt252, StructX, u64),
        u1: u256,
        s1: Struct1,
        s2: Struct2,
        af1: Array<u16>,
        au1: Array<u256>,
        as1: Array<Struct1>,
        atmk: Array<((StructX, u32), u64)>,
        atmku: Array<((StructY, u32), u64)>,
    ) -> (
        felt252,
        felt252,
        Array<felt252>,
        Array<Struct3>,
        (felt252, StructX, u64),
        u256,
        Struct1,
        Struct2,
        Array<u16>,
        Array<u256>,
        Array<Struct1>,
        Array<((StructX, u32), u64)>,
        Array<((StructY, u32), u64)>,
    );

    fn iecho(
        ref self: TContractState,
        t1: felt252,
        n1: felt252,
        tl2: Array<felt252>,
        k1: Array<Struct3>,
        k2: (felt252, StructX, u64),
        u1: u256,
        s1: Struct1,
        s2: Struct2,
        af1: Array<u16>,
        au1: Array<u256>,
        as1: Array<Struct1>,
        atmk: Array<((StructX, u32), u64)>,
        atmku: Array<((StructY, u32), u64)>,
    ) -> (
        felt252,
        felt252,
        Array<felt252>,
        Array<Struct3>,
        (felt252, StructX, u64),
        u256,
        Struct1,
        Struct2,
        Array<u16>,
        Array<u256>,
        Array<Struct1>,
        Array<((StructX, u32), u64)>,
        Array<((StructY, u32), u64)>,
    );
}

#[starknet::contract]
mod Echo {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use super::{Struct1, Struct2, Struct3, StructX, StructY};

    #[storage]
    struct Storage {
        testStorage: felt252,
    }

    #[abi(embed_v0)]
    impl ContractImpl of super::IEcho<ContractState> {
        fn echo(
            self: @ContractState,
            t1: felt252,
            n1: felt252,
            tl2: Array<felt252>,
            k1: Array<Struct3>,
            k2: (felt252, StructX, u64),
            u1: u256,
            s1: Struct1,
            s2: Struct2,
            af1: Array<u16>,
            au1: Array<u256>,
            as1: Array<Struct1>,
            atmk: Array<((StructX, u32), u64)>,
            atmku: Array<((StructY, u32), u64)>,
        ) -> (
            felt252,
            felt252,
            Array<felt252>,
            Array<Struct3>,
            (felt252, StructX, u64),
            u256,
            Struct1,
            Struct2,
            Array<u16>,
            Array<u256>,
            Array<Struct1>,
            Array<((StructX, u32), u64)>,
            Array<((StructY, u32), u64)>,
        ) {
            (t1, n1, tl2, k1, k2, u1, s1, s2, af1, au1, as1, atmk, atmku)
        }

        fn iecho(
            ref self: ContractState,
            t1: felt252,
            n1: felt252,
            tl2: Array<felt252>,
            k1: Array<Struct3>,
            k2: (felt252, StructX, u64),
            u1: u256,
            s1: Struct1,
            s2: Struct2,
            af1: Array<u16>,
            au1: Array<u256>,
            as1: Array<Struct1>,
            atmk: Array<((StructX, u32), u64)>,
            atmku: Array<((StructY, u32), u64)>,
        ) -> (
            felt252,
            felt252,
            Array<felt252>,
            Array<Struct3>,
            (felt252, StructX, u64),
            u256,
            Struct1,
            Struct2,
            Array<u16>,
            Array<u256>,
            Array<Struct1>,
            Array<((StructX, u32), u64)>,
            Array<((StructY, u32), u64)>,
        ) {
            self.testStorage.write(self.testStorage.read() + t1);
            (t1, n1, tl2, k1, k2, u1, s1, s2, af1, au1, as1, atmk, atmku)
        }
    }
}
