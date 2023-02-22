# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn    # or npm i
```

## Local Development

```bash
yarn start    # or npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build    # or npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy    # or USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy    # or GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation location

Documentation for previous versions is located in [/www/versioned_docs](/www/versioned_docs) and normally does not need to be modified.
Documentation for the future official release of your work is located in [/www/docs](/www/docs) of your branch. There you have the API documentation in [/www/docs/API](/www/docs/API) and the guides in [/www/docs/guides](/www/docs/guides).
Official documentation is available to users at [www.starknetjs.com](https://www.starknetjs.com/). You can choose the documentation version you need in the top menu bar. NEXT version corresponds to the documentation of the last commit of the `develop` branch.

## Update documentation

Do not forget to include your methods documentation directly in your source code, in accordance with [JSDoc](https://jsdoc.app/) rules. Then you have to update manually the API documentation in `/www/docs/API` of your branch.
If you need to update some guides, modify the files in `/www/docs/guides` of your branch.
The administrators of the project will handle your PR:

### Without creation of a new realease of Starknet.js

Your modified files will just be merged in `/www/docs/` by the Pull Request. If it was merged in `develop`, it will be visible in the official documentation in NEXT.

### With creation of a new release of Starknet.js

Just before the release of a new version in the `main` branch, you need to perform the versioning of its documentation.
For example, if a new `v4.22 has to be created:

- Be sure that all the necessary commits/PR/merges are performed.
- Be sure that API directory is up to date.
- Launch the documentation versioning with:

```bash
cd /www
npm run docusaurus docs:version v4.22
```

- The official documentation (API + guides) of `v4.22` is created.
- Commit your work, and merge it in `develop`.
- perform the official release of `v4.22` in `main`.
- In the official documentation, the new version of documentation for `v4.22` is available, and NEXT version is temporarily identical.
