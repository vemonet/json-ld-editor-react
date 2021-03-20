import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Paper, Button, Card, Chip, Grid } from "@material-ui/core";
import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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

  // Original form and output:
  // Questions: https://github.com/kodymoodley/fair-metadata-generator/blob/main/questions.csv
  // Full output: https://github.com/kodymoodley/fair-metadata-html-page-generator/blob/main/testdata/inputdata/test.jsonld
  
  const [state, setState] = React.useState({
    open: false,
    dialogOpen: false,
    wizard_jsonld: wizard_jsonld,
    ontology_jsonld: {}
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  
  React.useEffect(() => {
    // Download the ontology JSON-LD at start
    const ontologyUrl = 'https://schema.org/version/latest/schemaorg-current-https.jsonld'
    axios.get(ontologyUrl)
      .then(res => {
        updateState({
          ontology_jsonld: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

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

  return(
    <Container className='mainContainer'>
      <Typography variant="h4" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
          FAIR metadata wizard 🧙‍♂️
      </Typography>
      <Typography variant="body1" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        Quickly generates JSON-LD metadata for your datasets by filling a simple form
      </Typography>

      <JsonldUploader renderObject={state.wizard_jsonld} 
        onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld}); console.log(state.wizard_jsonld) }} />
      {/* renderObject, onChange */}

      <form onSubmit={handleSubmit}>
        <FormControl className={classes.settingsForm}>

          <RenderObjectForm renderObject={state.wizard_jsonld} ontologyObject={state.ontology_jsonld}
            onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld}); console.log(state.wizard_jsonld) } }
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
    if (renderObject[property].length > 0) {
      // Use {...object} to clone the object
      renderObject[property].push({...renderObject[property][0]});
    } else {
      renderObject[property].push('Entry ' + renderObject[property].length);
    }
    onChange(renderObject);
  }
  const handleRemoveEntry = (property: any, event: any) => {
    renderObject.splice(property, 1);
    onChange(renderObject);
  }

  function handleAutocompleteOntologyOptions(event: any) {
    // Generate specific state key for this autocomplete
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
      const matchingConcepts = ontologyObject['@graph']
        .filter((concept: any) => {
          const search_description = concept['rdfs:label'] + ' ' + concept['rdfs:comment'];
          return search_description.toLowerCase().indexOf( inputText.toLowerCase() ) !== -1
        })
        .map((concept: any) => {
          return concept['rdfs:label']
        })
      updateState({
        autocompleteOntologyOptions: matchingConcepts
      })
    }
  }
  
  // https://betterprogramming.pub/recursive-rendering-with-react-components-10fa07c45456
  return (
    <div>
      {/* Object.keys(renderObject).map(...) */}
      {Object.keys(renderObject).map((property: any, key: number) => (
        <div key={key}>
          {property === '@type' &&
            <Autocomplete
              id={property}
              onInputChange={handleAutocompleteOntologyOptions}
              value={renderObject[property]}
              // onChange={handleAutocomplete(event, 'sparql_endpoint')}
              // onInputChange={handleAutocomplete(event, 'sparql_endpoint')}
              options={state.autocompleteOntologyOptions}
              // getOptionLabel={option => option.title}
              freeSolo={true}
              includeInputInList={true}
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
              // ListboxProps={{
              //   className: classes.input,
              // }}
              // onChange={(event, newInputValue: any) => {
              //   setState({...state, 'language_autocomplete': newInputValue})
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