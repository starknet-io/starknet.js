# Type Alias: SpecVersion

> **SpecVersion** = `` `${number}.${number}` `` \| `` `${number}.${number}.${number}` `` \| `` `${number}.${number}.${number}-${string}` ``

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:22

A Starknet JSON-RPC spec version, following semantic versioning.

## Pattern

^[0-9]+\\.[0-9]+(\\.[0-9]+(-[0-9A-Za-z.-]+)?)?$

## Example

```ts
'0.10' | '0.10.4' | '0.10.4-rc.0';
```
