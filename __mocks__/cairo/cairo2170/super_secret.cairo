// Attest that a user has a super secret < 1000.
// Coded with Cairo 2.17.0

use starknet::{ContractAddress, EthAddress};

// a L2->L1 message (for communication between proof & verification)
#[derive(Drop, Serde)]
struct ProofMessage {
    from_address: ContractAddress,
    payload: Span<felt252>,
    to_address: EthAddress,
}

// public data provided to the proof
#[derive(Drop, Serde)]
struct PublicInputsForProof {
    user_id: u128,
}

// private data provided to the proof
#[derive(Drop, Serde)]
struct PrivateInputsForProof {
    super_secret: u128 // A secret for each user. If < 1000, user is whitelisted
}


// payload of L2->L1 message (payload of ProofMessage struct).
// these data are used in the verification function.
#[derive(Drop, Serde, starknet::Store)]
struct L1L2message {
    user_id: u128,
    is_whitelisted: bool // result of the proof (true if the user has a super secret < 1000)
}

#[starknet::interface]
pub trait ISuperSecret<TContractState> {
    fn create_proof_of_secret(
        self: @TContractState,
        public_input: PublicInputsForProof,
        private_input: PrivateInputsForProof,
    );
    fn verify_proof_of_secret(ref self: TContractState, public_message: L1L2message);
    fn read_result(self: @TContractState) -> L1L2message;
}


#[starknet::contract]
mod SuperSecret {
    use core::array::ArrayTrait;
    use core::poseidon::poseidon_hash_span;
    use core::serde::Serde;
    use core::traits::Into;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{SyscallResultTrait, get_contract_address, syscalls};
    use crate::{L1L2message, PrivateInputsForProof, ProofMessage, PublicInputsForProof};

    // recovered data from proof_facts of the transaction
    #[derive(Drop, Serde)]
    struct ProofFacts {
        PROOF0_marker: bytes31,
        VIRTUAL_SNOS_marker: bytes31,
        virtual_OS_program_hash: felt252,
        VIRTUAL_SNOS0_marker: bytes31,
        block_number: felt252,
        block_hash: felt252,
        OS_config_hash: felt252,
        l1l2messages: Span<felt252> // hashes of ProofMessages 
    }

    // ──────────────────────────────────────────────
    // Storage
    // ──────────────────────────────────────────────
    #[storage]
    struct Storage {
        result: L1L2message,
    }

    // ──────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    // ──────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────
    #[constructor]
    fn constructor(ref self: ContractState) {}

    // ──────────────────────────────────────────────
    // Internal functions
    // ──────────────────────────────────────────────

    // get the hashes of the public data of all L2->L1 messages
    fn _get_proof_messages_hashes() -> Span<felt252> {
        let info = starknet::syscalls::get_execution_info_v3_syscall().unwrap_syscall().unbox();
        let mut arr = info.tx_info.unbox().proof_facts;
        let pr_facts = Serde::<ProofFacts>::deserialize(ref arr).expect('ProofFacts deser failed');
        pr_facts.l1l2messages
    }

    // compute the hash of the public data of the proof (L1L2message struct) ; this hash is expected
    // to be in the proof_facts if the proof is valid.
    fn _compute_message_hash_for_proof_facts(pf: @ProofMessage) -> felt252 {
        let mut data: Array<felt252> = array![
            (*pf.from_address).into(), (*pf.to_address).into(), pf.payload.len().into(),
        ];
        for i in (pf.payload) {
            data.append(*i);
        }
        poseidon_hash_span(data.span())
    }

    // ──────────────────────────────────────────────
    // external abi functions
    // ──────────────────────────────────────────────
    #[abi(embed_v0)]
    impl SuperSecretContract of super::ISuperSecret<ContractState> {
        // executed in a secured backend, in an off-chain sequencer
        fn create_proof_of_secret(
            self: @ContractState,
            public_input: PublicInputsForProof,
            private_input: PrivateInputsForProof,
        ) {
            const threshold: u128 = 1000;
            let is_whitelisted = private_input.super_secret < threshold;
            let message = L1L2message { user_id: public_input.user_id, is_whitelisted };
            let mut ser: Array<felt252> = ArrayTrait::new();
            message.serialize(ref ser);
            syscalls::send_message_to_l1_syscall(0x00, ser.span()).unwrap_syscall();
        }

        fn verify_proof_of_secret(ref self: ContractState, public_message: L1L2message) {
            // ******** SNIP-36 verification of public message, executed on-line
            let proof_facts = _get_proof_messages_hashes();
            let mut ser: Array<felt252> = ArrayTrait::new();
            public_message.serialize(ref ser);
            let message = ProofMessage {
                from_address: get_contract_address(), // ensure that the proof has been created by this contract
                payload: ser.span(),
                to_address: 0x00_felt252.try_into().unwrap(),
            };
            let calculated_message_H = _compute_message_hash_for_proof_facts(@message);
            assert(calculated_message_H == *proof_facts.at(0), 'pub message not related to hash');
            // ******** Verifications performed.
            self.result.write(public_message);
        }

        fn read_result(self: @ContractState) -> L1L2message {
            self.result.read()
        }
    }
}
