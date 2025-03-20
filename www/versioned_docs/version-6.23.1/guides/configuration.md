---
sidebar_position: 2.1
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
config.set('mode', 'DEFAULT');

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

Details can be found in [global/constants.ts](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts)

```ts
  logLevel: 'INFO', // verbosity levels of the system logger, more details under logger
  accountTxVersion: ETransactionVersion.V2, // by default use V2 transactions in Account class instances
  legacyMode: false, // enable legacy transaction types (note: this could break the code depending on the Starknet version used by the network)
```

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
