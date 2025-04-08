// Collection of functions for Braavos account v1.1.0 creation
// coded with Starknet.js v7.0.1 (08/apr/2025)

import {
  ec,
  hash,
  num,
  constants,
  CallData,
  stark,
  BigNumberish,
  type RpcProvider,
  type V2InvocationsSignerDetails,
  type DeployAccountSignerDetails,
  type V2DeployAccountSignerDetails,
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
  ETransactionVersion2,
  ETransactionVersion3,
  type ResourceBounds,
} from '@starknet-io/types-js';

const BraavosBaseClassHash = '0x3d16c7a9a60b0593bd202f660a28c5d76e0403601d9ccc7e4fa253b6a70c201';
const BraavosAccountClassHash = '0x2c8c7e6fbcfb3e8e15a46648e8914c6aa1fc506fc1e7fb3d1e19630716174bc';

type CalcV2DeployAccountTxHashArgs = {
  contractAddress: BigNumberish;
  classHash: BigNumberish;
  constructorCalldata: Calldata;
  salt: BigNumberish;
  version: `${ETransactionVersion2}`;
  maxFee: BigNumberish;
  chainId: constants.StarknetChainId;
  nonce: BigNumberish;
};

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
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  let txnHash: string = '';
  if (Object.values(ETransactionVersion3).includes(details.version as any)) {
    const det = details as V3DeployAccountSignerDetails;
    const v3det = stark.v3Details(det);
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
  } else if (Object.values(ETransactionVersion2).includes(details.version as any)) {
    const det = details as V2DeployAccountSignerDetails;
    txnHash = hash.calculateDeployAccountTransactionHash({
      ...det,
      salt: det.addressSalt,
    } as CalcV2DeployAccountTxHashArgs);
  } else {
    throw Error('unsupported signDeployAccountTransaction version');
  }

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
    BraavosAccountClassHash.toString(),
    ...parsedOtherSigner.map((e) => e.toString()),
    details.chainId.toString(),
    rPoseidon.toString(),
    sPoseidon.toString(),
  ];
  console.log('Braavos special signature =', signature);
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
  invocationDetails: V2InvocationsSignerDetails | V3InvocationsSignerDetails
): Promise<DeployAccountContractTransaction> {
  const compiledCalldata = CallData.compile(constructorCalldata ?? []);
  const contractAddress = providedContractAddress ?? calculateAddressBraavos(privateKeyBraavos);
  if (Object.values(ETransactionVersion3).includes(invocationDetails.version as any)) {
    const v3invocation = invocationDetails as V3InvocationsSignerDetails;
    const details: V3DeployAccountSignerDetails = {
      classHash,
      constructorCalldata: constructorCalldata ?? [],
      addressSalt: addressSalt ?? 0,
      contractAddress,
      ...v3invocation,
    };
    const signature = getBraavosSignature(details, privateKeyBraavos);
    return {
      classHash,
      addressSalt,
      constructorCalldata: compiledCalldata,
      signature,
    };
  } else if (Object.values(ETransactionVersion2).includes(invocationDetails.version as any)) {
    //tx V1
    const v2invocation = invocationDetails as V2InvocationsSignerDetails;
    const details: V2DeployAccountSignerDetails = {
      classHash,
      constructorCalldata: constructorCalldata ?? [],
      addressSalt: addressSalt ?? 0,
      contractAddress,
      ...v2invocation,
      ...stark.v3Details({}),
    };
    const signature = getBraavosSignature(details, privateKeyBraavos);
    return {
      classHash,
      addressSalt,
      constructorCalldata: compiledCalldata,
      signature,
    };
  } else {
    throw Error('wrong version in buildBraavosAccountDeployPayload');
  }
}

export async function estimateBraavosAccountDeployFee(
  privateKeyBraavos: BigNumberish,
  provider: RpcProvider,
  { blockIdentifier, skipValidate, version: txVersion, tip: tip0 }: EstimateFeeDetails
): Promise<UniversalDetails> {
  console.log('start estimate fees...', txVersion);
  const tip = tip0 ?? 0n;
  const EstimateVersion =
    txVersion === ETransactionVersion.V3 ? ETransactionVersion.F3 : ETransactionVersion2.F1;
  const nonce = constants.ZERO;
  const chainId = await provider.getChainId();
  const cairoVersion: CairoVersion = '1'; // dummy value, not used but mandatory
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  const BraavosAccountAddress = calculateAddressBraavos(privateKeyBraavos);
  const BraavosConstructorCallData = BraavosConstructor(starkKeyPubBraavos);

  if (EstimateVersion == ETransactionVersion.F3) {
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
    console.log('estimate deploy payload V3 =', payload);
    const v3det = stark.v3Details({}, '0.8');
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
    console.log('response estimate fee V3 =', response);
    const suggestedMaxFee = stark.estimateFeeToBounds({
      ...response,
      overall_fee: response.overall_fee.toString(),
      l1_gas_consumed: response.l1_gas_consumed.toString(),
      l1_gas_price: response.l1_gas_price.toString(),
      l2_gas_consumed: (response.l2_gas_consumed ?? 0n).toString(),
      l2_gas_price: response.l1_data_gas_price.toString(),
      l1_data_gas_consumed: response.l1_data_gas_consumed.toString(),
      l1_data_gas_price: response.l1_data_gas_price.toString(),
    });
    return {
      resourceBounds: suggestedMaxFee,
      feeDataAvailabilityMode: EDataAvailabilityMode.L1,
      nonceDataAvailabilityMode: EDataAvailabilityMode.L1,
      tip: 10 ** 13, // not handled in Starknet 0.13.3
      paymasterData: [],
    };
  } else {
    // V1 tx
    const payload: DeployAccountContractTransaction = await buildBraavosAccountDeployPayload(
      privateKeyBraavos,
      {
        classHash: BraavosBaseClassHash,
        addressSalt: starkKeyPubBraavos,
        constructorCalldata: BraavosConstructorCallData,
        contractAddress: BraavosAccountAddress,
      },
      {
        nonce,
        chainId,
        version: EstimateVersion,
        walletAddress: BraavosAccountAddress,
        maxFee: constants.ZERO,
        cairoVersion: cairoVersion,
      } as V2InvocationsSignerDetails
    );
    console.log('estimate payload V1 =', payload);

    const response = await provider.getDeployAccountEstimateFee(
      { ...payload },
      { version: EstimateVersion, nonce },
      blockIdentifier,
      skipValidate
    );
    console.log('response estimate fee V1 =', response);
    const suggestedMaxFee = stark.estimatedFeeToMaxFee(response.overall_fee);

    return { maxFee: suggestedMaxFee };
  }
}

type Version = typeof ETransactionVersion.V3 | typeof ETransactionVersion.F3;
export function isV3tx(version: string): boolean {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(version as Version);
}

export async function deployBraavosAccount(
  privateKeyBraavos: BigNumberish,
  provider: RpcProvider,
  maxFeeDetails?: UniversalDetails,
  txVersion: ETransactionVersion = ETransactionVersion.V3
): Promise<DeployContractResponse> {
  const nonce = constants.ZERO;
  const chainId = await provider.getChainId();
  const cairoVersion: CairoVersion = '1'; // dummy value, not used but mandatory
  const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));
  const BraavosAccountAddress = calculateAddressBraavos(privateKeyBraavos);
  const BraavosConstructorCallData = BraavosConstructor(starkKeyPubBraavos);
  const feeDetails: UniversalDetails =
    maxFeeDetails ??
    (await estimateBraavosAccountDeployFee(privateKeyBraavos, provider, { version: txVersion }));
  const isV3 = isV3tx(txVersion);
  if (isV3) {
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
    console.log('deploy payload V3 =', payload);
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
  } else {
    // V1 tx
    const payload: DeployAccountContractTransaction = await buildBraavosAccountDeployPayload(
      privateKeyBraavos,
      {
        classHash: BraavosBaseClassHash.toString(),
        addressSalt: starkKeyPubBraavos,
        constructorCalldata: BraavosConstructorCallData,
        contractAddress: BraavosAccountAddress,
      },
      {
        nonce,
        chainId,
        version: txVersion as ETransactionVersion2,
        walletAddress: BraavosAccountAddress,
        maxFee: feeDetails.maxFee as BigNumberish,
        cairoVersion: cairoVersion,
      }
    );
    console.log('deploy payload V1 =', payload);
    return provider.deployAccountContract(
      {
        classHash: BraavosBaseClassHash,
        addressSalt: starkKeyPubBraavos,
        constructorCalldata: BraavosConstructorCallData,
        signature: payload.signature,
      },
      {
        nonce,
        maxFee: feeDetails.maxFee,
        version: txVersion,
      }
    );
  }
}
