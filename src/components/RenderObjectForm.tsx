import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Paper, Button, Card, Chip, Grid, Snackbar, Box, IconButton } from "@material-ui/core";
import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import AddObjectPropertyIcon from '@material-ui/icons/SubdirectoryArrowRight';
// Share SubdirectoryArrowRight
import AddDataPropertyIcon from '@material-ui/icons/PlaylistAdd';
import AddObjectArrayIcon from '@material-ui/icons/AccountTree';
// import AddObjectArrayIcon from '@material-ui/icons/Queue';
import AddDataArrayIcon from '@material-ui/icons/PostAdd';

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
    // marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
  autocomplete: {
    marginRight: theme.spacing(2)
  },
  formInput: {
    background: 'white',
    width: '100%'
  },
  smallerFont: {
    fontSize: '12px',
  },
  alignLeft: {
    textAlign: 'left'
  },
  paperPadding: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 2),
  },
  paperTitle: {
    fontWeight: 300,
    marginBottom: theme.spacing(1),
  }
}))

const renameKey = (object: any, old_key: any, new_key: any): any => {
  if (old_key !== new_key) {
    // @ts-ignore
    Object.defineProperty(object, new_key, Object.getOwnPropertyDescriptor(object, old_key));
    delete object[old_key];
  }
  return object
};

export default function RenderObjectForm(props: any) {
  // Recursive component to display a JSON-LD object as form
  const renderObject = props.renderObject;
  const onChange = props.onChange;
  const ontologyObject = props.ontologyObject;
  const fullJsonld = props.fullJsonld;
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
  // const handleRemoveEntry = (property: any, event: any) => {
  //   console.log(property);
  //   renderObject.splice(property, 1);
  //   onChange(renderObject);
  // }
  const handleAddProperty = (property: any, event: any) => {
    // if (typeof renderObject[property][0] === 'string') {
    //   // If the array entries are strings and not objects
    //   renderObject[property].push(property + ' ' + renderObject[property].length);
    // } else if (renderObject[property].length > 0) {
    //   // Use {...object} to clone the object
    //   renderObject[property].push({...renderObject[property][0]});
    // }
    if (property === 'objectProperty') {
      renderObject['property'] = {
        '@type': 'Object Type',
        'property': 'value',
      }
    } else if (property === 'objectArray') {
      renderObject['property'] = [{
        '@type': 'Object Type',
        'property': 'value',
      }]
    } else if (property === 'dataArray') {
      renderObject['property'] = [
        'value',
      ]
    } else {
      renderObject['property'] = 'value'
    }
    onChange(renderObject);
  }
  const handleRemoveProperty = (property: any, event: any): any => {
    delete renderObject[property];
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
          {/* Ignore all properties starting by @wizard */}
          {!property.startsWith('@wizard') &&
            <>
              {/* <Box display="flex"> */}
              <Grid container>
                { fullJsonld['@wizardQuestions'] && fullJsonld['@wizardQuestions'][property] &&
                  <Grid item xs={12}>
                    <Typography variant="body1" style={{fontWeight: 900, textAlign: 'left', marginTop: theme.spacing(1), marginLeft: theme.spacing(2)}}>
                      {fullJsonld['@wizardQuestions'][property]}
                    </Typography>
                  </Grid>
                }
                {property !== '@context' &&
                  <Grid item>
                    <IconButton onClick={(subSelections: any) => handleRemoveProperty(property, subSelections)}
                      // variant="contained" 
                      // size="small"
                      style={{ margin: theme.spacing(1,1) }}
                      className={classes.addEntryButton} 
                      disabled={property === '0'}
                      // startIcon={<RemoveIcon />}
                      color="default" >
                        <RemoveIcon />
                    </IconButton>
                  </Grid>
                }
                {property === '@type' &&
                  <Grid item style={{width: '80%'}}>
                  {/* Autocomplete for @types */}
                  <Autocomplete
                    key={property + key}
                    id={property}
                    // value={ { ['rdfs:label']: renderObject[property]}}
                    defaultValue={{'rdfs:label': renderObject[property]}}
                    options={state.autocompleteOntologyOptions}
                    onInputChange={handleAutocompleteOntologyOptions}
                    onSelect={handleAutocompleteOntologyOptions}
                    // TODO: improve resolution for CSVW
                    onChange={(event, newInputValue: any) => {
                      if (newInputValue) {
                        if (newInputValue['rdfs:label']) {
                          // TODO: improve, make it more generic after normalizing JSON-LD?
                          if (newInputValue['rdfs:label']['en']) {
                            // Handle CSVW label with lang
                            renderObject[property] = newInputValue['rdfs:label']['en']
                          } else {
                            renderObject[property] = newInputValue['rdfs:label']
                          }
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
                        className={classes.formInput}
                      />
                    )}
                    // freeSolo={true}
                    // includeInputInList={true}
                    // ListboxProps={{
                    //   className: classes.formInput,
                    // }}
                    // defaultValue={[top100Films[13]]}
                    // multiple
                  />
                  </Grid>
                }

                {/* if property is a string : TextInput */}
                {(typeof renderObject[property] === 'string' && property !== '@type') &&
                  <>
                    {/* <Grid container spacing={0}> */}
                      {/* { fullJsonld['@wizardQuestions'] && fullJsonld['@wizardQuestions'][property] &&
                        <Grid item xs={12}>
                          <Typography variant="body1" style={{fontWeight: 900, textAlign: 'left', marginTop: theme.spacing(1), marginLeft: theme.spacing(2)}}>
                            {fullJsonld['@wizardQuestions'][property]}
                          </Typography>
                        </Grid>
                      } */}
                      { !property.startsWith('@') && !Array.isArray(renderObject) &&
                        <Grid item xs={4} md={3}>
                          {/* Autocomplete for data properties */}
                          <Autocomplete
                            key={property + key}
                            id={property}
                            className={classes.autocomplete}
                            // value={ { ['rdfs:label']: renderObject[property]}}
                            defaultValue={{'rdfs:label': property}}
                            options={state.autocompleteOntologyOptions}
                            onInputChange={handleAutocompleteOntologyOptions}
                            onSelect={handleAutocompleteOntologyOptions}
                            onChange={(event, newInputValue: any) => {
                              if (newInputValue) {
                                let newProperty = ''
                                if (newInputValue['rdfs:label']) {
                                  // TODO: improve, make it more generic after normalizing JSON-LD?
                                  if (newInputValue['rdfs:label']['en']) {
                                    // Handle CSVW label with lang
                                    newProperty = newInputValue['rdfs:label']['en']
                                  } else {
                                    newProperty = newInputValue['rdfs:label']
                                  }
                                } else {
                                  newProperty = newInputValue
                                }
                                if (newProperty) renameKey(renderObject, property, newProperty);
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
                                variant="filled"
                                size='small'
                                label="Data Property"
                                placeholder="Data Property"
                                className={classes.formInput}
                              />
                            )}
                            // freeSolo={true}
                            // includeInputInList={true}
                            // ListboxProps={{
                            //   className: classes.formInput,
                            // }}
                            // defaultValue={[top100Films[13]]}
                            // multiple
                          />
                        </Grid>
                      }
                      {/* Full width for TextField on small screen 60% for bigger */}
                      <Grid item xs={12} md={7}>
                        <TextField
                          id={property}
                          multiline
                          label={property}
                          placeholder={property}
                          value={renderObject[property]}
                          className={classes.fullWidth}
                          variant="outlined"
                          onChange={handleChange}
                          size='small'
                          InputProps={{
                            className: classes.formInput
                          }}
                          required
                          InputLabelProps={{ required: false }}
                          // All field are required but we hide the *
                        />
                      </Grid>
                      {/* { Array.isArray(renderObject) && property !== '0' &&
                        <Grid item>
                          <Button onClick={(subSelections: any) => handleRemoveEntry(property, subSelections)}
                            variant="contained" 
                            size="small"
                            style={{ textTransform: 'none', marginLeft: theme.spacing(2), marginTop: theme.spacing(1) }}
                            className={classes.addEntryButton} 
                            startIcon={<RemoveIcon />}
                            color="primary" >
                              Delete
                          </Button>
                        </Grid>
                      } */}
                    {/* </Grid> */}
                  </>
                }

                {/* if property is an object : RenderObjectForm recursion */}
                {(typeof renderObject[property] === 'object' && renderObject[property]) &&
                  <Card elevation={2} className={classes.paperPadding} style={{width: '80%'}}>
                    <Grid container>
                      { Array.isArray(renderObject) &&
                        <Grid item>
                          <Chip style={{ marginBottom: theme.spacing(1), marginLeft: theme.spacing(1)}} 
                            label={property}
                          />
                        </Grid>
                      }
                      { !Array.isArray(renderObject) &&
                        <Grid item xs={5} md={3}>
                          {/* Autocomplete for object properties */}
                          <Autocomplete
                            key={property + key}
                            id={property}
                            // value={ { ['rdfs:label']: renderObject[property]}}
                            defaultValue={{'rdfs:label': property}}
                            options={state.autocompleteOntologyOptions}
                            onInputChange={handleAutocompleteOntologyOptions}
                            onSelect={handleAutocompleteOntologyOptions}
                            onChange={(event, newInputValue: any) => {
                              if (newInputValue) {
                                let newProperty = ''
                                if (newInputValue['rdfs:label']) {
                                  // TODO: improve, make it more generic after normalizing JSON-LD?
                                  if (newInputValue['rdfs:label']['en']) {
                                    // Handle CSVW label with lang
                                    newProperty = newInputValue['rdfs:label']['en']
                                  } else {
                                    newProperty = newInputValue['rdfs:label']
                                  }
                                } else {
                                  newProperty = newInputValue
                                }
                                if (newProperty) renameKey(renderObject, property, newProperty);
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
                                variant="filled"
                                size='small'
                                label="Object Property"
                                placeholder="Object Property"
                                className={classes.formInput}
                              />
                            )}
                            // freeSolo={true}
                            // includeInputInList={true}
                            // ListboxProps={{
                            //   className: classes.formInput,
                            // }}
                            // defaultValue={[top100Films[13]]}
                            // multiple
                          />
                        </Grid>
                      }
                      { fullJsonld['@wizardQuestions'] && fullJsonld['@wizardQuestions'][property] &&
                        <Grid item>
                          <Typography variant="body1" style={{fontWeight: 900, textAlign: 'left', marginTop: theme.spacing(3), marginLeft: theme.spacing(1)}}>
                            {fullJsonld['@wizardQuestions'][property]}
                          </Typography>
                        </Grid>
                      }
                      {/* { Array.isArray(renderObject) && property !== '0' &&
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
                      } */}
                      { Array.isArray(renderObject[property]) &&
                        <Grid item>
                          <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                            style={{marginTop: theme.spacing(3)}}
                            variant="contained" 
                            size="small"
                            className={classes.addEntryButton} 
                            startIcon={<AddIcon />}
                            color="primary" >
                              Add {property} entry
                          </Button>
                        </Grid>
                      }
                    </Grid>

                    <RenderObjectForm
                      renderObject={renderObject[property]}
                      onChange={(subSelections: any) => handleRecursiveChange(property, subSelections)}
                      ontologyObject={ontologyObject}
                      fullJsonld={fullJsonld}
                    />
                    { Array.isArray(renderObject[property]) &&
                      <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                        style={{marginTop: theme.spacing(1)}}
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
              {/* </Box> */}
              </Grid>
            </>
          }
        </div>
      ))}
      { typeof renderObject === 'object' && !Array.isArray(renderObject) &&
        <>
          {/* Buttons to add new properties or arrays for each object */}
          <Button onClick={(subSelections: any) => handleAddProperty('dataProperty', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.addEntryButton} 
            startIcon={<AddDataPropertyIcon />}
            color="primary" >
              Data Property
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('dataArray', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.addEntryButton} 
            startIcon={<AddDataArrayIcon />}
            color="primary" >
              Data array
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('objectProperty', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.addEntryButton} 
            startIcon={<AddObjectPropertyIcon />}
            color="primary" >
              Object Property
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('objectArray', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.addEntryButton} 
            startIcon={<AddObjectArrayIcon />}
            color="primary" >
              Object array
          </Button>
        </>
      }
    </div>
  )
}