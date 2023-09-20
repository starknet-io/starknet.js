// Contract of a cairo 1 account, including abstraction everywhere.
// 💣 Do not use this account to hold assets. It's not audited and MUST be used only for tests purpose.
// Coded with Cairo v2.1.0
// Based on OpenZeppelin Contracts for Cairo v0.7.0 (account/account.cairo)

use array::ArrayTrait;
use array::SpanTrait;
use option::OptionTrait;
use serde::Serde;
use starknet::ContractAddress;
use starknet::account::Call;

const TRANSACTION_VERSION: felt252 = 1;

// 2**128 + TRANSACTION_VERSION
const QUERY_VERSION: felt252 = 340282366920938463463374607431768211457;

trait PublicKeyTrait<TState> {
    fn set_public_key(ref self: TState, new_public_key: felt252);
    fn get_public_key(self: @TState) -> felt252;
}

trait PublicKeyCamelTrait<TState> {
    fn setPublicKey(ref self: TState, newPublicKey: felt252);
    fn getPublicKey(self: @TState) -> felt252;
}

#[starknet::contract]
mod Account {
    // use core::debug::PrintTrait;
    use array::ArrayTrait;
    use array::SpanTrait;
    use box::BoxTrait;
    use ecdsa::check_ecdsa_signature;

    use account_abstraction::account::interface;
    use account_abstraction::introspection::interface::ISRC5;
    use account_abstraction::introspection::interface::ISRC5Camel;
    use account_abstraction::introspection::src5::SRC5;
    use option::OptionTrait;
    use starknet::get_caller_address;
    use starknet::get_contract_address;
    use starknet::get_tx_info;

    use super::Call;
    use super::QUERY_VERSION;
    use super::TRANSACTION_VERSION;
    use zeroable::Zeroable;

    #[storage]
    struct Storage {
        public_key: felt252
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OwnerAdded: OwnerAdded,
        OwnerRemoved: OwnerRemoved,
    }

    #[derive(Drop, starknet::Event)]
    struct OwnerAdded {
        new_owner_guid: felt252
    }

    #[derive(Drop, starknet::Event)]
    struct OwnerRemoved {
        removed_owner_guid: felt252
    }

    #[constructor]
    fn constructor(ref self: ContractState, _public_key: felt252) {
        self.initializer(_public_key);
    }

    //
    // External
    //

    #[external(v0)]
    impl SRC6Impl of interface::ISRC6<ContractState> {
        fn __execute__(self: @ContractState, mut calls: Array<Call>) -> Array<Span<felt252>> {
            // Avoid calls from other contracts
            // https://github.com/OpenZeppelin/cairo-contracts/issues/344
            let sender = get_caller_address();
            assert(sender.is_zero(), 'Account: invalid caller');

            // Check tx version
            let tx_info = get_tx_info().unbox();
            let version = tx_info.version;
            if version != TRANSACTION_VERSION {
                assert(version == QUERY_VERSION, 'Account: invalid tx version');
            }

            _execute_calls(calls)
        }

        fn __validate__(self: @ContractState, mut calls: Array<Call>) -> felt252 {
            self.validate_transaction()
        }

        fn is_valid_signature(
            self: @ContractState, hash: felt252, signature: Array<felt252>
        ) -> felt252 {
            if self._is_valid_signature(hash, signature.span()) {
                starknet::VALIDATED
            } else {
                0
            }
        }
    }

    #[external(v0)]
    impl SRC6CamelOnlyImpl of interface::ISRC6CamelOnly<ContractState> {
        fn isValidSignature(
            self: @ContractState, hash: felt252, signature: Array<felt252>
        ) -> felt252 {
            SRC6Impl::is_valid_signature(self, hash, signature)
        }
    }

    #[external(v0)]
    impl DeclarerImpl of interface::IDeclarer<ContractState> {
        fn __validate_declare__(self: @ContractState, class_hash: felt252) -> felt252 {
            self.validate_declare()
        }
    }

    #[external(v0)]
    impl SRC5Impl of ISRC5<ContractState> {
        fn supports_interface(self: @ContractState, interface_id: felt252) -> bool {
            let unsafe_state = SRC5::unsafe_new_contract_state();
            SRC5::SRC5Impl::supports_interface(@unsafe_state, interface_id)
        }
    }

    #[external(v0)]
    impl SRC5CamelImpl of ISRC5Camel<ContractState> {
        fn supportsInterface(self: @ContractState, interfaceId: felt252) -> bool {
            let unsafe_state = SRC5::unsafe_new_contract_state();
            SRC5::SRC5CamelImpl::supportsInterface(@unsafe_state, interfaceId)
        }
    }

    #[external(v0)]
    impl PublicKeyImpl of super::PublicKeyTrait<ContractState> {
        fn get_public_key(self: @ContractState) -> felt252 {
            self.public_key.read()
        }

        fn set_public_key(ref self: ContractState, new_public_key: felt252) {
            assert_only_self();
            self.emit(OwnerRemoved { removed_owner_guid: self.public_key.read() });
            self._set_public_key(new_public_key);
        }
    }

    #[external(v0)]
    impl PublicKeyCamelImpl of super::PublicKeyCamelTrait<ContractState> {
        fn getPublicKey(self: @ContractState) -> felt252 {
            self.public_key.read()
        }

        fn setPublicKey(ref self: ContractState, newPublicKey: felt252) {
            PublicKeyImpl::set_public_key(ref self, newPublicKey);
        }
    }

    #[external(v0)]
    fn __validate_deploy__(
        self: @ContractState,
        class_hash: felt252,
        contract_address_salt: felt252,
        _public_key: felt252
    ) -> felt252 {
        self.validate_deploy_account()
    }

    //
    // Internal
    //

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn initializer(ref self: ContractState, _public_key: felt252) {
            let mut unsafe_state = SRC5::unsafe_new_contract_state();
            SRC5::InternalImpl::register_interface(ref unsafe_state, interface::ISRC6_ID);
            self._set_public_key(_public_key);
        }

        fn validate_transaction(self: @ContractState) -> felt252 {
            let tx_info = get_tx_info().unbox();
            let tx_hash = tx_info.transaction_hash;
            let signature = tx_info.signature;
            assert(signature.len() == 5, 'Signature tx needs 5 felts');
            let twoFA0 = *signature.at(2);
            assert(twoFA0 == 0x04, 'Account tx: wrong 2FA-0');
            let twoFA1 = *signature.at(3);
            assert(twoFA1 == 0x05, 'Account tx: wrong 2FA-1');
            let twoFA2 = *signature.at(4);
            assert(twoFA2 == 0x06, 'Account tx: wrong 2FA-2');
            let abstracted_hash = pedersen(
                pedersen(pedersen(pedersen(pedersen(0, tx_hash), twoFA0), twoFA1), twoFA2),
                4_felt252
            ); // pedersen::pedersen () with Cairo v2.2.0
            assert(
                self._is_valid_signature(abstracted_hash, signature),
                'Account tx: invalid signature'
            );
            starknet::VALIDATED
        }

        fn validate_deploy_account(self: @ContractState) -> felt252 {
            let tx_info = get_tx_info().unbox();
            let tx_hash = tx_info.transaction_hash;

            let signature = tx_info.signature;
            assert(signature.len() == 5, 'Signature deplAcc needs 5 felts');
            let twoFA0 = *signature.at(2);
            assert(twoFA0 == 0x01, 'Account deplAcc: wrong 2FA-0');
            let twoFA1 = *signature.at(3);
            assert(twoFA1 == 0x02, 'Account deplAcc: wrong 2FA-1');
            let twoFA2 = *signature.at(4);
            assert(twoFA2 == 0x03, 'Account deplAcc: wrong 2FA-2');
            let abstracted_hash = pedersen(
                pedersen(pedersen(pedersen(pedersen(0, tx_hash), twoFA0), twoFA1), twoFA2),
                4_felt252
            ); 
            assert(
                self._is_valid_signature(abstracted_hash, signature),
                'Account depl: invalid signature'
            );
            starknet::VALIDATED
        }

        fn validate_declare(self: @ContractState) -> felt252 {
            let tx_info = get_tx_info().unbox();
            let tx_hash = tx_info.transaction_hash;

            let signature = tx_info.signature;
            assert(signature.len() == 5, 'Signature decl needs 5 felts');
            let twoFA0 = *signature.at(2);
            assert(twoFA0 == 0x07, 'Declare : wrong 2FA-0');
            let twoFA1 = *signature.at(3);
            assert(twoFA1 == 0x08, 'Declare : wrong 2FA-1');
            let twoFA2 = *signature.at(4);
            assert(twoFA2 == 0x09, 'Declare : wrong 2FA-2');
            let abstracted_hash = pedersen(
                pedersen(pedersen(pedersen(pedersen(0, tx_hash), twoFA0), twoFA1), twoFA2),
                4_felt252
            ); 
            assert(
            self._is_valid_signature(abstracted_hash, signature), 'Declare: invalid signature'
            );
            starknet::VALIDATED
        }

        fn _is_valid_signature_message(
            self: @ContractState, hash: felt252, signature: Span<felt252>
        ) -> bool {
            assert(signature.len() == 5, 'Signature mess. needs 5 felts');
            let twoFA0 = *signature.at(2);
            assert(twoFA0 == 0x07, 'Message: wrong 2FA-0');
            let twoFA1 = *signature.at(3);
            assert(twoFA1 == 0x08, 'Message: wrong 2FA-1');
            let twoFA2 = *signature.at(4);
            assert(twoFA2 == 0x09, 'Message: wrong 2FA-2');
            let valid_length = signature.len() == 5;
            let valid_twoFA0 = twoFA0 == 0x0a;
            let valid_twoFA1 = twoFA1 == 0x0b;
            let valid_twoFA2 = twoFA2 == 0x0c;
            if valid_length && valid_twoFA0 && valid_twoFA1 && valid_twoFA2 {
                self._is_valid_signature(hash, signature)
            } else {
                false
            }
        }

        fn _set_public_key(ref self: ContractState, new_public_key: felt252) {
            self.public_key.write(new_public_key);
            self.emit(OwnerAdded { new_owner_guid: new_public_key });
        }

        fn _is_valid_signature(
            self: @ContractState, hash: felt252, signature: Span<felt252>
        ) -> bool {
             check_ecdsa_signature(
                hash, self.public_key.read(), *signature.at(0_u32), *signature.at(1_u32)
            )
         }
    }

    #[internal]
    fn assert_only_self() {
        let caller = get_caller_address();
        let self = get_contract_address();
        assert(self == caller, 'Account: unauthorized');
    }

    #[internal]
    fn _execute_calls(mut calls: Array<Call>) -> Array<Span<felt252>> {
        let mut res = ArrayTrait::new();
        loop {
            match calls.pop_front() {
                Option::Some(call) => {
                    let _res = _execute_single_call(call);
                    res.append(_res);
                },
                Option::None(_) => {
                    break ();
                },
            };
        };
        res
    }

    #[internal]
    fn _execute_single_call(call: Call) -> Span<felt252> {
        let Call{to, selector, calldata } = call;
        starknet::call_contract_syscall(to, selector, calldata.span())
            .unwrap_syscall() // .unwrap() for Cairo v2.2.0
    }
}
