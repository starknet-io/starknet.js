# [7.1.0](https://github.com/starknet-io/starknet.js/compare/v7.0.1...v7.1.0) (2025-04-14)

### Bug Fixes

- ensure enum replacement objects are reachable for type resolution ([#1375](https://github.com/starknet-io/starknet.js/issues/1375)) ([eb8b10d](https://github.com/starknet-io/starknet.js/commit/eb8b10dd075475d83cbd4748b610d911f945823f))
- make the provider create method generic to enable it when mixins are applied ([#1370](https://github.com/starknet-io/starknet.js/issues/1370)) ([1f48dc6](https://github.com/starknet-io/starknet.js/commit/1f48dc6957aea8d5480f5413c184ac82ea5dd0db))

### Features

- update to rpc 0.8.1 ([83e17b8](https://github.com/starknet-io/starknet.js/commit/83e17b8b385fe00b5d2ed476de80a6773565bd9a))

## [7.0.1](https://github.com/starknet-io/starknet.js/compare/v7.0.0...v7.0.1) (2025-03-28)

### Bug Fixes

- preserve value for numeric arguments within address padding utility ([abc7958](https://github.com/starknet-io/starknet.js/commit/abc7958a68f5edc396f038f2352a9d747980502f))

# [7.0.0](https://github.com/starknet-io/starknet.js/compare/v6.24.1...v7.0.0) (2025-03-28)

- Implement RPC 0.8 and V3 transactions ([#1328](https://github.com/starknet-io/starknet.js/issues/1328)) ([316ae27](https://github.com/starknet-io/starknet.js/commit/316ae2789376368dcffe653ce4817eebf0a63d97))

### Bug Fixes

- contract withOptions Fix/1252 ([#1255](https://github.com/starknet-io/starknet.js/issues/1255)) ([b59952e](https://github.com/starknet-io/starknet.js/commit/b59952e74baf82641d6028c96625db104049c02e))
- update ws impl, add TEST_WS_URL, update token constants ([411eeec](https://github.com/starknet-io/starknet.js/commit/411eeec1df6a38358f28612260066b38fc942957))

### Features

- drop fetch-cookie dependency ([9a57daf](https://github.com/starknet-io/starknet.js/commit/9a57dafce473432df7040f68e0824e9e78f6e215))
- drop isomorphic-fetch dependency ([9da0083](https://github.com/starknet-io/starknet.js/commit/9da0083d2084b0bd9ec7da06ea9a80f267f4e397))
- prune deprecated functionalities ([cbd18f5](https://github.com/starknet-io/starknet.js/commit/cbd18f59fb0749c558ba4eabc0f094464941b088))
- the WebSockets ([#1251](https://github.com/starknet-io/starknet.js/issues/1251)) ([fabca27](https://github.com/starknet-io/starknet.js/commit/fabca27a7a3e398030a99cf8d78bffa51cebfe9a)), closes [#1272](https://github.com/starknet-io/starknet.js/issues/1272)
- Update Beta to latest Develop ([#1312](https://github.com/starknet-io/starknet.js/issues/1312)) ([2958051](https://github.com/starknet-io/starknet.js/commit/295805116cf0f57b8708f545cc187f19f79588f4)), closes [#949](https://github.com/starknet-io/starknet.js/issues/949) [#970](https://github.com/starknet-io/starknet.js/issues/970)
- v7 fee, new methods, tests ([#1337](https://github.com/starknet-io/starknet.js/issues/1337)) ([00743de](https://github.com/starknet-io/starknet.js/commit/00743de2cad5375a558844646f11b4adef15188b))

### BREAKING CHANGES

- Removed multiple functionalities that have been marked as deprecated
- Library defaults to RPC 0.8 with the corresponding API changes, dropped RPC 0.6 support

# [7.0.0-beta.4](https://github.com/starknet-io/starknet.js/compare/v7.0.0-beta.3...v7.0.0-beta.4) (2025-03-28)

### Bug Fixes

- repair snip-12 enum type nested dependency ([#1289](https://github.com/starknet-io/starknet.js/issues/1289)) ([1cd4219](https://github.com/starknet-io/starknet.js/commit/1cd4219df5e61a676bc58ba8c8673269695fc2db))

### Features

- drop fetch-cookie dependency ([9a57daf](https://github.com/starknet-io/starknet.js/commit/9a57dafce473432df7040f68e0824e9e78f6e215))
- drop isomorphic-fetch dependency ([9da0083](https://github.com/starknet-io/starknet.js/commit/9da0083d2084b0bd9ec7da06ea9a80f267f4e397))
- prune deprecated functionalities ([cbd18f5](https://github.com/starknet-io/starknet.js/commit/cbd18f59fb0749c558ba4eabc0f094464941b088))

### BREAKING CHANGES

- Removed multiple functionalities that have been marked as deprecated

# [7.0.0-beta.3](https://github.com/starknet-io/starknet.js/compare/v7.0.0-beta.2...v7.0.0-beta.3) (2025-03-13)

### Features

- add simulate and estimate fee utility methods for outside execution ([#1327](https://github.com/starknet-io/starknet.js/issues/1327)) ([3668b01](https://github.com/starknet-io/starknet.js/commit/3668b01c4f63969bb0770ee6120fe3eac72d0335))
- implement cairo fixed array support ([#1310](https://github.com/starknet-io/starknet.js/issues/1310)) ([45df63e](https://github.com/starknet-io/starknet.js/commit/45df63e7bb7f7cb2de2e98900387b1c44a95f257))

# [7.0.0-beta.2](https://github.com/starknet-io/starknet.js/compare/v7.0.0-beta.1...v7.0.0-beta.2) (2025-03-10)

### Bug Fixes

- contract withOptions Fix/1252 ([#1255](https://github.com/starknet-io/starknet.js/issues/1255)) ([b59952e](https://github.com/starknet-io/starknet.js/commit/b59952e74baf82641d6028c96625db104049c02e))
- update ws impl, add TEST_WS_URL, update token constants ([411eeec](https://github.com/starknet-io/starknet.js/commit/411eeec1df6a38358f28612260066b38fc942957))

### Features

- the WebSockets ([#1251](https://github.com/starknet-io/starknet.js/issues/1251)) ([fabca27](https://github.com/starknet-io/starknet.js/commit/fabca27a7a3e398030a99cf8d78bffa51cebfe9a)), closes [#1272](https://github.com/starknet-io/starknet.js/issues/1272)
- v7 fee, new methods, tests ([#1337](https://github.com/starknet-io/starknet.js/issues/1337)) ([00743de](https://github.com/starknet-io/starknet.js/commit/00743de2cad5375a558844646f11b4adef15188b))

# [7.0.0-beta.1](https://github.com/starknet-io/starknet.js/compare/v6.24.0-beta.1...v7.0.0-beta.1) (2025-03-04)

- Implement RPC 0.8 and V3 transactions ([#1328](https://github.com/starknet-io/starknet.js/issues/1328)) ([316ae27](https://github.com/starknet-io/starknet.js/commit/316ae2789376368dcffe653ce4817eebf0a63d97))

### BREAKING CHANGES

- Library defaults to RPC 0.8 with the corresponding API changes, dropped RPC 0.6 support

## [6.24.1](https://github.com/starknet-io/starknet.js/compare/v6.24.0...v6.24.1) (2025-03-20)

### Bug Fixes

- repair snip-12 enum type nested dependency ([#1289](https://github.com/starknet-io/starknet.js/issues/1289)) ([1cd4219](https://github.com/starknet-io/starknet.js/commit/1cd4219df5e61a676bc58ba8c8673269695fc2db))

# [6.24.0](https://github.com/starknet-io/starknet.js/compare/v6.23.1...v6.24.0) (2025-03-12)

### Features

- add simulate and estimate fee utility methods for outside execution ([#1327](https://github.com/starknet-io/starknet.js/issues/1327)) ([3668b01](https://github.com/starknet-io/starknet.js/commit/3668b01c4f63969bb0770ee6120fe3eac72d0335))
- implement cairo fixed array support ([#1310](https://github.com/starknet-io/starknet.js/issues/1310)) ([45df63e](https://github.com/starknet-io/starknet.js/commit/45df63e7bb7f7cb2de2e98900387b1c44a95f257))

## [6.23.1](https://github.com/starknet-io/starknet.js/compare/v6.23.0...v6.23.1) (2025-02-05)

### Bug Fixes

- conf. TxV in Account, conf. string auto. all methods, fix unbdef… ([#1311](https://github.com/starknet-io/starknet.js/issues/1311)) ([1d91ec0](https://github.com/starknet-io/starknet.js/commit/1d91ec00c9b3f5c47dfc77946c7250b7022728a6))

# [6.23.0](https://github.com/starknet-io/starknet.js/compare/v6.22.0...v6.23.0) (2025-01-29)

### Features

- logger, config, deprecate legacy tx ([#1302](https://github.com/starknet-io/starknet.js/issues/1302)) ([d0ffbcc](https://github.com/starknet-io/starknet.js/commit/d0ffbcc9bef8b6069f79644d3b54667b3d75dbf2))

# [6.22.0](https://github.com/starknet-io/starknet.js/compare/v6.21.2...v6.22.0) (2025-01-29)

### Features

- units utils ([#1277](https://github.com/starknet-io/starknet.js/issues/1277)) ([26037e9](https://github.com/starknet-io/starknet.js/commit/26037e92c4cdfa220c29fd1147beae7408d8d004))

## [6.21.2](https://github.com/starknet-io/starknet.js/compare/v6.21.1...v6.21.2) (2025-01-29)

### Bug Fixes

- add starkid improvements ([#1301](https://github.com/starknet-io/starknet.js/issues/1301)) ([51702db](https://github.com/starknet-io/starknet.js/commit/51702dbd8dd3dcb0d6e7960b6b320c8c17afff1b))

## [6.21.1](https://github.com/starknet-io/starknet.js/compare/v6.21.0...v6.21.1) (2025-01-23)

### Bug Fixes

- pass signerDetails to fix estimateFeeBulk ([#1299](https://github.com/starknet-io/starknet.js/issues/1299)) ([f09f20d](https://github.com/starknet-io/starknet.js/commit/f09f20da47396456350d26610dabd2e2641a5a98))

# [6.21.0](https://github.com/starknet-io/starknet.js/compare/v6.20.3...v6.21.0) (2025-01-08)

### Bug Fixes

- correct enum typed data hashing ([#1281](https://github.com/starknet-io/starknet.js/issues/1281)) ([6e353d3](https://github.com/starknet-io/starknet.js/commit/6e353d3d50226907ce6b5ad53309d55ed51c6874))
- rectify snip-12 violation by removing extra `:` in enum encoding ([#1288](https://github.com/starknet-io/starknet.js/issues/1288)) ([b903116](https://github.com/starknet-io/starknet.js/commit/b903116e629af5bc375151deb3635cdbe23cc317))
- repair fetch utility for browser environments ([#1293](https://github.com/starknet-io/starknet.js/issues/1293)) ([2cb1332](https://github.com/starknet-io/starknet.js/commit/2cb13327ffe669000e8152b509d14e060b3ea73b))

### Features

- enable base fetch override ([#1279](https://github.com/starknet-io/starknet.js/issues/1279)) ([0fce61e](https://github.com/starknet-io/starknet.js/commit/0fce61e40535a4f1b3b05fdd9da60f9218250c99))

## [6.20.3](https://github.com/starknet-io/starknet.js/compare/v6.20.2...v6.20.3) (2024-11-28)

### Bug Fixes

- remove shadowed WalletAccount address property ([3251ffc](https://github.com/starknet-io/starknet.js/commit/3251ffca5551714e24ea6c1fb5488db06919c24e))

## [6.20.2](https://github.com/starknet-io/starknet.js/compare/v6.20.1...v6.20.2) (2024-11-28)

### Bug Fixes

- bump typejs 0.7.10 ([#1275](https://github.com/starknet-io/starknet.js/issues/1275)) ([edfa6dd](https://github.com/starknet-io/starknet.js/commit/edfa6dd2466933d4c4b8a8dacb7220778b2669fc))

## [6.20.1](https://github.com/starknet-io/starknet.js/compare/v6.20.0...v6.20.1) (2024-11-28)

### Bug Fixes

- bump types js ([#1273](https://github.com/starknet-io/starknet.js/issues/1273)) ([34dee40](https://github.com/starknet-io/starknet.js/commit/34dee407af2d9487050f3cf6f2969068937960d6))

# [6.20.0](https://github.com/starknet-io/starknet.js/compare/v6.19.0...v6.20.0) (2024-11-27)

### Features

- add support for parsing emitted events ([#1227](https://github.com/starknet-io/starknet.js/issues/1227)) ([321ecae](https://github.com/starknet-io/starknet.js/commit/321ecaed2af5828501eccb982dc8744ec3e90f1f))

# [6.19.0](https://github.com/starknet-io/starknet.js/compare/v6.18.1...v6.19.0) (2024-11-26)

### Features

- Ledger signer 221 ([#1246](https://github.com/starknet-io/starknet.js/issues/1246)) ([03e2d50](https://github.com/starknet-io/starknet.js/commit/03e2d50edee7e2e9e8efb678a97effaf09adee70))

## [6.18.1](https://github.com/starknet-io/starknet.js/compare/v6.18.0...v6.18.1) (2024-11-25)

### Bug Fixes

- expose BatchClient class ([8d3a0de](https://github.com/starknet-io/starknet.js/commit/8d3a0de85230e6f08edebf67b6581d6e79ea191a))

# [6.18.0](https://github.com/starknet-io/starknet.js/compare/v6.17.0...v6.18.0) (2024-11-18)

### Features

- WalletAccount non-breaking temp solution ([#1259](https://github.com/starknet-io/starknet.js/issues/1259)) ([84b267c](https://github.com/starknet-io/starknet.js/commit/84b267cd20122de2954fe9fd87b50503b19c1baa))

# [6.17.0](https://github.com/starknet-io/starknet.js/compare/v6.16.0...v6.17.0) (2024-10-24)

### Features

- Cairo u96 implementation ([#1247](https://github.com/starknet-io/starknet.js/issues/1247)) ([06f0a80](https://github.com/starknet-io/starknet.js/commit/06f0a8013405ded4685d0a21c4f245a25e7d4827))

# [6.16.0](https://github.com/starknet-io/starknet.js/compare/v6.15.0...v6.16.0) (2024-10-24)

### Features

- increase rpc error information propagation ([#1213](https://github.com/starknet-io/starknet.js/issues/1213)) ([947e8b4](https://github.com/starknet-io/starknet.js/commit/947e8b457d08a7533139072b911ace4e382988ae))

# [6.15.0](https://github.com/starknet-io/starknet.js/compare/v6.14.1...v6.15.0) (2024-10-16)

### Features

- num.toHex64 ensure 0x(64 char) format ([#1222](https://github.com/starknet-io/starknet.js/issues/1222)) ([56020cd](https://github.com/starknet-io/starknet.js/commit/56020cdbcd9d1cbe7d58d66b554790bbea8762fe))

## [6.14.1](https://github.com/starknet-io/starknet.js/compare/v6.14.0...v6.14.1) (2024-09-30)

### Bug Fixes

- adjust module configuration ([47e52cf](https://github.com/starknet-io/starknet.js/commit/47e52cf39a71bf99188edc4991b002018e296504))

# [6.14.0](https://github.com/starknet-io/starknet.js/compare/v6.13.1...v6.14.0) (2024-09-04)

### Features

- isClassDeclared prepareInvocations, fix cairo0 test ([#1211](https://github.com/starknet-io/starknet.js/issues/1211)) ([9fdf54f](https://github.com/starknet-io/starknet.js/commit/9fdf54f9a4547ba4072cb26c9a544c6df9e05853))

## [6.13.1](https://github.com/starknet-io/starknet.js/compare/v6.13.0...v6.13.1) (2024-09-03)

### Bug Fixes

- revert companion pattern except constants ([#1193](https://github.com/starknet-io/starknet.js/issues/1193)) ([ebf9f35](https://github.com/starknet-io/starknet.js/commit/ebf9f356fad701be7d3d5dddb539c59222843377))

# [6.13.0](https://github.com/starknet-io/starknet.js/compare/v6.12.1...v6.13.0) (2024-08-27)

### Bug Fixes

- repair enum type lookup for typed data hashing ([36f8c3c](https://github.com/starknet-io/starknet.js/commit/36f8c3c0c04b798138756baa373c135fed5a5339))
- sync cryptographic dependencies ([da20310](https://github.com/starknet-io/starknet.js/commit/da20310ddfd57b30df2c053494220eb50fdfa1b3))

### Features

- implement SNIP-9 outside execution functionality ([#1208](https://github.com/starknet-io/starknet.js/issues/1208)) ([e3c80c5](https://github.com/starknet-io/starknet.js/commit/e3c80c558c84e7554935f90650968310452a25d5)), closes [#1111](https://github.com/starknet-io/starknet.js/issues/1111) [#1202](https://github.com/starknet-io/starknet.js/issues/1202)
- improve message verification utilities ([#1198](https://github.com/starknet-io/starknet.js/issues/1198)) ([bdad9a5](https://github.com/starknet-io/starknet.js/commit/bdad9a586ad77c2883d37f2c76cf6a152f2d1a38))

## [6.12.1](https://github.com/starknet-io/starknet.js/compare/v6.12.0...v6.12.1) (2024-07-30)

### Bug Fixes

- deprecate url utility methods ([bbbf3d8](https://github.com/starknet-io/starknet.js/commit/bbbf3d8add56021b9609395ffff3d93ac084acb1))
- remove ledger transport dependency ([91493bb](https://github.com/starknet-io/starknet.js/commit/91493bb73762f0eb2c4605352c73d35645194593))

# [6.12.0](https://github.com/starknet-io/starknet.js/compare/v6.11.1...v6.12.0) (2024-07-26)

### Bug Fixes

- jest debut fix api requests match using uid ([b1d10a1](https://github.com/starknet-io/starknet.js/commit/b1d10a13fd2308c927a072cd0c87115b294c26ae))
- move BatchClient to utils ([f494902](https://github.com/starknet-io/starknet.js/commit/f49490206eaf396813b9662adefbce36ec219a12))
- rpc batch type errors ([04ad50d](https://github.com/starknet-io/starknet.js/commit/04ad50d4a03a74595790cff235d4af26de5d4969))

### Features

- add L1->L2 hashes ([f8c1dac](https://github.com/starknet-io/starknet.js/commit/f8c1dacc164d487eeac014f932a395ca064e9545))
- ledger Signer ([078c37d](https://github.com/starknet-io/starknet.js/commit/078c37df5687c2ee84ba9a8dfbc5d01153aeb066))
- rpc batch remove delayedAction class ([01f48ef](https://github.com/starknet-io/starknet.js/commit/01f48ef2a85597afc53f3406ecd9a505b12da5b0))
- rpc batch requests ([ce48afc](https://github.com/starknet-io/starknet.js/commit/ce48afc41396d39a89724bbdf2a005822d538725))

# [7.0.0](https://github.com/starknet-io/starknet.js/compare/v6.11.0...v7.0.0) (2024-07-03)

### Bug Fixes

- acc deploy_acc ([732cd94](https://github.com/starknet-io/starknet.js/commit/732cd946f26c2b0fe893067f25c1fe712d72d49b))
- adjust max amount bound calculation for RPC v0.7.0 ([dd34cdb](https://github.com/starknet-io/starknet.js/commit/dd34cdb8b9817a55a16a97d960b1544d75c0059a))
- apply bound for contract address from hash calculation ([6d8c291](https://github.com/starknet-io/starknet.js/commit/6d8c291bce130d7b00ae6d81aff071c4986f04af))
- **beta:** deploy account ([#880](https://github.com/starknet-io/starknet.js/issues/880)) ([00c58e3](https://github.com/starknet-io/starknet.js/commit/00c58e3c6d03b716b68c1b96b5a4adc1cff87dd0))
- byteArray encoding for less than 31 chars ([#1011](https://github.com/starknet-io/starknet.js/issues/1011)) ([653acc4](https://github.com/starknet-io/starknet.js/commit/653acc44c841540214dd6f6b8956b354d7c27644))
- **Calldata.compile:** do not split long `entrypoint` names before calling `getSelectorFromName` ([89715da](https://github.com/starknet-io/starknet.js/commit/89715da3fdb4b497cc5771eb83a88460007740b6))
- **Calldata.compile:** do not split long `entrypoint` names before calling `getSelectorFromName` ([9434bcd](https://github.com/starknet-io/starknet.js/commit/9434bcddf74069c7e5bdecbac94017ae23cd2a45))
- cannot infer ts2742 types from starknet-types@0.7 ([#1098](https://github.com/starknet-io/starknet.js/issues/1098)) ([f1c3b8e](https://github.com/starknet-io/starknet.js/commit/f1c3b8e3aeb96f6efb7e512ac3ba689253004c9d))
- change build cjs and mjs to unbuild ([#1163](https://github.com/starknet-io/starknet.js/issues/1163)) ([bb4a93d](https://github.com/starknet-io/starknet.js/commit/bb4a93d6639cf90298e0b1003fb31a79f11691f0))
- drop abi-wan-kanabi-v1 support ([30a4681](https://github.com/starknet-io/starknet.js/commit/30a46815fa9fb88bbcb98df2f4a8dafc5a32b4ab))
- estimateFeeBulk provided version ([da717be](https://github.com/starknet-io/starknet.js/commit/da717be8e656087eaba21c865a6dd0b648664491))
- expand encoding type for preset types ([b992446](https://github.com/starknet-io/starknet.js/commit/b9924465a1f01ac4273638f3fa258b36192d2101))
- move abiwan from dev dependencies to regular dependencies ([#925](https://github.com/starknet-io/starknet.js/issues/925)) ([6b7ee49](https://github.com/starknet-io/starknet.js/commit/6b7ee49918d704f8143f51ab7a0360446ea4cf5e))
- next version ([#1024](https://github.com/starknet-io/starknet.js/issues/1024)) ([07d4a26](https://github.com/starknet-io/starknet.js/commit/07d4a26c8b93413fcf1b8b54549e11555df86ca9))
- prioritize error states in waitForTransaction evaluation ([ac54404](https://github.com/starknet-io/starknet.js/commit/ac544045e2079b68042d850a09b203fc5536c0d0))
- provider rpc 0.5-0.6 getTransactionReceipt response standardization ([76b6ab4](https://github.com/starknet-io/starknet.js/commit/76b6ab49f6721d1f76c3f30d3d88d6dbc8b80bda))
- remove [warning] from typedoc for external usage ([#1095](https://github.com/starknet-io/starknet.js/issues/1095)) ([195186f](https://github.com/starknet-io/starknet.js/commit/195186fc2974ab0d164b1a48c68f7bf026329df5)), closes [#1121](https://github.com/starknet-io/starknet.js/issues/1121) [#1126](https://github.com/starknet-io/starknet.js/issues/1126)
- remove account_deployment_data from deploy Account ([ede83bf](https://github.com/starknet-io/starknet.js/commit/ede83bfda3c6fcfa9dd397c92bd709293c8dda9b))
- repair Cairo 1 nested and enum tuple handling ([ce2e541](https://github.com/starknet-io/starknet.js/commit/ce2e5417e6c42af17418408dc1ca6aab4c570473))
- revert enums partially & tsup build ([#1165](https://github.com/starknet-io/starknet.js/issues/1165)) ([57b2c72](https://github.com/starknet-io/starknet.js/commit/57b2c7210147f3ff33ebffa844351b50bee6534e))
- rpc event ([ae3e265](https://github.com/starknet-io/starknet.js/commit/ae3e265f6617bd79c8435483916b0f24be036fa6))
- **RpcChannel:** allow client to provide `specVersion` ([ae8cf8e](https://github.com/starknet-io/starknet.js/commit/ae8cf8e19d8ba73c52376d83d2e084da008daba1))
- second option bump semantic release to 0.5 ([c90f9b2](https://github.com/starknet-io/starknet.js/commit/c90f9b285afb455d2404bff67137d5e6ae44cd5f))
- solve wrong response for account.verifyMessage ([05f4095](https://github.com/starknet-io/starknet.js/commit/05f4095599f89dd508fac9316e1c24fc0dceaa8a))
- starkne types 0.7 ([#1087](https://github.com/starknet-io/starknet.js/issues/1087)) ([b038c76](https://github.com/starknet-io/starknet.js/commit/b038c76fe204746f1d1023c2ad3b46c022f6edbd))
- test ci fix ([3a6c924](https://github.com/starknet-io/starknet.js/commit/3a6c9247717cb979842d9b37905ae423267959a5))
- throw on negative param cairo.uint256 and bnToUint256 ([e1ead14](https://github.com/starknet-io/starknet.js/commit/e1ead1466984f26ff91d7fe6174fc87be8c3aede))
- tslib ([#1068](https://github.com/starknet-io/starknet.js/issues/1068)) ([dd7dc10](https://github.com/starknet-io/starknet.js/commit/dd7dc10c57fc3cc35298c0d584a178666e9cfed1))
- typos ([#862](https://github.com/starknet-io/starknet.js/issues/862)) ([b2431d3](https://github.com/starknet-io/starknet.js/commit/b2431d36d636821b32403ef0aa4def2312b10254))
- update fetch-cookie dependency ([518330c](https://github.com/starknet-io/starknet.js/commit/518330c4ee00e671e716b018220f767e8118c431))
- update starknetid sepolia contract addresses ([#1016](https://github.com/starknet-io/starknet.js/issues/1016)) ([b50a3bd](https://github.com/starknet-io/starknet.js/commit/b50a3bdada4345a9d601734762bc7a600766ec25))
- update to latest get-starknet dev ([017702f](https://github.com/starknet-io/starknet.js/commit/017702fd8c579ab62c98bc78fd6e8dd3022ef9ec))
- utilize provided resourceBounds value ([65bea53](https://github.com/starknet-io/starknet.js/commit/65bea53ab03a04fdd4c122ba2fecbb1010100e18))
- **utils:** fix block identifier ([#1076](https://github.com/starknet-io/starknet.js/issues/1076)) ([0a3499d](https://github.com/starknet-io/starknet.js/commit/0a3499d49751061ceae1a4d6023b34f402376efc))
- wallet circular dependency fix ([621ae2d](https://github.com/starknet-io/starknet.js/commit/621ae2d4a015f3bb3b2e63ddbaeb5fa843509a88))

### Features

- abi-wan trigger ([c10150a](https://github.com/starknet-io/starknet.js/commit/c10150a328051054a7bba1260296c0c92fdd2051))
- abiwan v2 intergation ([87d15d3](https://github.com/starknet-io/starknet.js/commit/87d15d3d4ada1138ed5b66620a4de56189195f4c))
- account preferred transaction version, setup v3 ([5652eb2](https://github.com/starknet-io/starknet.js/commit/5652eb211e1accaefbb2f24bcb756ccf9170c07a))
- add getGasPrice rpc provider method ([#1056](https://github.com/starknet-io/starknet.js/issues/1056)) ([d396275](https://github.com/starknet-io/starknet.js/commit/d396275348aff9c932d2bb7466b2a55f96214e4e))
- add provider.decodeParameters ([39595f3](https://github.com/starknet-io/starknet.js/commit/39595f3303204b273fadd53764c59767ce6c5b36))
- add provider.decodeParameters ([be6eec9](https://github.com/starknet-io/starknet.js/commit/be6eec94c8ae5d92df631502c9a1d61663d80101))
- add string types of cairo v2.4.0 ([a8a73c1](https://github.com/starknet-io/starknet.js/commit/a8a73c1f5b0bc72bc42460f3735eeec6f95edcbe))
- add type coverage ([#1120](https://github.com/starknet-io/starknet.js/issues/1120)) ([eceda5d](https://github.com/starknet-io/starknet.js/commit/eceda5dc1c39e472e1105e07797e76aaac3c1531))
- curves ([405de46](https://github.com/starknet-io/starknet.js/commit/405de462032579ef0e8e434c62976dcb84ee1af8))
- def rpc 0_6, sepolia nodes ([4f59a8f](https://github.com/starknet-io/starknet.js/commit/4f59a8f01439662ae7eb785cafcf781c68b2cb04))
- default account UniversalDetails, rpc spec update, update interface ([8dc9b8a](https://github.com/starknet-io/starknet.js/commit/8dc9b8ab28a82a9a0eaa47e0271c12b79e8cff39))
- dual specification with 0.6 implementation, not yet integrated ([ac8c763](https://github.com/starknet-io/starknet.js/commit/ac8c76383bb3f566164bc4f38c477e3e3dc45f31))
- enable cairo 2.6.0 contract declaration ([0104c59](https://github.com/starknet-io/starknet.js/commit/0104c59739a9dbe70091e14372a73ca84550f639))
- ethereum signer ([8473adb](https://github.com/starknet-io/starknet.js/commit/8473adbcfa5ef642297b8a7f448a0d789703037f))
- ethereum-signer ([f37bfb2](https://github.com/starknet-io/starknet.js/commit/f37bfb2788b7c6befc10efca8b102ee2a975ee55))
- expand structured data hashing in line with SNIP-12 ([#920](https://github.com/starknet-io/starknet.js/issues/920)) ([cb20590](https://github.com/starknet-io/starknet.js/commit/cb2059039e3b42501cdfefec7802da83eb73645b))
- Export function parseCalldataField() ([4d59658](https://github.com/starknet-io/starknet.js/commit/4d596582023f24522c25a1a515ee0246d2eca90a))
- get-starknet-core repacked for mjs, and initial implementation ([ab7fa19](https://github.com/starknet-io/starknet.js/commit/ab7fa19f44ad1fc27292313589247b74943fe3d0))
- hashes, signer, vip account, types, versions as string enum ([6ceb9e3](https://github.com/starknet-io/starknet.js/commit/6ceb9e31e51d51a6ce374144fd3ddb82a6ea01b3))
- implement RPC v0.7.0-rc2 specification ([de32936](https://github.com/starknet-io/starknet.js/commit/de329361d838157b4fbe2b37bb043c3235b97a14))
- make Abi and CONTRACT_ABI types compatible with abiwan ([9007816](https://github.com/starknet-io/starknet.js/commit/9007816689528a79bd8bb4267e0098be2e6d71d2))
- make fee margins configurable ([cedd984](https://github.com/starknet-io/starknet.js/commit/cedd984e1106db5b73d17630e282eb956d344a97))
- new CairoUint256 cairo datatype model ([b64abcc](https://github.com/starknet-io/starknet.js/commit/b64abccf3888eba49460124a4d7aabbdca1592d1))
- next-version ([1687dd2](https://github.com/starknet-io/starknet.js/commit/1687dd28f3390e770f66ac5dad52860a1dd92289))
- pretty print rpc LibraryError params, make env.DEBUG usefull ([cca723f](https://github.com/starknet-io/starknet.js/commit/cca723f13009ce7048c7be6b8a6f466aca0d5e19))
- provider.getL1MessageHash ([#1123](https://github.com/starknet-io/starknet.js/issues/1123)) ([1489cf2](https://github.com/starknet-io/starknet.js/commit/1489cf25e7e8598ab161cecc62c82495f64daa33))
- **provider:** fix and clean provider response and response parser, removed seqeuncer api ([7ecb069](https://github.com/starknet-io/starknet.js/commit/7ecb069e3d2c37653cedc44dfbb635c5bc8eec7f))
- **provider:** pending response discrimination, pending type guards ([013a22b](https://github.com/starknet-io/starknet.js/commit/013a22bf4dd8cb6df817ccf6ff2d82837fe91693))
- readme & trigger release ([5341c42](https://github.com/starknet-io/starknet.js/commit/5341c42da8bf5d2f82e4446a60b5e4fdc9c4e2fe))
- remove old version constants, default types api rpc ([ed9cb08](https://github.com/starknet-io/starknet.js/commit/ed9cb089460640af96a73eca66e9971ca5832041))
- replace in verifyMessage : response by Error ([1abf91f](https://github.com/starknet-io/starknet.js/commit/1abf91f170c46d4f4cf5f493dc3d6717c6d3c1e7))
- req id counter ([cedd1ea](https://github.com/starknet-io/starknet.js/commit/cedd1ea32cd58107c504d357a3dd5e9a40010a80))
- rpc 0.6 implementation as superset of 0.5 tx ([5b2b299](https://github.com/starknet-io/starknet.js/commit/5b2b2997ee7e54144864315ed20175017e4218b4))
- rpc 0.6.0-rc3 implementation ([c2607ed](https://github.com/starknet-io/starknet.js/commit/c2607ed64f26d18ea66f2184acf34d3ca9ee4766))
- rpc 0.7.1 ([#1071](https://github.com/starknet-io/starknet.js/issues/1071)) ([11dc600](https://github.com/starknet-io/starknet.js/commit/11dc6003c74b6b6d0408b3f5894b5b6739d4bfba))
- rpc provider ([0d9c2e5](https://github.com/starknet-io/starknet.js/commit/0d9c2e5ba0298af7b608ccbd9dd2eff3dc0bb69a))
- rpcChannel ([181eea3](https://github.com/starknet-io/starknet.js/commit/181eea3e4eabc52cdf46b796f0861e2641d59668))
- sepolia ([26d7044](https://github.com/starknet-io/starknet.js/commit/26d70446edd7c098b7f257d9242cc9d9d220b11e))
- sepolia constants, rpc open change ([6de46b5](https://github.com/starknet-io/starknet.js/commit/6de46b59d22bfda959c083b3ac5570cb8d4c6d0a))
- simulate skip validate by default, spec deploy acc fix ([1b3e7ae](https://github.com/starknet-io/starknet.js/commit/1b3e7aeadaba5b7d59377e249b535f6a8cb8862e))
- skip signatures when skipValidate is true ([6f784ea](https://github.com/starknet-io/starknet.js/commit/6f784ea4e4edd298f1950dac956fd1c81b953497))
- the WalletAccount handle changed channel ([73603e1](https://github.com/starknet-io/starknet.js/commit/73603e175bcc7925aa896be81fb666ffb225890d))
- trigger release ([fbf983f](https://github.com/starknet-io/starknet.js/commit/fbf983f7820768f919cddb2c5806178a20e38bdd))
- update default rpc nodes and version ([9b9fe0e](https://github.com/starknet-io/starknet.js/commit/9b9fe0e4c5d8d54323bb82ab7ceed3a78d6fc1bc))
- update starknetId class and add getStarkProfile function ([ae71c97](https://github.com/starknet-io/starknet.js/commit/ae71c97b38974d4d7b3392532388957e1ea499bb))
- update verson ([5dfe445](https://github.com/starknet-io/starknet.js/commit/5dfe445a5ed09dd531d91156633321fdae4b70cd))
- use fetch-cookie package for cookie based sticky sessions ([5a56485](https://github.com/starknet-io/starknet.js/commit/5a56485052e773c8b0a3f9dbdc2f4ba3626362fb))
- v3 transaction hashes ([4fe40a1](https://github.com/starknet-io/starknet.js/commit/4fe40a1419031cd6328509e2439744d0ff98c8e7))
- v3 tx hashes calculation ([f0e760d](https://github.com/starknet-io/starknet.js/commit/f0e760d109e488b70b16eed24e94b889d708d257))
- v3 wip with est ([b95c462](https://github.com/starknet-io/starknet.js/commit/b95c462df0bd59293b7b42b5474311a3bbbfab1d))
- wallet deploy contract and patches ([dbf53b6](https://github.com/starknet-io/starknet.js/commit/dbf53b6e57948e433186cae6209998dece04fe4a))
- walletAccount extract methods and update new ones ([0dfb5db](https://github.com/starknet-io/starknet.js/commit/0dfb5db1032dd7c946ee514647e8abb3eda87996))

### Reverts

- Revert "chore: add examples to JsDoc for transaction.ts file ([#1105](https://github.com/starknet-io/starknet.js/issues/1105))" ([#1108](https://github.com/starknet-io/starknet.js/issues/1108)) ([59eb01e](https://github.com/starknet-io/starknet.js/commit/59eb01e451cf64dfdacd6d34b2a709e0a1029f15))

### BREAKING CHANGES

- v3 transactions

# [6.11.0](https://github.com/starknet-io/starknet.js/compare/v6.10.3...v6.11.0) (2024-07-02)

### Features

- dummy change ([70cd028](https://github.com/starknet-io/starknet.js/commit/70cd02886432591825af2e7cad31f356898e0d1e))
- v6 version release CI retry ([04c67df](https://github.com/starknet-io/starknet.js/commit/04c67dfec044f36292bcc4171e1d242885c6e11b))

## [6.10.2](https://github.com/starknet-io/starknet.js/compare/v6.10.1...v6.10.2) (2024-07-02)

### Bug Fixes

- revert enums partially & tsup build ([#1165](https://github.com/starknet-io/starknet.js/issues/1165)) ([57b2c72](https://github.com/starknet-io/starknet.js/commit/57b2c7210147f3ff33ebffa844351b50bee6534e))

## [6.10.1](https://github.com/starknet-io/starknet.js/compare/v6.10.0...v6.10.1) (2024-06-28)

### Bug Fixes

- change build cjs and mjs to unbuild ([#1163](https://github.com/starknet-io/starknet.js/issues/1163)) ([bb4a93d](https://github.com/starknet-io/starknet.js/commit/bb4a93d6639cf90298e0b1003fb31a79f11691f0))

# [6.10.0](https://github.com/starknet-io/starknet.js/compare/v6.9.0...v6.10.0) (2024-06-18)

### Features

- next-version ([1687dd2](https://github.com/starknet-io/starknet.js/commit/1687dd28f3390e770f66ac5dad52860a1dd92289))

# [6.9.0](https://github.com/starknet-io/starknet.js/compare/v6.8.0...v6.9.0) (2024-05-21)

### Bug Fixes

- cannot infer ts2742 types from starknet-types@0.7 ([#1098](https://github.com/starknet-io/starknet.js/issues/1098)) ([f1c3b8e](https://github.com/starknet-io/starknet.js/commit/f1c3b8e3aeb96f6efb7e512ac3ba689253004c9d))
- remove [warning] from typedoc for external usage ([#1095](https://github.com/starknet-io/starknet.js/issues/1095)) ([195186f](https://github.com/starknet-io/starknet.js/commit/195186fc2974ab0d164b1a48c68f7bf026329df5)), closes [#1121](https://github.com/starknet-io/starknet.js/issues/1121) [#1126](https://github.com/starknet-io/starknet.js/issues/1126)

### Features

- add type coverage ([#1120](https://github.com/starknet-io/starknet.js/issues/1120)) ([eceda5d](https://github.com/starknet-io/starknet.js/commit/eceda5dc1c39e472e1105e07797e76aaac3c1531))
- provider.getL1MessageHash ([#1123](https://github.com/starknet-io/starknet.js/issues/1123)) ([1489cf2](https://github.com/starknet-io/starknet.js/commit/1489cf25e7e8598ab161cecc62c82495f64daa33))

### Reverts

- Revert "chore: add examples to JsDoc for transaction.ts file (#1105)" (#1108) ([59eb01e](https://github.com/starknet-io/starknet.js/commit/59eb01e451cf64dfdacd6d34b2a709e0a1029f15)), closes [#1105](https://github.com/starknet-io/starknet.js/issues/1105) [#1108](https://github.com/starknet-io/starknet.js/issues/1108)

# [6.8.0](https://github.com/starknet-io/starknet.js/compare/v6.7.0...v6.8.0) (2024-04-23)

### Bug Fixes

- starknet types 0.7 ([#1087](https://github.com/starknet-io/starknet.js/issues/1087)) ([b038c76](https://github.com/starknet-io/starknet.js/commit/b038c76fe204746f1d1023c2ad3b46c022f6edbd))
- tslib ([#1068](https://github.com/starknet-io/starknet.js/issues/1068)) ([dd7dc10](https://github.com/starknet-io/starknet.js/commit/dd7dc10c57fc3cc35298c0d584a178666e9cfed1))
- **utils:** fix block identifier ([#1076](https://github.com/starknet-io/starknet.js/issues/1076)) ([0a3499d](https://github.com/starknet-io/starknet.js/commit/0a3499d49751061ceae1a4d6023b34f402376efc))

### Features

- add getGasPrice rpc provider method ([#1056](https://github.com/starknet-io/starknet.js/issues/1056)) ([d396275](https://github.com/starknet-io/starknet.js/commit/d396275348aff9c932d2bb7466b2a55f96214e4e))
- Export function parseCalldataField() ([4d59658](https://github.com/starknet-io/starknet.js/commit/4d596582023f24522c25a1a515ee0246d2eca90a))
- rpc 0.7.1 ([#1071](https://github.com/starknet-io/starknet.js/issues/1071)) ([11dc600](https://github.com/starknet-io/starknet.js/commit/11dc6003c74b6b6d0408b3f5894b5b6739d4bfba))

# [6.7.0](https://github.com/starknet-io/starknet.js/compare/v6.6.6...v6.7.0) (2024-04-03)

### Features

- readme & trigger release ([5341c42](https://github.com/starknet-io/starknet.js/commit/5341c42da8bf5d2f82e4446a60b5e4fdc9c4e2fe))

## [6.6.6](https://github.com/starknet-io/starknet.js/compare/v6.6.5...v6.6.6) (2024-03-25)

### Bug Fixes

- next version ([#1024](https://github.com/starknet-io/starknet.js/issues/1024)) ([07d4a26](https://github.com/starknet-io/starknet.js/commit/07d4a26c8b93413fcf1b8b54549e11555df86ca9))

# [6.6.0](https://github.com/starknet-io/starknet.js/compare/v6.5.0...v6.6.0) (2024-03-19)

### Bug Fixes

- second option bump semantic release to 0.5 ([c90f9b2](https://github.com/starknet-io/starknet.js/commit/c90f9b285afb455d2404bff67137d5e6ae44cd5f))
- test ci fix ([3a6c924](https://github.com/starknet-io/starknet.js/commit/3a6c9247717cb979842d9b37905ae423267959a5))
- update to latest get-starknet dev ([017702f](https://github.com/starknet-io/starknet.js/commit/017702fd8c579ab62c98bc78fd6e8dd3022ef9ec))
- wallet circular dependency fix ([621ae2d](https://github.com/starknet-io/starknet.js/commit/621ae2d4a015f3bb3b2e63ddbaeb5fa843509a88))

### Features

- get-starknet-core repacked for mjs, and initial implementation ([ab7fa19](https://github.com/starknet-io/starknet.js/commit/ab7fa19f44ad1fc27292313589247b74943fe3d0))
- the WalletAccount handle changed channel ([73603e1](https://github.com/starknet-io/starknet.js/commit/73603e175bcc7925aa896be81fb666ffb225890d))
- wallet deploy contract and patches ([dbf53b6](https://github.com/starknet-io/starknet.js/commit/dbf53b6e57948e433186cae6209998dece04fe4a))
- walletAccount extract methods and update new ones ([0dfb5db](https://github.com/starknet-io/starknet.js/commit/0dfb5db1032dd7c946ee514647e8abb3eda87996))

# [6.5.0](https://github.com/starknet-io/starknet.js/compare/v6.4.2...v6.5.0) (2024-03-14)

### Bug Fixes

- adjust max amount bound calculation for RPC v0.7.0 ([dd34cdb](https://github.com/starknet-io/starknet.js/commit/dd34cdb8b9817a55a16a97d960b1544d75c0059a))

### Features

- make fee margins configurable ([cedd984](https://github.com/starknet-io/starknet.js/commit/cedd984e1106db5b73d17630e282eb956d344a97))

## [6.4.2](https://github.com/starknet-io/starknet.js/compare/v6.4.1...v6.4.2) (2024-03-14)

### Bug Fixes

- update starknetid sepolia contract addresses ([#1016](https://github.com/starknet-io/starknet.js/issues/1016)) ([b50a3bd](https://github.com/starknet-io/starknet.js/commit/b50a3bdada4345a9d601734762bc7a600766ec25))

## [6.4.1](https://github.com/starknet-io/starknet.js/compare/v6.4.0...v6.4.1) (2024-03-14)

### Bug Fixes

- byteArray encoding for less than 31 chars ([#1011](https://github.com/starknet-io/starknet.js/issues/1011)) ([653acc4](https://github.com/starknet-io/starknet.js/commit/653acc44c841540214dd6f6b8956b354d7c27644))

# [6.4.0](https://github.com/starknet-io/starknet.js/compare/v6.3.0...v6.4.0) (2024-03-12)

### Bug Fixes

- expand encoding type for preset types ([b992446](https://github.com/starknet-io/starknet.js/commit/b9924465a1f01ac4273638f3fa258b36192d2101))

### Features

- enable cairo 2.6.0 contract declaration ([0104c59](https://github.com/starknet-io/starknet.js/commit/0104c59739a9dbe70091e14372a73ca84550f639))
- skip signatures when skipValidate is true ([6f784ea](https://github.com/starknet-io/starknet.js/commit/6f784ea4e4edd298f1950dac956fd1c81b953497))

# [6.3.0](https://github.com/starknet-io/starknet.js/compare/v6.2.1...v6.3.0) (2024-03-11)

### Features

- update starknetId class and add getStarkProfile function ([ae71c97](https://github.com/starknet-io/starknet.js/commit/ae71c97b38974d4d7b3392532388957e1ea499bb))

## [6.2.1](https://github.com/starknet-io/starknet.js/compare/v6.2.0...v6.2.1) (2024-03-11)

### Bug Fixes

- repair Cairo 1 nested and enum tuple handling ([ce2e541](https://github.com/starknet-io/starknet.js/commit/ce2e5417e6c42af17418408dc1ca6aab4c570473))

# [6.2.0](https://github.com/starknet-io/starknet.js/compare/v6.1.5...v6.2.0) (2024-03-07)

### Features

- implement RPC v0.7.0-rc2 specification ([de32936](https://github.com/starknet-io/starknet.js/commit/de329361d838157b4fbe2b37bb043c3235b97a14))

## [6.1.5](https://github.com/starknet-io/starknet.js/compare/v6.1.4...v6.1.5) (2024-03-02)

### Bug Fixes

- **RpcChannel:** allow client to provide `specVersion` ([ae8cf8e](https://github.com/starknet-io/starknet.js/commit/ae8cf8e19d8ba73c52376d83d2e084da008daba1))

## [6.1.4](https://github.com/starknet-io/starknet.js/compare/v6.1.3...v6.1.4) (2024-02-26)

### Bug Fixes

- **Calldata.compile:** do not split long `entrypoint` names before calling `getSelectorFromName` ([9434bcd](https://github.com/starknet-io/starknet.js/commit/9434bcddf74069c7e5bdecbac94017ae23cd2a45))

## [6.1.3](https://github.com/starknet-io/starknet.js/compare/v6.1.2...v6.1.3) (2024-02-23)

### Bug Fixes

- update fetch-cookie dependency ([518330c](https://github.com/starknet-io/starknet.js/commit/518330c4ee00e671e716b018220f767e8118c431))

## [6.1.2](https://github.com/starknet-io/starknet.js/compare/v6.1.1...v6.1.2) (2024-02-20)

### Bug Fixes

- drop abi-wan-kanabi-v1 support ([30a4681](https://github.com/starknet-io/starknet.js/commit/30a46815fa9fb88bbcb98df2f4a8dafc5a32b4ab))

## [6.1.1](https://github.com/starknet-io/starknet.js/compare/v6.1.0...v6.1.1) (2024-02-19)

### Bug Fixes

- rpc event ([ae3e265](https://github.com/starknet-io/starknet.js/commit/ae3e265f6617bd79c8435483916b0f24be036fa6))

# [6.1.0](https://github.com/starknet-io/starknet.js/compare/v6.0.0...v6.1.0) (2024-02-13)

### Features

- use fetch-cookie package for cookie based sticky sessions ([5a56485](https://github.com/starknet-io/starknet.js/commit/5a56485052e773c8b0a3f9dbdc2f4ba3626362fb))

# [6.0.0](https://github.com/starknet-io/starknet.js/compare/v5.29.0...v6.0.0) (2024-02-05)

### Bug Fixes

- acc deploy_acc ([732cd94](https://github.com/starknet-io/starknet.js/commit/732cd946f26c2b0fe893067f25c1fe712d72d49b))
- **beta:** deploy account ([#880](https://github.com/starknet-io/starknet.js/issues/880)) ([00c58e3](https://github.com/starknet-io/starknet.js/commit/00c58e3c6d03b716b68c1b96b5a4adc1cff87dd0))
- estimateFeeBulk provided version ([da717be](https://github.com/starknet-io/starknet.js/commit/da717be8e656087eaba21c865a6dd0b648664491))
- provider rpc 0.5-0.6 getTransactionReceipt response standardization ([76b6ab4](https://github.com/starknet-io/starknet.js/commit/76b6ab49f6721d1f76c3f30d3d88d6dbc8b80bda))
- remove account_deployment_data from deploy Account ([ede83bf](https://github.com/starknet-io/starknet.js/commit/ede83bfda3c6fcfa9dd397c92bd709293c8dda9b))
- solve wrong response for account.verifyMessage ([05f4095](https://github.com/starknet-io/starknet.js/commit/05f4095599f89dd508fac9316e1c24fc0dceaa8a))
- throw on negative param cairo.uint256 and bnToUint256 ([e1ead14](https://github.com/starknet-io/starknet.js/commit/e1ead1466984f26ff91d7fe6174fc87be8c3aede))
- utilize provided resourceBounds value ([65bea53](https://github.com/starknet-io/starknet.js/commit/65bea53ab03a04fdd4c122ba2fecbb1010100e18))

### Features

- abiwan v2 intergation ([87d15d3](https://github.com/starknet-io/starknet.js/commit/87d15d3d4ada1138ed5b66620a4de56189195f4c))
- account preferred transaction version, setup v3 ([5652eb2](https://github.com/starknet-io/starknet.js/commit/5652eb211e1accaefbb2f24bcb756ccf9170c07a))
- add provider.decodeParameters ([be6eec9](https://github.com/starknet-io/starknet.js/commit/be6eec94c8ae5d92df631502c9a1d61663d80101))
- add string types of cairo v2.4.0 ([a8a73c1](https://github.com/starknet-io/starknet.js/commit/a8a73c1f5b0bc72bc42460f3735eeec6f95edcbe))
- curves ([405de46](https://github.com/starknet-io/starknet.js/commit/405de462032579ef0e8e434c62976dcb84ee1af8))
- def rpc 0_6, sepolia nodes ([4f59a8f](https://github.com/starknet-io/starknet.js/commit/4f59a8f01439662ae7eb785cafcf781c68b2cb04))
- default account UniversalDetails, rpc spec update, update interface ([8dc9b8a](https://github.com/starknet-io/starknet.js/commit/8dc9b8ab28a82a9a0eaa47e0271c12b79e8cff39))
- dual specification with 0.6 implementation, not yet integrated ([ac8c763](https://github.com/starknet-io/starknet.js/commit/ac8c76383bb3f566164bc4f38c477e3e3dc45f31))
- ethereum signer ([8473adb](https://github.com/starknet-io/starknet.js/commit/8473adbcfa5ef642297b8a7f448a0d789703037f))
- ethereum-signer ([f37bfb2](https://github.com/starknet-io/starknet.js/commit/f37bfb2788b7c6befc10efca8b102ee2a975ee55))
- hashes, signer, vip account, types, versions as string enum ([6ceb9e3](https://github.com/starknet-io/starknet.js/commit/6ceb9e31e51d51a6ce374144fd3ddb82a6ea01b3))
- make Abi and CONTRACT_ABI types compatible with abiwan ([9007816](https://github.com/starknet-io/starknet.js/commit/9007816689528a79bd8bb4267e0098be2e6d71d2))
- new CairoUint256 cairo datatype model ([b64abcc](https://github.com/starknet-io/starknet.js/commit/b64abccf3888eba49460124a4d7aabbdca1592d1))
- pretty print rpc LibraryError params, make env.DEBUG usefull ([cca723f](https://github.com/starknet-io/starknet.js/commit/cca723f13009ce7048c7be6b8a6f466aca0d5e19))
- **provider:** fix and clean provider response and response parser, removed seqeuncer api ([7ecb069](https://github.com/starknet-io/starknet.js/commit/7ecb069e3d2c37653cedc44dfbb635c5bc8eec7f))
- **provider:** pending response discrimination, pending type guards ([013a22b](https://github.com/starknet-io/starknet.js/commit/013a22bf4dd8cb6df817ccf6ff2d82837fe91693))
- remove old version constants, default types api rpc ([ed9cb08](https://github.com/starknet-io/starknet.js/commit/ed9cb089460640af96a73eca66e9971ca5832041))
- replace in verifyMessage : response by Error ([1abf91f](https://github.com/starknet-io/starknet.js/commit/1abf91f170c46d4f4cf5f493dc3d6717c6d3c1e7))
- req id counter ([cedd1ea](https://github.com/starknet-io/starknet.js/commit/cedd1ea32cd58107c504d357a3dd5e9a40010a80))
- rpc 0.6 implementation as superset of 0.5 tx ([5b2b299](https://github.com/starknet-io/starknet.js/commit/5b2b2997ee7e54144864315ed20175017e4218b4))
- rpc 0.6.0-rc3 implementation ([c2607ed](https://github.com/starknet-io/starknet.js/commit/c2607ed64f26d18ea66f2184acf34d3ca9ee4766))
- rpc provider ([0d9c2e5](https://github.com/starknet-io/starknet.js/commit/0d9c2e5ba0298af7b608ccbd9dd2eff3dc0bb69a))
- rpcChannel ([181eea3](https://github.com/starknet-io/starknet.js/commit/181eea3e4eabc52cdf46b796f0861e2641d59668))
- sepolia constants, rpc open change ([6de46b5](https://github.com/starknet-io/starknet.js/commit/6de46b59d22bfda959c083b3ac5570cb8d4c6d0a))
- simulate skip validate by default, spec deploy acc fix ([1b3e7ae](https://github.com/starknet-io/starknet.js/commit/1b3e7aeadaba5b7d59377e249b535f6a8cb8862e))
- update default rpc nodes and version ([9b9fe0e](https://github.com/starknet-io/starknet.js/commit/9b9fe0e4c5d8d54323bb82ab7ceed3a78d6fc1bc))
- update verson ([5dfe445](https://github.com/starknet-io/starknet.js/commit/5dfe445a5ed09dd531d91156633321fdae4b70cd))
- v3 transaction hashes ([4fe40a1](https://github.com/starknet-io/starknet.js/commit/4fe40a1419031cd6328509e2439744d0ff98c8e7))
- v3 tx hashes calculation ([f0e760d](https://github.com/starknet-io/starknet.js/commit/f0e760d109e488b70b16eed24e94b889d708d257))
- v3 wip with est ([b95c462](https://github.com/starknet-io/starknet.js/commit/b95c462df0bd59293b7b42b5474311a3bbbfab1d))

### BREAKING CHANGES

- v3 transactions

# [6.0.0-beta.15](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.14...v6.0.0-beta.15) (2024-02-05)

### Bug Fixes

- throw on negative param cairo.uint256 and bnToUint256 ([e1ead14](https://github.com/starknet-io/starknet.js/commit/e1ead1466984f26ff91d7fe6174fc87be8c3aede))

### Features

- new CairoUint256 cairo datatype model ([b64abcc](https://github.com/starknet-io/starknet.js/commit/b64abccf3888eba49460124a4d7aabbdca1592d1))

# [6.0.0-beta.14](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.13...v6.0.0-beta.14) (2024-02-02)

### Bug Fixes

- move abiwan from dev dependencies to regular dependencies ([#925](https://github.com/starknet-io/starknet.js/issues/925)) ([6b7ee49](https://github.com/starknet-io/starknet.js/commit/6b7ee49918d704f8143f51ab7a0360446ea4cf5e))

### Features

- abi-wan trigger ([c10150a](https://github.com/starknet-io/starknet.js/commit/c10150a328051054a7bba1260296c0c92fdd2051))
- add provider.decodeParameters ([39595f3](https://github.com/starknet-io/starknet.js/commit/39595f3303204b273fadd53764c59767ce6c5b36))
- expand structured data hashing in line with SNIP-12 ([#920](https://github.com/starknet-io/starknet.js/issues/920)) ([cb20590](https://github.com/starknet-io/starknet.js/commit/cb2059039e3b42501cdfefec7802da83eb73645b))
- trigger release ([fbf983f](https://github.com/starknet-io/starknet.js/commit/fbf983f7820768f919cddb2c5806178a20e38bdd))

# [5.29.0](https://github.com/starknet-io/starknet.js/compare/v5.28.0...v5.29.0) (2024-02-02)

### Features

- add provider.decodeParameters ([39595f3](https://github.com/starknet-io/starknet.js/commit/39595f3303204b273fadd53764c59767ce6c5b36))

# [5.28.0](https://github.com/starknet-io/starknet.js/compare/v5.27.0...v5.28.0) (2024-02-01)

### Features

- expand structured data hashing in line with SNIP-12 ([#920](https://github.com/starknet-io/starknet.js/issues/920)) ([cb20590](https://github.com/starknet-io/starknet.js/commit/cb2059039e3b42501cdfefec7802da83eb73645b))

# [5.27.0](https://github.com/starknet-io/starknet.js/compare/v5.26.1...v5.27.0) (2024-01-23)

### Features

- trigger release ([fbf983f](https://github.com/starknet-io/starknet.js/commit/fbf983f7820768f919cddb2c5806178a20e38bdd))

## [5.26.1](https://github.com/starknet-io/starknet.js/compare/v5.26.0...v5.26.1) (2024-01-18)

### Bug Fixes

- move abiwan from dev dependencies to regular dependencies ([#925](https://github.com/starknet-io/starknet.js/issues/925)) ([6b7ee49](https://github.com/starknet-io/starknet.js/commit/6b7ee49918d704f8143f51ab7a0360446ea4cf5e))

# [5.26.0](https://github.com/starknet-io/starknet.js/compare/v5.25.0...v5.26.0) (2024-01-15)

### Features

- abi-wan trigger ([c10150a](https://github.com/starknet-io/starknet.js/commit/c10150a328051054a7bba1260296c0c92fdd2051))

# [6.0.0-beta.13](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.12...v6.0.0-beta.13) (2024-01-23)

### Bug Fixes

- solve wrong response for account.verifyMessage ([05f4095](https://github.com/starknet-io/starknet.js/commit/05f4095599f89dd508fac9316e1c24fc0dceaa8a))

### Features

- abiwan v2 intergation ([87d15d3](https://github.com/starknet-io/starknet.js/commit/87d15d3d4ada1138ed5b66620a4de56189195f4c))
- add string types of cairo v2.4.0 ([a8a73c1](https://github.com/starknet-io/starknet.js/commit/a8a73c1f5b0bc72bc42460f3735eeec6f95edcbe))
- make Abi and CONTRACT_ABI types compatible with abiwan ([9007816](https://github.com/starknet-io/starknet.js/commit/9007816689528a79bd8bb4267e0098be2e6d71d2))
- replace in verifyMessage : response by Error ([1abf91f](https://github.com/starknet-io/starknet.js/commit/1abf91f170c46d4f4cf5f493dc3d6717c6d3c1e7))
- sepolia ([26d7044](https://github.com/starknet-io/starknet.js/commit/26d70446edd7c098b7f257d9242cc9d9d220b11e))

# [5.25.0](https://github.com/starknet-io/starknet.js/compare/v5.24.5...v5.25.0) (2023-12-18)

### Features

- sepolia ([26d7044](https://github.com/starknet-io/starknet.js/commit/26d70446edd7c098b7f257d9242cc9d9d220b11e))

# [6.0.0-beta.12](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.11...v6.0.0-beta.12) (2024-01-23)

### Features

- add provider.decodeParameters ([be6eec9](https://github.com/starknet-io/starknet.js/commit/be6eec94c8ae5d92df631502c9a1d61663d80101))
- ethereum signer ([8473adb](https://github.com/starknet-io/starknet.js/commit/8473adbcfa5ef642297b8a7f448a0d789703037f))
- ethereum-signer ([f37bfb2](https://github.com/starknet-io/starknet.js/commit/f37bfb2788b7c6befc10efca8b102ee2a975ee55))

# [6.0.0-beta.11](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.10...v6.0.0-beta.11) (2024-01-04)

### Bug Fixes

- utilize provided resourceBounds value ([65bea53](https://github.com/starknet-io/starknet.js/commit/65bea53ab03a04fdd4c122ba2fecbb1010100e18))

# [6.0.0-beta.10](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.9...v6.0.0-beta.10) (2023-12-20)

### Features

- req id counter ([cedd1ea](https://github.com/starknet-io/starknet.js/commit/cedd1ea32cd58107c504d357a3dd5e9a40010a80))

# [6.0.0-beta.9](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.8...v6.0.0-beta.9) (2023-12-19)

### Bug Fixes

- acc deploy_acc ([732cd94](https://github.com/starknet-io/starknet.js/commit/732cd946f26c2b0fe893067f25c1fe712d72d49b))

# [6.0.0-beta.8](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.7...v6.0.0-beta.8) (2023-12-19)

### Bug Fixes

- estimateFeeBulk provided version ([da717be](https://github.com/starknet-io/starknet.js/commit/da717be8e656087eaba21c865a6dd0b648664491))

# [6.0.0-beta.7](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.6...v6.0.0-beta.7) (2023-12-14)

### Bug Fixes

- provider rpc 0.5-0.6 getTransactionReceipt response standardization ([76b6ab4](https://github.com/starknet-io/starknet.js/commit/76b6ab49f6721d1f76c3f30d3d88d6dbc8b80bda))

### Features

- curves ([405de46](https://github.com/starknet-io/starknet.js/commit/405de462032579ef0e8e434c62976dcb84ee1af8))
- **provider:** fix and clean provider response and response parser, removed seqeuncer api ([7ecb069](https://github.com/starknet-io/starknet.js/commit/7ecb069e3d2c37653cedc44dfbb635c5bc8eec7f))
- **provider:** pending response discrimination, pending type guards ([013a22b](https://github.com/starknet-io/starknet.js/commit/013a22bf4dd8cb6df817ccf6ff2d82837fe91693))

# [6.0.0-beta.6](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.5...v6.0.0-beta.6) (2023-12-11)

### Features

- def rpc 0_6, sepolia nodes ([4f59a8f](https://github.com/starknet-io/starknet.js/commit/4f59a8f01439662ae7eb785cafcf781c68b2cb04))
- default account UniversalDetails, rpc spec update, update interface ([8dc9b8a](https://github.com/starknet-io/starknet.js/commit/8dc9b8ab28a82a9a0eaa47e0271c12b79e8cff39))
- sepolia constants, rpc open change ([6de46b5](https://github.com/starknet-io/starknet.js/commit/6de46b59d22bfda959c083b3ac5570cb8d4c6d0a))

# [6.0.0-beta.5](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.4...v6.0.0-beta.5) (2023-12-10)

### Bug Fixes

- apply bound for contract address from hash calculation ([6d8c291](https://github.com/starknet-io/starknet.js/commit/6d8c291bce130d7b00ae6d81aff071c4986f04af))
- **Calldata.compile:** do not split long `entrypoint` names before calling `getSelectorFromName` ([89715da](https://github.com/starknet-io/starknet.js/commit/89715da3fdb4b497cc5771eb83a88460007740b6))
- prioritize error states in waitForTransaction evaluation ([ac54404](https://github.com/starknet-io/starknet.js/commit/ac544045e2079b68042d850a09b203fc5536c0d0))

## [5.24.5](https://github.com/starknet-io/starknet.js/compare/v5.24.4...v5.24.5) (2023-12-10)

### Bug Fixes

- apply bound for contract address from hash calculation ([6d8c291](https://github.com/starknet-io/starknet.js/commit/6d8c291bce130d7b00ae6d81aff071c4986f04af))
- **Calldata.compile:** do not split long `entrypoint` names before calling `getSelectorFromName` ([89715da](https://github.com/starknet-io/starknet.js/commit/89715da3fdb4b497cc5771eb83a88460007740b6))
- prioritize error states in waitForTransaction evaluation ([ac54404](https://github.com/starknet-io/starknet.js/commit/ac544045e2079b68042d850a09b203fc5536c0d0))

# [6.0.0-beta.4](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2023-12-08)

### Bug Fixes

- remove account_deployment_data from deploy Account ([ede83bf](https://github.com/starknet-io/starknet.js/commit/ede83bfda3c6fcfa9dd397c92bd709293c8dda9b))

### Features

- simulate skip validate by default, spec deploy acc fix ([1b3e7ae](https://github.com/starknet-io/starknet.js/commit/1b3e7aeadaba5b7d59377e249b535f6a8cb8862e))

# [6.0.0-beta.3](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-12-07)

### Bug Fixes

- **beta:** deploy account ([#880](https://github.com/starknet-io/starknet.js/issues/880)) ([00c58e3](https://github.com/starknet-io/starknet.js/commit/00c58e3c6d03b716b68c1b96b5a4adc1cff87dd0))

# [6.0.0-beta.2](https://github.com/starknet-io/starknet.js/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2023-12-07)

### Features

- v3 wip with est ([b95c462](https://github.com/starknet-io/starknet.js/commit/b95c462df0bd59293b7b42b5474311a3bbbfab1d))

# [6.0.0-beta.1](https://github.com/starknet-io/starknet.js/compare/v5.24.4...v6.0.0-beta.1) (2023-12-06)

### Features

- account preferred transaction version, setup v3 ([5652eb2](https://github.com/starknet-io/starknet.js/commit/5652eb211e1accaefbb2f24bcb756ccf9170c07a))
- dual specification with 0.6 implementation, not yet integrated ([ac8c763](https://github.com/starknet-io/starknet.js/commit/ac8c76383bb3f566164bc4f38c477e3e3dc45f31))
- hashes, signer, vip account, types, versions as string enum ([6ceb9e3](https://github.com/starknet-io/starknet.js/commit/6ceb9e31e51d51a6ce374144fd3ddb82a6ea01b3))
- pretty print rpc LibraryError params, make env.DEBUG usefull ([cca723f](https://github.com/starknet-io/starknet.js/commit/cca723f13009ce7048c7be6b8a6f466aca0d5e19))
- remove old version constants, default types api rpc ([ed9cb08](https://github.com/starknet-io/starknet.js/commit/ed9cb089460640af96a73eca66e9971ca5832041))
- rpc 0.6 implementation as superset of 0.5 tx ([5b2b299](https://github.com/starknet-io/starknet.js/commit/5b2b2997ee7e54144864315ed20175017e4218b4))
- rpc 0.6.0-rc3 implementation ([c2607ed](https://github.com/starknet-io/starknet.js/commit/c2607ed64f26d18ea66f2184acf34d3ca9ee4766))
- rpc provider ([0d9c2e5](https://github.com/starknet-io/starknet.js/commit/0d9c2e5ba0298af7b608ccbd9dd2eff3dc0bb69a))
- rpcChannel ([181eea3](https://github.com/starknet-io/starknet.js/commit/181eea3e4eabc52cdf46b796f0861e2641d59668))
- update default rpc nodes and version ([9b9fe0e](https://github.com/starknet-io/starknet.js/commit/9b9fe0e4c5d8d54323bb82ab7ceed3a78d6fc1bc))
- update verson ([5dfe445](https://github.com/starknet-io/starknet.js/commit/5dfe445a5ed09dd531d91156633321fdae4b70cd))
- v3 transaction hashes ([4fe40a1](https://github.com/starknet-io/starknet.js/commit/4fe40a1419031cd6328509e2439744d0ff98c8e7))
- v3 tx hashes calculation ([f0e760d](https://github.com/starknet-io/starknet.js/commit/f0e760d109e488b70b16eed24e94b889d708d257))

### BREAKING CHANGES

- v3 transactions

## [5.24.4](https://github.com/starknet-io/starknet.js/compare/v5.24.3...v5.24.4) (2023-12-06)

### Bug Fixes

- typos ([#862](https://github.com/starknet-io/starknet.js/issues/862)) ([b2431d3](https://github.com/starknet-io/starknet.js/commit/b2431d36d636821b32403ef0aa4def2312b10254))

## [5.24.3](https://github.com/starknet-io/starknet.js/compare/v5.24.2...v5.24.3) (2023-11-20)

### Bug Fixes

- correct syncing type ([41f9d8a](https://github.com/starknet-io/starknet.js/commit/41f9d8a0d1b69c569e7a3aa55cec09f105c32356))

## [5.24.2](https://github.com/starknet-io/starknet.js/compare/v5.24.1...v5.24.2) (2023-11-17)

### Bug Fixes

- errors when testing in Testnet with a Cairo 1 account ([243074e](https://github.com/starknet-io/starknet.js/commit/243074ebd8324da2a33f13b5d8542949d7e92991))

## [5.24.1](https://github.com/starknet-io/starknet.js/compare/v5.24.0...v5.24.1) (2023-11-13)

### Bug Fixes

- stringify error handler data ([1eab2d3](https://github.com/starknet-io/starknet.js/commit/1eab2d3acd67e8a14d6e10ea24d27aa1e108cdcc))

# [5.24.0](https://github.com/starknet-io/starknet.js/compare/v5.23.0...v5.24.0) (2023-11-13)

### Bug Fixes

- skip chainId eager load for RpcProvider initialization ([3bccc4d](https://github.com/starknet-io/starknet.js/commit/3bccc4d9f0e07d42a3855891cb5b4efce3692001))

### Features

- rpc 0.5.1 ([0306b90](https://github.com/starknet-io/starknet.js/commit/0306b90f0cec30a3db99925a83f05d6c66f4100c))

# [5.23.0](https://github.com/starknet-io/starknet.js/compare/v5.22.0...v5.23.0) (2023-11-10)

### Bug Fixes

- correction of CairoAssembly type ([340392f](https://github.com/starknet-io/starknet.js/commit/340392fe2db4585ea7905176ede5f78f21cf5bad))
- nethermind public node work's on https ([12c1582](https://github.com/starknet-io/starknet.js/commit/12c15829a7f2c7f46dcd4dd92b75d9ced5e62781))
- offset type in DEPRECATED_CAIRO_ENTRY_POINT ([452df9e](https://github.com/starknet-io/starknet.js/commit/452df9e133e2c4a5df1956ca01d7af19fd01f1d9))
- remove buffer ([f8f1caa](https://github.com/starknet-io/starknet.js/commit/f8f1caa0d1ba41abdb4e3c0cb26bdec2e5dd2f65))

### Features

- export types and respose type in nonspec ([e42f9f9](https://github.com/starknet-io/starknet.js/commit/e42f9f991982d93a5733069fa5655f6b787cf8a2))
- refactored tests setup ([a6be207](https://github.com/starknet-io/starknet.js/commit/a6be207bf9f05c90f29e9620fdebea160fbfac79))
- rpc 0.5.0, spec refactored and rebuilt, wip testing setup refactor ([ecfbe19](https://github.com/starknet-io/starknet.js/commit/ecfbe193cf28a16404f6e1e7cdf3fc9f00b5012c))
- rpc default provider and public nodes ([12402e3](https://github.com/starknet-io/starknet.js/commit/12402e31e0f22de85351843baa2bae8be440918f))
- rpc Provider cleanup & refactor, RPC Spec types update ([c373ca4](https://github.com/starknet-io/starknet.js/commit/c373ca44e8fcffc4afc164712b13838b9f34e7b9))
- set default provider to random rpc provider, update rpc provider, update test setup ([321311e](https://github.com/starknet-io/starknet.js/commit/321311e7722064516ec705aa932660f4b36073bd))
- test general parameters overide ([c888d23](https://github.com/starknet-io/starknet.js/commit/c888d2381c4a2a461a6aebf066dbbed3563c7df2))
- use txStatus in waitForTransaction ([dd80eb5](https://github.com/starknet-io/starknet.js/commit/dd80eb5fec8a1eede7301684e6a6fb2bb970b2b5))
- waitForTransaction tx hash readiness, test errors & logging update, rpc ([39b3fa7](https://github.com/starknet-io/starknet.js/commit/39b3fa73f319ed9119850e1b41f7a49f832fa0ba))
- wip ([98aa89c](https://github.com/starknet-io/starknet.js/commit/98aa89cb8595cbf589fb1389cda2db45a932e2e9))

# [5.22.0](https://github.com/starknet-io/starknet.js/compare/v5.21.1...v5.22.0) (2023-11-02)

### Features

- deprecating Sequencer provider ([94e02fa](https://github.com/starknet-io/starknet.js/commit/94e02fa083645602b8b96ab694b3ba3d2a3efbce))

## [5.21.1](https://github.com/starknet-io/starknet.js/compare/v5.21.0...v5.21.1) (2023-10-16)

### Bug Fixes

- naming for new rpc only devnet DEFAULT_TEST_PROVIDER_URL ([c844d41](https://github.com/starknet-io/starknet.js/commit/c844d41689759d6d2615602eddef2c7108380139))

# [5.21.0](https://github.com/starknet-io/starknet.js/compare/v5.20.0...v5.21.0) (2023-10-03)

### Bug Fixes

- cairo isCairo1Abi optimization ([da76508](https://github.com/starknet-io/starknet.js/commit/da76508d9a3d22b4325950cdd5b4d41e143fb59b))
- parallel get version issue ([c58c894](https://github.com/starknet-io/starknet.js/commit/c58c8948b1996df3c357b3a0514b1509db903cb5))

### Features

- auto-detect account cairoVersion ([85bbe39](https://github.com/starknet-io/starknet.js/commit/85bbe39fea3a2bd825e972a8a7bfdcae6c21eeae))
- getContractVersion and getCairoVersion by classHash, deploy_account and bulk action autodetect ([54ffca4](https://github.com/starknet-io/starknet.js/commit/54ffca4d2c4663e5362f4819201710762bc3f9a7))
- provider getContractVersion, contract getVersion, cairo getAbiContractVersion ([71e634e](https://github.com/starknet-io/starknet.js/commit/71e634e5b0742d8ba10a742b8494b87bcb12a7dd))

# [5.20.0](https://github.com/starknet-io/starknet.js/compare/v5.19.6...v5.20.0) (2023-09-21)

### Bug Fixes

- cairo 1 variable with \_len in name ([551adfa](https://github.com/starknet-io/starknet.js/commit/551adfa1d41192a5e725941537f25a15c8ee3380))
- goerli sequencer fixture ([0c6d153](https://github.com/starknet-io/starknet.js/commit/0c6d1532104327b06cae46e38f51b601d7fa0901))

### Features

- remove testnet2(SN_GOERLI2) ([02e17de](https://github.com/starknet-io/starknet.js/commit/02e17ded113ced1c4dc01146159c4f8c6c67a243))

# [5.20.0](https://github.com/starknet-io/starknet.js/compare/v5.19.6...v5.20.0) (2023-09-21)

### Bug Fixes

- cairo 1 variable with \_len in name ([551adfa](https://github.com/starknet-io/starknet.js/commit/551adfa1d41192a5e725941537f25a15c8ee3380))
- goerli sequencer fixture ([0c6d153](https://github.com/starknet-io/starknet.js/commit/0c6d1532104327b06cae46e38f51b601d7fa0901))

### Features

- remove testnet2(SN_GOERLI2) ([02e17de](https://github.com/starknet-io/starknet.js/commit/02e17ded113ced1c4dc01146159c4f8c6c67a243))

## [5.19.6](https://github.com/starknet-io/starknet.js/compare/v5.19.5...v5.19.6) (2023-09-11)

### Bug Fixes

- cleanup and docs update, string types descriptive ([08bd45f](https://github.com/starknet-io/starknet.js/commit/08bd45faa3d4719ab4a2e50d75df731199e34033))
- interface fix and docs update ([97a08c5](https://github.com/starknet-io/starknet.js/commit/97a08c5949a0f96fd218ded30e1ce36fae07f319))
- remove ec constants ([b7e6b01](https://github.com/starknet-io/starknet.js/commit/b7e6b017b3f78d3c50470dedf18a20e362e3b360))

## [5.19.5](https://github.com/starknet-io/starknet.js/compare/v5.19.4...v5.19.5) (2023-08-29)

### Bug Fixes

- status case ([5ba7983](https://github.com/starknet-io/starknet.js/commit/5ba798309d2c8567840b8f6a6031ec0e6b582d53))

## [5.19.4](https://github.com/starknet-io/starknet.js/compare/v5.19.3...v5.19.4) (2023-08-29)

### Bug Fixes

- use BigNumberish for u256 ([3a7be10](https://github.com/starknet-io/starknet.js/commit/3a7be1075b0ca4f217cf28aabaa870c93c08f6d1))
- waitForTransaction for Infura ([c871fe6](https://github.com/starknet-io/starknet.js/commit/c871fe65a0b08e368218f51327cd64591f2b7f49))

## [5.19.3](https://github.com/starknet-io/starknet.js/compare/v5.19.2...v5.19.3) (2023-08-22)

### Bug Fixes

- expose event parsing utilities ([50cb64c](https://github.com/starknet-io/starknet.js/commit/50cb64cadc9a382a336e20e25bdf65814efca332))

## [5.19.2](https://github.com/starknet-io/starknet.js/compare/v5.19.1...v5.19.2) (2023-08-20)

### Bug Fixes

- handle ContractAddress array validation ([0748ec6](https://github.com/starknet-io/starknet.js/commit/0748ec61b510d4d2939b1feb8ca19c15740a0f2a))

## [5.19.1](https://github.com/starknet-io/starknet.js/compare/v5.19.0...v5.19.1) (2023-08-16)

### Bug Fixes

- repair CallData compilation faulty ordering ([e8cbedc](https://github.com/starknet-io/starknet.js/commit/e8cbedc3eac39cb0662e958ad5056750f8dc4069))

# [5.19.0](https://github.com/starknet-io/starknet.js/compare/v5.18.0...v5.19.0) (2023-08-11)

### Bug Fixes

- add function definition to the contract interface + doc ([06498d5](https://github.com/starknet-io/starknet.js/commit/06498d539bc2b816982e0245ae3b6508665f03f7))
- contract test status ([53cfaf9](https://github.com/starknet-io/starknet.js/commit/53cfaf935d1b053f5bcd17ffcb1ae48d9e8a4eef))
- fix multiple same events + add cairo code + seperate tests, legacy and Cairo1 ([7c93157](https://github.com/starknet-io/starknet.js/commit/7c93157d60864989efec37a05521979a2548e4d8))
- modify parseEvents structure + add testcase for multiple different event in same tx ([b63b0d6](https://github.com/starknet-io/starknet.js/commit/b63b0d631d163e181c8a42a634f107d2761e35ca))
- optional struct and enum in responseParser ([14d3cca](https://github.com/starknet-io/starknet.js/commit/14d3cca97a3cebedf07466f98dd46639999421c2))
- patch merge, and add enums to event parser ([00f8073](https://github.com/starknet-io/starknet.js/commit/00f8073418eef1e2eebf105884357561b959fb7c))
- remove exports from responseParser functions ([3d86446](https://github.com/starknet-io/starknet.js/commit/3d864463579fc68c4538bbbc7820420ec64b15eb))
- repair SequencerProvider network resolution ([e42dfc1](https://github.com/starknet-io/starknet.js/commit/e42dfc1e722d4a77bc52102a94295ee7ab6a460d))
- restore package-lock to previous state ([2fe0564](https://github.com/starknet-io/starknet.js/commit/2fe0564ed042537e480ea8481c787fe7359ba4a8))

### Features

- add ethAddress handling ([2a93f90](https://github.com/starknet-io/starknet.js/commit/2a93f90cc9e7e697a153e42b9ebd19dec6f1880f))
- cairo enum in request parser ([ad44481](https://github.com/starknet-io/starknet.js/commit/ad4448129058b76fede61675d46a37a6c74f0d16))
- cairo enum in response parser ([a936a11](https://github.com/starknet-io/starknet.js/commit/a936a11ca34af628ec187740616b8c5a804e9d65)), closes [#670](https://github.com/starknet-io/starknet.js/issues/670) [#665](https://github.com/starknet-io/starknet.js/issues/665) [#664](https://github.com/starknet-io/starknet.js/issues/664) [#1](https://github.com/starknet-io/starknet.js/issues/1) [#675](https://github.com/starknet-io/starknet.js/issues/675) [#1](https://github.com/starknet-io/starknet.js/issues/1) [#675](https://github.com/starknet-io/starknet.js/issues/675) [#1](https://github.com/starknet-io/starknet.js/issues/1) [#670](https://github.com/starknet-io/starknet.js/issues/670) [#665](https://github.com/starknet-io/starknet.js/issues/665) [#664](https://github.com/starknet-io/starknet.js/issues/664) [#1](https://github.com/starknet-io/starknet.js/issues/1) [#675](https://github.com/starknet-io/starknet.js/issues/675) [#1](https://github.com/starknet-io/starknet.js/issues/1)
- implement event parsing ([86cc430](https://github.com/starknet-io/starknet.js/commit/86cc430cff2b6f338edecce29819260b475a3907))
- new Cairo types ([f9db09e](https://github.com/starknet-io/starknet.js/commit/f9db09eeab05fd0c1692229fcdbbc020b4954f3e))

# [5.17.0](https://github.com/starknet-io/starknet.js/compare/v5.16.0...v5.17.0) (2023-07-18)

### Bug Fixes

- add FailedTransactionResponse ([994925e](https://github.com/starknet-io/starknet.js/commit/994925e87a4fde3cfcffd9103793d44bc96fc96c))
- remedy type declaration roll-up issues ([48625f4](https://github.com/starknet-io/starknet.js/commit/48625f4a9eaf4e3c294ad840dae78ebab4ab9a12))
- transaction_failure_reason ([77329b7](https://github.com/starknet-io/starknet.js/commit/77329b7ddfc63d708685f0dcbffbe1b9094f7824))

### Features

- add Enum in contract ([515e233](https://github.com/starknet-io/starknet.js/commit/515e233a0b29e125936192da540b83af8591b507)), closes [#670](https://github.com/starknet-io/starknet.js/issues/670) [#665](https://github.com/starknet-io/starknet.js/issues/665) [#664](https://github.com/starknet-io/starknet.js/issues/664) [#1](https://github.com/starknet-io/starknet.js/issues/1)
- calldata result in populate ([d44dc56](https://github.com/starknet-io/starknet.js/commit/d44dc56c0b6db68fcd664b8f02d7a4b72bcdfd28)), closes [#675](https://github.com/starknet-io/starknet.js/issues/675) [#1](https://github.com/starknet-io/starknet.js/issues/1)
- contractFactory Cairo1 & changed constructor signature, 0.12 test fixes ([9b44c54](https://github.com/starknet-io/starknet.js/commit/9b44c54857896019c2545c945695e525392e8dbd))
- rename Failed to Rejected for transaction type ([65b1ef4](https://github.com/starknet-io/starknet.js/commit/65b1ef432e2eda9f37574771d60b409a3f7ab049))

# [5.16.0](https://github.com/starknet-io/starknet.js/compare/v5.15.1...v5.16.0) (2023-07-03)

### Features

- cairo1 version2 support ([e564033](https://github.com/starknet-io/starknet.js/commit/e564033273ac49e971bbf1db843fb3de236976c0))
- extract parser from CallData and Cairo ([b7eba2a](https://github.com/starknet-io/starknet.js/commit/b7eba2a1eada3dddb4dc0575c16ac76a42a78678))
- parsers ([cce9029](https://github.com/starknet-io/starknet.js/commit/cce90299e59e60090b568be14331378de3918924))

## [5.15.1](https://github.com/starknet-io/starknet.js/compare/v5.15.0...v5.15.1) (2023-06-29)

### Bug Fixes

- eradicate static strings ([597d2b5](https://github.com/starknet-io/starknet.js/commit/597d2b525709c0fa2607af70b6f8b6289fb32448))

# [5.15.0](https://github.com/starknet-io/starknet.js/compare/v5.14.1...v5.15.0) (2023-06-29)

### Bug Fixes

- remove DeployContractPayload type ([8908a90](https://github.com/starknet-io/starknet.js/commit/8908a900986244d615b91d35d61906d2dba580b4))
- removed old Struct type ([8ec8a0d](https://github.com/starknet-io/starknet.js/commit/8ec8a0dca2e5548d6ad0d5d63d1431c84f668410))

### Features

- removed pending transaction status, typing update ([a76b35c](https://github.com/starknet-io/starknet.js/commit/a76b35cf5bd9eb8c0a5b9ea33d689ed53c8ff8ab))

## [5.14.1](https://github.com/starknet-io/starknet.js/compare/v5.14.0...v5.14.1) (2023-06-26)

### Bug Fixes

- export utils provider,selector, contract, events. Simulate dev import on tests ([00b7bdf](https://github.com/starknet-io/starknet.js/commit/00b7bdf756c516a1905ce1ecc9036472800989af))
- redeclare contract ([10da77e](https://github.com/starknet-io/starknet.js/commit/10da77efc6a5e1896af089508e4c403726e9cbf4))

# [5.14.0](https://github.com/starknet-io/starknet.js/compare/v5.13.2...v5.14.0) (2023-06-21)

### Features

- add isCairo1 utility methods ([78e9f87](https://github.com/starknet-io/starknet.js/commit/78e9f874e0d812a9d1c896846e5ec6c95a6cffca))

## [5.13.2](https://github.com/starknet-io/starknet.js/compare/v5.13.1...v5.13.2) (2023-06-16)

### Bug Fixes

- conform storage key to RPC specification ([6c66202](https://github.com/starknet-io/starknet.js/commit/6c66202a966003509460dedf91e98177f7f4af27))

## [5.13.1](https://github.com/starknet-io/starknet.js/compare/v5.13.0...v5.13.1) (2023-06-14)

### Bug Fixes

- introduce common ABI type for contract class response ([55a8d98](https://github.com/starknet-io/starknet.js/commit/55a8d981be4ee4d861c7a3f988c012801af3d905))

# [5.13.0](https://github.com/starknet-io/starknet.js/compare/v5.12.0...v5.13.0) (2023-06-12)

### Info: Skipped tests during the release pipeline

- Devnet partial support RPC v0.3.0 (simulate)
- Infura (Pathfinder) default node on RPC v0.2.x

### Features

- adapt RPC methods to v0.3.0 specification ([32188fb](https://github.com/starknet-io/starknet.js/commit/32188fba03506f45c82b61e24574e6a8fb0a5c1f))

# [5.12.0](https://github.com/starknet-io/starknet.js/compare/v5.11.1...v5.12.0) (2023-06-12)

### Features

- update Account.populate() to accept RawArgs type ([6b539a3](https://github.com/starknet-io/starknet.js/commit/6b539a37815ecafb6c8b738b8585dd75d534b3cf))

## [5.11.1](https://github.com/starknet-io/starknet.js/compare/v5.11.0...v5.11.1) (2023-05-30)

### Bug Fixes

- expose RPC provider chain id override ([e6b74fe](https://github.com/starknet-io/starknet.js/commit/e6b74fe62687671fe1ff985474c56d66cd5abd66))

# [5.11.0](https://github.com/starknet-io/starknet.js/compare/v5.10.2...v5.11.0) (2023-05-25)

### Features

- allow unordered RawArgsObject usage for the calldata compilation utility ([9d0cedf](https://github.com/starknet-io/starknet.js/commit/9d0cedf0c7e007028402ead9b400ac83887f9b3e))

## [5.10.2](https://github.com/starknet-io/starknet.js/compare/v5.10.1...v5.10.2) (2023-05-17)

### Bug Fixes

- repair Uint256 array handling for calldata compilation ([969b3c1](https://github.com/starknet-io/starknet.js/commit/969b3c1670902d7cc55156d5b3f6a8e7d45c731b))

## [5.10.1](https://github.com/starknet-io/starknet.js/compare/v5.10.0...v5.10.1) (2023-05-16)

### Bug Fixes

- ensure valid Cairo1 property order for call execution ([d86057c](https://github.com/starknet-io/starknet.js/commit/d86057cefe9e4053dac6d45d043401605246d3ed))

# [5.10.0](https://github.com/starknet-io/starknet.js/compare/v5.9.2...v5.10.0) (2023-05-10)

### Bug Fixes

- repair nested 2d array handling ([cccf518](https://github.com/starknet-io/starknet.js/commit/cccf518acc950bfed7579513c812df33cebb774d))
- mark getClassHashAt blockIdentifier parameter as optional ([f54bfd0](https://github.com/starknet-io/starknet.js/commit/f54bfd0e9591d1ec1dccf20668de68272834fa46))

### Features

- introduce declareIfNot utility Account method ([494dbb8](https://github.com/starknet-io/starknet.js/commit/494dbb8a84608415a279b2bfa84103667321a84e))
- improve usage by extending RawCalldata to RawArgs in all major flows ([0ef1ec8](https://github.com/starknet-io/starknet.js/commit/0ef1ec8624e294a526f8e97d856e70b6426a9ae3))
- make cairoVersion a property of Account ([b6a7d38](https://github.com/starknet-io/starknet.js/commit/b6a7d38e98c65e24cffac5485819797560b5571c))

## [5.9.2](https://github.com/starknet-io/starknet.js/compare/v5.9.1...v5.9.2) (2023-05-03)

### Info

- _no changes_

## [5.9.1](https://github.com/starknet-io/starknet.js/compare/v5.9.0...v5.9.1) (2023-05-02)

### Bug Fixes

- repair Uint256 contract call handling ([0cc05e0](https://github.com/starknet-io/starknet.js/commit/0cc05e073bc025c2afdc5105b5b87e5d23c1d487))

# [5.9.0](https://github.com/starknet-io/starknet.js/compare/v5.8.0...v5.9.0) (2023-04-28)

### Features

- support complex Cairo1 Struct with forced ABI and complex Cairo1 arrays, refactor parser ([8f28462](https://github.com/starknet-io/starknet.js/commit/8f2846290a88c7b3b2985f32c61446a378566679))
- add toHex and expand Calldata and executeCallData helpers, allow entrypoint compilation ([a452d64](https://github.com/starknet-io/starknet.js/commit/a452d64f1aa4e1005378bbba4d7748a054cae2be))

# [5.8.0](https://github.com/starknet-io/starknet.js/compare/v5.7.0...v5.8.0) (2023-04-26)

### Bug Fixes

- clean up Contract interfaces ([02c6b72](https://github.com/starknet-io/starknet.js/commit/02c6b72ec41016fdd75537044889e7cffd624b27))
- clean up ContractFactory and Contract interfaces ([b25047e](https://github.com/starknet-io/starknet.js/commit/b25047ece2eed313eaa776b2a132b9a04c3fbc2f))
- prevent missusage of cairoVersion on deploy ([d920dbe](https://github.com/starknet-io/starknet.js/commit/d920dbe6144006438c917727b153a043fec2531b))
- remove unused cairoVersion from Contract ([e4fcf24](https://github.com/starknet-io/starknet.js/commit/e4fcf244fa1dfd01301addfa7492bf90dac5a854))

### Features

- add boolean to felt support for Cairo1 ([ef34e0a](https://github.com/starknet-io/starknet.js/commit/ef34e0a25a52be7a6ac76714bda43233a2f1a6f1))
- remove deprecated compileCalldata ([e5adca4](https://github.com/starknet-io/starknet.js/commit/e5adca449a9d1142339d5e63adb857698c5913d6))

# [5.7.0](https://github.com/starknet-io/starknet.js/compare/v5.6.1...v5.7.0) (2023-04-25)

### Features

- expose more starknetId addresses ([863736e](https://github.com/starknet-io/starknet.js/commit/863736e0d1daf30b9b6c1bab7c5213cda29f3d61))

## [5.6.1](https://github.com/starknet-io/starknet.js/compare/v5.6.0...v5.6.1) (2023-04-21)

### Bug Fixes

- fix support for Cairo1 Uint256 types ([e2b03b2](https://github.com/starknet-io/starknet.js/commit/e2b03b2c587cc774bba9c6961d710aac782f829f))

# [5.6.0](https://github.com/starknet-io/starknet.js/compare/v5.5.0...v5.6.0) (2023-04-19)

### Bug Fixes

- mark optional param in contract invoke ([da094e4](https://github.com/starknet-io/starknet.js/commit/da094e4172ed43ce93604e92adbba2a5ecb1498e))

### Features

- add Cairo1 bool implementation ([52fed30](https://github.com/starknet-io/starknet.js/commit/52fed30f04b70bcce80f829dba6975101f6f3644))
- support Cairo1 array, fix invoke response ([4637cd7](https://github.com/starknet-io/starknet.js/commit/4637cd74481ba85b3164ddb93c258b9ca8b9b949))
- add felt252 implementation ([3d20ea4](https://github.com/starknet-io/starknet.js/commit/3d20ea44b49d1c7ba90d8a46a307f54e737c3285))
- support uint parsing and validation ([c1acd29](https://github.com/starknet-io/starknet.js/commit/c1acd298d63758ba27fc20bcb4b0c00cca82078f))

# [5.5.0](https://github.com/starknet-io/starknet.js/compare/v5.4.2...v5.5.0) (2023-04-10)

### Bug Fixes

- update DeclareAndDeploy with Cairo1 declare ([71072cf](https://github.com/starknet-io/starknet.js/commit/71072cffadb8ac118780cec21cb8c4f83e74d7ae))

### Features

- expand Cairo1 response parsing and types ([09a46af](https://github.com/starknet-io/starknet.js/commit/09a46af02e88376dc49e0aa39468fded99b94ee2))

## [5.4.2](https://github.com/starknet-io/starknet.js/compare/v5.4.1...v5.4.2) (2023-04-04)

### Bug Fixes

- implement custom ts error locally ([fa90a3e](https://github.com/starknet-io/starknet.js/commit/fa90a3e7dcbe8c0952b0681be903dffb4b4c74c6))

## [5.4.1](https://github.com/starknet-io/starknet.js/compare/v5.4.0...v5.4.1) (2023-04-03)

### Bug Fixes

- fix call response type and signature type ([c6c42e0](https://github.com/starknet-io/starknet.js/commit/c6c42e06ab7dd464e472b319cc16f52c75bef7cb))

# [5.4.0](https://github.com/starknet-io/starknet.js/compare/v5.3.0...v5.4.0) (2023-04-03)

### Bug Fixes

- adjust suggested max fee response type ([78b1f81](https://github.com/starknet-io/starknet.js/commit/78b1f814f2a65fa0b28ed27912b69d3dfbc022ad))

### Features

- support Cairo1 execute calldata ([1f7f001](https://github.com/starknet-io/starknet.js/commit/1f7f00155ae89ff871cdf987cd3b5238377d5450))

# [5.3.0](https://github.com/starknet-io/starknet.js/compare/v5.2.0...v5.3.0) (2023-03-29)

### Features

- declare v2 from account ([bc861b7](https://github.com/starknet-io/starknet.js/commit/bc861b753b443b4f75f9af7d1d9eb1a350273376))
- declare v2 intermediate ([a8fdfe3](https://github.com/starknet-io/starknet.js/commit/a8fdfe3e6f00ee08f7aec55a8babda46043f1783))
- get_compiled_class_by_class_hash, get_class_by_hash, ContractClass, rpc hotfix ([fc33d19](https://github.com/starknet-io/starknet.js/commit/fc33d196adadbf899e450aec88ef9d8d7365f726))
- get_state_update, fix types, fix responseParser, fix BigNumberish api response, fix OPENRPC ([50a2c29](https://github.com/starknet-io/starknet.js/commit/50a2c29b53feb960a6b2a0eea7651c55cff5fc0b))
- update contract address to sender address parameters ([7cec344](https://github.com/starknet-io/starknet.js/commit/7cec344c5b9a70bac9597354b20773388e5a4145))
- remove version 0 invoke and declare ([08bd65c](https://github.com/starknet-io/starknet.js/commit/08bd65cf20d6db0fecb1fb014b2464f19dc64a6c))
- implement skipValidate ([8b20e2e](https://github.com/starknet-io/starknet.js/commit/8b20e2e461ae73b9b6840972ea6c17a00b3efddc))
- update hashing to cairo-lang 0.11.0, cairo 1.0.0.alpha-6 ([b6669b5](https://github.com/starknet-io/starknet.js/commit/b6669b577b159bd98369a16e295ba847eea55688))

# [5.2.0](https://github.com/starknet-io/starknet.js/compare/v5.1.1...v5.2.0) (2023-03-14)

### Features

- implement compiledClassHash ([485793c](https://github.com/starknet-io/starknet.js/commit/485793ce6fd0763e3da56d0d11a50bffc9bab984))
- compute chassHash for Cairo1 contract - computeSieraContractClassHash ([e20c1c5](https://github.com/starknet-io/starknet.js/commit/e20c1c5d01ce1d8abe2de527233a8396f7b9316d))
- unify classHash for Sierra and legacy ([fac2bfe](https://github.com/starknet-io/starknet.js/commit/fac2bfe92e074207132296a0d3f73dae2ddaf735))

## [5.1.1](https://github.com/starknet-io/starknet.js/compare/v5.1.0...v5.1.1) (2023-03-07)

### Bug Fixes

- rectify default provider wait parameter typing ([fc9fd66](https://github.com/starknet-io/starknet.js/commit/fc9fd6661b13317d203a61407817e6ecf3897ba8))

# [5.1.0](https://github.com/starknet-io/starknet.js/compare/v5.0.2...v5.1.0) (2023-03-03)

### Features

- expose base poseidon methods ([8459947](https://github.com/starknet-io/starknet.js/commit/84599474862416955da32d0e99957b8a112b4edd))
- rename number utility namespace to num ([032aadc](https://github.com/starknet-io/starknet.js/commit/032aadcf1401f3a0ef40eac947c23b8acfd1a0f7))

## [5.0.2](https://github.com/starknet-io/starknet.js/compare/v5.0.1...v5.0.2) (2023-03-02)

### Bug Fixes

- add max_fee to simulate_transaction ([95ae885](https://github.com/starknet-io/starknet.js/commit/95ae8857eb05daaeb75b4b853a0ee9377d9ac7df))

## [5.0.1](https://github.com/starknet-io/starknet.js/compare/v5.0.0...v5.0.1) (2023-03-02)

### Bug Fixes

- add new starknet id contracts (testnet) ([343cf78](https://github.com/starknet-io/starknet.js/commit/343cf78a678b088ab4915407fe86f28fa91db6ea))

# [5.0.0](https://github.com/starknet-io/starknet.js/compare/v4.22.0...v5.0.0) (2023-02-22)

### Bug Fixes

- remove the chain id property from the provider interface ([425b223](https://github.com/starknet-io/starknet.js/commit/425b22339118a7c3743ee1de8cc1683d2998bbdc))
- repair bnToUint256 ([baa9d61](https://github.com/starknet-io/starknet.js/commit/baa9d611b18725ba269818631f668183212988df))
- repair and unify transaction retrieval error ([ea5e646](https://github.com/starknet-io/starknet.js/commit/ea5e64651bf47824b254ae73ed8aa88998a5be44))
- remove hex prefix should work insensitive, for both 0x and 0X ([53323d4](https://github.com/starknet-io/starknet.js/commit/53323d434d5edbeee03c4262935676c950a761d3))

### Features

- switch to native BigInt support ([ec56c29](https://github.com/starknet-io/starknet.js/commit/ec56c29672c2e09e00d6ce5d500e4b10b6598269))
- expose elliptic curve utility methods ([649e0aa](https://github.com/starknet-io/starknet.js/commit/649e0aa032d77ba714fe5cb8d31252590e9eb7f4))
- add public sequencer fetch method ([1dab230](https://github.com/starknet-io/starknet.js/commit/1dab2302d64f5f3f1df84c225a93e6007592090d))
- allow BigNumberish in RawCallData ([9b897c7](https://github.com/starknet-io/starknet.js/commit/9b897c7fb653ae1830b3795b29bd35c8be8e2d22))
- rework contract interaction API ([2ee199e](https://github.com/starknet-io/starknet.js/commit/2ee199e16c4fa2aa4432816482930a418e41b327))
- rework waitForTransaction API ([e17ff17](https://github.com/starknet-io/starknet.js/commit/e17ff1744d0ff9f93d7228e48168dc2bbaf63652))

### BREAKING CHANGES

- multiple BN values replaced by BigInt
- major API refactoring

# [5.0.0-beta.6](https://github.com/starknet-io/starknet.js/compare/v5.0.0-beta.5...v5.0.0-beta.6) (2023-02-22)

### Bug Fixes

- remove hex prefix should work insensitive, for both 0x and 0X ([53323d4](https://github.com/starknet-io/starknet.js/commit/53323d434d5edbeee03c4262935676c950a761d3))

### Features

- move starkname to provider ([8e88ed0](https://github.com/starknet-io/starknet.js/commit/8e88ed0dd9f651dd9decea75dfdae2357e6bfa4a))

# [4.22.0](https://github.com/starknet-io/starknet.js/compare/v4.21.1...v4.22.0) (2023-02-22)

### Features

- move starkname to provider ([8e88ed0](https://github.com/starknet-io/starknet.js/commit/8e88ed0dd9f651dd9decea75dfdae2357e6bfa4a))

# [5.0.0-beta.5](https://github.com/starknet-io/starknet.js/compare/v5.0.0-beta.4...v5.0.0-beta.5) (2023-02-21)

### Features

- rework contract interaction API ([2ee199e](https://github.com/starknet-io/starknet.js/commit/2ee199e16c4fa2aa4432816482930a418e41b327))
- rework waitForTransaction API ([e17ff17](https://github.com/starknet-io/starknet.js/commit/e17ff1744d0ff9f93d7228e48168dc2bbaf63652))

## [4.21.1](https://github.com/starknet-io/starknet.js/compare/v4.21.0...v4.21.1) (2023-02-20)

### Bug Fixes

- repair hex prefix removal to be case insensitive ([53323d4](https://github.com/starknet-io/starknet.js/commit/53323d434d5edbeee03c4262935676c950a761d3))
- repair decodeShortString for integer strings ([1d6adf0](https://github.com/starknet-io/starknet.js/commit/1d6adf01a64f93b7016d083b81dba4e409371e74))

# [4.21.0](https://github.com/starknet-io/starknet.js/compare/v4.20.0...v4.21.0) (2023-01-18)

### Features

- add get_block_traces support in sequencer ([b8dec62](https://github.com/starknet-io/starknet.js/commit/b8dec62c06dabcd3b917d6b53f318df2a0a8dfe4))

# [4.20.0](https://github.com/starknet-io/starknet.js/compare/v4.19.3...v4.20.0) (2023-01-17)

### Features

- add support for get_state_update in provider ([76035a1](https://github.com/starknet-io/starknet.js/commit/76035a148e7863fa1dbe440920eca34498480aa9))

# [5.0.0-beta.4](https://github.com/starknet-io/starknet.js/compare/v5.0.0-beta.3...v5.0.0-beta.4) (2023-01-24)

### Features

- expose elliptic curve utility methods ([649e0aa](https://github.com/starknet-io/starknet.js/commit/649e0aa032d77ba714fe5cb8d31252590e9eb7f4))
- add public sequencer fetch method ([1dab230](https://github.com/starknet-io/starknet.js/commit/1dab2302d64f5f3f1df84c225a93e6007592090d))
- allow BigNumberish in RawCallData ([9b897c7](https://github.com/starknet-io/starknet.js/commit/9b897c7fb653ae1830b3795b29bd35c8be8e2d22))

# [5.0.0-beta.3](https://github.com/starknet-io/starknet.js/compare/v5.0.0-beta.2...v5.0.0-beta.3) (2023-01-13)

### Bug Fixes

- repair and unify transaction retrieval error ([ea5e646](https://github.com/starknet-io/starknet.js/commit/ea5e64651bf47824b254ae73ed8aa88998a5be44))

# [5.0.0-beta.2](https://github.com/starknet-io/starknet.js/compare/v5.0.0-beta.1...v5.0.0-beta.2) (2023-01-11)

### Bug Fixes

- remove the chain id property from the provider interface ([425b223](https://github.com/starknet-io/starknet.js/commit/425b22339118a7c3743ee1de8cc1683d2998bbdc))
- repair bnToUint256 ([baa9d61](https://github.com/starknet-io/starknet.js/commit/baa9d611b18725ba269818631f668183212988df))

### BREAKING CHANGES

- provider interface chain id property removed

# [5.0.0-beta.1](https://github.com/starknet-io/starknet.js/compare/v4.18.0...v5.0.0-beta.1) (2023-01-07)

### Features

- switch to native BigInt support ([ec56c29](https://github.com/starknet-io/starknet.js/commit/ec56c29672c2e09e00d6ce5d500e4b10b6598269))

### BREAKING CHANGES

- multiple BN values replaced by BigInt

## [4.19.3](https://github.com/starknet-io/starknet.js/compare/v4.19.2...v4.19.3) (2023-01-12)

### Features

- move the simulateTransaction method to the Account class ([be7b792](https://github.com/starknet-io/starknet.js/commit/be7b79272a13a9ec9986485d51526846c6954092))

## [4.19.2](https://github.com/starknet-io/starknet.js/compare/v4.19.1...v4.19.2) (2023-01-11)

### Bug Fixes

- repair and unify transaction retrieval error ([ea5e646](https://github.com/starknet-io/starknet.js/commit/ea5e64651bf47824b254ae73ed8aa88998a5be44))

## [4.19.1](https://github.com/starknet-io/starknet.js/compare/v4.19.0...v4.19.1) (2023-01-10)

### Bug Fixes

- rework estimateFeeBulk return type ([084d89e](https://github.com/starknet-io/starknet.js/commit/084d89e120108d0e63625b4e33729713df6d9632))

# [4.19.0](https://github.com/starknet-io/starknet.js/compare/v4.18.0...v4.19.0) (2023-01-09)

### Features

- add estimate_fee_bulk support ([1352e78](https://github.com/starknet-io/starknet.js/commit/1352e78523941a8b8c9e878be96134e8bb99c4eb))

# [4.18.0](https://github.com/starknet-io/starknet.js/compare/v4.17.1...v4.18.0) (2022-12-23)

### Features

- simulate_transaction support on sequencer ([304c3cc](https://github.com/starknet-io/starknet.js/commit/304c3cc1af81bc8810581546f043caca01db173b))
- update simulate tx ([8f3ea55](https://github.com/starknet-io/starknet.js/commit/8f3ea55eb1e23cefc0419902a2ebbe10ee373ccb))
- update simulate tx in sequencer ([d79a9fa](https://github.com/starknet-io/starknet.js/commit/d79a9faa307936561504c120f67f3fb2f18423b6))

## [4.17.1](https://github.com/starknet-io/starknet.js/compare/v4.17.0...v4.17.1) (2022-12-14)

### Bug Fixes

- estimateAccountDeployFee set nonce to constant 0 ([2110ef0](https://github.com/starknet-io/starknet.js/commit/2110ef09da63765609d60e01259c360a0e8a9ddf))
- nonce should be fixed for deploy account to 0 ([c8a38e5](https://github.com/starknet-io/starknet.js/commit/c8a38e5349e5c5ebe3bb0665a4fb18cd02811626))
- rpc deployAccountContract request, rpc nonce hotfix ([9576335](https://github.com/starknet-io/starknet.js/commit/9576335893561603cfd6a8ff4454b69cb49f7484))

# [4.17.0](https://github.com/starknet-io/starknet.js/compare/v4.16.0...v4.17.0) (2022-12-13)

### Features

- contract factory deploy arguments ([9eff7f4](https://github.com/starknet-io/starknet.js/commit/9eff7f4ccc74cb5f0c0594e88c0292600f20ec09))

# [4.16.0](https://github.com/starknet-io/starknet.js/compare/v4.15.1...v4.16.0) (2022-12-12)

### Bug Fixes

- blockIdentifier null on call from constructed function ([c88fbf0](https://github.com/starknet-io/starknet.js/commit/c88fbf0cdfc57e1150275a34c15900d6c81802d3))
- default pathfinder does't have pending block ([4619188](https://github.com/starknet-io/starknet.js/commit/4619188e21e5cc9a811c59bcf2923c4382661635))
- sequencer defaults, remove defaultProvider default blockIdentifier, spelling, class ([555a9a3](https://github.com/starknet-io/starknet.js/commit/555a9a3982bc1a742776119df5dee5d701209a0d))

### Features

- multi deploy reimplemented ([10e609a](https://github.com/starknet-io/starknet.js/commit/10e609a1af584df65942477b264ad7809b5c70c9))
- return precalculated address from deploy ([5e40224](https://github.com/starknet-io/starknet.js/commit/5e402246841bdf9117a9ee96799833fc6f68d16b))

## [4.15.1](https://github.com/starknet-io/starknet.js/compare/v4.15.0...v4.15.1) (2022-12-07)

### Bug Fixes

- add testnet 2 compatibility to test ([b83f35b](https://github.com/starknet-io/starknet.js/commit/b83f35bbfc0c2a6c84318a473ca816cc053f5806))
- delete only on test ([e13db57](https://github.com/starknet-io/starknet.js/commit/e13db577b7d40073707d78e57f63e65b6472c446))
- lib chainid test ([e820572](https://github.com/starknet-io/starknet.js/commit/e820572a9eafe732dae3d1bbde5f63279c000be7))

# [4.15.0](https://github.com/starknet-io/starknet.js/compare/v4.14.0...v4.15.0) (2022-12-05)

### Bug Fixes

- add deterministic tests ([ff8e06e](https://github.com/starknet-io/starknet.js/commit/ff8e06e5eee8f04349f1f171fc9cfd8f2a12e493))
- add string function to test ([bf24d7f](https://github.com/starknet-io/starknet.js/commit/bf24d7f3b9c23f2e7eea6427469bd99e03ae5f1c))
- delete functions from interface ([1cb96a3](https://github.com/starknet-io/starknet.js/commit/1cb96a3d4904434d61d50ea27d6dc17d8e4807d4))
- docs starknet id ([69b5bcc](https://github.com/starknet-io/starknet.js/commit/69b5bcc8d8e8eb2e22a1402caaf428f1f747ee3a))
- fix Ivan comments ([7ab252a](https://github.com/starknet-io/starknet.js/commit/7ab252a7adde52403f01e1d68d3a1ada42870dca))
- revert waitfortransaction to original interface ([bb2a8cd](https://github.com/starknet-io/starknet.js/commit/bb2a8cddc0ca272a3a291668e80c59ff8758e903))
- test on account ([81f5d71](https://github.com/starknet-io/starknet.js/commit/81f5d71c19a4bf24a6cf7ff9ed39fafb70625e29))
- waitfortransaction usage ([67c2031](https://github.com/starknet-io/starknet.js/commit/67c2031d637a8b8b4697f29cd592298778404d1b))

### Features

- add starknet.id getters ([855854a](https://github.com/starknet-io/starknet.js/commit/855854a4e17bd43e6a0c79ab68dcd1c8534ef06f))
- allow usage of chainId to define network, cleanup ([6cffaad](https://github.com/starknet-io/starknet.js/commit/6cffaadcc096efa9f10f759e6e4cb2c91db4cb4a))
- set testnet2 chain id, cleanup ([16cdfd4](https://github.com/starknet-io/starknet.js/commit/16cdfd46ed4887e3878fa8bdeccaf0c806d92ccb))

# [4.14.0](https://github.com/starknet-io/starknet.js/compare/v4.13.2...v4.14.0) (2022-11-29)

### Bug Fixes

- account test removed provider deployContract ([605c2a9](https://github.com/starknet-io/starknet.js/commit/605c2a9426f8ef5bc3c16803db0055550ca58da3))
- cleanup after refactor and remove branch split ([f695629](https://github.com/starknet-io/starknet.js/commit/f69562960877bc37d38e2964a88569c9ae9bedca))
- properly parse blockIdentifier in buildCall function ([d09affd](https://github.com/starknet-io/starknet.js/commit/d09affd57c260eccf2f59c9cb7dd8c668fe8a5b3))
- remove deployMaxFee from deploy ([6d5fa24](https://github.com/starknet-io/starknet.js/commit/6d5fa2461def5caad3cdd71af8a4e6c61d88092e))
- rpc tests ([cd913ee](https://github.com/starknet-io/starknet.js/commit/cd913ee93df433eb3730e6aae43dd22b0c8aed32))
- split getNonce interface ([7b7acd9](https://github.com/starknet-io/starknet.js/commit/7b7acd9f5ebe0b2b97e389fb3a68249dd72224ce))
- tiping issue ([78aa340](https://github.com/starknet-io/starknet.js/commit/78aa3402131f51e83287eada7499ea01de41efa0))
- udc require L2 status for deployed contract to be awailable to use ([afba8d0](https://github.com/starknet-io/starknet.js/commit/afba8d068685c1c9b03126e5de13a5dfddb2925e))

### Features

- account deployContract ts overide base class ([dd4502d](https://github.com/starknet-io/starknet.js/commit/dd4502d76fb73f04e8e512336f6e5924c55b2f39))
- extend acc interface, use deploy estimate fee ([da7392a](https://github.com/starknet-io/starknet.js/commit/da7392a65fa2b261cc1c6916739c1a59ecf9330f))
- r p.deployCo. C tests, CF fixtures, cleanHex, DeclareDeploy, F Provider, seq.waitFor ret.txRec ([bb50f53](https://github.com/starknet-io/starknet.js/commit/bb50f5312f2b8618a26eaf13f1f851a645f5b670))
- return from wait Transaction,Account deployContract and declareDeploy ([724975d](https://github.com/starknet-io/starknet.js/commit/724975dd92cc764208e1cf70c6f0d4089f0d363d))

## [4.13.2](https://github.com/starknet-io/starknet.js/compare/v4.13.1...v4.13.2) (2022-11-25)

### Bug Fixes

- package json exports ([0eea96a](https://github.com/starknet-io/starknet.js/commit/0eea96a15500f4dce4125fdaa5f6720df0a9e333))

## [4.13.1](https://github.com/starknet-io/starknet.js/compare/v4.13.0...v4.13.1) (2022-11-23)

### Bug Fixes

- **ci:** adjust build script ([880ef27](https://github.com/starknet-io/starknet.js/commit/880ef27d3212fe1aa8b6ea87e2a77a7e5d56aa79))
- flatten main type export and import ([869f470](https://github.com/starknet-io/starknet.js/commit/869f470973c583f3d8d856f9996280741257dbab))

# [4.13.0](https://github.com/starknet-io/starknet.js/compare/v4.12.0...v4.13.0) (2022-11-22)

### Bug Fixes

- add estimateDeployFee ([3bc11be](https://github.com/starknet-io/starknet.js/commit/3bc11bef0d744303a1288eb997fbfca32c7523ab))
- adjust fetch parameter types ([dfe876a](https://github.com/starknet-io/starknet.js/commit/dfe876ad9fd59a4351671df5fc0705b3f980ce75))
- anotate deprecate all providers deployContract ([65eed1f](https://github.com/starknet-io/starknet.js/commit/65eed1f671b41393b3ae33ae1aaa7a9ae0fbc013))
- restore rpc node url to provided one ([2e1d87a](https://github.com/starknet-io/starknet.js/commit/2e1d87a6d9fc9a1fe9b493ffd8153eb2342ffdfc))
- transaction v1 getInvokeEstimateFee ([cb4ede3](https://github.com/starknet-io/starknet.js/commit/cb4ede3b5b586ebf69768d4e4a8b36c739f6715f))

### Features

- update devnet ([0dbe9f7](https://github.com/starknet-io/starknet.js/commit/0dbe9f72fdad96250850599ed90495a5c2975f60))

# [4.12.0](https://github.com/starknet-io/starknet.js/compare/v4.11.0...v4.12.0) (2022-11-17)

### Bug Fixes

- **tests:** refactor udc tests ([01a6eef](https://github.com/starknet-io/starknet.js/commit/01a6eef11b2f32e05d2aea4ab185536e3fdb1a71))
- use method name similar to gateway endpoint ([79641b3](https://github.com/starknet-io/starknet.js/commit/79641b3076412d71fa4e5ccbdb018c4f3ecab938))

### Features

- create getClass RPC alias ([1003534](https://github.com/starknet-io/starknet.js/commit/10035341dd26e23b59d3dd764936a7d8eaa3f3b0))

# [4.11.0](https://github.com/starknet-io/starknet.js/compare/v4.10.0...v4.11.0) (2022-11-14)

### Bug Fixes

- change txn version for estimate fee apis to be feeTransactionVersion ([4d255c5](https://github.com/starknet-io/starknet.js/commit/4d255c5cf4adceb16a7f9ac61904a6e5d8020cbd))
- lib FunctionAbiType and EventAbi shallow ([7088dc6](https://github.com/starknet-io/starknet.js/commit/7088dc6828f9f4fd29922323e63183a2e11f7340))
- remove deprecated function ([0a9f84f](https://github.com/starknet-io/starknet.js/commit/0a9f84f86aabaa49ab78faa3331cac0ca98ace61))
- removed fixed params swap ([57c01f6](https://github.com/starknet-io/starknet.js/commit/57c01f6418771d8ceaa3f393d54cad8bfff94b56))
- rpcProvider tests ([4b0fd20](https://github.com/starknet-io/starknet.js/commit/4b0fd20a8ce235e0e069521f7dca50a4696120a4))

### Features

- fill in sequencer class methods ([83c0a29](https://github.com/starknet-io/starknet.js/commit/83c0a296bced3128a0ca9dd5246b376816a0be63))
- implement rpc-0.2.1rc1 types ([2b1b71e](https://github.com/starknet-io/starknet.js/commit/2b1b71ebedfa709aab4fa652bd98a8efc2d3e39a))
- rpc 0.2.0 plane implementation ([35a880c](https://github.com/starknet-io/starknet.js/commit/35a880ce4f8438e78143f7c0997ccfe6de680d80))
- rpc 0.2.0 type implementation ([866dda7](https://github.com/starknet-io/starknet.js/commit/866dda76fc35ef656a9e21b8b8674f73729c9a50))
- rpc 0.2.0 types spec ([25b2d29](https://github.com/starknet-io/starknet.js/commit/25b2d293a1a570b6fc68ea3877bfe6c3e898e3a6))
- rpc 0.2.1 ([ed17f63](https://github.com/starknet-io/starknet.js/commit/ed17f6380d2b1ab1432d5426c7395ab18c6dc793))
- rpc v0.2 endpoint, default identifiers, getClassHashAt flip parameters ([f0a0d6c](https://github.com/starknet-io/starknet.js/commit/f0a0d6c49e33442b603dcc9c9c119867c1ed32cc))
- rpc0.2.1 definition migration comlete ([35c5a06](https://github.com/starknet-io/starknet.js/commit/35c5a0645dafe061080c2c2ced6a9a4a9882207c))

# [4.10.0](https://github.com/starknet-io/starknet.js/compare/v4.9.0...v4.10.0) (2022-11-10)

### Bug Fixes

- ci ([9b38cd8](https://github.com/starknet-io/starknet.js/commit/9b38cd8a2e23b71a1490c168ae83b64f479d3da9))
- deploy return type in interface ([6a663d4](https://github.com/starknet-io/starknet.js/commit/6a663d492751b0cd8493af6d4ee9a5cf5524ed19))
- path rpc test to release ([a1dafad](https://github.com/starknet-io/starknet.js/commit/a1dafad7056fb2e52849a8d5d533872254c62293))
- remove multiple RawArgs declaration ([b65dc65](https://github.com/starknet-io/starknet.js/commit/b65dc651bbd86708d4f88b7445813dab7dfea639))
- return type and rename calldata ([67fe081](https://github.com/starknet-io/starknet.js/commit/67fe081a24ca9eb64669ed9b0c2726898c68a34c))
- update readme ([7859cb1](https://github.com/starknet-io/starknet.js/commit/7859cb1d2b6e4e924f8bb21a1bbb9ada1a46a308))
- wait for declare and deploy, use random salt ([8dbd3c1](https://github.com/starknet-io/starknet.js/commit/8dbd3c183413f298307f2b22941c6981191a62b2))

### Features

- add multicall support ([4b99f4a](https://github.com/starknet-io/starknet.js/commit/4b99f4a7b09a03990e2ba9ea00de2d0206f93ce0))
- enable custom providers headers option ([f2e9b1a](https://github.com/starknet-io/starknet.js/commit/f2e9b1a439908179bad1f4bb0e0632180b7b658f))
- fix and add proper UDC tests ([d96cc53](https://github.com/starknet-io/starknet.js/commit/d96cc531786738de7d8ec285ccdaa39e76a94de3))
- provider docs update ([e5d0376](https://github.com/starknet-io/starknet.js/commit/e5d0376dd281b04c486c58786709c42ea1e3a5a7))
- testnet2 ([8a054d0](https://github.com/starknet-io/starknet.js/commit/8a054d0ceb312efc0b6d303cad73b9bb39ba4304))
- udc demo ([27b402b](https://github.com/starknet-io/starknet.js/commit/27b402b6eed4c2bec67bfbf7ee27c9636ca4ae2b))
- udc working example ([5c4452a](https://github.com/starknet-io/starknet.js/commit/5c4452aa2e6b50768438f1117794dce430984ff8))

# [4.9.0](https://github.com/starknet-io/starknet.js/compare/v4.8.0...v4.9.0) (2022-10-19)

### Bug Fixes

- add back getEstimateFee and estimateFee ([bf7abca](https://github.com/starknet-io/starknet.js/commit/bf7abca616ebbb658fda040959c6103d8998069d))
- build ([421b9d7](https://github.com/starknet-io/starknet.js/commit/421b9d7a3fa3fd962faab8f22289d69bd521b5ca))
- erc20 tests ([2b6aa24](https://github.com/starknet-io/starknet.js/commit/2b6aa2455e6d878003157b16ae2e611dbcb017ea))
- estimateFee response ([546e43b](https://github.com/starknet-io/starknet.js/commit/546e43ba605c79c2f8c1c47b881a554da2f9bad7))
- getBlock test ([e3750d0](https://github.com/starknet-io/starknet.js/commit/e3750d0c31eb63a6627a6e3cc47542cea7c1915e))
- linter autofix restored ([07d28f6](https://github.com/starknet-io/starknet.js/commit/07d28f6ac4c91ab3a80f12c1d3ad0a1c4b15ca88))
- optional address ([95e7e47](https://github.com/starknet-io/starknet.js/commit/95e7e479c7f1d30d43f122bef820f93999453f14))
- provide all available data from sequencer GetTransaction ([f3d2969](https://github.com/starknet-io/starknet.js/commit/f3d29693f2a349eed089224db9e96a137ab9f236))
- removed parseGetTransactionReceiptResponse rpc response parser for TransactionReceipt ([7fca26d](https://github.com/starknet-io/starknet.js/commit/7fca26ddf9b830aa1290f6e450daeea5bee03b38))
- use BigNumberish type for classHash ([0ab4d47](https://github.com/starknet-io/starknet.js/commit/0ab4d478a4930a2044b68280ca4e6cd69f63920a))

### Features

- add and update tests ([b2df4c7](https://github.com/starknet-io/starknet.js/commit/b2df4c7deea96aaefcdf90e640bca67a91b6dab7))
- add declare flow with estimate fee ([30d5544](https://github.com/starknet-io/starknet.js/commit/30d554442ed3173bf4fa1d80dd3acaf2461b78aa))
- deploy_account transaction ([8e5d414](https://github.com/starknet-io/starknet.js/commit/8e5d4148fe8edc72e5b5eaac0be56d5127ce828d))
- **refactor:** contractAddress calculation ([2b791d5](https://github.com/starknet-io/starknet.js/commit/2b791d5db4a78fceb6cc08ae4ed2ef68fe0c3f07))
- update maxFee logic ([19add10](https://github.com/starknet-io/starknet.js/commit/19add10d53b5b83fb96c8db1043318942f59309c))
- use updated erc20 contract ([19ca7e8](https://github.com/starknet-io/starknet.js/commit/19ca7e822988d9b82e075c569a1decb4d4d7966a))

# [4.8.0](https://github.com/starknet-io/starknet.js/compare/v4.7.0...v4.8.0) (2022-10-05)

### Bug Fixes

- adapted transactionTrace response ([58c21c0](https://github.com/starknet-io/starknet.js/commit/58c21c0a3c647eae781d57024c3193aa6c98b20b))
- estimate fee BigInt test ([0489bed](https://github.com/starknet-io/starknet.js/commit/0489bed7ea16790708878d7714df554b84d02153))
- fixed and one-lined hash sort and added additional test case ([023c7c7](https://github.com/starknet-io/starknet.js/commit/023c7c7c543c0e4382bf3e109140206f7c7cba57))
- fixed hash arg sorting in merkle tree generation ([ccbfecf](https://github.com/starknet-io/starknet.js/commit/ccbfecfa63aa5037455405d929aea6322590d6ac))
- is sequencer goerli fix ([2d43d1b](https://github.com/starknet-io/starknet.js/commit/2d43d1b666ccbcaf3a9fda92ebfbb7db3b96f8c1))
- issue 296 ([bfc1f70](https://github.com/starknet-io/starknet.js/commit/bfc1f7051f8949b4c4d89ee379430e4404c9a2f5))
- remove linter fix ([272e2ec](https://github.com/starknet-io/starknet.js/commit/272e2ecbe254758bc6d841e16d426446914e18e9))
- remove optional l1_origin_message from test ([01050e3](https://github.com/starknet-io/starknet.js/commit/01050e333a6d96e3b439bdb3398a634ee18137af))
- remove status_data as it is optional response parameter ([9bb0a3e](https://github.com/starknet-io/starknet.js/commit/9bb0a3e0afb610817a12c036e3f117a385f4a1d6))
- sequencer getBlock response ([165bce7](https://github.com/starknet-io/starknet.js/commit/165bce743467cd9de36559c3cb232fccc32064be))

### Features

- sequencer estimateMessageFee ([f1ffda7](https://github.com/starknet-io/starknet.js/commit/f1ffda7e79e9bfda7f041abc3fd8c5b4ac9f1a66))

# [4.7.0](https://github.com/starknet-io/starknet.js/compare/v4.6.0...v4.7.0) (2022-09-22)

### Bug Fixes

- add blockIdentifier for getNonce ([7f2edab](https://github.com/starknet-io/starknet.js/commit/7f2edab5099eb9679744140bfe80328801a621ab))
- addressSalt from BigNumberish to string | undefined ([f77784c](https://github.com/starknet-io/starknet.js/commit/f77784c98d1827a8fd64dd1c543beea4284af7b3))
- block_id identifier cleanup ([24c24e8](https://github.com/starknet-io/starknet.js/commit/24c24e8060b76f6a300b21c3148a15183b802fcb))
- **ci:** use correct devnet image for release pipeline ([fc2fcbb](https://github.com/starknet-io/starknet.js/commit/fc2fcbb57e48b4cec9197c59120a574b018a54af))
- cleanup pr.yml ([263e296](https://github.com/starknet-io/starknet.js/commit/263e29658c30e2c80fe1795f89d4c334777fef5e))
- fix tests for starknet 0.10 ([c2da26d](https://github.com/starknet-io/starknet.js/commit/c2da26d4b92221fdd54fdd8ff37c437529616b21))
- get_nonce response type ([f0c30bd](https://github.com/starknet-io/starknet.js/commit/f0c30bd4376eb7c70098d77ff2918ea80418a8af))
- throw error only when nonce is not provided with contract.invoke ([c6bba65](https://github.com/starknet-io/starknet.js/commit/c6bba6517054b5221f227732750092d0c11b566d))
- ts types fixes and block_id ([bad0b85](https://github.com/starknet-io/starknet.js/commit/bad0b851765b9af70af3a784aeb1ae5adbe29816))

### Features

- add getNonce method on account ([8e935eb](https://github.com/starknet-io/starknet.js/commit/8e935ebaa251279b83fab65397687ef0380358ac))
- getNonce endpoint for sequencer ([add4900](https://github.com/starknet-io/starknet.js/commit/add4900ad86f40390b68f6f2158cfbb588fe21d6))
- is_valid_signature -> isValidSignature ([f704f3e](https://github.com/starknet-io/starknet.js/commit/f704f3e9a3aec0744c155fc3bded079fac7284b5))
- rpc options, methods, fetch with prop types, imp. types, clenup responseParser ([0ab5769](https://github.com/starknet-io/starknet.js/commit/0ab576957b3e193a68ae6f3ceb15d0b042d39b14))
- rpc optionsOrProvider extend with retries ([46f9634](https://github.com/starknet-io/starknet.js/commit/46f96342be05252de306fba28da74e634e8b9c3f))
- transaction v1 changes ([e928478](https://github.com/starknet-io/starknet.js/commit/e92847848166170c7d63394993cd74ae79c14a67))
- update tests ([1af16f4](https://github.com/starknet-io/starknet.js/commit/1af16f475813a15c78d3b049b7453c19023fe53a))
- use starknet-devnet 0.3.1 ([83e5dd7](https://github.com/starknet-io/starknet.js/commit/83e5dd7f3bfc5d8d492b3761da6e9fe15669d03c))

# [4.6.0](https://github.com/starknet-io/starknet.js/compare/v4.5.0...v4.6.0) (2022-09-15)

### Bug Fixes

- add test getTransactionCount [skip ci] ([342755a](https://github.com/starknet-io/starknet.js/commit/342755aa99dda016d7aa394a0023b3f2e5d5e963))
- estimateFee and call block id ([ef1645f](https://github.com/starknet-io/starknet.js/commit/ef1645f740e7c29edea6b091bec9949ec713953f))
- rpc test update, comepleted rpc to openrpc mapping, rpc provider methods ([8b41e0f](https://github.com/starknet-io/starknet.js/commit/8b41e0fcf36b34b20dfaba356cfc0131f02d7d69))

### Features

- new Block utility object, rpc fetch clenup, open rpc fetch api ([0d381c8](https://github.com/starknet-io/starknet.js/commit/0d381c89fe655b2628f02e67095ef03cb1721398))
- read, write and trace api ([d488ab2](https://github.com/starknet-io/starknet.js/commit/d488ab2513b88fdeb4e27b6ec2b7226ffd359445))
- retry rpc wait for transaction 200 times instead of 100 ([3bc9118](https://github.com/starknet-io/starknet.js/commit/3bc9118cae86fba21e1c85667079079662ba0b7b))
- updated rpc tests with new methods ([e369d95](https://github.com/starknet-io/starknet.js/commit/e369d95d72f3b39b3e8b8baa99867b94c1d5d1c1))

# [4.5.0](https://github.com/starknet-io/starknet.js/compare/v4.4.2...v4.5.0) (2022-09-09)

### Bug Fixes

- prevent undefined rpc chainId in account ([9f69229](https://github.com/starknet-io/starknet.js/commit/9f69229fcb5205bb3fd1fcc7eb7c627faa300561))
- repair chain fix ([d7758a6](https://github.com/starknet-io/starknet.js/commit/d7758a6d180cd1af89f8aefb37bce077b92c5fd5))

### Features

- optional abi field for deploy and declare rpc transactions ([ce62648](https://github.com/starknet-io/starknet.js/commit/ce626481cb6bc3dea77963482820ae6f50c82566))

## [4.4.2](https://github.com/starknet-io/starknet.js/compare/v4.4.1...v4.4.2) (2022-09-07)

### Bug Fixes

- dont import fetch from crosshatch ([a3ef41c](https://github.com/starknet-io/starknet.js/commit/a3ef41cac0e818f7429e6dd7654722ede1dc3796))
- use custom fetch ponyfill ([78f904a](https://github.com/starknet-io/starknet.js/commit/78f904a1d5aeb5efaba7fbdd853802529c80594b))
- use isomorphic-unfetch ([c63b6a1](https://github.com/starknet-io/starknet.js/commit/c63b6a138616936cf7a70f9098af5df290983c74))

## [4.4.1](https://github.com/starknet-io/starknet.js/compare/v4.4.0...v4.4.1) (2022-09-01)

### Bug Fixes

- supply calldata as hexadecimal string array ([44cb4c5](https://github.com/starknet-io/starknet.js/commit/44cb4c5f108a2ea8fcd77147f053e068189d4f33))

# [4.4.0](https://github.com/starknet-io/starknet.js/compare/v4.3.1...v4.4.0) (2022-09-01)

### Bug Fixes

- delete premature session account file ([ca3e70b](https://github.com/starknet-io/starknet.js/commit/ca3e70b06d21dba8b2074512251cf232ed8be46b))
- session ([00269bf](https://github.com/starknet-io/starknet.js/commit/00269bfd23ed647270a1efd699af7c36978965c7))
- session account prooving ([0b56833](https://github.com/starknet-io/starknet.js/commit/0b56833f6eb7557d55725a505a01185bbc9756db))
- tests ([4586e93](https://github.com/starknet-io/starknet.js/commit/4586e93f10a2a43c375a23d851a9778bab412fcc))
- typo ([1c60a4d](https://github.com/starknet-io/starknet.js/commit/1c60a4d4b306879422769a6c2afc4fd6c39c4c07))

### Features

- add merkle trees ([e9b8674](https://github.com/starknet-io/starknet.js/commit/e9b8674f51c6d6fe57772a4c88b162c5132cfbdd))
- add visibility modifiers ([cd1a23d](https://github.com/starknet-io/starknet.js/commit/cd1a23d74b49407c27314a12d5bc149ed40209f3))
- allow merkle trees as native type in eip712 like messages ([65b7766](https://github.com/starknet-io/starknet.js/commit/65b7766c29eca4f4d0e89f6ad1368fedd5e0e18e))
- session ([9ac48cc](https://github.com/starknet-io/starknet.js/commit/9ac48cc15c1c7b0e504adfc79a7f382f5d0b55d0))
- session needs to be aware of the whole tree ([11e10bd](https://github.com/starknet-io/starknet.js/commit/11e10bda0f020a670854d941a54142d55936fc18))

## [4.3.1](https://github.com/starknet-io/starknet.js/compare/v4.3.0...v4.3.1) (2022-08-31)

### Bug Fixes

- getClassAt and Test Fixes ([548cf6e](https://github.com/starknet-io/starknet.js/commit/548cf6e69d16292b9c216493c77e1c7a14be2ae9))
- getCode removed from RPC 0.1.0 ([744a988](https://github.com/starknet-io/starknet.js/commit/744a9882c363331ff47f409971cacbfda977c4c2))
- merge ([67d87fc](https://github.com/starknet-io/starknet.js/commit/67d87fc834ea5b877029445f39782457584fb4ec))
- naming ([0c75f6f](https://github.com/starknet-io/starknet.js/commit/0c75f6f431c3828b1078d955123b2d13aef6b5d0))
- restore GetCode to common interface for backward compatibility ([52f8e61](https://github.com/starknet-io/starknet.js/commit/52f8e61797a3f2390577b3a6e977adae11346a23))
- rpc 0.1.0 getStorageAt ([c622913](https://github.com/starknet-io/starknet.js/commit/c6229138c57cd9a04b982c386c7278d63b931a1f))
- **RpcProvider:** update of RpcProvider getBlock method to work with v0.3.0 of pathfinder ([3b12421](https://github.com/starknet-io/starknet.js/commit/3b124219dd25ef5a0c81583fcfe67d6a3cc5a70e))
- test getBlock('latest') ([2c92f79](https://github.com/starknet-io/starknet.js/commit/2c92f79aefe3af68834aa9a9a16754c0ff4116cc))
- test getBlock(latest) ([0c5e31e](https://github.com/starknet-io/starknet.js/commit/0c5e31effb63bf7afb26c9f2049b66c93c6b1366))
- unoptimise getClassAt test to work with integration ([e98220b](https://github.com/starknet-io/starknet.js/commit/e98220bc6e6fff55bc439773bd1258844de312e2))

# [4.3.0](https://github.com/starknet-io/starknet.js/compare/v4.2.0...v4.3.0) (2022-08-09)

### Bug Fixes

- indentations in provider.md ([4a310c6](https://github.com/starknet-io/starknet.js/commit/4a310c6c992c77f9f6729a70c1af14481cd891f7))
- **sequenceProvider:** feedergatewayUrl and gatewayUrl ([e236d23](https://github.com/starknet-io/starknet.js/commit/e236d2352e3fbb0f78965decac5893217347ceb7))

### Features

- update docs ([28786ed](https://github.com/starknet-io/starknet.js/commit/28786ed550909f6a30b8cb145e93d072ed28a862))

# [4.2.0](https://github.com/starknet-io/starknet.js/compare/v4.1.0...v4.2.0) (2022-08-09)

### Features

- change checksum address hashing algorithm ([0f32adf](https://github.com/starknet-io/starknet.js/commit/0f32adf217b3d2e55046bbb21980648f0c8cf631))

# [4.1.0](https://github.com/starknet-io/starknet.js/compare/v4.0.1...v4.1.0) (2022-08-03)

### Features

- get-code ([de6e597](https://github.com/starknet-io/starknet.js/commit/de6e5971de5155925defcf9249a8160dc3fdc9b7))

## [4.0.1](https://github.com/starknet-io/starknet.js/compare/v4.0.0...v4.0.1) (2022-08-03)

### Bug Fixes

- use custom fetch ponyfill ([16e9a53](https://github.com/starknet-io/starknet.js/commit/16e9a530d62942da75ed1bc30d0048a35f9f0152))
- use isomorphic-unfetch ([aa7af66](https://github.com/starknet-io/starknet.js/commit/aa7af6622d918ad0d17fe28bf1e73635895537c5))

# [4.0.0](https://github.com/starknet-io/starknet.js/compare/v3.19.0...v4.0.0) (2022-07-27)

### Documentation

- v4 ([9e300a9](https://github.com/starknet-io/starknet.js/commit/9e300a98e587fc702ee3ef98441c457fe87e6c1e))

### BREAKING CHANGES

- new provider and signer interfaces

# [3.19.0](https://github.com/starknet-io/starknet.js/compare/v3.18.2...v3.19.0) (2022-07-25)

### Bug Fixes

- account tests ([cc3f362](https://github.com/starknet-io/starknet.js/commit/cc3f362fffc157cb97e0fa2b8ff3a3db7dcf5985))
- add invoke warning ([34db683](https://github.com/starknet-io/starknet.js/commit/34db683267b639adbd37eb097573eb7210cb4a58))
- call contract latest block ([1476461](https://github.com/starknet-io/starknet.js/commit/1476461aeff6885b5185f45c5f8633f8c60cbfca))
- ci ([808e1f7](https://github.com/starknet-io/starknet.js/commit/808e1f7a837e014d3c3781973b434df646c207b4))
- ci ([6337feb](https://github.com/starknet-io/starknet.js/commit/6337febc9f6f6359f70d66be039779371f3186ff))
- contract tests ([ffb6a12](https://github.com/starknet-io/starknet.js/commit/ffb6a12dec4c27f9b570fcc2016fb3c17f5dcfb4))
- default provider tests ([2fac438](https://github.com/starknet-io/starknet.js/commit/2fac43876375a3d83818e152f4be5c3f219e8aff))
- invoke response type ([bdeb96b](https://github.com/starknet-io/starknet.js/commit/bdeb96b896c96f7f7778fd38e697bf368f2a8510))
- no secrets in matrix ([5ff7a26](https://github.com/starknet-io/starknet.js/commit/5ff7a2610c1c3f67ecb0a2b8d32e7c8c61017354))
- nonce issue on test runs ([bed6fbf](https://github.com/starknet-io/starknet.js/commit/bed6fbf74b6446e18ea63444ddefaa782a7ffdf4))
- pending getBlock test ([a9ea023](https://github.com/starknet-io/starknet.js/commit/a9ea023249c33369ed04b3f548bf98947240ff9e))
- provider ([32f9072](https://github.com/starknet-io/starknet.js/commit/32f90724894eccd1b0154842180da38bcf6411fe))
- provider tests ([79eb5ba](https://github.com/starknet-io/starknet.js/commit/79eb5bac4c03b64b6f3a2f3b59a1fea7bb930ce8))
- provider tests ([255fd3c](https://github.com/starknet-io/starknet.js/commit/255fd3cb68f0edc7794f77623389f94ac341880a))
- remove account test from contract tests ([d444e7f](https://github.com/starknet-io/starknet.js/commit/d444e7fb5f55a7a384dcc43a9ea0f1d09438364a))
- remove comment ([591caf6](https://github.com/starknet-io/starknet.js/commit/591caf6e7983ecf009a95ab3f9e1b86335fe1a23))
- remove hardcoded url ([c8f3377](https://github.com/starknet-io/starknet.js/commit/c8f3377d52f605dd03ab20879a5c7fd53aafe819))
- remove test only ([5add341](https://github.com/starknet-io/starknet.js/commit/5add341257f8d6b355a367e977b125f9642f7630))
- rename gateway to sequencer ([b7291e6](https://github.com/starknet-io/starknet.js/commit/b7291e654732bd5f57b2d477b20a5467dfc9854b))
- rename rpc provider ([fee4fb3](https://github.com/starknet-io/starknet.js/commit/fee4fb3e36e9d824f0956174a9278f6131b3ba3e))
- revert default block to pending ([28beff7](https://github.com/starknet-io/starknet.js/commit/28beff76107f762478e70974389eb75202a65d42))
- rpc provider account tests ([b2fc530](https://github.com/starknet-io/starknet.js/commit/b2fc53004a1e52149b3fa4e7357c3ade1d01cd4a))
- rpc provider tests ([12db930](https://github.com/starknet-io/starknet.js/commit/12db930b1babf3e3de035426c8c449bfb448951c))
- rpc provider waitForTransaction ([9e708ba](https://github.com/starknet-io/starknet.js/commit/9e708ba72ea350ae4866e5cff9519a89201b5b01))
- run only devnet on pr ([613084b](https://github.com/starknet-io/starknet.js/commit/613084b32f93540e5f11938196d7b2c003f12bbf))
- seperate types and fix fees ([577a836](https://github.com/starknet-io/starknet.js/commit/577a836b48a4567d63f0138163d016422256d221))
- set rpc url in pr workflow ([89ec3c1](https://github.com/starknet-io/starknet.js/commit/89ec3c1edfd6947404d009420305d7bb210c6cd3))
- test account ([ac8210a](https://github.com/starknet-io/starknet.js/commit/ac8210a6bbb159a17ab548a12f7a20823e55814a))
- tests should wait for build ([af8c5c7](https://github.com/starknet-io/starknet.js/commit/af8c5c779370e170de4785902e1e9ac282f2bfec))
- update jsdocs ([2c08e5d](https://github.com/starknet-io/starknet.js/commit/2c08e5d8fe80469ba41222767193823b3d516536))
- use rpc conditionally ([7023068](https://github.com/starknet-io/starknet.js/commit/70230682343b682df50da21cb9e7a7f54490091c))
- waitForTransaction ([4f0c00b](https://github.com/starknet-io/starknet.js/commit/4f0c00b568a174db51ecef918d8a8878254daba5))
- www/docs/API/contract.md ([3ca4a51](https://github.com/starknet-io/starknet.js/commit/3ca4a513950f4aa27ac447835fcefcebbece083b))
- www/docs/API/provider.md ([d73e826](https://github.com/starknet-io/starknet.js/commit/d73e8264527a5af21e1d8e7a7c1f3aa8b8c92fb8))

### Features

- adapt abstract provider interface to RPC provider ([b217b3b](https://github.com/starknet-io/starknet.js/commit/b217b3bd1e40c60427636ccad03583e901f6ba58))
- add account rpc tests ([fc3b484](https://github.com/starknet-io/starknet.js/commit/fc3b4846486e63f2ff5eaba78844235091f2d49e))
- add gateway provider class ([dad1eea](https://github.com/starknet-io/starknet.js/commit/dad1eea9caafc71c940262ee13dd75817996abfd))
- add provider utils ([4df4ae7](https://github.com/starknet-io/starknet.js/commit/4df4ae7e8b8111669e2bc20e30c2c89af9c50a4f))
- add rpc provider ([315bb74](https://github.com/starknet-io/starknet.js/commit/315bb747f26ba19556841a326484a7dbfa1a2857))
- change estimate fee response on rpc provider ([942f4f2](https://github.com/starknet-io/starknet.js/commit/942f4f2508fab697e796ee9f691341b86ccd34be))
- change provider keys to snake case ([2ee4b0b](https://github.com/starknet-io/starknet.js/commit/2ee4b0bf0892a3bd54e6d188990f979298814551))
- getStorageAt block param ([d89bf30](https://github.com/starknet-io/starknet.js/commit/d89bf307796e69627ffd91ebd97c787e4a7a77e7))
- implement new interface on account class ([b202f37](https://github.com/starknet-io/starknet.js/commit/b202f37ab72fd310a8c99b28863f38b8d142d2a7))
- implement new interface on contract class ([e942a9d](https://github.com/starknet-io/starknet.js/commit/e942a9d88479d88b82a3dbc05ec2f60ab9ad1f19))
- use shared describe block for providers ([b525a60](https://github.com/starknet-io/starknet.js/commit/b525a60eb77647962f4509bb02f64bb66071c9c2))

## [3.18.2](https://github.com/starknet-io/starknet.js/compare/v3.18.1...v3.18.2) (2022-07-25)

### Bug Fixes

- release to [@next](https://github.com/next) ([12e37ce](https://github.com/starknet-io/starknet.js/commit/12e37cef78bc0e9d97d25c44d0dcf576969cb182))

## [3.18.1](https://github.com/starknet-io/starknet.js/compare/v3.18.0...v3.18.1) (2022-07-23)

### Bug Fixes

- struct array hashing ([e1f82df](https://github.com/starknet-io/starknet.js/commit/e1f82dfd575be4c84b291c33f8169bf367493603))

# [3.18.0](https://github.com/starknet-io/starknet.js/compare/v3.17.0...v3.18.0) (2022-07-23)

### Features

- **cairo-0.9.1:** starknet_version in block response ([e88154d](https://github.com/starknet-io/starknet.js/commit/e88154d5f6fcd6695dca5d29da04d18d0a65cdf6))

# [3.17.0](https://github.com/starknet-io/starknet.js/compare/v3.16.3...v3.17.0) (2022-07-15)

### Features

- support SN 0.9.1 estimate_fee response ([9302aab](https://github.com/starknet-io/starknet.js/commit/9302aab9cbbe5eaa3a9933b19f8f46b2dd6d6a1d))

## [3.16.3](https://github.com/starknet-io/starknet.js/compare/v3.16.2...v3.16.3) (2022-07-15)

### Bug Fixes

- allow hex to be mixed case ([fa84e55](https://github.com/starknet-io/starknet.js/commit/fa84e558602d1ff134defc3e0f7123c1f4d04775))

## [3.16.2](https://github.com/starknet-io/starknet.js/compare/v3.16.1...v3.16.2) (2022-07-14)

### Bug Fixes

- **docs:** account.address ([d935b95](https://github.com/starknet-io/starknet.js/commit/d935b95c3bb54977c420efbd25cd85dcd12d1b17))

## [3.16.1](https://github.com/starknet-io/starknet.js/compare/v3.16.0...v3.16.1) (2022-07-02)

### Bug Fixes

- **test:** for new devnet version ([63d145f](https://github.com/starknet-io/starknet.js/commit/63d145f1fba90cca9e679f115525801ee140ceec))

# [3.16.0](https://github.com/starknet-io/starknet.js/compare/v3.15.6...v3.16.0) (2022-06-29)

### Features

- **npm:** add npmignore file ([e6084dd](https://github.com/starknet-io/starknet.js/commit/e6084ddbb9ea305847a312cd3a3247b730cca9b5))

## [3.15.6](https://github.com/starknet-io/starknet.js/compare/v3.15.5...v3.15.6) (2022-06-28)

### Bug Fixes

- throw http error when parsing fails ([898574f](https://github.com/starknet-io/starknet.js/commit/898574f0087bf653b5d74bbe3dc52a0cb6efc432))

## [3.15.5](https://github.com/starknet-io/starknet.js/compare/v3.15.4...v3.15.5) (2022-06-27)

### Bug Fixes

- add return statement ([468a0bf](https://github.com/starknet-io/starknet.js/commit/468a0bfbbc1a9c88383ed2ba0f0bc02b0e5e3a9b))
- don't enforce bigInt ([efef507](https://github.com/starknet-io/starknet.js/commit/efef5071ebceb5247f5f1995d3c1006d422c02ee))
- **GatewayError:** export from index ([69addd5](https://github.com/starknet-io/starknet.js/commit/69addd5a2eb30816f5e43ffd71e190838ad5a409))
- **GatewayError:** use ts-custom-error to support "err instanceof GatewayError" ([092abbc](https://github.com/starknet-io/starknet.js/commit/092abbcff5f5270a0be0b79a8e87645637298c56))
- **test:** error 500 as number instead of bigInt ([b539144](https://github.com/starknet-io/starknet.js/commit/b5391448cf04d93c4d914ad52d850591a423fe42))

## [3.15.4](https://github.com/starknet-io/starknet.js/compare/v3.15.3...v3.15.4) (2022-06-20)

### Bug Fixes

- **parseResponse:** revert the changes from parseResponse ([d51996f](https://github.com/starknet-io/starknet.js/commit/d51996fa7635428ad4ffe271aa56f202ddcd4179))
- **provider:** allow the user to handle the contract errors ([5190f7a](https://github.com/starknet-io/starknet.js/commit/5190f7a20fb35382756d86cc67d3fab5c2d541ff))
- **test:** fix callContract() test ([b11c5da](https://github.com/starknet-io/starknet.js/commit/b11c5daf7fec6e8207dbc0be534aade8e00d5021))

## [3.15.3](https://github.com/starknet-io/starknet.js/compare/v3.15.2...v3.15.3) (2022-06-20)

### Bug Fixes

- **dev:** regenerated package-lock.json ([849cb1e](https://github.com/starknet-io/starknet.js/commit/849cb1ea3ffd7ba10b40b232d0ebc46b6599c7ea))
- use cross-fetch only for jest ([83be37a](https://github.com/starknet-io/starknet.js/commit/83be37a9e3328a44abd9583b8167c3cb8d882790))

## [3.15.2](https://github.com/starknet-io/starknet.js/compare/v3.15.1...v3.15.2) (2022-06-18)

### Bug Fixes

- **cleanup:** cleanup ([a15b6c6](https://github.com/starknet-io/starknet.js/commit/a15b6c6bf13ce7af699c293d697b5136188388c3))
- **errorcode:** fixed error code >=400 instead of !=200 ([0f16595](https://github.com/starknet-io/starknet.js/commit/0f1659543ba95ce7cac31a5182dad2e33325d4c1))
- **fetchEndpoint:** error handling and test case fix ([629479f](https://github.com/starknet-io/starknet.js/commit/629479f877aa7d6f39c8d31b2c9449563aadd0e7))
- **verify:** return false when 500 returned from the gateway ([de3e004](https://github.com/starknet-io/starknet.js/commit/de3e00461730d6fa112046169470d7a603baa296))

## [3.15.1](https://github.com/starknet-io/starknet.js/compare/v3.15.0...v3.15.1) (2022-06-17)

### Bug Fixes

- response type for get-transaction ([a232725](https://github.com/starknet-io/starknet.js/commit/a232725099893b45fd6feda0a4cac7d05f903435))

# [3.15.0](https://github.com/starknet-io/starknet.js/compare/v3.14.1...v3.15.0) (2022-06-16)

### Bug Fixes

- **tests:** update test ([c71f482](https://github.com/starknet-io/starknet.js/commit/c71f482facdaac914c45f4bf91f48e05a930abff))

### Features

- add calculateContractAddressFromHash ([e22c346](https://github.com/starknet-io/starknet.js/commit/e22c3464036f97eee3c617d3790aac35b3d95379))

## [3.14.1](https://github.com/starknet-io/starknet.js/compare/v3.14.0...v3.14.1) (2022-06-15)

### Bug Fixes

- update api typings ([44796af](https://github.com/starknet-io/starknet.js/commit/44796af4849b6bab3d99065bb1e1948e4ea0b55e))

# [3.14.0](https://github.com/starknet-io/starknet.js/compare/v3.13.1...v3.14.0) (2022-06-15)

### Bug Fixes

- remove redundant \_abi from declareContract() ([53d6578](https://github.com/starknet-io/starknet.js/commit/53d6578b932ed6046b5e0df83d748673d7efc3d5))

### Features

- support contract declaration API introduced at SN 0.9.0 ([ca6203f](https://github.com/starknet-io/starknet.js/commit/ca6203f93471d7fb421d580e07d6de7c183e40f3))

## [3.13.1](https://github.com/starknet-io/starknet.js/compare/v3.13.0...v3.13.1) (2022-06-14)

### Bug Fixes

- account estimate fee interface ([51e8cf6](https://github.com/starknet-io/starknet.js/commit/51e8cf6858acd5aed003f8f1c4d755088684f134))

# [3.13.0](https://github.com/starknet-io/starknet.js/compare/v3.12.3...v3.13.0) (2022-06-14)

### Bug Fixes

- account tests ([8e86c0e](https://github.com/starknet-io/starknet.js/commit/8e86c0e813924fa5cf8f708acd708f9bea1bb7c3))
- add TEST_RPC_URL env var ([8972e0b](https://github.com/starknet-io/starknet.js/commit/8972e0bc4b4180a6f28b7fce736db76b28426a4d))
- change getStorageAt key param type to BigNumberish ([b8a8389](https://github.com/starknet-io/starknet.js/commit/b8a8389d64c3f845be8302054cbc579b4b3d3fb9))
- contract tests ([f14fe11](https://github.com/starknet-io/starknet.js/commit/f14fe117504634451540f50ce780230716f539dc))
- deps versions ([68f8373](https://github.com/starknet-io/starknet.js/commit/68f837390e3a4cba56e134f57b88966818ea94ff))
- env format ([665ab0b](https://github.com/starknet-io/starknet.js/commit/665ab0b0cc725f83d05628f53ee00b63f2801979))
- lockfile ([839bc15](https://github.com/starknet-io/starknet.js/commit/839bc1519744ea6df044b4929ec219e632e50db5))
- move env up ([405aca2](https://github.com/starknet-io/starknet.js/commit/405aca2eb07c882e25435c1b18ee5018e0970c6c))
- move private key to env ([2f4d22c](https://github.com/starknet-io/starknet.js/commit/2f4d22c47b6442479a355b4ee117ba1a5995420f))
- remove accountContract test ([d239dab](https://github.com/starknet-io/starknet.js/commit/d239dab6bb2872897501e6fc90b2c41650c2ff8f))
- remove maxFee: 0 ([9569819](https://github.com/starknet-io/starknet.js/commit/9569819c3ca36e8005b6d591d206888f5689f867))
- secrets ([d080436](https://github.com/starknet-io/starknet.js/commit/d080436acdd13571192cc19292e8ba0661caebc2))
- test ([3ca4bd3](https://github.com/starknet-io/starknet.js/commit/3ca4bd37c9edd03ca5be09ad2e9daf837d833f7c))
- tests ([593dfa1](https://github.com/starknet-io/starknet.js/commit/593dfa1da130e7e0ef1aa6edd971bbec771d16b8))

### Features

- add test account to fixtures ([3a1150c](https://github.com/starknet-io/starknet.js/commit/3a1150cfdb44053a18591e38eb30d112115864be))
- getTestProvider util ([8d6f0b9](https://github.com/starknet-io/starknet.js/commit/8d6f0b96738ee5ba48ab95356441964d8b8ef6c4))
- update account guide ([b5275b3](https://github.com/starknet-io/starknet.js/commit/b5275b313897e9a6fd4b1e52f850aa5fb189cb23))
- update erc20 guide ([416da13](https://github.com/starknet-io/starknet.js/commit/416da13b3690463897dfae318135d6f46198c5ec))

## [3.12.3](https://github.com/starknet-io/starknet.js/compare/v3.12.2...v3.12.3) (2022-05-30)

### Bug Fixes

- remove superstruct ([6f13cf0](https://github.com/starknet-io/starknet.js/commit/6f13cf0ec740e715fcbdacf846cd9bcd653c1399))

## [3.12.2](https://github.com/starknet-io/starknet.js/compare/v3.12.1...v3.12.2) (2022-05-30)

### Bug Fixes

- allow starknet.js in service workers ([7a500d1](https://github.com/starknet-io/starknet.js/commit/7a500d198cffed43f98a669edac2dbb215884a3b))
- updated powered by starknet list ([aa36463](https://github.com/starknet-io/starknet.js/commit/aa36463e1adb281f79bf8462b2f0063801457782))

## [3.12.1](https://github.com/starknet-io/starknet.js/compare/v3.12.0...v3.12.1) (2022-05-24)

### Bug Fixes

- update repo url ([c1312c0](https://github.com/starknet-io/starknet.js/commit/c1312c0e00e3387a49d1d7edc33e584687d607ea))

# [3.12.0](https://github.com/starknet-io/starknet.js/compare/v3.11.0...v3.12.0) (2022-05-24)

### Bug Fixes

- always default to latest block ([dafc575](https://github.com/starknet-io/starknet.js/commit/dafc57550b9b175b79ec2fd728504ee14a992620))

### Features

- add suggestedMaxFee ([8977772](https://github.com/starknet-io/starknet.js/commit/8977772763ecd895006c00c9cbe1397429a19b6f))

# [3.11.0](https://github.com/starknet-io/starknet.js/compare/v3.10.3...v3.11.0) (2022-05-11)

### Bug Fixes

- review ([9ee4987](https://github.com/starknet-io/starknet.js/commit/9ee498788185a35a75f2b429b3f1ec55dc4ee2a3))
- tests ([f535edb](https://github.com/starknet-io/starknet.js/commit/f535edbef8da6050e54575792926488774e3ed0f))
- transaction receipt ([806eb7d](https://github.com/starknet-io/starknet.js/commit/806eb7d63a01e158231f7b63cc4fc1fb0c30717e))
- use npm again ([3b9e176](https://github.com/starknet-io/starknet.js/commit/3b9e176812f6401e167a207db2d9ff3686260e13))

### Features

- add checksum addresses ([2d32ed8](https://github.com/starknet-io/starknet.js/commit/2d32ed828f908090642a42d9f6620f050a75b43a))
- use BigNumber for estimate fee amount ([751c2ed](https://github.com/starknet-io/starknet.js/commit/751c2edf89d019f365f5fba8123a9df0320ff543))

## [3.10.3](https://github.com/starknet-io/starknet.js/compare/v3.10.2...v3.10.3) (2022-05-04)

### Bug Fixes

- **encode:** maximum call stack size exceeded ([3cd8195](https://github.com/starknet-io/starknet.js/commit/3cd8195d0fcde7d2cf6460959bb2c9f45ef7d066))

## [3.10.2](https://github.com/starknet-io/starknet.js/compare/v3.10.1...v3.10.2) (2022-04-27)

### Bug Fixes

- **tests:** fix getBlock blocks ([c0422b7](https://github.com/starknet-io/starknet.js/commit/c0422b7d963639d34082731f6efbe3f0dd2c3c4d))

## [3.10.1](https://github.com/starknet-io/starknet.js/compare/v3.10.0...v3.10.1) (2022-04-20)

### Bug Fixes

- **account:** function documentation fix ([34a9779](https://github.com/starknet-io/starknet.js/commit/34a977953c2bfea53f9cd1157809919b1dd2ed04))
- **contractFactory:** wrong prop type ([598bcd0](https://github.com/starknet-io/starknet.js/commit/598bcd0d589c00e2219522d4a342316598678d4e))
- **contract:** recursion function name fix ([803b6dc](https://github.com/starknet-io/starknet.js/commit/803b6dcf5cad5cdfd8258a53e176bcd96300cef3))
- typings ([1fadf41](https://github.com/starknet-io/starknet.js/commit/1fadf418b04d96ced8d994b35699f40be9a8c898))
- **utils:** adding transaction utils to the utils export ([6429179](https://github.com/starknet-io/starknet.js/commit/642917922a5d5278e8c575a2b4ffd60fff53cf42))

# [3.10.0](https://github.com/starknet-io/starknet.js/compare/v3.9.0...v3.10.0) (2022-04-20)

### Bug Fixes

- new snapshot for browser test ([3394f11](https://github.com/starknet-io/starknet.js/commit/3394f1110c715826cbc7c3dff1bef1a5b73e80d8))
- review ([49b04e2](https://github.com/starknet-io/starknet.js/commit/49b04e231418ca7d26dc78843a905541985aa176))

### Features

- **account:** new hash formula ([ea4df2c](https://github.com/starknet-io/starknet.js/commit/ea4df2c77e6559f9689eaca3c57edbbb9324073a))

# [3.9.0](https://github.com/starknet-io/starknet.js/compare/v3.8.0...v3.9.0) (2022-04-08)

### Bug Fixes

- **account:** adding overhead on estimateFee for maxFee ([ec52f61](https://github.com/starknet-io/starknet.js/commit/ec52f61aed9a8755491a4b7de73517b075785479))
- **contract:** override object when invoking a function ([c605151](https://github.com/starknet-io/starknet.js/commit/c605151c03b544bf62ff9ab2e314e49de3cd562a))
- estimatedFeeToMaxFee with integers only ([71d19a7](https://github.com/starknet-io/starknet.js/commit/71d19a7db01630ca0dba55011ff440243d7db992))
- rename txVersion to version ([2ae36b2](https://github.com/starknet-io/starknet.js/commit/2ae36b2c075dbee4710abe47770af35478ceba4e))
- **utils:** remove check for the BN ([50a7951](https://github.com/starknet-io/starknet.js/commit/50a79514343e303c397358efdba978fec5f93f48))

### Features

- **account:** adding new transaction version for fee estimation ([2f7cb3f](https://github.com/starknet-io/starknet.js/commit/2f7cb3fe85c973bcff3e39db333a9ed969c550b1))

# [3.8.0](https://github.com/starknet-io/starknet.js/compare/v3.7.0...v3.8.0) (2022-04-04)

### Bug Fixes

- getBlock should not default to pending block ([7a641b5](https://github.com/starknet-io/starknet.js/commit/7a641b55c3c762dada70814bf509b147f0cd315e))

### Features

- complete interface ([39d2f05](https://github.com/starknet-io/starknet.js/commit/39d2f0574691e4b37a6050831b4e548b07a8e3e3))
- default estimateFee to pending block ([719dda5](https://github.com/starknet-io/starknet.js/commit/719dda5f33a2bed353bd1bf311a2baf3110d1654))
- default to pending block ([d3c1bdc](https://github.com/starknet-io/starknet.js/commit/d3c1bdcdca996bce273673cf9c8220156e965863))
- pending as success ([9e79288](https://github.com/starknet-io/starknet.js/commit/9e7928845cc1e7088ba9a8dc9ba8fb9311970440))

# [3.7.0](https://github.com/starknet-io/starknet.js/compare/v3.6.0...v3.7.0) (2022-03-24)

### Features

- **Account:** account constructor should take a KeyPair or a Signer as parameter ([ea6ae40](https://github.com/starknet-io/starknet.js/commit/ea6ae40225d33e293b9d2de7c8509e87fb7a651e))
- add BigInt support within BigNumberish ([e42427a](https://github.com/starknet-io/starknet.js/commit/e42427afa9a57673576da68cfbbee1356ffb5c0d))
- using typeguard to narrow variable's type in Account's constructor ([ed048f3](https://github.com/starknet-io/starknet.js/commit/ed048f355bee815cc9b2ccc984db900059fa2303))

# [3.6.0](https://github.com/starknet-io/starknet.js/compare/v3.5.1...v3.6.0) (2022-03-24)

### Bug Fixes

- **account:** estimate fee transfered from provider to account class ([93e7dd9](https://github.com/starknet-io/starknet.js/commit/93e7dd941b35bccb67cc426b9ae546801092964c))
- formatting ([248246f](https://github.com/starknet-io/starknet.js/commit/248246f2fe75b9897700b955fa98e1779aec1744))
- link ([494e000](https://github.com/starknet-io/starknet.js/commit/494e0005c3b1cb86f5de0f25a10cbbe786a87b34))
- **provider:** estimateFee entrypoint conversion fix ([e40204a](https://github.com/starknet-io/starknet.js/commit/e40204a2eca5f475fe50a88349fd4890bbc36790))
- **provider:** estimation fee response type ([ce674ca](https://github.com/starknet-io/starknet.js/commit/ce674ca632ff70a07d95d685c9bf2f48bebaca20))

### Features

- add LedgerSigner class + blind signing ([9b700f3](https://github.com/starknet-io/starknet.js/commit/9b700f300a91a0967f8827d0ecdd69e531738ec4))
- **contract:** contract expanded with estimateFee method ([fbaf4ba](https://github.com/starknet-io/starknet.js/commit/fbaf4bab56ace0917ce7c66ecf90f8e2d0dc7f60))
- improvements after PR reviewing ([9f30e20](https://github.com/starknet-io/starknet.js/commit/9f30e20c2e5d2afafe4eae58c597b82dffc3bbe2))
- new improvements after new PR review ([2e16808](https://github.com/starknet-io/starknet.js/commit/2e168082b0042f27336946639f3948e91bc5f641))
- **provider:** provider expanded with getTransactionTrace ([b67361a](https://github.com/starknet-io/starknet.js/commit/b67361ad7c50218e00273c097426e14814441404))

## [3.5.1](https://github.com/starknet-io/starknet.js/compare/v3.5.0...v3.5.1) (2022-03-11)

### Bug Fixes

- account detection ([b3b3ba7](https://github.com/starknet-io/starknet.js/commit/b3b3ba74dde72027ba7f0e1234fed34a604fdcec))
- contract interface ([696116d](https://github.com/starknet-io/starknet.js/commit/696116d383ba16c587e7ed708f7b47d02610b9d9))

# [3.5.0](https://github.com/starknet-io/starknet.js/compare/v3.4.0...v3.5.0) (2022-03-11)

### Bug Fixes

- contract test ([a9b4103](https://github.com/starknet-io/starknet.js/commit/a9b410356baa5c7305da9ba69229c0882f7ae026))
- **contract-factory:** move more towards ethers.js api ([4caa6ce](https://github.com/starknet-io/starknet.js/commit/4caa6cee282fe73bc6fb91bea59c620cc42d31a0))
- **contract:** structure change ([1ef9d2f](https://github.com/starknet-io/starknet.js/commit/1ef9d2fee0158c9894d5e049f59cc72bfaad2d55))
- **contract:** tests for new contract interface ([9273f54](https://github.com/starknet-io/starknet.js/commit/9273f542b087e2940e0d2e88ecbeec58062953bf))
- enable validateMethodAndArgs on call ([efa63d6](https://github.com/starknet-io/starknet.js/commit/efa63d6fc7ae77b28f694640833cec73111b175d))
- reverting validateMethodAndArgs changes ([d847fa8](https://github.com/starknet-io/starknet.js/commit/d847fa8e4db3563d67861873046f9cb87d0fff8e))

### Features

- **contractFactory:** lib expanded with contract factory ([2c9c3d1](https://github.com/starknet-io/starknet.js/commit/2c9c3d1b60961ddd698dc6b3175fff2f574f03bd))
- **contract:** implement `contract.deployed() ⇒ Promise<Contract>` ([91f4992](https://github.com/starknet-io/starknet.js/commit/91f4992a3f612a03ff5cde01d07a487ebb883f6d))
- **contract:** new contract interface ([01eeae8](https://github.com/starknet-io/starknet.js/commit/01eeae815619009de195a759891cad9d8ec992c7))
- **contract:** new contract methods signature ([cc87943](https://github.com/starknet-io/starknet.js/commit/cc8794362d2f20816aabf7b44596035d644a434d))
- default contract args ([2a3956d](https://github.com/starknet-io/starknet.js/commit/2a3956dab88f3e68a513916b1644fa0723c5235f))
- **provider:** preparation for the fee integration ([c1c231b](https://github.com/starknet-io/starknet.js/commit/c1c231b6ec803b01af280baf61d0afbc3f9be6bb))

# [3.4.0](https://github.com/starknet-io/starknet.js/compare/v3.3.0...v3.4.0) (2022-03-10)

### Features

- **account:** add legacy `addTransaction` method ([94f5d87](https://github.com/starknet-io/starknet.js/commit/94f5d874c8fb5f6c6586d537b75b92f493a32676))

# [3.3.0](https://github.com/starknet-io/starknet.js/compare/v3.2.0...v3.3.0) (2022-03-08)

### Features

- **provider:** add back legacy `invokeFunction` ([dbd00ff](https://github.com/starknet-io/starknet.js/commit/dbd00ff822456f05df5ba1967d5cd0040b012fc0))

# [3.2.0](https://github.com/starknet-io/starknet.js/compare/v3.1.0...v3.2.0) (2022-03-04)

### Features

- **account:** initial multicall support ([e2e3d61](https://github.com/starknet-io/starknet.js/commit/e2e3d61dcc5377c2a6603f4740d4420be7a719e1))
- **signer:** always return string signatures ([0e9dd6c](https://github.com/starknet-io/starknet.js/commit/0e9dd6c1c35aac6ad3eb3cc2ebb6212e0f5f809a))

# [3.1.0](https://github.com/starknet-io/starknet.js/compare/v3.0.0...v3.1.0) (2022-02-22)

### Bug Fixes

- **test:** adding tests for type transferormation ([60d5eb6](https://github.com/starknet-io/starknet.js/commit/60d5eb614721543be7fbaa842e8872a70564ebb2))
- **tests:** adding multicall contract ([138b29d](https://github.com/starknet-io/starknet.js/commit/138b29d60cbc1eae6fa8f6f7dbf232bc11975e9a))

### Features

- **contract:** adding jsDocs to the contract class ([d9ec6d3](https://github.com/starknet-io/starknet.js/commit/d9ec6d3ea3cc0dbf3538fb2fe7b5e1d8a8831490))
- **contract:** adding parse request data on call and invoke ([e6d46dc](https://github.com/starknet-io/starknet.js/commit/e6d46dc39f8d7da6ed1bef2c5074377402810eb9))
- **contract:** parsing response from the contract call ([3f7425f](https://github.com/starknet-io/starknet.js/commit/3f7425ff0ac29dda2a7c9373856a4aa20002af9b))

# [3.0.0](https://github.com/starknet-io/starknet.js/compare/v2.9.0...v3.0.0) (2022-02-10)

### Bug Fixes

- **account:** dont allow additional signatures in execute ([ac02d46](https://github.com/starknet-io/starknet.js/commit/ac02d46c5759904886f56a7b9e7e2686dbf52d4c))
- comments ([f261120](https://github.com/starknet-io/starknet.js/commit/f261120e1971710cde8f95bd17a5869860db8160))
- review comments ([ee93bd6](https://github.com/starknet-io/starknet.js/commit/ee93bd6e51eabcf3507a77d21c5bdc6fe93d5d1c))
- **test:** remove only for getTransactionReceipt test ([eb11d3b](https://github.com/starknet-io/starknet.js/commit/eb11d3b60f434f81390f4d13c0462ad8c7ed7321))
- **types:** change type of `block_number` from `number` to `BlockNumber` in TransactionReceipt ([7a48ff8](https://github.com/starknet-io/starknet.js/commit/7a48ff8e15a93a778fec62fdff10f92b1a073dec))
- **types:** update TransactionReceipt type ([9f9f6a2](https://github.com/starknet-io/starknet.js/commit/9f9f6a2f4cf3b8bfb438edda06ec38bd1471c03d))

### Features

- **account:** introduce execute method ([0be78c6](https://github.com/starknet-io/starknet.js/commit/0be78c67a40d0b457c571a57a8b49008f5e423de))
- **contract:** add an option to pass block identifier ([e34dd86](https://github.com/starknet-io/starknet.js/commit/e34dd86c07495b7b8c38ee410838e15226a7b8d6))
- new signer and provider interface ([4b2a71c](https://github.com/starknet-io/starknet.js/commit/4b2a71c578e363b11abb1c3adb74472bbb9f73fe))
- **provider:** add getTransactionReceipt() ([4267a5f](https://github.com/starknet-io/starknet.js/commit/4267a5f5cec77bb4b09b2e8b4979ec0ee611d416))
- split account and signer ([ca4ad9d](https://github.com/starknet-io/starknet.js/commit/ca4ad9d62aee8b0637096eb3059e96dd4407f663))
- update readme ([ed021dc](https://github.com/starknet-io/starknet.js/commit/ed021dc25a394affec8ea92ed79eed4c68a040d8))

### BREAKING CHANGES

- new provider and signer interfaces

# [2.9.0](https://github.com/starknet-io/starknet.js/compare/v2.8.0...v2.9.0) (2022-02-04)

### Bug Fixes

- introduce block identifier type ([75599a9](https://github.com/starknet-io/starknet.js/commit/75599a99bbcb5723cfc8575b5fbf994a0bbf5b67))

### Features

- **utils:** add validateAndParseAddress function ([c067fc4](https://github.com/starknet-io/starknet.js/commit/c067fc443e4dc9c22b78ed6c093978a2f37debde))

# [2.8.0](https://github.com/starknet-io/starknet.js/compare/v2.7.2...v2.8.0) (2022-02-02)

### Features

- add tests ([e495d48](https://github.com/starknet-io/starknet.js/commit/e495d4899141a79fe310d4fe76f70df03b1551ca))
- implement verifyMessage and verifyMessageHash ([bc9c4e9](https://github.com/starknet-io/starknet.js/commit/bc9c4e9574cc453af35705eb4488602ea33cc2cb))

## [2.7.2](https://github.com/starknet-io/starknet.js/compare/v2.7.1...v2.7.2) (2022-01-20)

### Bug Fixes

- **CONTRIBUTING:** wrong link ([2622a6c](https://github.com/starknet-io/starknet.js/commit/2622a6c984259a6928e9ab02892b8de60b8c749e))

## [2.7.1](https://github.com/starknet-io/starknet.js/compare/v2.7.0...v2.7.1) (2022-01-04)

### Bug Fixes

- **types:** add block_number property to GetBlockResponse interface ([696cf5a](https://github.com/starknet-io/starknet.js/commit/696cf5ae565bd16365045cc1f20e9fa55184d054))

# [2.7.0](https://github.com/starknet-io/starknet.js/compare/v2.6.0...v2.7.0) (2022-01-03)

### Bug Fixes

- add response to the waitForTx error ([e25bdfd](https://github.com/starknet-io/starknet.js/commit/e25bdfd428fd36e105ed272ea39462845bae5805))

### Features

- **blockHash:** add blockHash and fix test cases ([4e107eb](https://github.com/starknet-io/starknet.js/commit/4e107eb7e97a9b8d2efd74b2074a7d82365c932e))

# [2.6.0](https://github.com/starknet-io/starknet.js/compare/v2.5.0...v2.6.0) (2021-12-29)

### Bug Fixes

- correct network name ([66e14c9](https://github.com/starknet-io/starknet.js/commit/66e14c926f015a2dfbd50d3e54ba4e008fb43aa8))
- network name ([965f215](https://github.com/starknet-io/starknet.js/commit/965f21580ef68bf84c105e93bfb3b98f75b31f93))

### Features

- introduce blockNumber ([657dac1](https://github.com/starknet-io/starknet.js/commit/657dac1d77e840a7fc663d3a180515443a7e834f))

# [2.5.0](https://github.com/starknet-io/starknet.js/compare/v2.4.0...v2.5.0) (2021-12-13)

### Bug Fixes

- add jsdoc comment ([4cd969f](https://github.com/starknet-io/starknet.js/commit/4cd969f82eb4a5d8c08feb59c42fb3e7195af50e))
- remove eip712 reference ([039a360](https://github.com/starknet-io/starknet.js/commit/039a360873f9a1cdedc7a498b6e1732183957143))
- remove unused types ([e528f7d](https://github.com/starknet-io/starknet.js/commit/e528f7d75f4560d2affe3ca99426e01fbee6dfb5))
- review ([a3813c9](https://github.com/starknet-io/starknet.js/commit/a3813c9931c178d58c2521b926fb3fdff6944635))

### Features

- add `getKeyPairFromPublicKey` method ([66d543d](https://github.com/starknet-io/starknet.js/commit/66d543dca1bb302654f0f1588a27f7794bfa49be))
- add tests ([b414a83](https://github.com/starknet-io/starknet.js/commit/b414a839a1fdd56084a58d6efb4747e8f5455628))
- allow multi sig ([fc1e086](https://github.com/starknet-io/starknet.js/commit/fc1e0866154d2bf29f26374639a34fec438bae5e))
- support eip712 for starknet ([d597082](https://github.com/starknet-io/starknet.js/commit/d59708211fc497d801699a7168dad1a5cc9648fd))

# [2.4.0](https://github.com/starknet-io/starknet.js/compare/v2.3.1...v2.4.0) (2021-12-09)

### Features

- allow custom nonce ([17666de](https://github.com/starknet-io/starknet.js/commit/17666de94db6875bbf8e88555773b8862a4a32cf))

## [2.3.1](https://github.com/starknet-io/starknet.js/compare/v2.3.0...v2.3.1) (2021-12-01)

### Bug Fixes

- allow structs in calldata ([fd2bdc0](https://github.com/starknet-io/starknet.js/commit/fd2bdc0a1756544e4162fa5baaa7d3aec6f97bee))
- struct compiling ([84617ae](https://github.com/starknet-io/starknet.js/commit/84617aefe1218f421ca446b2a3c9959252d326e6))
- struct data ([313dff5](https://github.com/starknet-io/starknet.js/commit/313dff57f54050747c65b32b3378762c349d9c8c))
- uint256 type ([2e05902](https://github.com/starknet-io/starknet.js/commit/2e05902268f76bda2ae9b4e75782fa78876c2f00))

# [2.3.0](https://github.com/starknet-io/starknet.js/compare/v2.2.0...v2.3.0) (2021-12-01)

### Features

- add compileStructToCalldata ([e5bdb18](https://github.com/starknet-io/starknet.js/commit/e5bdb1890e0bc53b03d4b145069cf7fbc639e830))
- **utils:** support shortstring and uint256 ([f7ff057](https://github.com/starknet-io/starknet.js/commit/f7ff05753d9bc39b31bdd4e7f893ee04cab77823))

# [2.2.0](https://github.com/starknet-io/starknet.js/compare/v2.1.0...v2.2.0) (2021-11-30)

### Bug Fixes

- bump version ([02c8d07](https://github.com/starknet-io/starknet.js/commit/02c8d0772e42c81e35a3a841169eb25cde68716e))
- correctly parse structs in Starknet return types ([5a4a318](https://github.com/starknet-io/starknet.js/commit/5a4a318dad4c78fe84540ad92063fc1879317ac1))
- make Typescript compiler happy with constant types ([aedd895](https://github.com/starknet-io/starknet.js/commit/aedd895a62e6018dd1d7330b004d54360007967f))
- use urljoin ([4f1a040](https://github.com/starknet-io/starknet.js/commit/4f1a04090f26f8e8565c516921d5d3332b6a4649))

### Features

- bump version ([fd22f41](https://github.com/starknet-io/starknet.js/commit/fd22f41e39ec1c7f71c32019309f82ad0f4d66a9))

## [2.1.1](https://github.com/starknet-io/starknet.js/compare/v2.1.0...v2.1.1) (2021-11-30)

### Bug Fixes

- bump version ([02c8d07](https://github.com/starknet-io/starknet.js/commit/02c8d0772e42c81e35a3a841169eb25cde68716e))
- correctly parse structs in Starknet return types ([5a4a318](https://github.com/starknet-io/starknet.js/commit/5a4a318dad4c78fe84540ad92063fc1879317ac1))
- make Typescript compiler happy with constant types ([aedd895](https://github.com/starknet-io/starknet.js/commit/aedd895a62e6018dd1d7330b004d54360007967f))
- use urljoin ([4f1a040](https://github.com/starknet-io/starknet.js/commit/4f1a04090f26f8e8565c516921d5d3332b6a4649))

## [2.1.1](https://github.com/starknet-io/starknet.js/compare/v2.1.0...v2.1.1) (2021-11-30)

### Bug Fixes

- correctly parse structs in Starknet return types ([5a4a318](https://github.com/starknet-io/starknet.js/commit/5a4a318dad4c78fe84540ad92063fc1879317ac1))
- make Typescript compiler happy with constant types ([aedd895](https://github.com/starknet-io/starknet.js/commit/aedd895a62e6018dd1d7330b004d54360007967f))
- use urljoin ([4f1a040](https://github.com/starknet-io/starknet.js/commit/4f1a04090f26f8e8565c516921d5d3332b6a4649))

# [2.1.0](https://github.com/starknet-io/starknet.js/compare/v2.0.1...v2.1.0) (2021-11-30)

### Bug Fixes

- deps ([020ba39](https://github.com/starknet-io/starknet.js/commit/020ba3948f03e41fc96c7c002b613250d73fbda6))
- transaction status pending ([198d82b](https://github.com/starknet-io/starknet.js/commit/198d82b30dd8c0c978cfdd2d56cb5a7e5131cb6a))

### Features

- support mainnet ([de07149](https://github.com/starknet-io/starknet.js/commit/de07149ad6521edc9f79e2b0e9c82bf40f32fe02))

## [2.0.2](https://github.com/starknet-io/starknet.js/compare/v2.0.1...v2.0.2) (2021-11-22)

### Bug Fixes

- correctly parse structs in Starknet return types ([5a4a318](https://github.com/starknet-io/starknet.js/commit/5a4a318dad4c78fe84540ad92063fc1879317ac1))
- make Typescript compiler happy with constant types ([aedd895](https://github.com/starknet-io/starknet.js/commit/aedd895a62e6018dd1d7330b004d54360007967f))

## [2.0.1](https://github.com/starknet-io/starknet.js/compare/v2.0.0...v2.0.1) (2021-11-18)

### Bug Fixes

- msgHash length fix in signature verify function ([589b126](https://github.com/starknet-io/starknet.js/commit/589b126b2b87bf7d0b2730f53a40ee2d9ef9aca0))

# [2.0.0](https://github.com/starknet-io/starknet.js/compare/v1.7.0...v2.0.0) (2021-11-18)

### Features

- alpha 4 ([f12db5a](https://github.com/starknet-io/starknet.js/commit/f12db5a9d3d00902792a292e5258263edb7ac7a2))

### BREAKING CHANGES

- implements alpha 4

# [1.7.0](https://github.com/starknet-io/starknet.js/compare/v1.6.0...v1.7.0) (2021-11-17)

### Features

- add computeHashOnElements ([ec6d3d3](https://github.com/starknet-io/starknet.js/commit/ec6d3d35abd0e4aecea820d6702adf174e5e37e7))

# [1.6.0](https://github.com/starknet-io/starknet.js/compare/v1.5.4...v1.6.0) (2021-11-09)

### Bug Fixes

- review changes ([375043b](https://github.com/starknet-io/starknet.js/commit/375043bf6908b2475ca80e9ce73d479eb21b577c))

### Features

- add invokeFunction ([7e04b5e](https://github.com/starknet-io/starknet.js/commit/7e04b5ec383fa6d466e9e06d9fa02e2d0c36b020))
- # add signer and provider v1 ([909fdc0](https://github.com/starknet-io/starknet.js/commit/909fdc0b2b211755b9124b62f97476d89b655de1))

## [1.5.5](https://github.com/starknet-io/starknet.js/compare/v1.5.4...v1.5.5) (2021-11-13)

### Bug Fixes

- msgHash length fix in signature verify function ([589b126](https://github.com/starknet-io/starknet.js/commit/589b126b2b87bf7d0b2730f53a40ee2d9ef9aca0))

## [1.5.4](https://github.com/starknet-io/starknet.js/compare/v1.5.3...v1.5.4) (2021-11-05)

### Bug Fixes

- **type-naming:** more expressive types ([5277b12](https://github.com/starknet-io/starknet.js/commit/5277b125713695d975c44ae3edcf0f4e3b90dc8d))

## [1.5.3](https://github.com/starknet-io/starknet.js/compare/v1.5.2...v1.5.3) (2021-11-03)

### Bug Fixes

- more types ([e816a3b](https://github.com/starknet-io/starknet.js/commit/e816a3b7160dd775dd4bf0b6f133cd3f34e92ff8))

## [1.5.2](https://github.com/starknet-io/starknet.js/compare/v1.5.1...v1.5.2) (2021-11-03)

### Bug Fixes

- export needed types ([c51fe40](https://github.com/starknet-io/starknet.js/commit/c51fe40d11e7459bce5adac6fe6e330fd73d264b))
- package-lock release ([a507598](https://github.com/starknet-io/starknet.js/commit/a5075989ed789ba6fbca3ac304e306a1c8fc3d83))

## [1.5.1](https://github.com/starknet-io/starknet.js/compare/v1.5.0...v1.5.1) (2021-11-02)

### Bug Fixes

- protect bigints in axios payloads ([5db78ea](https://github.com/starknet-io/starknet.js/commit/5db78ea87a0e6357a764cee385d16c63b03e8651))

# [1.5.0](https://github.com/starknet-io/starknet.js/compare/v1.4.0...v1.5.0) (2021-10-30)

### Bug Fixes

- gitignore coverage ([36ecd04](https://github.com/starknet-io/starknet.js/commit/36ecd04ad607bddfa97cfc1046fe4844c91d9df9))
- remove console logs ([2269fae](https://github.com/starknet-io/starknet.js/commit/2269fae4d6f66729a142eb1aac3f48df0f273238))
- remove console.logs ([6032adb](https://github.com/starknet-io/starknet.js/commit/6032adb6262832388ec7b723b987b41f32eb55a1))
- skip walletAddress check for now ([8976091](https://github.com/starknet-io/starknet.js/commit/8976091908c2b9b511d5575ffa19fb314ae216ae))
- types ([fe484ab](https://github.com/starknet-io/starknet.js/commit/fe484abf1d5810c601854e0e1764efba9bfdadda))
- typo ([de0f5cb](https://github.com/starknet-io/starknet.js/commit/de0f5cb00b919a66f2b06d56402526150050c89e))

### Features

- update to alpha3 ([1cf4616](https://github.com/starknet-io/starknet.js/commit/1cf4616335e36c64679fafc36719d9ed8bacda20))

# [1.4.0](https://github.com/starknet-io/starknet.js/compare/v1.3.0...v1.4.0) (2021-10-29)

### Bug Fixes

- cleanup ([82aa438](https://github.com/starknet-io/starknet.js/commit/82aa438ea08f1d3577ee23ea083f58caf42cbdba))
- keep tests files consistent ([e343b55](https://github.com/starknet-io/starknet.js/commit/e343b551fb422a0d337f905eca981dbabf1ae097))
- push renamed snapshot ([643cd40](https://github.com/starknet-io/starknet.js/commit/643cd40a0f0b996424517d71cdf6c5d70857a7c3))
- remove enc-utils to remove buffer dep ([e08e4b5](https://github.com/starknet-io/starknet.js/commit/e08e4b53bfbdece3f824fedf96101405219da4b5))
- rename tests ([b4d15a7](https://github.com/starknet-io/starknet.js/commit/b4d15a7e32abf5eb90f1efbf9e1773b42574be49))
- update argent wallet implementation ([63cc278](https://github.com/starknet-io/starknet.js/commit/63cc2780eb44347d42ccf50dc917633eee975c5b))
- update snapshots after contract upgrade ([2a1dcde](https://github.com/starknet-io/starknet.js/commit/2a1dcde6bcaff09a45e091d194840bd66a568c67))
- use function consistently ([67617d7](https://github.com/starknet-io/starknet.js/commit/67617d73bb414b950ad8d2e347ade6a49d6fc595))

### Features

- wip ([42a8ab1](https://github.com/starknet-io/starknet.js/commit/42a8ab1b0f998d88d8fc7349b33d5287c017d4b5))

# [1.3.0](https://github.com/starknet-io/starknet.js/compare/v1.2.0...v1.3.0) (2021-10-28)

### Features

- allow optional blockId ([fbd09ba](https://github.com/starknet-io/starknet.js/commit/fbd09ba8458caf9a5c0ac0b84a9955c413524292))

# [1.2.0](https://github.com/starknet-io/starknet.js/compare/v1.1.1...v1.2.0) (2021-10-27)

### Bug Fixes

- commitlint for release ([e8ad972](https://github.com/starknet-io/starknet.js/commit/e8ad9721a9cf86365bf6e44d314c5f06a5589ff0))
- **docs:** new docs page ([2e46cff](https://github.com/starknet-io/starknet.js/commit/2e46cffff59c8f4db3967896258d737a4cc1bcf8))
- remove useless comment ([ebf07b4](https://github.com/starknet-io/starknet.js/commit/ebf07b46b6745ffa224caf33a66fc5958745564b))

### Features

- implement needed helper methods ([46f7173](https://github.com/starknet-io/starknet.js/commit/46f7173f72a213bace2f7dc021172548f5ae8295))
- introduce contract class ([db322fd](https://github.com/starknet-io/starknet.js/commit/db322fda5a9828a9a4577fd2d712217622717e14))
- type and use callContract ([10c7fc4](https://github.com/starknet-io/starknet.js/commit/10c7fc4a46f94dc51cecee66e36f1979019fe994)), closes [#6](https://github.com/starknet-io/starknet.js/issues/6)

## [1.1.1](https://github.com/starknet-io/starknet.js/compare/v1.1.0...v1.1.1) (2021-10-24)

### Bug Fixes

- **.gitignore:** remove docs from gitignore ([a4c19ad](https://github.com/starknet-io/starknet.js/commit/a4c19ad9f9f2c30fc6c7a931645a19610ee15b5d))
- **gh-action:** add token in actions/checkout ([730f605](https://github.com/starknet-io/starknet.js/commit/730f605a96d87bbe6606aff958d88151ad8b98db))
- **gh-action:** add token to bypass protected branch ([8b026ab](https://github.com/starknet-io/starknet.js/commit/8b026abefdfb7ecdad92ce975dc777761d0bd9ce))
- **gh-action:** fix action syntax ([f88a476](https://github.com/starknet-io/starknet.js/commit/f88a47652732d0d1cb5b47f8531fefe7ba5b646b))
- **gh-action:** fix commit message to lowercase ([82177e6](https://github.com/starknet-io/starknet.js/commit/82177e6dc32f02e836a19f2c7f5585eefd1fec9e))
- **gh-action:** fix untracked files ([aba492e](https://github.com/starknet-io/starknet.js/commit/aba492efbaae51a8d9f5f52474c75f0d346a91a2))
- **gh-action:** force add readme ([3175e08](https://github.com/starknet-io/starknet.js/commit/3175e08ca2f30f23ecb763eee9a2f2353061ecca))
- **typedoc:** github action to push typedoc to github ([4573d19](https://github.com/starknet-io/starknet.js/commit/4573d19fe55e1245f66ed5c501154151592e8951))

# [1.1.0](https://github.com/starknet-io/starknet.js/compare/v1.0.0...v1.1.0) (2021-10-24)

### Bug Fixes

- btoa isomorphic ([f3eb0f5](https://github.com/starknet-io/starknet.js/commit/f3eb0f5aa01647c0994935b72b723bd13f940faa))
- json formatting and deploy ([0fe7e3d](https://github.com/starknet-io/starknet.js/commit/0fe7e3d50c4ebcbc64f30611b1888c966452c910))
- pr review ([457a852](https://github.com/starknet-io/starknet.js/commit/457a85266de6cd548a15af1dc866671f3664f418))
- test ([c307390](https://github.com/starknet-io/starknet.js/commit/c3073902e838bd9e07f783c13e546e298356e16b))
- test browser and node ([4c23de0](https://github.com/starknet-io/starknet.js/commit/4c23de0ef510724fa33e1c3cbb00bc638acb54c2))
- test structure ([b686f04](https://github.com/starknet-io/starknet.js/commit/b686f04dc5f74e6042cbd30ec56eeb4ef6b9c45b))
- tests regarding compressing ([21a83f2](https://github.com/starknet-io/starknet.js/commit/21a83f25bbb88875854ad3d0cb5f7c7fa1ebacd4))
- update package-lock ([cd373cb](https://github.com/starknet-io/starknet.js/commit/cd373cbd8df98f3d973e4076f15681927325c9e2))

### Features

- add deploy ([509fa84](https://github.com/starknet-io/starknet.js/commit/509fa84532ab5a1a46863edbe63d7538ddacfbc8))

# 1.0.0 (2021-10-21)

### Bug Fixes

- badge ([6a0a989](https://github.com/starknet-io/starknet.js/commit/6a0a9893c1298a815aec21abda20f78ac697a4bf))
- ci git push ([571b1d5](https://github.com/starknet-io/starknet.js/commit/571b1d5092ee18b9ed0828f1cbc834f4aece3363))
- ci job ([31d1b8d](https://github.com/starknet-io/starknet.js/commit/31d1b8d7717145a5dd7beef606a9c253d1ceb62d))
- naming pipeline ([f16427f](https://github.com/starknet-io/starknet.js/commit/f16427f8a33b46a51d37ad7fbe8a3f34edcf344e))
- pipeline ([f9186de](https://github.com/starknet-io/starknet.js/commit/f9186de8f72d80d212317d8c823b981b7df31920))
- pipeline ([c7d56d0](https://github.com/starknet-io/starknet.js/commit/c7d56d06644108d71e1bea3e73554b5c4178b82e))
- pipeline ([d46d175](https://github.com/starknet-io/starknet.js/commit/d46d175aa9d51f283e2dd9aeeac41ab50fa3ac2e))
- split pipelines ([e862cfb](https://github.com/starknet-io/starknet.js/commit/e862cfbf13d9e6d3509b609a31f8ebad1a31569a))
- tests ([6a242ce](https://github.com/starknet-io/starknet.js/commit/6a242cedc0a261c55a433ee5a82f0acf28cfcdc2))

### Features

- change src code ([5fe4630](https://github.com/starknet-io/starknet.js/commit/5fe4630a53a75c0387854b1cd53e5aa2c6b259eb))
- project tooling ([eee89aa](https://github.com/starknet-io/starknet.js/commit/eee89aa92cab7b7df3a9a7ae439c4df7d1e893b0))
- start adding types ([3760687](https://github.com/starknet-io/starknet.js/commit/3760687a0c72da7ac8c0fd2427d471fe4bdf7202))
