---
sidebar_position: 3
---

# Configuration

Starknet.js has behaviors that can be adjusted through its configurations: `config` and `logger`.

## Config

The core global configuration is a singleton object containing case-sensitive global default properties.
Each property can be configured before the rest of the code is run to modify their corresponding behavior.
When they overlap, constructor and method parameters have higher precedence over the global configuration defaults.
Custom keys can also be used to store and use arbitrary values during runtime.

```ts
import { config } from 'starknet';

// Set existing or custom global property
config.set('rpcVersion', '0.8.1');

// Retrieve entire configuration
config.getAll();

// Retrieve single global property
config.get('legacyMode');

// Update (merge) existing configuration with modified or custom property
config.update({ logLevel: 'DEBUG', newKey: 'value' });

// Reset config to initial global configuration
config.reset();

// Delete existing global property
config.delete('newKey');

// Check existence of the global property
config.hasKey('newKey');
```

### Global parameters and Default Global Configuration

Default global configuration is the initial state that global configuration starts with.
Here are all the available configuration properties:

```ts
{
  // Enable/disable legacy transaction types (note: this could break the code depending on the Starknet version used by the network)
  legacyMode: false,

  // RPC version to use when communicating with nodes ('0.7.1' or '0.8.1')
  rpcVersion: '0.8.1',

  // Transaction version to use (V2 or V3, where V3 is recommended)
  transactionVersion: ETransactionVersion.V3,

  // Verbosity levels of the system logger (more details under logger section)
  logLevel: 'INFO',

  // Fee margin percentage configuration for transaction fee estimation
  feeMarginPercentage: {
    bounds: {
      l1_gas: {
        max_amount: 50,    // Maximum percentage increase for L1 gas amount
        max_price_per_unit: 50,  // Maximum percentage increase for L1 gas price
      },
      l1_data_gas: {
        max_amount: 50,    // Maximum percentage increase for L1 data gas amount
        max_price_per_unit: 50,  // Maximum percentage increase for L1 data gas price
      },
      l2_gas: {
        max_amount: 50,    // Maximum percentage increase for L2 gas amount
        max_price_per_unit: 50,  // Maximum percentage increase for L2 gas price
      },
    },
    maxFee: 50,  // Maximum percentage increase for overall fee
  },

  // Custom fetch implementation (optional)
  fetch: undefined,

  // Custom websocket implementation (optional)
  websocket: undefined
}
```

Details can be found in [global/constants.ts](https://github.com/starknet-io/starknet.js/blob/develop/src/global/constants.ts)

## Logger

Logger is a singleton object through which the Starknet.js logs are managed.

Supported log levels:

|         |     |                               |
| :-----: | --- | ----------------------------- |
| `DEBUG` | 5   | show all logs                 |
| `INFO`  | 4   | show INFO, WARN, ERROR, FATAL |
| `WARN`  | 3   | show WARN, ERROR, FATAL       |
| `ERROR` | 2   | show ERROR, FATAL             |
| `FATAL` | 1   | show only FATAL               |
|  `OFF`  | 0   | disable logs                  |

```ts
import { logger } from 'starknet';

// set custom log level (can also be done using global config)
logger.setLogLevel('WARN');

// get current log level
logger.getLogLevel();

// get a list of all verbosity modes that would be displayed with the current log level
logger.getEnabledLogLevels();
```

Developers can also use it to add custom logs.

```ts
import { logger } from 'starknet';

logger.debug('Debug message', additionalDataObject);
logger.info('Info message', additionalDataObject);
logger.warn('Warn message', additionalDataObject);
logger.error('Error message', additionalDataObject);
logger.fatal('Fatal message', additionalDataObject);
```
