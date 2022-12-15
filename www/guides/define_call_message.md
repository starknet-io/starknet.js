---
sidebar_position: 9
---
# Data transformation 
Cairo contracts and Javascript/Typescript languages do not have the same types of data.   
So, it's necessary to prepare the data before sending them to a contract (for invoke/execute, or for a constructor).  
When a contract send data to your DAPP (result of a call), you have also to transform them before use in your code.
## Types of data :
In Cairo, everything is felt, an integer on 251 bits.  
This type do not exists in JS/TS ; you have Number, bigInt, string, array, objects... and types defined in libraries.   
In Starknet.js, it's a bit ... complicated : you have the BigNumberish type  ; it can includes :
- String : "123", "0xabc2"
- Number (max 64 bits) : 123 
- BN (max 256 bits) : BigNum from [BN.js](https://github.com/indutny/bn.js/) 🤯.

In some cases, you need to use BN, in other cases strings ; we will see this in detail.  
We will see how to transform these data to communicate with your contract.
## Send data to a Cairo contract :
The parameters for invoke/execute/constructor is an array of strings (string[]).  
If it's a simple case, you can directly define and provide this array :
```typescript
const { transaction_hash: transferTxHash } = await account.execute({
 contractAddress: contractAddress, 
 entrypoint: "addValues", 
 calldata: ["10","20","54"]
 });
```
Unfortunately, in many cases, it's more complicated, and it will be necessary to use the function `stark.compileCalldata()`.  
For a cairo contract, with this constructor :
```cairo
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    name: felt, symbol: felt, decimals: felt, initial_supply: Uint256, recipient: felt, owner: felt
)
```
you will have to create in your code this set of data :
```typescript
const initialTk: uint256.Uint256 = { low: 100, high: 0 };
const ERC20ConstructorCallData = stark.compileCalldata({ 
	name: shortString.encodeShortString('MyToken'), 
	symbol: shortString.encodeShortString('MTK'), 
	decimals: "18", 
	initial_supply: { type: 'struct', low: initialTk.low, high: initialTk.high }, 
	recipient: account0.address, 
	owner: account0.address 
});
const deployERC20Response = await account0.declareDeploy({ classHash: ERC20mintableClassHash, contract: compiledErc20mintable, constructorCalldata: ERC20ConstructorCallData });
 });
```
Let see in detail how it works :
|JS/TS type|JS/TS functions to prepare data|number of data added in string[]|Cairo code|
|----|----------|:--------------------:|------------------------------|
|BigNumberish (251 bits max) or address|`stark.compileCalldata( {amount: "3456089075673453246746507889"}) `|1|`func setV(total: felt)->()`|
||`stark.compileCalldata( {amount: "0xff0378becffa6ad51c67ac"}) `|||
||for BN : `stark.compileCalldata( {amount: qty.toString()}) `|||
||for bigInt : `stark.compileCalldata( {amount: qty.toString()}) `|||
|Number (64 bits max)|`stark.compileCalldata( {amount: toBN(qty).toString()}) `|1|`func setV(total: felt)->()`|
|Uint256 (256 bits max)|`stark.compileCalldata( {amount: { type: 'struct', low: initialTk.low, high: initialTk.high }})`|2|`func setV(amount: Uint256)->()`|
|any object|`stark.compileCalldata( {obj: { type: 'struct', x1: "1", y2: "23", ...... }})`|Nb of elements in object|`func setV(obj: myStruct)->()`|
|shortString (31 ASCII characters max)|`stark.compileCalldata( {name: shortString.encodeShortString("Token")})`|1|`func setV(name: felt)->()`|
|BN[ ]|`stark.compileCalldata( {list: myArray.map( (x)=> x.toString())})`|Nb of elements +1|`func setV(list_len: felt, list: felt*)->()`|
|Number[ ]|`stark.compileCalldata( {list: my Array.map( (x)=> number.toBN(x).toString())})`|Nb of elements +1||
|string[ ] (31 ASCII characters max per element)|`stark.compileCalldata( {list: arr.map((x)=>shortString.encodeShortString(x))})`|(Nb of elements * nb of property of object) +1||
|struct[ ] (here with BN properties)|`stark.compileCalldata( {list: arr.map((x)=>x.map((y)=>y.toString()))})`|(Nb of elements * nb of property of object) +1|`func setV(list_len: felt, list: myStruct*)->()`|
  
  
## Receive data from a Cairo contract :
After : `const result=contract.call(......)` :
|Type|Cairo code|received from contract|JS/TS function to recover data|
|----|----------|--------------------|------------------------------|
|numbers (251 bits max)|`func getV()->(total:felt)`|total:BN|`const total:BN = result.total`|
|numbers (64 bits max)|`func getV()->(total:felt)`|total:BN|`const total:number = parseInt(result.total)`|
|address|`func getV()->(address:felt)`|address:BN|`const address:string = number.toHex(result.address)`|
|Uint256 (256 bits max)|`func getV()->(balance:Uint256)`|low:BN, high:BN|`const balance:BN = uint256.uint256toBN(result.balance)`|
|array|`func getV()->(list_len:felt, list:felt*)`|list:[BN]|`const list:BN[]= result.list`|
|shortString (31 ASCII characters max)|`func getV()->(title:felt)`|title:BN|`const title:string = shortString.decodeShortString(result.title)`|
