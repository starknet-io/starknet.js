/* Default test config based on run `starknet-devnet --seed 0` */
export const GS_DEFAULT_TEST_PROVIDER_URL = 'http://127.0.0.1:5050/';

export const LOCAL_DEVNET_NOT_RUNNING_MESSAGE = `
Local devnet is not running. In order to properly run it you need to do the following: \n
  - Go to the: https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags
  - Find the latest tag and copy the "docker pull" command
  - Run Docker on your machine
  - Run the command: "docker pull shardlabs/starknet-devnet-rs:latest"
`;
