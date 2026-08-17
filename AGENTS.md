# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Copilot, etc.) working in this
repository. Humans: see [CONTRIBUTING.md](./CONTRIBUTING.md) — this file is a
condensed, agent-oriented companion to it, not a replacement.

`starknet.js` is the JavaScript/TypeScript SDK for Starknet. It is a published npm
library (`starknet`), so the public API surface is a contract — treat breaking
changes deliberately (see _Conventions_).

## Setup & core commands

- **Node `>=22`** is required. Install with `npm install`.
- `npm run build` — full build via `tsup` (CJS + ESM + IIFE + `.d.ts`). Required
  before publishing-related tasks; not needed just to run unit tests.
- `npm run lint` — ESLint (airbnb + prettier), autofix on.
- `npm run ts:check` — type-check only (`tsc --noEmit`).
- `npm run format` — Prettier write.

## Verifying your changes (read this before running tests)

There are **two** kinds of tests, and the default command needs live infrastructure:

- **Unit tests — no infra needed. Use this loop.**

  ```bash
  npm run test:unit                              # all pure unit tests (~1400 tests, ~20s)
  npm run test:unit -- __tests__/utils/uint256.test.ts   # a single file
  ```

  This uses `jest.unit.config.ts`, which runs the pure suites under
  `__tests__/utils/` and **skips the devnet-connecting global setup**. Use it to
  verify changes to `src/utils/**` and other logic with unit coverage.

- **Integration tests — require a running Starknet devnet or RPC node.**
  `npm test`, `npm run test:coverage`, and `npm run test:watch` run the full suite
  via `jest.config.ts`, whose `globalSetup` **throws if it cannot reach a devnet**
  (`http://127.0.0.1:5050`) and no `TEST_ACCOUNT_*` env vars are set. The root-level
  `__tests__/*.test.ts` suites (account, contract, provider, paymaster, wallet…)
  exercise real RPC calls. To run them, start a devnet (Docker:
  `shardlabs/starknet-devnet-rs`) or point at a node via `TEST_RPC_URL` +
  `TEST_ACCOUNT_ADDRESS` + `TEST_ACCOUNT_PRIVATE_KEY` (see CONTRIBUTING.md).
  Two suites under `__tests__/utils/` (`ethSigner`, `batch`) also need a node and are
  excluded from `test:unit`.

If you cannot start a devnet, run `npm run test:unit` + `npm run lint` +
`npm run ts:check` and say so explicitly — do not claim the full suite passed.

## Architecture map (`src/`)

High-level classes are re-exported from `src/index.ts`; utils are exported as
namespaces (`hash`, `num`, `cairo`, `shortString`, …).

| Module       | What lives there                                                                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `account/`   | `Account` (+ `AccountInterface`) — signs and sends transactions, declares/deploys, fees.                                                                                                      |
| `contract/`  | `Contract` (+ `ContractInterface`) — typed wrapper to call/invoke a deployed contract via its ABI.                                                                                            |
| `provider/`  | `RpcProvider` (+ `ProviderInterface`) — read chain state; `RPCResponseParser` shapes responses.                                                                                               |
| `channel/`   | Transport layer: `RpcChannel` (JSON-RPC) and `WebSocketChannel` / `Subscription` (WS).                                                                                                        |
| `signer/`    | `Signer`, `EthSigner`, `LedgerSigner*` (+ `SignerInterface`) — message/transaction signing.                                                                                                   |
| `wallet/`    | `WalletAccount` / `WalletAccountV5` — browser wallet (get-starknet / wallet-standard) integration.                                                                                            |
| `paymaster/` | `PaymasterRpc` (+ `PaymasterInterface`) — gasless / sponsored transaction flows.                                                                                                              |
| `deployer/`  | `Deployer` (+ `DeployerInterface`) — UDC-based contract deployment helpers.                                                                                                                   |
| `plugins/`   | Plugin framework + implementations (`starknet-id`, `fast-execute`, `brother-id`).                                                                                                             |
| `service/`   | Shared service-layer types.                                                                                                                                                                   |
| `utils/`     | Pure helpers: `calldata` (encode/decode), `hash`, `cairoDataTypes`, `num`, `shortString`, `merkle`, `typedData`, `transaction`, `address`, `ec`, etc. **Most have unit tests** → `test:unit`. |
| `types/`     | Public TypeScript types, including RPC API types (`types/api`) and Starknet spec bindings.                                                                                                    |
| `global/`    | Global config, constants, and logger.                                                                                                                                                         |

Multiple RPC spec versions are supported simultaneously (e.g. `v0_8`, `v0_9`); the
pinned `starknet_specs` dev-dependencies define them. Be version-aware when touching
`channel/`, `provider/`, or `types/api`.

## Conventions

- **Conventional Commits**, enforced by commitlint (`feat(scope): subject`). Only
  `feat` and `fix` drive the changelog — use `chore`/`test`/`docs`/`refactor` for
  non-shipping changes. Subjects describe the change relative to the **target
  branch**, not your feature branch.
- **PR target branches** (see CONTRIBUTING.md for the full table):
  - `develop` → default target for fixes, features, docs (npm tag `next`).
  - `beta` → API-breaking / behavior-changing work; mark the breaking change in the
    commit (npm tag `beta`).
  - `main` / `maintenance/*` → maintainers only.
- **Do not** edit the version number or `CHANGELOG.md` — semantic-release owns both.
- **Do not** commit generated files (`dist/`, coverage). Update `package-lock.json`
  when you change dependencies.
- Update docs in `www/` and add tests for any behavior change (see CONTRIBUTING.md).
- [`skills/starknet-js/`](./skills/starknet-js/) is the published agent skill that
  teaches AI coding agents how to _use_ this library (installable via
  `npx skills add starknet-io/starknet.js`). If you change the public API surface
  (signatures, constructor options, calldata handling…), check that the skill files
  are not made stale, and update them in the same PR if they are.

## Gotchas

- `npm test` **reformats files** afterwards (`posttest` runs Prettier) — running it
  can leave unexpected diffs in your working tree.
- `pretest` runs `lint` + `ts:check` before tests, so `npm test` can fail on a lint
  or type error before a single test executes.
- A `pre-commit` husky hook runs lint-staged and `commit-msg` runs commitlint. A
  badly formatted commit message is **rejected at commit time** — get the format
  right up front.
- The default test suite hard-fails without a reachable devnet (see above). A bare
  `jest <path>` will also hit this — go through `npm run test:unit` for infra-free runs.
- `.claude/` is git-ignored, so per-user agent config there is local-only. This
  `AGENTS.md` is the shared, committed source of truth. Tools that only read a
  `CLAUDE.md` (e.g. Claude Code) can use a local, git-ignored `CLAUDE.md` that
  points here.
