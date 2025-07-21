// Collection of functions for Braavos account v1.2.0 creation.
// Coded with Starknet.js v7.1.0
// Handle Rpc0.8V3

import {
  ec,
  hash,
  num,
  constants,
  CallData,
  stark,
  BigNumberish,
  type RpcProvider,
  type DeployAccountSignerDetails,
  type V3DeployAccountSignerDetails,
  type V3InvocationsSignerDetails,
  type UniversalDetails,
  type V3TransactionDetails,
  type EstimateFeeResponse,
} from 'starknet';
import {
  type DeployContractResponse,
  type Calldata,
  type DeployAccountContractPayload,
  type EstimateFeeDetails,
  type CairoVersion,
  type DeployAccountContractTransaction,
} from 'starknet';
import {
  EDAMode,
  EDataAvailabilityMode,
  ETransactionVersion,
  ETransactionVersion3,
  type ResourceBounds,
} from '@starknet-io/types-js';

const BraavosBaseClassHash = '0x3d16c7a9a60b0593bd202f660a28c5d76e0403601d9ccc7e4fa253b6a70c201';
const BraavosAccountClassHash = '0x3957f9f5a1cbfe918cedc2015c85200ca51a5f7506ecb6de98a5207b759bf8a'; // v1.2.0

type CalcV3DeployAccountTxHashArgs = {
  contractAddress: BigNumberish;
  classHash: BigNumberish;
  compiledConstructorCalldata: Calldata;
  salt: BigNumberish;
  version: `${ETransactionVersion3}`;
  chainId: constants.StarknetChainId;
  nonce: BigNumberish;
  nonceDataAvailabilityMode: EDAMode;
  feeDataAvailabilityMode: EDAMode;
  resourceBounds: ResourceBounds;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};

export function getBraavosSignature(
  details: DeployAccountSignerDetails,
  privateKeyBraavos: BigNumberish
): string[] {
  let txnHash: string = '';
  const det = details as V3DeployAccountSignerDetails;
  const v3det = stark.v3Details(det, '0.8.1');
  txnHash = hash.calculateDeployAccountTransactionHash({
    contractAddress: det.contractAddress,
    classHash: det.classHash,
    compiledConstructorCalldata: det.constructorCalldata,
    salt: det.addressSalt,
    version: det.version,
    chainId: det.chainId,
    nonce: det.nonce,
    nonceDataAvailabilityMode: stark.intDAM(v3det.nonceDataAvailabilityMode),
    feeDataAvailabilityMode: stark.intDAM(v3det.feeDataAvailabilityMode),
    tip: v3det.tip,
    paymasterData: v3det.paymasterData,
    resourceBounds: v3det.resourceBounds,
  } as CalcV3DeployAccountTxHashArgs);

  // braavos v1.0.0 specific deployment signature :
  // sig[0: 1] - r,s from stark sign on txn_hash
  // sig[2] - actual impl hash - the impl hash we will replace class into
  // sig[3: n - 2] -  auxiliary data - hws public key, multisig, daily withdrawal limit etc
  // sig[n - 2] -  chain_id - guarantees aux sig is not replayed from other chain ids
  // sig[n - 1: n] -  r,s from stark sign on poseidon_hash(sig[2: n-2])

  const parsedOtherSigner = Array(9).fill(0);
  const { r, s } = ec.starkCurve.sign(txnHash, num.toHex(privateKeyBraavos));
  const txnHashPoseidon = hash.computePoseidonHashOnElements([
    BraavosAccountClassHash,
    ...parsedOtherSigner,
    details.chainId,
  ]);
  const { r: rPoseidon, s: sPoseidon } = ec.starkCurve.sign(
    txnHashPoseidon,
    num.toHex(privateKeyBraavos)
  );
  const signature = [
    r.toString(),
    s.toString(),
    BigInt(BraavosAccountClassHash).toString(),
    ...parsedOtherSigner.map((e) => e.toString()),
    BigInt(details.chainId).toString(),
    rPoseidon.toString(),
    sPoseidon.toString(),
  ];
  return signature;
}

const BraavosConstructor = (starkKeyPubBraavos: string) =>
  CallData.compile({ public_key: starkKeyPubBraavos });

export function calculateAddressBraavos(privateKeyBraavos: BigNumberish): string {
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  const BraavosProxyConstructorCallData = BraavosConstructor(starkKeyPubBraavos);
  return hash.calculateContractAddressFromHash(
    starkKeyPubBraavos,
    BraavosBaseClassHash,
    BraavosProxyConstructorCallData,
    0
  );
}

async function buildBraavosAccountDeployPayload(
  privateKeyBraavos: BigNumberish,
  {
    classHash,
    addressSalt,
    constructorCalldata,
    contractAddress: providedContractAddress,
  }: DeployAccountContractPayload,
  invocationDetails: V3InvocationsSignerDetails
): Promise<DeployAccountContractTransaction> {
  const compiledCalldata = CallData.compile(constructorCalldata ?? []);
  const contractAddress = providedContractAddress ?? calculateAddressBraavos(privateKeyBraavos);
  const details: V3DeployAccountSignerDetails = {
    classHash,
    constructorCalldata: constructorCalldata ?? [],
    addressSalt: addressSalt ?? 0,
    contractAddress,
    ...invocationDetails,
  };
  const signature = getBraavosSignature(details, privateKeyBraavos);
  return {
    classHash,
    addressSalt,
    constructorCalldata: compiledCalldata,
    signature,
  };
}

export async function estimateBraavosAccountDeployFee(
  privateKeyBraavos: BigNumberish,
  provider: RpcProvider,
  { blockIdentifier, skipValidate, tip: tip0 }: EstimateFeeDetails
): Promise<UniversalDetails> {
  const tip = tip0 ?? 0n;
  const EstimateVersion = ETransactionVersion.F3;
  const nonce = constants.ZERO;
  const chainId = await provider.getChainId();
  const cairoVersion: CairoVersion = '1'; // dummy value, not used but mandatory
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  const BraavosAccountAddress = calculateAddressBraavos(privateKeyBraavos);
  const BraavosConstructorCallData = BraavosConstructor(starkKeyPubBraavos);

  // transaction V3 for RPC0.8
  const payload: DeployAccountContractTransaction = await buildBraavosAccountDeployPayload(
    privateKeyBraavos,
    {
      classHash: BraavosBaseClassHash.toString(),
      addressSalt: starkKeyPubBraavos,
      constructorCalldata: BraavosConstructorCallData,
      contractAddress: BraavosAccountAddress,
    },
    {
      chainId,
      nonce,
      version: EstimateVersion,
      walletAddress: BraavosAccountAddress,
      cairoVersion: cairoVersion,
      tip,
    } as V3InvocationsSignerDetails
  );
  const v3det = stark.v3Details({}, await provider.getSpecVersion());
  const response: EstimateFeeResponse = await provider.getDeployAccountEstimateFee(
    {
      classHash: BraavosBaseClassHash,
      addressSalt: starkKeyPubBraavos,
      constructorCalldata: BraavosConstructorCallData,
      signature: payload.signature,
    },
    {
      nonce,
      version: EstimateVersion,
      ...v3det,
    } as V3TransactionDetails,
    blockIdentifier,
    skipValidate
  );
  const suggestedMaxFee = stark.estimateFeeToBounds({
    ...response,
    overall_fee: Number(response.overall_fee),
    l1_gas_consumed: Number(response.l1_gas_consumed),
    l1_gas_price: Number(response.l1_gas_price),
    l2_gas_consumed: Number(response.l2_gas_consumed ?? 0n),
    l2_gas_price: Number(response.l2_gas_price ?? 0n),
    l1_data_gas_consumed: Number(response.l1_data_gas_consumed),
    l1_data_gas_price: Number(response.l1_data_gas_price),
  });
  return {
    resourceBounds: suggestedMaxFee,
    feeDataAvailabilityMode: EDataAvailabilityMode.L1,
    nonceDataAvailabilityMode: EDataAvailabilityMode.L1,
    tip: 10 ** 13, // not handled in Starknet 0.13.5
    paymasterData: [],
  };
}

type Version = typeof ETransactionVersion.V3 | typeof ETransactionVersion.F3;
export function isV3tx(version: string): boolean {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(version as Version);
}

export async function deployBraavosAccount(
  privateKeyBraavos: BigNumberish,
  provider: RpcProvider,
  maxFeeDetails?: UniversalDetails
): Promise<DeployContractResponse> {
  const nonce = constants.ZERO;
  const chainId = await provider.getChainId();
  const cairoVersion: CairoVersion = '1'; // dummy value, not used but mandatory
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  const BraavosAccountAddress = calculateAddressBraavos(privateKeyBraavos);
  const BraavosConstructorCallData = BraavosConstructor(starkKeyPubBraavos);
  const feeDetails: UniversalDetails =
    maxFeeDetails ?? (await estimateBraavosAccountDeployFee(privateKeyBraavos, provider, {}));
  const txVersion = ETransactionVersion.V3;
  const payload: DeployAccountContractTransaction = await buildBraavosAccountDeployPayload(
    privateKeyBraavos,
    {
      classHash: BraavosBaseClassHash.toString(),
      addressSalt: starkKeyPubBraavos,
      constructorCalldata: BraavosConstructorCallData,
      contractAddress: BraavosAccountAddress,
    },
    {
      chainId,
      nonce,
      version: txVersion,
      walletAddress: BraavosAccountAddress,
      cairoVersion: cairoVersion,
      ...feeDetails,
    } as V3InvocationsSignerDetails
  );
  return provider.deployAccountContract(
    {
      classHash: BraavosBaseClassHash,
      addressSalt: starkKeyPubBraavos,
      constructorCalldata: BraavosConstructorCallData,
      signature: payload.signature,
    },
    {
      nonce,
      version: txVersion,
      ...feeDetails,
    }
  );
}
