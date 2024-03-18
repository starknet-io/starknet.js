//Cairo 2.3.1

#[starknet::interface]
trait ITestReject<TContractState> {
    fn test_fail(ref self: TContractState, p1: u8) ;
    fn get_counter(self: @TContractState) -> u8 ;
    fn init_count(ref self: TContractState, p1: u8);
}

#[starknet::contract]
mod MyTestReject {
    #[storage]
    struct Storage {
        counter: u8
    }

    #[external(v0)]
    impl TestReject of super::ITestReject<ContractState> {
        fn test_fail(ref self: ContractState, p1: u8) {
            assert(p1 == 100, 'Fatal');
            self.counter.write(p1);
        }

        fn get_counter(self: @ContractState) -> u8 {
            self.counter.read()
        }

        fn init_count(ref self: ContractState, p1: u8) {
            self.counter.write(p1);
        }

    }
}
