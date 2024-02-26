export const tAbi = [
  {
    type: 'impl',
    name: 'IHelloStarknetImpl',
    interface_name: 'hello_res_events_newTypes::hello_res_events_newTypes::IHelloStarknet',
  },
  {
    type: 'enum',
    name: 'core::bool',
    variants: [
      {
        name: 'False',
        type: '()',
      },
      {
        name: 'True',
        type: '()',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128',
      },
      {
        name: 'high',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
    members: [
      {
        name: 'first',
        type: 'core::integer::u8',
      },
      {
        name: 'second',
        type: 'core::integer::u16',
      },
    ],
  },
  {
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::NestedStruct',
    members: [
      {
        name: 'simpleStruct',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
      },
      {
        name: 'simpleArray',
        type: 'core::array::Array::<core::integer::u8>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::Foo',
    members: [
      {
        name: 'val',
        type: 'core::felt252',
      },
    ],
  },
  {
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
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
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::Bet',
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
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
      },
      {
        name: 'counter_bettor',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
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
    type: 'struct',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::Order',
    members: [
      {
        name: 'p1',
        type: 'core::felt252',
      },
      {
        name: 'p2',
        type: 'core::integer::u16',
      },
    ],
  },
  {
    type: 'enum',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::MyEnum',
    variants: [
      {
        name: 'Response',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::Order',
      },
      {
        name: 'Warning',
        type: 'core::felt252',
      },
      {
        name: 'Error',
        type: 'core::integer::u16',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::option::Option::<core::integer::u8>',
    variants: [
      {
        name: 'Some',
        type: 'core::integer::u8',
      },
      {
        name: 'None',
        type: '()',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::option::Option::<hello_res_events_newTypes::hello_res_events_newTypes::Order>',
    variants: [
      {
        name: 'Some',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::Order',
      },
      {
        name: 'None',
        type: '()',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::result::Result::<hello_res_events_newTypes::hello_res_events_newTypes::Order, core::integer::u16>',
    variants: [
      {
        name: 'Ok',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::Order',
      },
      {
        name: 'Err',
        type: 'core::integer::u16',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::starknet::eth_address::EthAddress',
    members: [
      {
        name: 'address',
        type: 'core::felt252',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::integer::u16>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::integer::u16>',
      },
    ],
  },
  {
    type: 'interface',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::IHelloStarknet',
    items: [
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
        name: 'emitEventRegular',
        inputs: [
          {
            name: 'simpleKeyVariable',
            type: 'core::integer::u8',
          },
          {
            name: 'simpleKeyStruct',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
          },
          {
            name: 'simpleKeyArray',
            type: 'core::array::Array::<core::integer::u8>',
          },
          {
            name: 'simpleDataVariable',
            type: 'core::integer::u8',
          },
          {
            name: 'simpleDataStruct',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
          },
          {
            name: 'simpleDataArray',
            type: 'core::array::Array::<core::integer::u8>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'emitEventNested',
        inputs: [
          {
            name: 'nestedKeyStruct',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::NestedStruct',
          },
          {
            name: 'nestedDataStruct',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::NestedStruct',
          },
        ],
        outputs: [],
        state_mutability: 'external',
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
        type: 'function',
        name: 'echo_struct',
        inputs: [
          {
            name: 'tt',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::Foo',
          },
        ],
        outputs: [
          {
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::Foo',
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
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::Bet',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'set_user1',
        inputs: [
          {
            name: 'user',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
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
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
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
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::UserData',
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
      {
        type: 'function',
        name: 'my_enum_output',
        inputs: [
          {
            name: 'val1',
            type: 'core::integer::u16',
          },
        ],
        outputs: [
          {
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::MyEnum',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'my_enum_input',
        inputs: [
          {
            name: 'customEnum',
            type: 'hello_res_events_newTypes::hello_res_events_newTypes::MyEnum',
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
        name: 'option_u8_output',
        inputs: [
          {
            name: 'val1',
            type: 'core::integer::u8',
          },
        ],
        outputs: [
          {
            type: 'core::option::Option::<core::integer::u8>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'option_order_output',
        inputs: [
          {
            name: 'val1',
            type: 'core::integer::u16',
          },
        ],
        outputs: [
          {
            type: 'core::option::Option::<hello_res_events_newTypes::hello_res_events_newTypes::Order>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'option_order_input',
        inputs: [
          {
            name: 'inp',
            type: 'core::option::Option::<hello_res_events_newTypes::hello_res_events_newTypes::Order>',
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
        name: 'enum_result_output',
        inputs: [
          {
            name: 'val1',
            type: 'core::integer::u16',
          },
        ],
        outputs: [
          {
            type: 'core::result::Result::<hello_res_events_newTypes::hello_res_events_newTypes::Order, core::integer::u16>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'enum_result_input',
        inputs: [
          {
            name: 'inp',
            type: 'core::result::Result::<hello_res_events_newTypes::hello_res_events_newTypes::Order, core::integer::u16>',
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
        name: 'new_types',
        inputs: [
          {
            name: 'ch',
            type: 'core::starknet::class_hash::ClassHash',
          },
          {
            name: 'eth_addr',
            type: 'core::starknet::eth_address::EthAddress',
          },
          {
            name: 'contr_address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: '(core::starknet::class_hash::ClassHash, core::starknet::eth_address::EthAddress, core::starknet::contract_address::ContractAddress)',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'new_span',
        inputs: [
          {
            name: 'my_span',
            type: 'core::array::Span::<core::integer::u16>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<core::integer::u16>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'array_new_types',
        inputs: [
          {
            name: 'tup',
            type: '(core::starknet::contract_address::ContractAddress, core::starknet::eth_address::EthAddress, core::starknet::class_hash::ClassHash)',
          },
          {
            name: 'tupa',
            type: '(core::array::Array::<core::starknet::contract_address::ContractAddress>, core::array::Array::<core::starknet::eth_address::EthAddress>, core::array::Array::<core::starknet::class_hash::ClassHash>)',
          },
        ],
        outputs: [
          {
            type: '(core::array::Array::<core::starknet::contract_address::ContractAddress>, core::array::Array::<core::starknet::eth_address::EthAddress>, core::array::Array::<core::starknet::class_hash::ClassHash>)',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'array_contract_addr',
        inputs: [
          {
            name: 'arr',
            type: 'core::array::Array::<core::starknet::contract_address::ContractAddress>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::starknet::contract_address::ContractAddress>',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  // {
  //   type: 'l1_handler',
  //   name: 'increase_bal',
  //   inputs: [
  //     {
  //       name: 'from_address',
  //       type: 'core::felt252',
  //     },
  //     {
  //       name: 'amount',
  //       type: 'core::felt252',
  //     },
  //   ],
  //   outputs: [],
  //   state_mutability: 'external',
  // },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [],
  },
  {
    type: 'event',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::EventRegular',
    kind: 'struct',
    members: [
      {
        name: 'simpleKeyVariable',
        type: 'core::integer::u8',
        kind: 'key',
      },
      {
        name: 'simpleKeyStruct',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
        kind: 'key',
      },
      {
        name: 'simpleKeyArray',
        type: 'core::array::Array::<core::integer::u8>',
        kind: 'key',
      },
      {
        name: 'simpleDataVariable',
        type: 'core::integer::u8',
        kind: 'data',
      },
      {
        name: 'simpleDataStruct',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::SimpleStruct',
        kind: 'data',
      },
      {
        name: 'simpleDataArray',
        type: 'core::array::Array::<core::integer::u8>',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::EventNested',
    kind: 'struct',
    members: [
      {
        name: 'nestedKeyStruct',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::NestedStruct',
        kind: 'key',
      },
      {
        name: 'nestedDataStruct',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::NestedStruct',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::Event',
    kind: 'enum',
    variants: [
      {
        name: 'EventRegular',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::EventRegular',
        kind: 'nested',
      },
      {
        name: 'EventNested',
        type: 'hello_res_events_newTypes::hello_res_events_newTypes::HelloStarknet::EventNested',
        kind: 'nested',
      },
    ],
  },
] as const;
