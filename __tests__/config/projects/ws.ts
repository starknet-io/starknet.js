// Read by `testInstances.ts` to decide which transport this project's providers write to.
// Set through `setupFiles` rather than exported by the caller, so it applies inside the test
// environment only — `globalSetup` must stay on HTTP, see the guard in `testInstances.ts`.
process.env.TEST_TRANSPORT = 'ws';
