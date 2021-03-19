[![Get data from GitHub GraphQL API](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/Get%20data%20from%20GitHub%20GraphQL%20API/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Get+data+from+GitHub+GraphQL+API%22) [![Deploy to GitHub Pages](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/Deploy%20website%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+website+to+GitHub+Pages%22) [![CodeQL analysis](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/CodeQL%20analysis/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22CodeQL+analysis%22)

Wizard to generate JSON-LD metadata

The website is automatically deployed by a [GitHub Actions worklow](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22) to GitHub Pages at https://maastrichtu-ids.github.io/fair-metadata-wizard

## Run in development :construction:

Requirements:  [npm](https://www.npmjs.com/get-npm) and [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) installed.

Clone the repository:

```bash
git clone https://github.com/MaastrichtU-IDS/fair-metadata-wizard 
cd fair-metadata-wizard
```

Install dependencies :inbox_tray:

```bash
yarn
```

Web app will run on http://localhost:19006

```bash
yarn web
```

> The website should reload automatically at each changes to the code :arrows_clockwise:

Upgrade the packages versions in `yarn.lock`

```bash
yarn upgrade
```

## Run in production :rocket:

> This website is automatically deployed by a [GitHub Actions worklow](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22) to GitHub Pages at https://maastrichtu-ids.github.io/fair-metadata-wizard

You can build locally in `/web-build` folder and serve on [http://localhost:5000 :package:](http://localhost:5000)

```bash
yarn build
yarn serve
```

Or run directly using [Docker :whale:](https://docs.docker.com/get-docker/) (requires [docker installed](https://docs.docker.com/get-docker/))

```bash
docker-compose up
```

> Checkout the [docker-compose.yml](/docker-compose.yml) file to see how we run the Docker image.

## Contribute

Contributions are welcome! See the [guidelines to contribute 👨‍💻](/CONTRIBUTING.md).
