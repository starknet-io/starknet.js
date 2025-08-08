// ByteArray Storage Contract Interface
#[starknet::interface]
pub trait IByteArrayStorage<TContractState> {
    fn store_message(ref self: TContractState, message: ByteArray);
    fn read_message(self: @TContractState) -> ByteArray;
}

// ByteArray Storage Contract
#[starknet::contract]
pub mod ByteArrayStorage {
    use starknet::get_caller_address;
    use starknet::storage::*;

    #[storage]
    struct Storage {
        stored_message: ByteArray,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        MessageStored: MessageStored,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MessageStored {
        pub caller: starknet::ContractAddress,
        pub message: ByteArray,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        // Initialize with empty ByteArray
        self.stored_message.write("");
    }

    #[abi(embed_v0)]
    impl ByteArrayStorageImpl of super::IByteArrayStorage<ContractState> {
        fn store_message(ref self: ContractState, message: ByteArray) {
            let caller = get_caller_address();
            
            // Store the message in storage
            self.stored_message.write(message.clone());
            
            // Emit event with the message
            self.emit(Event::MessageStored(MessageStored { 
                caller, 
                message 
            }));
        }

        fn read_message(self: @ContractState) -> ByteArray {
            self.stored_message.read()
        }
    }
}