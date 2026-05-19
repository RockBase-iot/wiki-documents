# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## i18n Local Test

Docusaurus `start` mode serves one locale at a time. If default locale is `en`, visiting `/zh/...` in dev mode can show 404.

Use locale-specific dev commands:

```bash
npm run start:en
npm run start:zh
```

To validate both locales exactly like production, use:

```bash
npm run serve:all
```

Then test:
- `/`
- `/docs/products/nm-cyd-c5/`
- `/zh/`
- `/zh/docs/products/nm-cyd-c5/`

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

### GitHub Actions (Recommended)

This repository includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for automatic deployment.

1. In GitHub repository settings, open **Settings -> Pages**.
2. Set **Build and deployment** source to **GitHub Actions**.
3. Push to the `main` branch to trigger automatic build and deployment.

By default, CI builds for GitHub Pages project path:
- `DOCUSAURUS_URL=https://<owner>.github.io`
- `DOCUSAURUS_BASE_URL=/<repo>/`

If you use a custom domain (for example `https://wiki.rockbaseiot.com`), add repository variables in **Settings -> Secrets and variables -> Actions -> Variables**:
- `DOCUSAURUS_URL=https://wiki.rockbaseiot.com`
- `DOCUSAURUS_BASE_URL=/`

### Manual Deployment (Docusaurus CLI)

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
