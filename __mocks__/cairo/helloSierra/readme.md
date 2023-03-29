# 1.

Download cairo repo
Switch to target tag version alpha6
`cargo test`

# 1.1. Compile to Starknet Sierra json

`cargo run --bin starknet-compile -- hello.cairo hello.json --add-pythonic-hints`

# 1.2. Compile to Casm

`cargo run --bin starknet-sierra-compile -- hello.json hello.casm --add-pythonic-hints`

# 2. Get Compiled Class Hash & Class Hash

pip install cairo-lang==0.11.0a2

`python3 cch.py hello.casm`
compiled class hash
0x5c82c98f2ab111bd50293ba64bb18cf49037374783ad2486c712709c4ba0d89
class hash
0x345df0a9b35ce05d03772ba7938acad66921c5c39c1a5af74aee72aa25c363e
