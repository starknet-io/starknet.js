# Variable: hdParsingStrategy

> `const` **hdParsingStrategy**: `object`

Defined in: [src/utils/calldata/parser/parsingStrategy.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parsingStrategy.ts#L36)

More robust parsing strategy
Configuration mapping - data-driven approach
Configure parsing strategy for each abi type

## Type Declaration

### request

> `readonly` **request**: `object`

#### Index Signature

\[`key`: `string`\]: (`val`) => `string`[]

#### request.core::bytes_31::bytes31

> `readonly` **core::bytes_31::bytes31**: (`val`) => `string`[]

##### Parameters

###### val

`unknown`

##### Returns

`string`[]

#### request.core::byte_array::ByteArray

> `readonly` **core::byte_array::ByteArray**: (`val`) => `string`[]

##### Parameters

###### val

`unknown`

##### Returns

`string`[]

#### request.core::felt252

> `readonly` **core::felt252**: (`val`) => `string`[]

##### Parameters

###### val

`unknown`

##### Returns

`string`[]

#### request.core::integer::u256

> `readonly` **core::integer::u256**: (`val`) => `string`[]

##### Parameters

###### val

`unknown`

##### Returns

`string`[]

### response

> `readonly` **response**: `object`

#### Index Signature

\[`key`: `string`\]: ((`responseIterator`) => `string`) \| ((`responseIterator`) => `bigint`)

#### response.core::bytes_31::bytes31

> `readonly` **core::bytes_31::bytes31**: (`responseIterator`) => `string`

##### Parameters

###### responseIterator

`Iterator`\<`string`\>

##### Returns

`string`

#### response.core::byte_array::ByteArray

> `readonly` **core::byte_array::ByteArray**: (`responseIterator`) => `string`

##### Parameters

###### responseIterator

`Iterator`\<`string`\>

##### Returns

`string`

#### response.core::felt252

> `readonly` **core::felt252**: (`responseIterator`) => `bigint`

##### Parameters

###### responseIterator

`Iterator`\<`string`\>

##### Returns

`bigint`

#### response.core::integer::u256

> `readonly` **core::integer::u256**: (`responseIterator`) => `bigint`

##### Parameters

###### responseIterator

`Iterator`\<`string`\>

##### Returns

`bigint`
