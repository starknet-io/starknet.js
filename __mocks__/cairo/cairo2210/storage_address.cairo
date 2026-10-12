use starknet::storage_access::StorageAddress;

#[starknet::interface]
pub trait IStorageAddressStorage<TContractState> {
    fn value_address(self: @TContractState) -> StorageAddress;
    fn read_at(self: @TContractState, address: StorageAddress) -> felt252;
    fn echo(self: @TContractState, address: StorageAddress) -> StorageAddress;
}

#[starknet::contract]
pub mod StorageAddressStorage {
    use starknet::storage::StoragePointerWriteAccess;
    use starknet::storage_access::StorageAddress;
    use starknet::syscalls::storage_read_syscall;
    use starknet::SyscallResultTrait;

    #[storage]
    struct Storage {
        value: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, value: felt252) {
        self.value.write(value);
    }

    #[abi(embed_v0)]
    impl StorageAddressStorageImpl of super::IStorageAddressStorage<ContractState> {
        // The address of a simple storage variable is the sn_keccak of its name.
        fn value_address(self: @ContractState) -> StorageAddress {
            selector!("value").try_into().unwrap()
        }

        fn read_at(self: @ContractState, address: StorageAddress) -> felt252 {
            storage_read_syscall(0, address).unwrap_syscall()
        }

        fn echo(self: @ContractState, address: StorageAddress) -> StorageAddress {
            address
        }
    }
}
