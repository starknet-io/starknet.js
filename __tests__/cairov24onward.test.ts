import {
  BigNumberish,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CairoUint256,
  CairoUint512,
  CallData,
  Contract,
  byteArray,
  cairo,
  num,
  type Uint512,
} from '../src';
import { hexToDecimalString } from '../src/utils/num';
import { encodeShortString } from '../src/utils/shortString';
import {
  compiledC240,
  compiledC240Casm,
  compiledC260,
  compiledC260Casm,
  compiledNonZero,
  compiledNonZeroCasm,
  compiledTuple,
  compiledTupleCasm,
  compiledU512,
  compiledU512Casm,
  getTestAccount,
  getTestProvider,
} from './config/fixtures';

describe('Cairo v2.4 onwards', () => {
  const provider = getTestProvider();
  const account = getTestAccount(provider);

  describe('cairo v2.4.0 new types', () => {
    let stringContract: Contract;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledC240,
        casm: compiledC240Casm,
      });

      stringContract = new Contract(compiledC240.abi, deploy.contract_address, account);
    });

    test('bytes31', async () => {
      const resp = await stringContract.call('proceed_bytes31', ['AZERTY']);
      expect(resp).toBe('AZERTY');
      const str = 'TokenName';
      const callD1 = CallData.compile([str]);
      expect(callD1).toEqual([hexToDecimalString(encodeShortString(str))]);
      const callD2 = CallData.compile({ str });
      expect(callD2).toEqual([hexToDecimalString(encodeShortString(str))]);
      const myCallData = new CallData(compiledC240.abi);
      const myCalldata1 = myCallData.compile('proceed_bytes31', [str]);
      expect(myCalldata1).toEqual([encodeShortString(str)]);
      const myCalldata2 = myCallData.compile('proceed_bytes31', { str });
      expect(myCalldata2).toEqual([encodeShortString(str)]);
      const myCall1 = stringContract.populate('proceed_bytes31', [str]);
      expect(myCall1.calldata).toEqual([encodeShortString(str)]);
      const myCall2 = stringContract.populate('proceed_bytes31', { str });
      expect(myCall2.calldata).toEqual([encodeShortString(str)]);
    });

    test('bytes31 too long', async () => {
      await expect(stringContract.call('proceed_bytes31', ['ABCDEFGHIJKLMNOPQRSTUVWXYZ12345A'])) // more than 31 characters
        .rejects.toThrow();
    });

    test('ByteArray', async () => {
      const message = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ12345AAADEFGHIJKLMNOPQRSTUVWXYZ12345A';
      const callD = CallData.compile([message]);
      const expectedResult = [
        '2',
        hexToDecimalString('0x4142434445464748494a4b4c4d4e4f505152535455565758595a3132333435'),
        hexToDecimalString('0x4141414445464748494a4b4c4d4e4f505152535455565758595a3132333435'),
        hexToDecimalString('0x41'),
        '1',
      ];
      expect(callD).toEqual(expectedResult);
      const callD2 = CallData.compile({ mess: message });
      expect(callD2).toEqual(expectedResult);
      const callD3 = CallData.compile({ mess: byteArray.byteArrayFromString('Take care.') });
      expect(callD3).toEqual(['0', '398475857363345939260718', '10']);
      const str1 = await stringContract.get_string();
      expect(str1).toBe(
        "Cairo has become the most popular language for developers + charizards !@#$%^&*_+|:'<>?~`"
      );
      const myCallData = new CallData(stringContract.abi);
      const expectedString = 'Take care. Zorg is back';
      const resp3 = await stringContract.proceed_string('Take care.');
      expect(resp3).toBe(expectedString);
      const resp4 = await stringContract.call('proceed_string', ['Take care.']);
      expect(resp4).toBe(expectedString);
      const calldata1 = myCallData.compile('proceed_string', ['Take care.']);
      const resp5 = await stringContract.call('proceed_string', calldata1);
      expect(resp5).toBe(expectedString);
    });
  });

  describe('cairo v2.5.3 complex tuples', () => {
    let tupleContract: Contract;
    let myCallData: CallData;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledTuple,
        casm: compiledTupleCasm,
      });

      tupleContract = new Contract(compiledTuple.abi, deploy.contract_address, account);
      myCallData = new CallData(tupleContract.abi);
    });

    test('Tuple (u8, Array<u16>, bool)', async () => {
      const res1 = await tupleContract.call('get_tuple1', []);
      expect(res1).toEqual({ '0': 100n, '1': [5000n, 6000n], '2': true });
    });

    test('Tuple (bytes31, ByteArray)', async () => {
      const res2 = await tupleContract.call('get_tuple2', []);
      expect(res2).toEqual({
        '0': 'Input',
        '1': 'Zorg is very verbose and creates only long sentences.',
      });
    });

    test('Tuple (u256, Order2)', async () => {
      const res3 = await tupleContract.call('get_tuple3', []);
      expect(res3).toEqual({ '0': 123456n, '1': { p1: 10n, p2: [1n, 2n, 3n] } });
    });

    test('Tuple (EthAddress, u256)', async () => {
      const res4 = await tupleContract.call('get_tuple4', []);
      expect(res4).toEqual({ '0': 123n, '1': 500n });
    });

    test('Tuple (Result<u64, u8>, u8)', async () => {
      const res5 = await tupleContract.call('get_tuple5', []);
      expect(res5).toEqual({
        '0': new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 18n),
        '1': 4n,
      });
    });

    test('Tuple (Option<u64>, u8)', async () => {
      const res6 = await tupleContract.call('get_tuple6', []);
      expect(res6).toEqual({
        '0': new CairoOption<BigNumberish>(CairoOptionVariant.Some, 18n),
        '1': 4n,
      });
    });

    test('Tuple (Cairo enum.North, u8)', async () => {
      const res7 = await tupleContract.call('get_tuple7', []);
      expect(res7).toEqual({
        '0': new CairoCustomEnum({ North: {}, East: undefined }),
        '1': 4n,
      });
    });

    test('Tuple (Cairo enum.East, u8)', async () => {
      const res12 = await tupleContract.call('get_tuple12', []);
      expect(res12).toEqual({
        '0': new CairoCustomEnum({
          North: undefined,
          East: new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 2000n),
        }),
        '1': 4n,
      });
    });

    test('Tuple ((u256, Array<u16>), u8)', async () => {
      const res8 = await tupleContract.call('get_tuple8', []);
      expect(res8).toEqual({ '0': { '0': 600n, '1': [1n, 2n, 3n] }, '1': 8n });
    });

    test('Tuple ((u256,(u16,Order2)), u8)', async () => {
      type Order2 = {
        p1: num.BigNumberish;
        p2: num.BigNumberish[];
      };
      const myOrder2: Order2 = { p1: 100, p2: [5, 6, 7] };
      const calldata9 = myCallData.compile('get_tuple9', {
        l0: cairo.tuple(cairo.tuple(cairo.uint256(5000n), cairo.tuple(250, myOrder2)), 240),
      });
      const res9 = await tupleContract.call('get_tuple9', calldata9);
      expect(res9).toEqual({
        '0': {
          '0': 5000n,
          '1': { '0': 250n, '1': { p1: 100n, p2: [5n, 6n, 7n] } },
        },
        '1': 240n,
      });
    });

    test('Array Array<Result<u256, u8>>', async () => {
      const res10 = await tupleContract.call('get_tuple10', []);
      expect(res10).toEqual({
        '0': 8000n,
        '1': [
          new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 6000n),
          new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 7000n),
        ],
      });
    });

    test('Option Option<Result<u16, felt252>>', async () => {
      const res11 = await tupleContract.call('get_tuple11', []);
      expect(res11).toEqual({
        '0': 400n,
        '1': new CairoOption<CairoResult<BigNumberish, BigNumberish>>(
          CairoOptionVariant.Some,
          new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 2000n)
        ),
      });
    });
  });

  describe('Cairo2.6.0 Sierra1.5.0', () => {
    test('declare Sierra 1.5.0', async () => {
      const declare260Response = await account.declareIfNot({
        contract: compiledC260,
        casm: compiledC260Casm,
      });
      expect(declare260Response.class_hash).toBe(
        '0x6184f1a71cad4bd123ff8bb3b97dc9ec876ced6489d9479cfdaada81a2f06d6'
      );
    });
  });

  describe('cairo u512 type', () => {
    let u512Contract: Contract;
    const myU512 =
      '0x33333333333333333333333333333333222222222222222222222222222222221111111111111111111111111111111100000000000000000000000000000000';
    const serializedU512 = new CairoUint512({
      limb0: '0x00000000000000000000000000000000',
      limb1: '0x11111111111111111111111111111111',
      limb2: '0x22222222222222222222222222222222',
      limb3: '0x33333333333333333333333333333333',
    });
    const myUint256 = new CairoUint256('0x55544444433233223222222122112111111011001');

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledU512,
        casm: compiledU512Casm,
      });

      u512Contract = new Contract(compiledU512.abi, deploy.contract_address, account);
    });

    test('u512 compile', async () => {
      const u512_1: Uint512 = cairo.uint512(myU512);
      expect(u512_1).toEqual({
        limb0: '0',
        limb1: '22685491128062564230891640495451214097',
        limb2: '45370982256125128461783280990902428194',
        limb3: '68056473384187692692674921486353642291',
      });

      const myCalldata1 = CallData.compile([u512_1]);
      const myCalldata2 = CallData.compile({ my_u512: u512_1 });
      const expected1 = [
        '0',
        '22685491128062564230891640495451214097',
        '45370982256125128461783280990902428194',
        '68056473384187692692674921486353642291',
      ];
      expect(myCalldata1).toEqual(expected1);
      expect(myCalldata2).toEqual(expected1);

      const myCallData = new CallData(u512Contract.abi);
      const myCalldata3 = myCallData.compile('div_u512', {
        my_u512: serializedU512,
        divisor: myUint256,
      });
      const myCalldata4 = myCallData.compile('div_u512', [serializedU512, myUint256]);
      const expected2 = [
        '0',
        '22685491128062564230891640495451214097',
        '45370982256125128461783280990902428194',
        '68056473384187692692674921486353642291',
        '67973375079109053774543167123544412161',
        '22905373764',
      ];
      expect(myCalldata3).toEqual(expected2);
      expect(myCalldata4).toEqual(expected2);

      const myCall1 = u512Contract.populate('return_u512', { my_u512: serializedU512 });
      const myCall2 = u512Contract.populate('return_u512', [serializedU512]);
      expect(myCall1.calldata).toEqual(expected1);
      expect(myCall2.calldata).toEqual(expected1);
    });

    test('u512 call', async () => {
      const resp1 = await u512Contract.div_u512(myU512, myUint256);
      const expected = {
        '0': 344041591305341143461698062540412331701024044049418150896694357470676311354588133518143452261258807949095n,
        '1': 3408778323931873632420467616107826476746211809497n,
      };
      expect(resp1).toEqual(expected);
      const resp2 = await u512Contract.call('div_u512', [serializedU512, myUint256]);
      expect(resp2).toEqual(expected);
    });
  });

  describe('cairo NonZero type', () => {
    let nonZeroContract: Contract;
    type Point = {
      x: BigNumberish;
      y: BigNumberish;
      z: BigNumberish;
    };

    type InFlight = {
      position: Point;
    };

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledNonZero,
        casm: compiledNonZeroCasm,
      });
      nonZeroContract = new Contract(compiledNonZero.abi, deploy.contract_address, account);
    });

    test('NonZero helpers', async () => {
      const abiNonZeroType = 'core::zeroable::NonZero::<core::felt252>';
      expect(cairo.isTypeNonZero(abiNonZeroType)).toBe(true);
      expect(cairo.getArrayType(abiNonZeroType)).toEqual('core::felt252');
    });

    test('NonZero for authorized types', async () => {
      const res0 = await nonZeroContract.call('get_nonZero_u128');
      expect(res0).toBe(500n);
      const res1 = await nonZeroContract.call('get_nonZero_felt');
      expect(res1).toBe(80000000000n);
      const res3 = (await nonZeroContract.call('get_nonZero_u256')) as bigint;
      expect(num.toHex(res3)).toBe(
        '0x4656236523452345234523524524510abcabcabcabcabcabcabacabcabbacab'
      );
      const res4 = (await nonZeroContract.call('get_nonZero_struct')) as InFlight;
      expect(res4).toEqual({
        position: {
          x: 10000n,
          y: 3000n,
          z: 3797632177844984999071653829910313062938767546434202299238988619928580107435n,
        },
      });
      const res2 = await nonZeroContract.call('send_nonZero_u64', [200]);
      expect(res2).toBe(200n);
      const res5 = await nonZeroContract.call('send_nonZero_felt', [300]);
      expect(res5).toBe(300n);
      const altitude = '0x5656236523452345234523524524510abcabcabcabcabcabcabacabcabbacab';
      const res6 = (await nonZeroContract.call('send_nonZero_u256', [altitude])) as bigint;
      expect(num.toHex(res6)).toBe(altitude);
      const pt: Point = {
        x: 100,
        y: 200,
        z: '0x5656236523452345234523524524510abcabcabcabcabcabcabacabcabbacab',
      };
      const where: InFlight = { position: pt };
      const res7 = (await nonZeroContract.call('send_nonZero_struct', [where])) as boolean;
      expect(res7).toBe(true);
      const myCalldata = new CallData(nonZeroContract.abi);
      const myCall = myCalldata.compile('send_nonZero_struct', { where });
      const res8 = await nonZeroContract.call('send_nonZero_struct', myCall);
      expect(res8).toBe(true);
    });

    test('NonZero for non authorized types and values', async () => {
      await expect(nonZeroContract.call('send_nonZero_u64', [0])).rejects.toThrow();
      await expect(nonZeroContract.call('send_nonZero_felt', [0])).rejects.toThrow();
      await expect(nonZeroContract.call('send_nonZero_u256', [0])).rejects.toThrow();
      await expect(nonZeroContract.call('send_nonZero_u256', [0])).rejects.toThrow();
      await expect(nonZeroContract.call('send_nonZero_u256', [{ t1: 1, t2: 2 }])).rejects.toThrow();
      await expect(nonZeroContract.call('send_nonZero_u256', [[10, 20]])).rejects.toThrow();
      const myU512 = new CairoUint512('0x2345634576575478edc243');
      await expect(nonZeroContract.call('send_nonZero_u256', [myU512])).rejects.toThrow();
    });
  });
});
