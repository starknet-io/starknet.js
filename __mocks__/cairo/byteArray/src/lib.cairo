// ByteArray Storage Contract Interface
#[starknet::interface]
pub trait IByteArrayStorage<TContractState> {
    fn store_message(ref self: TContractState, message: ByteArray);
    fn store_message_noevent(ref self: TContractState, message: ByteArray);
    fn read_message(self: @TContractState) -> ByteArray;
}

// ByteArray Storage Contract
#[starknet::contract]
pub mod ByteArrayStorage {
    use starknet::{get_caller_address, ContractAddress};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess}; // New storage syntax specific

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
        #[key] // Indexing the caller is usually best practice for filtering events
        pub caller: ContractAddress,
        pub message: ByteArray,
    }

    // CONSTRUCTOR REMOVED:
    // Storage is initialized to empty/zero by default. 
    // Writing "" explicitly costs extra gas for no functional gain.

    #[abi(embed_v0)]
    impl ByteArrayStorageImpl of super::IByteArrayStorage<ContractState> {
        
        fn store_message(ref self: ContractState, message: ByteArray) {
            let caller = get_caller_address();
            
            // CRITICAL OPTIMIZATION:
            // We need 'message' for two things: Storage and Event.
            // Since we cannot move it twice, we MUST clone once.
            // Writing to storage consumes the instance.
            self.stored_message.write(message.clone());
            
            // The original 'message' is moved into the Event struct here.
            self.emit(Event::MessageStored(MessageStored { 
                caller, 
                message 
            }));
        }

        fn store_message_noevent(ref self: ContractState, message: ByteArray) {
            // OPTIMIZATION:
            // Removed .clone(). The 'message' variable is owned by this function.
            // We move it directly into storage. This saves memory allocation and gas.
            self.stored_message.write(message);
        }

        fn read_message(self: @ContractState) -> ByteArray {
            self.stored_message.read()
        }
    }
}
