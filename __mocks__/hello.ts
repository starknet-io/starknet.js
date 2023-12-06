// Copied from __mocks__/cairo/helloSierra/hello.json because we have to add `as const`
// for TypeScript to narrow the types
export const tAbi = [
  {
    type: 'function',
    name: 'increase_balance',
    inputs: [
      {
        name: 'amount',
        type: 'core::felt252',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'get_balance',
    inputs: [],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'set_status',
    inputs: [
      {
        name: 'new_status',
        type: 'core::bool',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'get_status',
    inputs: [],
    outputs: [
      {
        type: 'core::bool',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'set_ca',
    inputs: [
      {
        name: 'address',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'get_ca',
    inputs: [],
    outputs: [
      {
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'increase_balance_u8',
    inputs: [
      {
        name: 'amount',
        type: 'core::integer::u8',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'get_balance_u8',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u8',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'test_u16',
    inputs: [
      {
        name: 'p1',
        type: 'core::integer::u16',
      },
    ],
    outputs: [
      {
        type: 'core::integer::u16',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'test_u32',
    inputs: [
      {
        name: 'p1',
        type: 'core::integer::u32',
      },
    ],
    outputs: [
      {
        type: 'core::integer::u32',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'test_u64',
    inputs: [
      {
        name: 'p1',
        type: 'core::integer::u64',
      },
    ],
    outputs: [
      {
        type: 'core::integer::u64',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'test_u128',
    inputs: [
      {
        name: 'p1',
        type: 'core::integer::u128',
      },
    ],
    outputs: [
      {
        type: 'core::integer::u128',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'test_u256',
    inputs: [
      {
        name: 'p1',
        type: 'core::integer::u256',
      },
    ],
    outputs: [
      {
        type: 'core::integer::u256',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'echo_array',
    inputs: [
      {
        name: 'data',
        type: 'core::array::Array::<core::integer::u8>',
      },
    ],
    outputs: [
      {
        type: 'core::array::Array::<core::integer::u8>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'echo_array_u256',
    inputs: [
      {
        name: 'data',
        type: 'core::array::Array::<core::integer::u256>',
      },
    ],
    outputs: [
      {
        type: 'core::array::Array::<core::integer::u256>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'echo_array_bool',
    inputs: [
      {
        name: 'data',
        type: 'core::array::Array::<core::bool>',
      },
    ],
    outputs: [
      {
        type: 'core::array::Array::<core::bool>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'echo_un_tuple',
    inputs: [
      {
        name: 'a',
        type: '(core::felt252, core::integer::u16)',
      },
    ],
    outputs: [
      {
        type: '(core::felt252, core::integer::u16)',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'struct',
    name: 'hello::hello::Foo',
    members: [
      {
        name: 'val',
        type: 'core::felt252',
      },
    ],
  },
  {
    type: 'function',
    name: 'echo_struct',
    inputs: [
      {
        name: 'tt',
        type: 'hello::hello::Foo',
      },
    ],
    outputs: [
      {
        type: 'hello::hello::Foo',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'set_bet',
    inputs: [],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'struct',
    name: 'hello::hello::Bet',
    members: [
      {
        name: 'name',
        type: 'core::felt252',
      },
      {
        name: 'description',
        type: 'core::felt252',
      },
      {
        name: 'expire_date',
        type: 'core::integer::u64',
      },
      {
        name: 'creation_time',
        type: 'core::integer::u64',
      },
      {
        name: 'creator',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'is_cancelled',
        type: 'core::bool',
      },
      {
        name: 'is_voted',
        type: 'core::bool',
      },
      {
        name: 'bettor',
        type: 'hello::hello::UserData',
      },
      {
        name: 'counter_bettor',
        type: 'hello::hello::UserData',
      },
      {
        name: 'winner',
        type: 'core::bool',
      },
      {
        name: 'pool',
        type: 'core::integer::u256',
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
      },
    ],
  },
  {
    type: 'function',
    name: 'get_bet',
    inputs: [
      {
        name: 'test',
        type: 'core::felt252',
      },
    ],
    outputs: [
      {
        type: 'hello::hello::Bet',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'struct',
    name: 'hello::hello::UserData',
    members: [
      {
        name: 'address',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'is_claimed',
        type: 'core::bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'set_user1',
    inputs: [
      {
        name: 'user',
        type: 'hello::hello::UserData',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'get_user1',
    inputs: [],
    outputs: [
      {
        type: 'hello::hello::UserData',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'get_user',
    inputs: [],
    outputs: [
      {
        type: 'hello::hello::UserData',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'array2d_ex',
    inputs: [
      {
        name: 'test',
        type: 'core::array::Array::<core::array::Array::<core::felt252>>',
      },
    ],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'array2d_array',
    inputs: [
      {
        name: 'test',
        type: 'core::array::Array::<core::array::Array::<core::felt252>>',
      },
    ],
    outputs: [
      {
        type: 'core::array::Array::<core::array::Array::<core::felt252>>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'array2d_felt',
    inputs: [
      {
        name: 'test',
        type: 'core::array::Array::<core::array::Array::<core::felt252>>',
      },
    ],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'tuple_echo',
    inputs: [
      {
        name: 'a',
        type: '(core::array::Array::<core::felt252>, core::array::Array::<core::felt252>)',
      },
    ],
    outputs: [
      {
        type: '(core::array::Array::<core::felt252>, core::array::Array::<core::felt252>)',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'array_bool_tuple',
    inputs: [
      {
        name: 'a',
        type: 'core::array::Array::<core::felt252>',
      },
      {
        name: 'b',
        type: 'core::bool',
      },
    ],
    outputs: [
      {
        type: '(core::array::Array::<core::felt252>, core::bool)',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'array2ddd_felt',
    inputs: [
      {
        name: 'testdd',
        type: 'core::array::Array::<core::array::Array::<core::felt252>>',
      },
    ],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
] as const;
