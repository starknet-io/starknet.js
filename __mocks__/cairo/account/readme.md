SW cairo repo Cairo 1 Account from tag alpha-6

# 1. Download cairo repo

Switch to target tag version alpha6
`cargo test`

# 1.1. Compile to Starknet Sierra json

`cargo run --bin starknet-compile -- hello.cairo hello.json`

# 1.2. Compile to Casm

`cargo run --bin starknet-sierra-compile -- hello.json hello.casm`
