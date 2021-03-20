import React from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Paper, Button, Card, Chip, Grid, Snackbar } from "@material-ui/core";
import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import axios from 'axios';
// import * as jsonld from 'jsonld'
// import {$rdf} from 'rdflib'
// const jsonld = require('jsonld')
const $rdf = require('rdflib')

import JsonldUploader from "./JsonldUploader";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    // color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'none',
    },
  },
  settingsForm: {
    width: '100%',
    // textAlign: 'center',
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    '& .MuiFormHelperText-root': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(1),
    },
  },
  saveButton: {
    textTransform: 'none',
    margin: theme.spacing(2, 2),
  },
  addEntryButton: {
    textTransform: 'none',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
  input: {
    background: 'white',
    fontSize: '14px',
    width: '100%',
  },
  smallerFont: {
    fontSize: '12px',
  },
  alignLeft: {
    textAlign: 'left'
  },
  paperPadding: {
    padding: theme.spacing(2, 1),
    margin: theme.spacing(2, 2),
  },
  paperTitle: {
    fontWeight: 300,
    marginBottom: theme.spacing(1),
  }
}))

export default function JsonldWizard() {
  const classes = useStyles();
  const theme = useTheme();
  // useLocation hook to get URL params
  let location = useLocation();

  // Original form and output:
  // Questions: https://github.com/kodymoodley/fair-metadata-generator/blob/main/questions.csv
  // Full output: https://github.com/kodymoodley/fair-metadata-html-page-generator/blob/main/testdata/inputdata/test.jsonld
  
  const [state, setState] = React.useState({
    open: false,
    dialogOpen: false,
    wizard_jsonld: wizard_jsonld,
    jsonld_uri_provided: null,
    ontology_jsonld: {},
    ontoload_error_open: false,
    ontoload_success_open: false,
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  
  React.useEffect(() => {
    // Get URL params 
    const params = new URLSearchParams(location.search + location.hash);
    let jsonld_uri_provided = params.get('edit');
    if (jsonld_uri_provided) {
      axios.get(jsonld_uri_provided)
        .then(res => {
          updateState({
            wizard_jsonld: res.data,
            jsonld_uri_provided: jsonld_uri_provided,
          })
        })
    }

    // Download the ontology JSON-LD at start
    let contextUrl = 'https://schema.org/'
    if (state.wizard_jsonld['@context']) {
      contextUrl = state.wizard_jsonld['@context']
    }
    if (contextUrl.startsWith('https://schema.org') || contextUrl.startsWith('https://schema.org')) {
      // Schema.org does not enable content-negociation 
      contextUrl = 'https://schema.org/version/latest/schemaorg-current-https.jsonld'
    }

    // Try to download the ontology provided in @context URL as JSON-LD
    // curl -iL -H 'Accept: application/ld+json' http://www.w3.org/ns/csvw
    axios.defaults.headers.common['Accept'] = 'application/ld+json'
    axios.get(contextUrl)
      .then(res => {
        // console.log('ontology downloaded!')
        // console.log(res.data)
        // if not json
        if (typeof res.data !== 'object') {
          // If not object, we try to parse
          // const jsonLDList = await jsonld.fromRDF(result.quadList)
          toJSONLD(res.data, contextUrl, 'application/rdf+xml')
            .then((jsonld_rdf) => {
              // console.log('rdf conversion done');
              // console.log(jsonld_rdf);
              updateState({
                ontology_jsonld: {
                  '@context': contextUrl,
                  '@graph': jsonld_rdf
                }
              })
              updateState({ontoload_success_open: true})
              // jsonld.flatten(doc, (err: any, flattened: any) => {
              //     console.log('flattened')
              //     console.log(flattened)
              //     // jsonld.frame(flattened, frame, (err: any, framed: any) => {
              //     //     resolve(framed)
              //     // })
              // })
            })
        } else {
          updateState({
            ontology_jsonld: res.data
          })
          updateState({ontoload_success_open: true})
        }
      })
      .catch(error => {
        updateState({ontoload_error_open: true})
        console.log(error)
      })
  }, [state.wizard_jsonld['@context']])

  const toJSONLD = (data: any, uri: any, mimeType: any) => {
    return new Promise((resolve, reject) => {
        let store = $rdf.graph()
        let doc = $rdf.sym(uri);
        $rdf.parse(data, store, uri, mimeType)
        // console.log(store)
        $rdf.serialize(doc, store, uri, 'application/ld+json', (err: any, jsonldData: any) => {
          return resolve(JSON.parse(jsonldData)
            .sort((a: any, b: any) => {
              if (a['@type'] && b['@type'] && Array.isArray(a['@type']) && Array.isArray(b['@type'])){
                // Handle when array of types provided (e.g. SIO via rdflib)
                return a['@type'][0] < b['@type'][0] ? 1 : -1
              } else {
                return a['@type'] < b['@type'] ? 1 : -1
              }
            })
        )
      })
    })
  }

  const handleSubmit  = (event: React.FormEvent) => {
    // Trigger file download
    event.preventDefault();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/turtle;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.wizard_jsonld, null, 4)));
    element.setAttribute('download', 'metadata.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setState({...state, open: true})
  }

  // Close Snackbar
  const closeOntoloadError = () => {
    updateState({...state, ontoload_error_open: false})
  };
  const closeOntoloadSuccess = () => {
    updateState({...state, ontoload_success_open: false})
  };

  return(
    <Container className='mainContainer'>
      <Typography variant="h4" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
          FAIR metadata wizard 🧙‍♂️
      </Typography>
      <Typography variant="body1" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        Load and edit JSON-LD RDF metadata files in a user-friendly web interface, with autocomplete for <code>@types</code>, based on the <code>@context</code> classes and properties
      </Typography>

      {!state.jsonld_uri_provided &&
        <JsonldUploader renderObject={state.wizard_jsonld} 
          onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld})}} />
      }

      <Snackbar open={state.ontoload_error_open} onClose={closeOntoloadError} autoHideDuration={10000}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          The ontology at the URL {state.wizard_jsonld['@context']} provided in @context could not be loaded
        </MuiAlert>
      </Snackbar>
      <Snackbar open={state.ontoload_success_open} onClose={closeOntoloadSuccess} autoHideDuration={10000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          The ontology {state.wizard_jsonld['@context']} from @context has been loaded successfully, it will be used for @types autocomplete
        </MuiAlert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <FormControl className={classes.settingsForm}>

          <RenderObjectForm renderObject={state.wizard_jsonld} ontologyObject={state.ontology_jsonld}
            onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld})} }
          />

          <div style={{width: '100%', textAlign: 'center'}}>
            <Button type="submit" 
              variant="contained" 
              className={classes.saveButton} 
              startIcon={<GetAppIcon />}
              color="secondary" >
                Download metadata as JSON-LD
            </Button>
          </div>
        </FormControl>
      </form>
    </Container>
  )
}

// Recursive component to display a JSON-LD object as form
const RenderObjectForm = ({ renderObject, onChange, ontologyObject }: any) => {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    autocompleteOntologyOptions: [],
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    renderObject[event.target.id] = event.target.value
    // call onChange function given by parent
    onChange(renderObject) 
  }
  const handleRecursiveChange = (property: any, subSelections: any) => {
    renderObject[property] = subSelections;
    onChange(renderObject);
  }
  
  const handleAddEntry = (property: any, event: any) => {
    if (typeof renderObject[property][0] === 'string') {
      // If the array entries are strings and not objects
      renderObject[property].push(property + ' ' + renderObject[property].length);
    } else if (renderObject[property].length > 0) {
      // Use {...object} to clone the object
      renderObject[property].push({...renderObject[property][0]});
    }
    onChange(renderObject);
  }
  const handleRemoveEntry = (property: any, event: any) => {
    renderObject.splice(property, 1);
    onChange(renderObject);
  }

  function getConceptSearchDescription(concept: any) {
    // TODO: improve resolution of labels, quick hack to work with schema.org and csvw
    let search_description = ''
    if (concept['rdfs:label']) {
      if (typeof concept['rdfs:label'] === 'string') search_description = search_description + concept['rdfs:label'];
      if (concept['rdfs:label']['en']) search_description = search_description + concept['rdfs:label']['en'];
    }
    if (concept['rdfs:comment']) {
      if (typeof concept['rdfs:comment'] === 'string') search_description = search_description + concept['rdfs:comment'];
      if (concept['rdfs:comment']['en']) search_description = search_description + concept['rdfs:comment']['en'];
    }
    if (concept['http://www.w3.org/2000/01/rdf-schema#label']) {
      if (typeof concept['http://www.w3.org/2000/01/rdf-schema#label'] === 'string') search_description = search_description + concept['http://www.w3.org/2000/01/rdf-schema#label'];
      if (concept['http://www.w3.org/2000/01/rdf-schema#label'][0] && concept['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) search_description = search_description + concept['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'];
    }
    return search_description;
  }

  function handleAutocompleteOntologyOptions(event: any) {
    // Get autocomplete options from searching the provided @context ontology JSON-LD
    let inputText = '';
    if (event && event.target){
      if (event.target.value && event.target.value !== 0) {
        inputText = event.target.value;
      } else {
        inputText = event.target.innerText;
      }
    }
    if (inputText) {
      // Search for matching concepts in the ontology JSON-LD
      let conceptsArray: any = []
      const ontologyGraph = ontologyObject['@graph']
      if (Array.isArray(ontologyGraph)) {
        // If @graph is array of entities (e.g. schema.org)
        conceptsArray = ontologyGraph
          .filter((concept: any) => {
            return getConceptSearchDescription(concept).toLowerCase().indexOf( inputText.toLowerCase() ) !== -1
          })
      } else {
        // If @graph is object of arrays of entities (e.g. csvw)
        Object.keys(ontologyGraph).map((graphLabel: any) => {
          if (ontologyGraph[graphLabel] && Array.isArray(ontologyGraph[graphLabel])) {
            conceptsArray = conceptsArray.concat(ontologyGraph[graphLabel]
              .filter((concept: any) => {
                return getConceptSearchDescription(concept).toLowerCase().indexOf( inputText.toLowerCase() ) !== -1
              })
            )
          }
        })
      }
      updateState({
        autocompleteOntologyOptions: conceptsArray.sort((a: any, b: any) => {
          if (a['@type'] && b['@type'] && Array.isArray(a['@type']) && Array.isArray(b['@type'])){
            // Handle when array of types provided (e.g. SIO via rdflib)
            return a['@type'][0] < b['@type'][0] ? 1 : -1
          } else {
            return a['@type'] < b['@type'] ? 1 : -1
          }
        })
      })
    }
  }

  // https://betterprogramming.pub/recursive-rendering-with-react-components-10fa07c45456
  return (
    <div>
      {Object.keys(renderObject).map((property: any, key: number) => (
        <div key={key}>
          {property === '@type' &&
            <Autocomplete
              key={property + key}
              id={property}
              // value={ { ['rdfs:label']: renderObject[property]}}
              defaultValue={{'rdfs:label': renderObject[property]}}
              options={state.autocompleteOntologyOptions}
              onInputChange={handleAutocompleteOntologyOptions}
              onSelect={handleAutocompleteOntologyOptions}
              onChange={(event, newInputValue: any) => {
                if (newInputValue) {
                  if (newInputValue['rdfs:label']) {
                    // TODO: Only work for schema.org
                    renderObject[property] = newInputValue['rdfs:label']
                  } else {
                    // This is more semantically accurate but it imports the whole concept object
                    // We could use the @id URI
                    renderObject[property] = newInputValue
                  }
                  onChange(renderObject)
                }
              }}
              groupBy={(option: any): any => {
                if (option['@type'] && Array.isArray(option['@type'])) {
                  // Handle when array of types provided (e.g. SIO via rdflib)
                  return option['@type'][0]
                } else {
                  return option['@type']
                }
              }}
              getOptionSelected={(option: any, selectedValue: any): any => {
                // Handle option label when provided with rdfs:label or direct
                if (option['rdfs:label']) {
                  if (typeof option['rdfs:label'] === 'string') return option['rdfs:label'] === selectedValue['rdfs:label']
                  if (option['rdfs:label']['en']) return option['rdfs:label']['en'] === selectedValue
                }
                if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) {
                  return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] === selectedValue['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                }
                return option === selectedValue
              }}
              getOptionLabel={(option: any): any => {
                // Handle option label when provided with rdfs:label or direct
                if (option['rdfs:label']) {
                  if (typeof option['rdfs:label'] === 'string') return option['rdfs:label']
                  if (option['rdfs:label']['en']) return option['rdfs:label']['en']
                }
                if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) {
                  return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                }
                return option
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  size='small'
                  label="@type"
                  placeholder="@type"
                  className={classes.input}
                />
              )}
              // freeSolo={true}
              // includeInputInList={true}
              // ListboxProps={{
              //   className: classes.input,
              // }}
              // defaultValue={[top100Films[13]]}
              // multiple
            />
          }

          {/* if property is a string : TextInput */}
          {(typeof renderObject[property] === 'string' && property !== '@type' && renderObject[property]) &&
            <Grid container>
              <Grid item>
                <TextField
                  id={property}
                  label={property}
                  placeholder={property}
                  value={renderObject[property]}
                  className={classes.fullWidth}
                  variant="outlined"
                  onChange={handleChange}
                  size='small'
                  InputProps={{
                    className: classes.input
                  }}
                  required
                  InputLabelProps={{ required: false }}
                  // All field are required but we hide the *
                />
              </Grid>
              { Array.isArray(renderObject) && property !== '0' &&
                <Grid item>
                  <Button onClick={(subSelections: any) => handleRemoveEntry(property, subSelections)}
                    variant="contained" 
                    size="small"
                    style={{ textTransform: 'none', marginLeft: theme.spacing(2) }}
                    className={classes.addEntryButton} 
                    startIcon={<RemoveIcon />}
                    color="primary" >
                      Delete
                  </Button>
                </Grid>
              }
            </Grid>
          }

          {/* if property is an object : RenderObjectForm recursion */}
          {(typeof renderObject[property] === 'object' && renderObject[property]) &&
            <Card elevation={2} className={classes.paperPadding}>
              <Chip label={property}  style={{fontWeight: 900, marginBottom: theme.spacing(2), marginLeft: theme.spacing(1)}} />
              { Array.isArray(renderObject) && property !== '0' &&
                <Button onClick={(subSelections: any) => handleRemoveEntry(property, subSelections)}
                  variant="contained" 
                  size="small"
                  style={{ textTransform: 'none', marginLeft: theme.spacing(2) }}
                  className={classes.addEntryButton} 
                  startIcon={<RemoveIcon />}
                  color="primary" >
                    Delete
                </Button>
              }
              { Array.isArray(renderObject[property]) &&
                <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                  // style={{width: '100%'}}
                  variant="contained" 
                  size="small"
                  className={classes.addEntryButton} 
                  startIcon={<AddIcon />}
                  color="primary" >
                    Add {property} entry
                </Button>
              }
              <RenderObjectForm
                renderObject={renderObject[property]}
                onChange={(subSelections: any) => handleRecursiveChange(property, subSelections)}
                ontologyObject={ontologyObject}
              />
              { Array.isArray(renderObject[property]) &&
                <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                  // style={{width: '100%'}}
                  variant="contained" 
                  size="small"
                  className={classes.addEntryButton} 
                  startIcon={<AddIcon />}
                  color="primary" >
                    Add {property} entry
                </Button>
              }
            </Card>
          }
        </div>
      ))}
    </div>
  )
}

const wizard_jsonld = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "ECJ case law text similarity analysis",
  "description": "results from a study to analyse how closely the textual similarity of ECJ cases resembles the citation network of the cases.",
  "version": "v2.0",
  "url": "https://doi.org/10.5281/zenodo.4228652",
  "license": "https://www.gnu.org/licenses/agpl-3.0.txt",
  "encodingFormat": "CSV",
  "temporalCoverage": "2019-09-14/2020-07-01",
  "dateCreated": {
      "@type": "Date",
      "@value": "2019-09-14"
  },
  "datePublished": {
      "@type": "Date",
      "@value": "2020-07-01"
  },
  "distribution": {
      "@type": "DataDownload",
      "contentUrl": {
          "@type": "URL",
          "@value": "https://zenodo.org/record/4228652/files/docona_cjeu_results_2018_v2_html.zip?download=1"
      },
      "encodingFormat": "application/zip",
      "contentSize": "1.1MB"
  },
  "inLanguage": {
      "@type": "Language",
      "name": "EN",
      "alternateName": "EN"
  },
  "keywords": [
      "case law",
      "court decisions",
      "text similarity",
      "network analysis",
  ],
  "creator": {
      "@type": "Person",
      "@wizardRequired": true,
      "name": "concat @givenName @familyName",
      "givenName": "Kody",
      "familyName": "Moodley",
      "image": "https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",
      "jobTitle": "Postdoctoral researcher",
      "email": "kody.moodley@maastrichtuniversity.nl",
      "affiliation": {
          "@type": "Organization",
          "name": "Maastricht Law & Tech Lab",
          "url": {
              "@type": "URL",
              "@value": "https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"
          },
          "logo": {
              "@type": "ImageObject",
              "contentUrl": "https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"
          }
      }
  },
  "contributor": [
      {
          "@wizardMultivalueCheckArray": true,
          "@type": "Person",
          "givenName": "Pedro",
          "familyName": "Hernandez Serrano",
          "jobTitle": "Data Scientist",
          "email": "p.hernandezserrano@maastrichtuniversity.nl",
          "image": "https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/p.hernandezserrano/p.hernandezserrano_PP%20%287%20of%2013%29.jpg?itok=IUdreoIw&timestamp=1610395201",
          "affiliation": {
              "@type": "Organization",
              "name": "Institute of Data Science",
              "url": {
                  "@type": "URL",
                  "@value": "https://www.maastrichtuniversity.nl/research/institute-data-science"
              },
              "logo": {
                  "@type": "ImageObject",
                  "contentUrl": "https://avatars.githubusercontent.com/u/36262526?s=280&v=4"
              }
          }
      }
  ],
  "publisher": {
      "@type": "Person",
      "name": "Kody Moodley",
      "givenName": "Kody",
      "familyName": "Moodley",
      "jobTitle": "Postdoctoral researcher",
      "image": "https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",
      "email": "kody.moodley@maastrichtuniversity.nl",
      "affiliation": {
          "@type": "Organization",
          "name": "Maastricht Law & Tech Lab",
          "url": {
              "@type": "URL",
              "@value": "https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"
          },
          "logo": {
              "@type": "ImageObject",
              "contentUrl": "https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"
          }
      }
  },
  "isBasedOn": [
      {
          "@type": "SoftwareApplication",
          "name": "docona",
          "description": "DoConA (Document Content and Citation Analysis Pipeline) is an open source, configurable and extensible Python tool to analyse the level of agreement between the citation network of a set of textual documents and the textual similarity of these documents.",
          "applicationCategory": "Python script",
          "operatingSystem": "cross-platform",
          "version": "1.0",
          "url": {
              "@type": "URL",
              "@value": "https://github.com/MaastrichtU-IDS/docona"
          }
      },
      {
          "@type": "CreativeWork",
          "name": "ECJ case law and citation network",
          "description": "Citation network and full text documents of each judgement by the Court of Justice of the European Union that was published publicly on the EUR-LEX website (https://eur-lex.europa.eu/homepage.html) up until December 2018",
          "version": "2.0",
          "url": {
              "@type": "URL",
              "@value": "https://doi.org/10.5281/zenodo.3926736"
          }
      }
  ],
  "citation": {
      "@type": "CreativeWork",
      "name": "Similarity and Relevance of Court Decisions: A Computational Study on CJEU Cases",
      "creator": [
          {
              "@type": "Person",
              "name": "Kody Moodley"
          },
          {
              "@type": "Person",
              "name": "Michel Dumontier"
          }
      ],
      "publisher": {
          "@type": "Organization",
          "name": "IOS press",
          "url": {
              "@type": "URL",
              "@value": "https://www.iospress.nl"
          }
      },
      "datePublished": {
          "@type": "Date",
          "@value": "2019-12-10"
      },
      "sameAs": {
          "@type": "URL",
          "@value": "https://doi.org/10.3233/FAIA190307"
      }
  }
}