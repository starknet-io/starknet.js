# Type Alias: API_VERSION

> **API_VERSION** = `` `${number}.${number}` `` \| `` `${number}.${number}.${number}` ``

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:139

A wallet API version, following semantic versioning (no pre-release).
When used as a request parameter and not specified, the latest is assumed.

## Pattern

^[0-9]+\\.[0-9]+(\\.[0-9]+)?$

## Example

```ts
'0.8' | '0.10.4';
```
