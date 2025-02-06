// Cairo 2.5.3
use openzeppelin::account::interface::EthPublicKey;
use starknet::SyscallResultTrait;
use starknet::secp256_trait::Secp256PointTrait;
use starknet::secp256k1::{
    Secp256k1Point, secp256k1_get_point_from_x_syscall, secp256k1_new_syscall
};

impl Secp256k1PointSerde of Serde<EthPublicKey> {
    fn serialize(self: @Secp256k1Point, ref output: Array<felt252>) {
        let point = (*self).get_coordinates().unwrap();
        point.serialize(ref output)
    }
    fn deserialize(ref serialized: Span<felt252>) -> Option<Secp256k1Point> {
        let (x, y) = Serde::<(u256, u256)>::deserialize(ref serialized)?;
        secp256k1_new_syscall(x, y).unwrap_syscall()
    }
}

#[starknet::interface]
trait IEthPub<TContractState> {
    fn get_public_key(self: @TContractState) -> EthPublicKey;
    fn set_public_key(ref self: TContractState, new_public_key: EthPublicKey);
    fn test_public_key(self: @TContractState, my_pub_key:EthPublicKey) -> EthPublicKey;
}
#[starknet::contract]
mod Eth_pub_key {
    use openzeppelin::account::interface::EthPublicKey;
    use openzeppelin::account::utils::secp256k1::{Secp256k1PointSerde, Secp256k1PointStorePacking};
    use core::starknet::secp256_trait::Secp256PointTrait;
    use core::starknet::secp256k1::Secp256k1Point;

    #[storage]
    struct Storage {
        pubK: EthPublicKey,
    }

    #[abi(embed_v0)]
    impl InteractEthPub of super::IEthPub<ContractState> {
        fn get_public_key(self: @ContractState) -> EthPublicKey {
            self.pubK.read()
        }

        fn set_public_key(ref self: ContractState, new_public_key: EthPublicKey) {
            self.pubK.write(new_public_key)
        }

        fn test_public_key(self: @ContractState, my_pub_key:EthPublicKey) -> EthPublicKey {
            my_pub_key
        }
    }
}



// to compile with scarb 2.5.3 :
// Scarb.toml :
// [package]
// name = "pub_eth"
// version = "0.1.0"
// edition = "2023_10"

// [dependencies]
// starknet = "2.5.3"
// openzeppelin = { git = "https://github.com/OpenZeppelin/cairo-contracts.git", tag = "v0.9.0" }

// [lib]

// [[target.starknet-contract]]
// sierra = true
// casm = true
