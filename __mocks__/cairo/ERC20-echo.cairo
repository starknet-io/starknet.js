// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.6.0 (token/erc20/presets/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from openzeppelin.token.erc20.library import ERC20

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    name: felt, symbol: felt, decimals: felt, initial_supply: Uint256, recipient: felt, signers_len: felt, signers: felt*, threshold: felt
) {
    ERC20.initializer(name, symbol, decimals);
    ERC20._mint(recipient, initial_supply);
    return ();
}

// Define a storage variable.
@storage_var
func testStorage() -> (res: felt) {
}

//
// Getters
//

// Tuple
using Tuple1 = (min: felt, max: felt);

using Tuple2 = (a: Struct2, b: felt);

// Struct
struct Struct1 {
    discount_fix_bps: felt,  // fix discount in BPS
    discount_transfer_bps: felt,  // transfer % discount in BPS
}


// Nested Struct Shits
struct Struct2 {
    info: Struct1,
    data: felt,
    data2: Tuple1,
}

// k1
struct Struct32 {
    b: felt,
    c: (felt, felt, felt, felt),
}

struct Struct3 {
    a: felt,
    b: Struct32,
}

@view
func echo{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
f1: felt, u1: Uint256, s1: Struct1, s2: Struct2
) -> (f1: felt, u1: Uint256, s1: Struct1, s2: Struct2) {
    return (f1, u1, s1, s2);
}

@view
func echo2{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
f1_len:felt, f1: felt*, u1_len: felt, u1: Uint256*, s1_len: felt, s1: Struct1*
) -> (f1_len:felt, f1: felt*, u1_len: felt, u1: Uint256*, s1_len: felt, s1: Struct1*) {
    return (f1_len, f1, u1_len, u1, s1_len, s1);
}

struct StructY {
    y1: felt,
    y2: felt,
}

struct StructX {
    x1: felt,
    x2: StructY,
    x3: (tx1: (felt, felt) ,tx2: (tx21: (tx211:felt, tx212: felt), tx22: (felt, felt))),
}

using TupleX = (t1: felt, t2: StructX, t3: felt);

@view
func echo3{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
t1:felt, n1: felt, t2: felt, k1_len: felt, k1: Struct3*, k2: TupleX
) -> (t1:felt, n1: felt, t2: felt, k1_len: felt, k1: Struct3*, k2: TupleX) {
    return (t1, n1, t2, k1_len, k1, k2);
}

@view
func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
    return ERC20.name();
}

@view
func symbol{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (symbol: felt) {
    return ERC20.symbol();
}

@view
func totalSupply{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    totalSupply: Uint256
) {
    let (totalSupply: Uint256) = ERC20.total_supply();
    return (totalSupply=totalSupply);
}

@view
func decimals{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    decimals: felt
) {
    return ERC20.decimals();
}

@view
func balanceOf{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(account: felt) -> (
    balance: Uint256
) {
    return ERC20.balance_of(account);
}

@view
func allowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    owner: felt, spender: felt
) -> (remaining: Uint256) {
    return ERC20.allowance(owner, spender);
}

//
// Externals
//

@external
func iecho3{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
t1:felt, n1: felt, t2: felt, k1_len: felt, k1: Struct3*, k2: TupleX
) -> (t1:felt, n1: felt, t2: felt, k1_len: felt, k1: Struct3*, k2: TupleX) {
    let (res) = testStorage.read();
    testStorage.write(res + t1);
    return (t1, n1, t2, k1_len, k1, k2);
}

@external
func transfer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    recipient: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.transfer(recipient, amount);
}

@external
func transferFrom{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, recipient: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.transfer_from(sender, recipient, amount);
}

@external
func approve{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.approve(spender, amount);
}

@external
func increaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, added_value: Uint256
) -> (success: felt) {
    return ERC20.increase_allowance(spender, added_value);
}

@external
func decreaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, subtracted_value: Uint256
) -> (success: felt) {
    return ERC20.decrease_allowance(spender, subtracted_value);
}
