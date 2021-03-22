[![Deploy to GitHub Pages](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/Deploy%20website%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions/workflows/deploy-github.yml) [![CodeQL analysis](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/workflows/CodeQL%20analysis/badge.svg)](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions/workflows/codeql-analysis.yml)

# 🧙‍♂️📝 FAIR Metadata Wizard, a JSON-LD editor

**Load and edit JSON-LD RDF metadata files** in a user-friendly web interface, **with autocomplete** based on the classes and properties of the **ontology magically loaded** from `@context` ✨️

Built with [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/), and [Material-UI](https://material-ui.com/).

Deployed as a static website on [GitHub Pages](https://pages.github.com/).

## Access 👩‍💻

Access the website at **[https://maastrichtu-ids.github.io/fair-metadata-wizard 🔗](https://maastrichtu-ids.github.io/fair-metadata-wizard)**

A few URL parameters can be provided to automate some actions:

* **Provide the JSON-LD file to load** with `edit=https://my-jsonld`
  * e.g. https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json
  * It will automatically load the JSON-LD available at this URL, and the ontology provided in `@context`. 
  * It also deactivates the possibility to upload a new JSON-LD file, so that you can send the URL to anyone to faithfully fill this metadata file! 📬

* **Disable adding or removing objects** in the form with `toysrus=closed`
  * e.g. https://maastrichtu-ids.github.io/fair-metadata-wizard?toysrus=closed
  * It helps to ensure the people filling the form will comply with a given structure 

Combined: https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json&toysrus=closed

## Metadata examples 📝

Here are a few examples of metadata templates to load from JSON-LD files URL:

* Edit Schema.org Dataset metadata (default): https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/kodymoodley/fair-metadata-html-page-generator/main/testdata/inputdata/test.jsonld
* Edit CSV on the Web metadata: https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json

## Tested ontologies ✔️

The following ontologies has been tested to be properly loaded when provided in `@context`

* [Schema.org](https://schema.org/) - from JSON-LD
  * https://schema.org/
* [CSV on the Web (CSVW)](https://w3c.github.io/csvw/primer/) - from JSON-LD
  * http://www.w3.org/ns/csvw
* [Semantic Science ontology (SIO)](https://github.com/MaastrichtU-IDS/semanticscience) - from RDF/XML
  * https://raw.githubusercontent.com/MaastrichtU-IDS/semanticscience/master/ontology/sio.owl
* [BioLink model](https://biolink.github.io/biolink-model/docs/) - from Turtle
  * https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.ttl

Ontologies are converted from RDF formats to JSON-LD using `rdflib-js`

> Please report if an ontology does not load properly by [creating an issue on GitHub](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/issues).

## Known issues ⚠️

* It is **not possible to resolve HTTP URLs** from HTTPS (triggers a `mixed active content blocked` error). Deploying to github.io/maastrichtu-ids forces redirect to HTTPS
  * I currently rewrite ontologies URL using `http://` to `https://` before downloading them to work around this issue
  * It can be solved by redirecting GitHub Pages a custom URL, such as http://wizard.semanticscience.org, and accessing via HTTP

## Run in development 🏗️

Requirements:  [npm](https://www.npmjs.com/get-npm) and [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) installed.

Clone the repository, and get in the folder:

```bash
git clone https://github.com/MaastrichtU-IDS/fair-metadata-wizard 
cd fair-metadata-wizard
```

Install dependencies :inbox_tray:

```bash
yarn
```

Web app will run on [http://localhost:19006 🏃](http://localhost:19006)

```bash
yarn dev
```

> The website should reload automatically at each changes to the code :arrows_clockwise:

Upgrade the packages versions in `yarn.lock` ⏫️

```bash
yarn upgrade
```

## Run in production 🛩️

This website is automatically deployed by a [GitHub Actions worklow](https://github.com/MaastrichtU-IDS/fair-metadata-wizard/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22) to GitHub Pages at https://maastrichtu-ids.github.io/fair-metadata-wizard

You can build locally in the `/web-build` folder, and serve on [http://localhost:5000](http://localhost:5000)

```bash
yarn build
yarn serve
```

Or run directly using [Docker :whale:](https://docs.docker.com/get-docker/) (requires [docker installed](https://docs.docker.com/get-docker/))

```bash
docker-compose up
```

> Checkout the [docker-compose.yml](/docker-compose.yml) file to see how we run the Docker image ⛵️

## Contribute 🤝

Contributions are welcome! See the [guidelines to contribute](/CONTRIBUTING.md).

## See also 👀

Resources to help improving the wizard design:

* [Generating RDF from Tabular Data on the Web](https://www.w3.org/TR/2015/REC-csv2rdf-20151217) - W3C recommendation  (2015)
* [Comparing web forms approaches](https://medium.com/patternfly/comparing-web-forms-a-progressive-form-vs-a-wizard-110eefc584e7) - unformal article
  * Users seems to prefers having everything in the same page, than having multiple pages with Next / Previous (2020)