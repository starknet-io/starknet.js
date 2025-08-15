#[starknet::interface]
trait IIntegerTypesStorage<TContractState> {
    // Unsigned integer functions
    fn store_u8(ref self: TContractState, value: u8);
    fn read_u8(self: @TContractState) -> u8;
    fn store_u16(ref self: TContractState, value: u16);
    fn read_u16(self: @TContractState) -> u16;
    fn store_u64(ref self: TContractState, value: u64);
    fn read_u64(self: @TContractState) -> u64;
    fn store_u128(ref self: TContractState, value: u128);
    fn read_u128(self: @TContractState) -> u128;

    // Signed integer functions
    fn store_i8(ref self: TContractState, value: i8);
    fn read_i8(self: @TContractState) -> i8;
    fn store_i16(ref self: TContractState, value: i16);
    fn read_i16(self: @TContractState) -> i16;
    fn store_i32(ref self: TContractState, value: i32);
    fn read_i32(self: @TContractState) -> i32;
    fn store_i64(ref self: TContractState, value: i64);
    fn read_i64(self: @TContractState) -> i64;
    fn store_i128(ref self: TContractState, value: i128);
    fn read_i128(self: @TContractState) -> i128;

    // Batch operations
    fn store_all_unsigned(
        ref self: TContractState,
        u8_val: u8,
        u16_val: u16,
        u64_val: u64,
        u128_val: u128
    );
    fn read_all_unsigned(self: @TContractState) -> (u8, u16, u64, u128);
    fn store_all_signed(
        ref self: TContractState,
        i8_val: i8,
        i16_val: i16,
        i32_val: i32,
        i64_val: i64,
        i128_val: i128
    );
    fn read_all_signed(self: @TContractState) -> (i8, i16, i32, i64, i128);

    // Boundary value testing
    fn test_boundary_values_unsigned(self: @TContractState) -> (u8, u16, u64, u128);
    fn test_boundary_values_signed(self: @TContractState) -> (i8, i16, i32, i64, i128);
    fn test_negative_boundary_values_signed(self: @TContractState) -> (i8, i16, i32, i64, i128);
}

#[starknet::contract]
mod IntegerTypesStorage {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        // Unsigned integer types
        stored_u8: u8,
        stored_u16: u16,
        stored_u64: u64,
        stored_u128: u128,
        // Signed integer types
        stored_i8: i8,
        stored_i16: i16,
        stored_i32: i32,
        stored_i64: i64,
        stored_i128: i128,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        // Unsigned integer events
        U8Stored: U8Stored,
        U16Stored: U16Stored,
        U64Stored: U64Stored,
        U128Stored: U128Stored,
        // Signed integer events
        I8Stored: I8Stored,
        I16Stored: I16Stored,
        I32Stored: I32Stored,
        I64Stored: I64Stored,
        I128Stored: I128Stored,
    }

    #[derive(Drop, starknet::Event)]
    struct U8Stored {
        #[key]
        value: u8,
    }

    #[derive(Drop, starknet::Event)]
    struct U16Stored {
        #[key]
        value: u16,
    }

    #[derive(Drop, starknet::Event)]
    struct U64Stored {
        #[key]
        value: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct U128Stored {
        #[key]
        value: u128,
    }

    #[derive(Drop, starknet::Event)]
    struct I8Stored {
        #[key]
        value: i8,
    }

    #[derive(Drop, starknet::Event)]
    struct I16Stored {
        #[key]
        value: i16,
    }

    #[derive(Drop, starknet::Event)]
    struct I32Stored {
        #[key]
        value: i32,
    }

    #[derive(Drop, starknet::Event)]
    struct I64Stored {
        #[key]
        value: i64,
    }

    #[derive(Drop, starknet::Event)]
    struct I128Stored {
        #[key]
        value: i128,
    }

    #[abi(embed_v0)]
    impl IntegerTypesStorageImpl of super::IIntegerTypesStorage<ContractState> {
        // Unsigned integer storage functions
        fn store_u8(ref self: ContractState, value: u8) {
            self.stored_u8.write(value);
            self.emit(U8Stored { value });
        }

        fn read_u8(self: @ContractState) -> u8 {
            self.stored_u8.read()
        }

        fn store_u16(ref self: ContractState, value: u16) {
            self.stored_u16.write(value);
            self.emit(U16Stored { value });
        }

        fn read_u16(self: @ContractState) -> u16 {
            self.stored_u16.read()
        }

        fn store_u64(ref self: ContractState, value: u64) {
            self.stored_u64.write(value);
            self.emit(U64Stored { value });
        }

        fn read_u64(self: @ContractState) -> u64 {
            self.stored_u64.read()
        }


        fn store_u128(ref self: ContractState, value: u128) {
            self.stored_u128.write(value);
            self.emit(U128Stored { value });
        }

        fn read_u128(self: @ContractState) -> u128 {
            self.stored_u128.read()
        }

        // Signed integer storage functions
        fn store_i8(ref self: ContractState, value: i8) {
            self.stored_i8.write(value);
            self.emit(I8Stored { value });
        }

        fn read_i8(self: @ContractState) -> i8 {
            self.stored_i8.read()
        }

        fn store_i16(ref self: ContractState, value: i16) {
            self.stored_i16.write(value);
            self.emit(I16Stored { value });
        }

        fn read_i16(self: @ContractState) -> i16 {
            self.stored_i16.read()
        }

        fn store_i32(ref self: ContractState, value: i32) {
            self.stored_i32.write(value);
            self.emit(I32Stored { value });
        }

        fn read_i32(self: @ContractState) -> i32 {
            self.stored_i32.read()
        }

        fn store_i64(ref self: ContractState, value: i64) {
            self.stored_i64.write(value);
            self.emit(I64Stored { value });
        }

        fn read_i64(self: @ContractState) -> i64 {
            self.stored_i64.read()
        }

        fn store_i128(ref self: ContractState, value: i128) {
            self.stored_i128.write(value);
            self.emit(I128Stored { value });
        }

        fn read_i128(self: @ContractState) -> i128 {
            self.stored_i128.read()
        }

        // Batch operations for testing multiple types at once
        fn store_all_unsigned(
            ref self: ContractState,
            u8_val: u8,
            u16_val: u16,
            u64_val: u64,
            u128_val: u128
        ) {
            self.store_u8(u8_val);
            self.store_u16(u16_val);
            self.store_u64(u64_val);
            self.store_u128(u128_val);
        }

        fn read_all_unsigned(self: @ContractState) -> (u8, u16, u64, u128) {
            (
                self.read_u8(),
                self.read_u16(),
                self.read_u64(),
                self.read_u128()
            )
        }

        fn store_all_signed(
            ref self: ContractState,
            i8_val: i8,
            i16_val: i16,
            i32_val: i32,
            i64_val: i64,
            i128_val: i128
        ) {
            self.store_i8(i8_val);
            self.store_i16(i16_val);
            self.store_i32(i32_val);
            self.store_i64(i64_val);
            self.store_i128(i128_val);
        }

        fn read_all_signed(self: @ContractState) -> (i8, i16, i32, i64, i128) {
            (
                self.read_i8(),
                self.read_i16(),
                self.read_i32(),
                self.read_i64(),
                self.read_i128()
            )
        }

        // Test boundary values
        fn test_boundary_values_unsigned(self: @ContractState) -> (u8, u16, u64, u128) {
            (
                255_u8,            // Max u8
                65535_u16,         // Max u16
                18446744073709551615_u64, // Max u64
                340282366920938463463374607431768211455_u128 // Max u128
            )
        }

        fn test_boundary_values_signed(self: @ContractState) -> (i8, i16, i32, i64, i128) {
            (
                127_i8,            // Max i8
                32767_i16,         // Max i16
                2147483647_i32,    // Max i32
                9223372036854775807_i64, // Max i64
                170141183460469231731687303715884105727_i128 // Max i128
            )
        }

        fn test_negative_boundary_values_signed(self: @ContractState) -> (i8, i16, i32, i64, i128) {
            (
                -128_i8,           // Min i8
                -32768_i16,        // Min i16
                -2147483648_i32,   // Min i32
                -9223372036854775808_i64, // Min i64
                -170141183460469231731687303715884105728_i128 // Min i128
            )
        }
    }
}