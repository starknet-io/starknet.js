export const ABI = [
  {
    type: 'impl',
    name: 'TestReject',
    interface_name: 'string::string::ITestReject',
  },
  {
    type: 'struct',
    name: 'core::byte_array::ByteArray',
    members: [
      {
        name: 'data',
        type: 'core::array::Array::<core::bytes_31::bytes31>',
      },
      {
        name: 'pending_word',
        type: 'core::felt252',
      },
      {
        name: 'pending_word_len',
        type: 'core::integer::u32',
      },
    ],
  },
  {
    type: 'interface',
    name: 'string::string::ITestReject',
    items: [
      {
        type: 'function',
        name: 'proceed_bytes31',
        inputs: [
          {
            name: 'str',
            type: 'core::bytes_31::bytes31',
          },
        ],
        outputs: [
          {
            type: 'core::bytes_31::bytes31',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_string',
        inputs: [],
        outputs: [
          {
            type: 'core::byte_array::ByteArray',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'proceed_string',
        inputs: [
          {
            name: 'mess',
            type: 'core::byte_array::ByteArray',
          },
        ],
        outputs: [
          {
            type: 'core::byte_array::ByteArray',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'event',
    name: 'string::string::MyTestReject::Event',
    kind: 'enum',
    variants: [],
  },
] as const;
