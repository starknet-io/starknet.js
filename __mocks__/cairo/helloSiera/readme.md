# 1. Compile to starknet siera json

`cargo run --bin starknet-compile -- /Users/eedev/Work/ShardLabs/cairo1.0-contract-demo/hello/hello.cairo /Users/eedev/Work/ShardLabs/cairo1.0-contract-demo/hello/hello.json`

# 2. Compile to casm

`cargo run --bin starknet-compile -- /Users/eedev/Work/ShardLabs/cairo1.0-contract-demo/hello/hello.cairo /Users/eedev/Work/ShardLabs/cairo1.0-contract-demo/hello/hello.json --allowed-libfuncs-list-name experimental_v0.1.0`

# 3. Get Compiled Class Hash

`python3 cch.py /Users/eedev/Work/ShardLabs/cairo1.0-contract-demo/hello/hello.casm`
0x5308ae7d698bdb9cb9ee6e9c7dab4d3082a3db40933634645f179d9cad06446
