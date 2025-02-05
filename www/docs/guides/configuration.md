---
sidebar_position: 1.1
---

# Configuration

Global configuration is a singleton object containing default case-sensitive global properties.
Each property can be configured before rest of the code is run to modified behaviors.
In the chain of action, parameters passed to the classes should have higher priority than global configuration.
Global configuration can be used to store and use custom global parameters during runtime lifespan.

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

## Global parameters and Default Global Configuration

Default global configuration is the initial state that global configuration starts with.
This list will be expanded and details could be found under global/constants.ts

```ts
  logLevel: 'INFO', // verbosity levels of the system logger, more details under logger
  accountTxVersion: ETransactionVersion.V2, // by default use V2 Transactions in the Account Class
  legacyMode: false, // enable legacy transaction types (this could break the code depending on starknet version in production)
```

# Logger

Logger is a singleton object used to inform developers based on the log level.

```ts
  import { logger } from 'starknet';

  /**
   * Set the logging level you would like the system to display
   * * 5 DEBUG  - show all logs
   * * 4 INFO   - show INFO, WARN, ERROR, FATAL
   * * 3 WARN   - show WARN, ERROR, FATAL
   * * 2 ERROR  - show ERROR, FATAL
   * * 1 FATAL  - show only FATAL
   * * 0 OFF    - disable logs
   */

  // set custom log level (can also be done using global config)
  logger.setLogLevel(level: 'WARN')

  // get current log level
  logger.getLogLevel()

  // get the list of all verbosity mods would be displayed under current log level
  logger.getEnabledLogLevels()
```

Developer can also use it to add a custom logs.

```ts
import { logger } from 'starknet';

logger.debug('Debug message', additionalDataObject);
logger.info('Info message', additionalDataObject);
logger.warn('Warn message', additionalDataObject);
logger.error('Error message', additionalDataObject);
logger.fatal('Fatal message', additionalDataObject);
```
