use array::ArrayTrait;

#[starknet::interface]
trait ITestContract<TContractState> {
    fn increase_counter(ref self: TContractState, amount: u128);
    fn decrease_counter(ref self: TContractState, amount: u128);
    fn get_counter(self: @TContractState) -> u128;
    fn test1(self: @TContractState, val1: u16) -> Order;
    fn test2(self: @TContractState, val1: u16) -> MyEnum;
    fn test3(self: @TContractState, val1: u8) -> Option<u8>;
    fn test4(self: @TContractState, val1: u16) -> Option<Order>;
    fn test5(self: @TContractState, inp: Option<Order>) -> u16;
    fn test6(self: @TContractState, val1: u16) -> Result<u16, u16>;
    fn test7(self: @TContractState, val1: u16) -> Result<Order, u16>;
    fn test8(self: @TContractState, inp: Result<Order, u16>) -> u16;
}


//simple struct
#[derive(Copy, Drop, Serde)]
struct Order {
    p1: felt252,
    p2: u16,
}

#[derive(Copy, Drop, Serde)]
enum MyEnum {
    Response: Order,
    Warning: felt252,
    Error: u16,
}

#[starknet::contract]
mod MyTestContract {
    use starknet::ContractAddress;
    use starknet::contract_address_const;
    use super::{Order, MyEnum};

    #[storage]
    struct Storage {
        counter: u128, 
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        CounterIncreased: CounterIncreased,
        CounterDecreased: CounterDecreased
    }

    #[derive(Drop, starknet::Event)]
    struct CounterIncreased {
        #[key]
        from: ContractAddress,
        amount: u128
    }

    #[derive(Drop, starknet::Event)]
    struct CounterDecreased {
        amount: u128
    }

    #[l1_handler]
    fn increase_bal(ref self: ContractState, from_address: felt252, amount: u128) {
        let current = self.counter.read();
        self.counter.write(current + amount);
    }


    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[external(v0)]
    impl CounterContract of super::ITestContract<ContractState> {
        fn get_counter(self: @ContractState) -> u128 {
            self.counter.read()
        }

        fn increase_counter(ref self: ContractState, amount: u128) {
            let current = self.counter.read();
            self.counter.write(current + amount);
            self
                .emit(
                    CounterIncreased {
                        from: contract_address_const::<0x6c8fe36d7454901424063b5c1b949d7e347ce3872d2487b30b76f3a4fd7c219>(),
                        amount: amount
                    }
                );
        }

        fn decrease_counter(ref self: ContractState, amount: u128) {
            let current = self.counter.read();
            self.counter.write(current - amount);
            self.emit(CounterDecreased { amount });
        }


        fn test1(self: @ContractState, val1: u16) -> Order {
            Order { p1: 10, p2: val1 }
        }
        fn test2(self: @ContractState, val1: u16) -> MyEnum {
            if val1 < 100 {
                return MyEnum::Error(3);
            }
            if val1 == 100 {
                return MyEnum::Warning('attention:100');
            }
            MyEnum::Response(Order { p1: 1, p2: val1 })
        }
        // return Option<litteral>
        fn test3(self: @ContractState, val1: u8) -> Option<u8> {
            if val1 < 100 {
                return Option::None(());
            }
            Option::Some(val1 + 1)
        }
        // return Option<Order>
        fn test4(self: @ContractState, val1: u16) -> Option<Order> {
            if val1 < 100 {
                return Option::None(());
            }
            Option::Some(Order { p1: 18, p2: val1 })
        }
        // use as input Option<Order>
        fn test5(self: @ContractState, inp: Option<Order>) -> u16 {
            match inp {
                Option::Some(x) => {
                    return x.p2;
                },
                Option::None(()) => {
                    return 17;
                }
            }
        }
        // return Result<litteral>
        fn test6(self: @ContractState, val1: u16) -> Result<u16, u16> {
            if val1 < 100 {
                return Result::Err(14);
            }
            Result::Ok(val1)
        }
        // return Result<Order>
        fn test7(self: @ContractState, val1: u16) -> Result<Order, u16> {
            if val1 < 100 {
                return Result::Err(14);
            }
            Result::Ok(Order { p2: val1, p1: 8 })
        }
        // use as input Result<Order>
        fn test8(self: @ContractState, inp: Result<Order, u16>) -> u16 {
            match inp {
                Result::Ok(x) => {
                    return x.p2;
                },
                Result::Err(y) => {
                    return y;
                }
            }
        }
    }
}
