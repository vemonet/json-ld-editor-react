[![Deploy to GitHub Pages](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/Deploy%20website%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+website+to+GitHub+Pages%22) [![CodeQL analysis](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/CodeQL%20analysis/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22CodeQL+analysis%22)

Wizard to load and edit JSON-LD RDF metadata files in a user-friendly web interface, with autocomplete for `@types`, based on the classes and properties of the ontology magically loaded from `@context` ✨️

Access the website at https://maastrichtu-ids.github.io/fair-metadata-wizard

You can provide the URL of the JSON-LD file in the `?edit=` URL param. This automatically loads this JSON-LD and the ontology provided in `@context`. This also deactivates the possibility to upload a new JSON-LD file, so that you can send the URL to anyone to faithfully fill this metadata file!

Here are a few examples of metadata templates loaded from JSON-LD files URL: 

* Edit Schema.org Dataset metadata (default): https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/kodymoodley/fair-metadata-html-page-generator/main/testdata/inputdata/test.jsonld
* Edit CSV on the Web metadata: https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json

## Run in development 🚧

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
yarn dev
```

> The website should reload automatically at each changes to the code :arrows_clockwise:

Upgrade the packages versions in `yarn.lock`

```bash
yarn upgrade
```

## Run in production 🛩️

This website is automatically deployed by a [GitHub Actions worklow](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22) to GitHub Pages at https://maastrichtu-ids.github.io/fair-metadata-wizard

You can build locally in `/web-build` folder and serve on [http://localhost:5000](http://localhost:5000)

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
