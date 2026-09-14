/* Default test config based on run `starknet-devnet --seed 0` */
export const GS_DEFAULT_TEST_PROVIDER_URL = 'http://127.0.0.1:5050/';

/**
 * devnet serves plain JSON-RPC and subscriptions on a dedicated `/ws` path.
 *
 * This is not a general rule and must not be turned into a derivation from the RPC url:
 * Pathfinder serves its socket on the same path as HTTP, differing only by scheme. Hence a
 * constant for devnet, and `TEST_WS_URL` taken as given for every other node.
 */
export const GS_DEFAULT_TEST_WS_URL = 'ws://127.0.0.1:5050/ws';

export const LOCAL_DEVNET_NOT_RUNNING_MESSAGE = `
Local devnet is not running. In order to properly run it you need to do the following: \n
  - Go to the: https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags
  - Find the latest tag and copy the "docker pull" command
  - Run Docker on your machine
  - Run the command: "docker pull shardlabs/starknet-devnet-rs:latest"
`;
