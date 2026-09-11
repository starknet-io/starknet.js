# Security Policy

## Supported versions

Security fixes are applied to the current major release line and to the active pre-release line only.

| Version            | Supported        | npm tag            |
| ------------------ | ---------------- | ------------------ |
| 10.x               | Yes              | `latest`, `next`   |
| 11.x (pre-release) | Yes              | `beta`             |
| 9.x and earlier    | No, end-of-life  |                    |

Versions 7.x, 8.x and 9.x reached end-of-life in September 2026 and no longer receive security fixes. If you are on an unsupported version, upgrade to the latest 10.x release. The [migration guide](https://starknetjs.com/docs/guides/migrate) covers the breaking changes between major versions.

## Reporting a vulnerability

Please do not open a public issue or pull request for a suspected vulnerability.

Report it privately through GitHub's private vulnerability reporting:
<https://github.com/starknet-io/starknet.js/security/advisories/new>

Where you can, include:

- the affected version(s) and the code path (file and function),
- a minimal reproduction or proof of concept,
- the impact you believe it has.

You will receive an acknowledgement within 3 business days and an initial assessment within 10 business days. We keep you updated in the advisory thread and agree a disclosure date with you.

## Disclosure process

1. The report is confirmed and assigned a severity.
2. A fix is developed, released to every supported line, and verified against the report.
3. The GitHub security advisory is published with credit to the reporter, a CVE is requested where warranted, and the fixed versions are named in the release notes.

We ask reporters to hold public disclosure until the advisory is published.

## Bug bounty

starknet.js is not currently in scope of the Starknet bug bounty program on Immunefi.
