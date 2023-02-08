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
using Tuple1 = (min: felt, max: felt);

using Tuple2 = (a: Struct2, b: felt);

struct Struct1 {
    discount_fix_bps: felt,  // fix discount in BPS
    discount_transfer_bps: felt,  // transfer % discount in BPS
}

struct Struct2 {
    info: Struct1,
    data: felt,
    data2: Tuple1,
}

struct Struct32 {
    b: felt,
    c: (felt, felt, felt, felt),
}

struct Struct3 {
    a: felt,
    b: Struct32,
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

using TupleMix = (p1: StructY, p2: felt);
using TupleMixK = (p1: TupleMix, p2: felt);

using TupleMixU = (StructY, felt);
using TupleMixUK = (TupleMixU, felt);

@view
func echo{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
t1:felt, n1: felt, tl2_len: felt, tl2: felt*, k1_len: felt, k1: Struct3*, k2: TupleX, u1: Uint256, s1: Struct1, s2: Struct2, af1_len:felt, af1: felt*, au1_len: felt, au1: Uint256*, as1_len: felt, as1: Struct1*, atmk_len: felt, atmk: TupleMixK*, atmku_len: felt, atmku: TupleMixUK*
) -> (t1:felt, n1: felt, tl2_len: felt, tl2: felt*, k1_len: felt, k1: Struct3*, k2: TupleX, u1: Uint256, s1: Struct1, s2: Struct2, af1_len:felt, af1: felt*, au1_len: felt, au1: Uint256*, as1_len: felt, as1: Struct1*, atmk_len: felt, atmk: TupleMixK*, atmku_len: felt, atmku: TupleMixUK*) {
    return (t1, n1, tl2_len, tl2, k1_len, k1, k2, u1, s1, s2, af1_len, af1, au1_len, au1, as1_len, as1, atmk_len, atmk, atmku_len, atmku);
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
func iecho{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
t1:felt, n1: felt, tl2_len: felt, tl2: felt*, k1_len: felt, k1: Struct3*, k2: TupleX, u1: Uint256, s1: Struct1, s2: Struct2, af1_len:felt, af1: felt*, au1_len: felt, au1: Uint256*, as1_len: felt, as1: Struct1*, atmk_len: felt, atmk: TupleMixK*, atmku_len: felt, atmku: TupleMixUK*
) -> (t1:felt, n1: felt, tl2_len: felt, tl2: felt*, k1_len: felt, k1: Struct3*, k2: TupleX, u1: Uint256, s1: Struct1, s2: Struct2, af1_len:felt, af1: felt*, au1_len: felt, au1: Uint256*, as1_len: felt, as1: Struct1*, atmk_len: felt, atmk: TupleMixK*, atmku_len: felt, atmku: TupleMixUK*) {
    let (res) = testStorage.read();
    testStorage.write(res + t1);
    return (t1, n1, tl2_len, tl2, k1_len, k1, k2, u1, s1, s2, af1_len, af1, au1_len, au1, as1_len, as1, atmk_len, atmk, atmku_len, atmku);
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
