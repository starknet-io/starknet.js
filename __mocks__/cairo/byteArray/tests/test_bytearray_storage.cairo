use testcairo::{IByteArrayStorageDispatcher, IByteArrayStorageDispatcherTrait};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

fn deploy_contract() -> IByteArrayStorageDispatcher {
    let contract = declare("ByteArrayStorage").unwrap().contract_class();
    let constructor_calldata = array![];
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    IByteArrayStorageDispatcher { contract_address }
}

#[test]
fn test_store_and_read_message() {
    let dispatcher = deploy_contract();
    
    // Store a message
    let test_message: ByteArray = "Hello, Starknet!";
    dispatcher.store_message(test_message.clone());
    
    // Read the message back
    let stored_message = dispatcher.read_message();
    
    // Verify the message is correct
    assert!(stored_message == test_message, "Message should match");
}

#[test]
fn test_store_empty_message() {
    let dispatcher = deploy_contract();
    
    // Store an empty message
    let empty_message: ByteArray = "";
    dispatcher.store_message(empty_message.clone());
    
    // Read the message back
    let stored_message = dispatcher.read_message();
    
    // Verify the message is correct
    assert!(stored_message == empty_message, "Empty message should match");
}

#[test]
fn test_store_long_message() {
    let dispatcher = deploy_contract();
    
    // Store a long message (more than 31 characters)
    let long_message: ByteArray = "This is a very long message that contains more than 31 characters to test ByteArray functionality properly!";
    dispatcher.store_message(long_message.clone());
    
    // Read the message back
    let stored_message = dispatcher.read_message();
    
    // Verify the message is correct
    assert!(stored_message == long_message, "Long message should match");
}

#[test]
fn test_overwrite_message() {
    let dispatcher = deploy_contract();
    
    // Store first message
    let first_message: ByteArray = "First message";
    dispatcher.store_message(first_message.clone());
    
    // Store second message (should overwrite first)
    let second_message: ByteArray = "Second message";
    dispatcher.store_message(second_message.clone());
    
    // Read the message back
    let stored_message = dispatcher.read_message();
    
    // Verify only the second message is stored
    assert!(stored_message == second_message, "Should store second message");
    assert!(stored_message != first_message, "First message should be overwritten");
}