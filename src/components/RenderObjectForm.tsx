import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Button, Card, Chip, Grid, Snackbar, Box, IconButton, TextField, Tooltip } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import AddObjectPropertyIcon from '@material-ui/icons/SubdirectoryArrowRight';
import AddDataPropertyIcon from '@material-ui/icons/PlaylistAdd';
import AddObjectArrayIcon from '@material-ui/icons/AccountTree';
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
  editButtons: {
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
  biggerFont: {
    fontSize: '14px',
  },
  alignLeft: {
    textAlign: 'left'
  },
  paperPadding: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 2),
    width: '100%'
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
  const editEnabled = props.editEnabled;
  const parentProperty = props.parentProperty;
  // const parentType = props.parentType;
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    autocompleteOntologyOptions: [],
    errorMessage: ''
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (renderObject['@type'] === 'URL' && event.target.id === '@value') {
      // URL validation
      if ((!event.target.value.startsWith('http://') && !event.target.value.startsWith('https://')) || event.target.value.includes(' ')) {
        updateState({ errorMessage: 'Provide a valid URL'})
      } else {
        updateState({ errorMessage: ''})
        renderObject[event.target.id] = event.target.value
      }

    } else {
      renderObject[event.target.id] = event.target.value
    }
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
    let newObject = renderObject;
    if (Array.isArray(renderObject)) {
      // Properly remove null from array that we deleted
      newObject = renderObject.filter(function (el: any) {
        return el != null;
      });
    }
    onChange(newObject);
  }

  function getConceptSearchDescription(concept: any) {
    // ADD ONTOLOGY: Here to add exceptions when handling concepts labels
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
    if (concept['http://www.w3.org/2004/02/skos/core#definition']) {
      if (typeof concept['http://www.w3.org/2004/02/skos/core#definition'] === 'string') search_description = search_description + concept['http://www.w3.org/2004/02/skos/core#definition'];
      if (concept['http://www.w3.org/2004/02/skos/core#definition'][0] && concept['http://www.w3.org/2004/02/skos/core#definition'][0]['@value']) search_description = search_description + concept['http://www.w3.org/2004/02/skos/core#definition'][0]['@value'];
    }
    return search_description;
  }

  // TODO: Delay search:
  // StackOverflow: https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
  // Code example: https://github.com/slorber/react-async-hook/blob/master/example/index.tsx
  // OR: const WAIT_INTERVAL = 500
  // let timerID: any
  // clearTimeout(timerID)
  //   timerID = setTimeout(() => {
  //     console.log('some action after delay autocomplete')
  //   })
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
                  // Display the @wizardQuestions if provided for this property
                  <Grid item xs={12}>
                    <Typography variant="body1" style={{fontWeight: 900, textAlign: 'left', marginTop: theme.spacing(1), marginLeft: theme.spacing(2)}}>
                      {fullJsonld['@wizardQuestions'][property]}
                    </Typography>
                  </Grid>
                }
                {property !== '@context' && (editEnabled || Array.isArray(renderObject)) &&
                  // Button to delete any property object. Hide for objects if edit disabled
                  <Grid item>
                    {/* <Tooltip title='Delete the property {} and its child objects'> */}
                    <Tooltip title={<Typography style={{textAlign: 'center'}}>Delete the <code>{property}</code> property<br/>and its children</Typography>}>
                      <IconButton onClick={(subSelections: any) => handleRemoveProperty(property, subSelections)}
                        style={{ margin: theme.spacing(1,1) }}
                        className={classes.editButtons} 
                        disabled={property === '0' || property === '@type'}
                        color="default" >
                          <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                }
                {property === '@type' &&
                  <Grid item xs={11} md={9}>
                    {/* Autocomplete for @types */}
                    <Autocomplete
                      key={property + key}
                      id={property}
                      disabled={!editEnabled}
                      // value={ { ['rdfs:label']: renderObject[property]}}
                      defaultValue={{'rdfs:label': renderObject[property]}}
                      options={state.autocompleteOntologyOptions}
                      onInputChange={handleAutocompleteOntologyOptions}
                      onSelect={handleAutocompleteOntologyOptions}

                      // ADD ONTOLOGY: fix how the entity id/label is retrieved here (main outcome of the input)
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
                          } else if(newInputValue['@id']) {
                            // This is more semantically accurate but it imports the whole concept object
                            // We could use the @id URI
                            renderObject[property] = newInputValue['@id']
                          } else {
                            // This is more semantically accurate but it imports the whole concept object
                            // We could use the @id URI
                            renderObject[property] = newInputValue
                          }
                          onChange(renderObject)
                        }
                      }}
                      getOptionSelected={(option: any, selectedValue: any): any => {
                        // Handle option label when provided with rdfs:label or direct
                        try {
                          if (option['rdfs:label']) {
                            if (typeof option['rdfs:label'] === 'string') return option['rdfs:label'] === selectedValue['rdfs:label']
                            if (option['rdfs:label']['en']) return option['rdfs:label']['en'] === selectedValue
                          }
                          if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] && selectedValue['http://www.w3.org/2000/01/rdf-schema#label']) {
                            return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] === selectedValue['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                          }
                          if (option['@id']) {
                            return option['@id'] === selectedValue['@id']
                          }
                          return option === selectedValue
                        } catch (e) {
                          return option === selectedValue
                        }
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
                        if (option['@id']) {
                          return option['@id']
                        }
                        return option
                      }}
                      groupBy={(option: any): any => {
                        if (option['@type'] && Array.isArray(option['@type'])) {
                          // Handle when array of types provided (e.g. SIO via rdflib)
                          return option['@type'][0]
                        } else {
                          return option['@type']
                        }
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

                {/* If property is a string : TextInput */}
                {(typeof renderObject[property] === 'string' && property !== '@type') &&
                  <>
                    { !property.startsWith('@') && !Array.isArray(renderObject) &&
                      <Grid item xs={4} md={3}>
                        {/* Autocomplete for "Data Properties" properties */}
                        <Autocomplete
                          key={property + key}
                          id={property}
                          disabled={!editEnabled}
                          className={classes.autocomplete}
                          // value={ { ['rdfs:label']: renderObject[property]}}
                          defaultValue={{'rdfs:label': property}}
                          options={jsonld_properties.concat(state.autocompleteOntologyOptions)}
                          onInputChange={handleAutocompleteOntologyOptions}
                          onSelect={handleAutocompleteOntologyOptions}
                          // ADD ONTOLOGY: fix how the entity id/label is retrieved (main outcome of the input)
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
                              } else if(newInputValue['@id']) {
                                // This is more semantically accurate but it imports the whole concept object
                                // We could use the @id URI
                                newProperty = newInputValue['@id']
                              } else {
                                newProperty = newInputValue
                              }
                              if (newProperty) renameKey(renderObject, property, newProperty);
                              onChange(renderObject)
                            }
                          }}
                          getOptionSelected={(option: any, selectedValue: any): any => {
                            // Handle option label when provided with rdfs:label or direct
                            try {
                              if (option['rdfs:label']) {
                                if (typeof option['rdfs:label'] === 'string') return option['rdfs:label'] === selectedValue['rdfs:label']
                                if (option['rdfs:label']['en']) return option['rdfs:label']['en'] === selectedValue
                              }
                              if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] && selectedValue['http://www.w3.org/2000/01/rdf-schema#label']) {
                                return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] === selectedValue['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                              }
                              if (option['@id']) {
                                return option['@id'] === selectedValue['@id']
                              }
                              return option === selectedValue
                            } catch (e) {
                              return option === selectedValue
                            }
                          }}
                          getOptionLabel={(option: any): any => {
                            // Handle option label when provided with rdfs:label or direct
                            try {
                              if (option['rdfs:label']) {
                                if (typeof option['rdfs:label'] === 'string') return option['rdfs:label']
                                if (option['rdfs:label']['en']) return option['rdfs:label']['en']
                              }
                              if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) {
                                return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                              }
                              if (option['@id']) {
                                return option['@id']
                              }
                              return option
                            } catch (e) {
                              return option
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
                        />
                      </Grid>
                    }
                    {/* Full width for TextField on small screen 60% for bigger */}
                    <Grid item xs={12} md={7}>
                      {/* Only TextField for "Data Properties" value */}
                      <TextField
                        id={property}
                        multiline
                        label={property}
                        placeholder={property}
                        value={renderObject[property]}
                        className={classes.fullWidth}
                        variant="outlined"
                        onChange={handleTextFieldChange}
                        size='small'
                        InputProps={{
                          className: classes.formInput
                        }}
                        required
                        error={state.errorMessage.length > 0}
                        helperText={state.errorMessage}
                        // helperText="Incorrect entry."
                        // errorText={state.errorMessage}
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
                          className={classes.editButtons} 
                          startIcon={<RemoveIcon />}
                          color="primary" >
                            Delete
                        </Button>
                      </Grid>
                    } */}
                  </>
                }

                {/* If property is an object : RenderObjectForm recursion */}
                {(typeof renderObject[property] === 'object' && renderObject[property]) &&
                  // TODO: improve width handling within the Grid
                  <Grid item xs={11}>
                    <Card elevation={4} className={classes.paperPadding} 
                      // Arrays are using a different grey color
                      style={{
                        backgroundColor: (Array.isArray(renderObject[property]) ? "#e8eaf6" : "white")
                      }}
                      // style={ if ()
                      //   backgroundColor: 'transparent',
                      //   // boxShadow: 'none',
                      // }
                    >
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
                            {/* Autocomplete for "Object Properties" properties */}
                            <Autocomplete
                              key={property + key}
                              id={property}
                              disabled={!editEnabled}
                              // value={ { ['rdfs:label']: renderObject[property]}}
                              defaultValue={{'rdfs:label': property}}
                              options={jsonld_properties.concat(state.autocompleteOntologyOptions)}
                              onInputChange={handleAutocompleteOntologyOptions}
                              onSelect={handleAutocompleteOntologyOptions}

                              // ADD ONTOLOGY: fix how the entity id/label is retrieved (main outcome of the input) 
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
                                  } else if(newInputValue['@id']) {
                                    // This is more semantically accurate but it imports the whole concept object
                                    // We could use the @id URI
                                    newProperty = newInputValue['@id']
                                  } else {
                                    newProperty = newInputValue
                                  }
                                  if (newProperty) renameKey(renderObject, property, newProperty);
                                  onChange(renderObject)
                                }
                              }}
                              getOptionSelected={(option: any, selectedValue: any): any => {
                                // Handle option label when provided with rdfs:label or direct
                                try {
                                  if (option['rdfs:label']) {
                                    if (typeof option['rdfs:label'] === 'string') return option['rdfs:label'] === selectedValue['rdfs:label']
                                    if (option['rdfs:label']['en']) return option['rdfs:label']['en'] === selectedValue
                                  }
                                  if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) {
                                    return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'] === selectedValue['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                                  }
                                  if (option['@id']) {
                                    return option['@id'] === selectedValue['@id']
                                  }
                                  return option === selectedValue
                                } catch (e) {
                                  return option === selectedValue
                                }
                              }}
                              getOptionLabel={(option: any): any => {
                                // Handle option label when provided with rdfs:label or direct
                                try {
                                  if (option['rdfs:label']) {
                                    if (typeof option['rdfs:label'] === 'string') return option['rdfs:label']
                                    if (option['rdfs:label']['en']) return option['rdfs:label']['en']
                                  }
                                  if (option['http://www.w3.org/2000/01/rdf-schema#label'] && option['http://www.w3.org/2000/01/rdf-schema#label'][0] && option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']) {
                                    return option['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']
                                  }
                                  if (option['@id']) {
                                    return option['@id']
                                  }
                                  return option
                                } catch (e) {
                                  return option
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
                        {/* Display question in Object (duplicate with before every object) */}
                        {/* { fullJsonld['@wizardQuestions'] && fullJsonld['@wizardQuestions'][property] &&
                          <Grid item>
                            <Typography variant="body1" style={{fontWeight: 900, textAlign: 'left', marginTop: theme.spacing(3), marginLeft: theme.spacing(1)}}>
                              {fullJsonld['@wizardQuestions'][property]}
                            </Typography>
                          </Grid>
                        } */}
                        {/* { Array.isArray(renderObject) && property !== '0' &&
                          <Grid item>
                            <Button onClick={(subSelections: any) => handleRemoveEntry(property, subSelections)}
                              variant="contained" 
                              size="small"
                              style={{ textTransform: 'none', marginLeft: theme.spacing(2) }}
                              className={classes.editButtons} 
                              startIcon={<RemoveIcon />}
                              color="primary" >
                                Delete
                            </Button>
                          </Grid>
                        } */}
                        { Array.isArray(renderObject[property]) &&
                          <Grid item>
                            {/* Create Add entry button at the top of the list, if the property value is an array */}
                            <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                              style={{marginTop: theme.spacing(3)}}
                              variant="contained" 
                              size="small"
                              className={classes.editButtons} 
                              startIcon={<AddIcon />}
                              color="default" >
                                Add {property} entry
                            </Button>
                          </Grid>
                        }
                      </Grid>

                      {/* Recursively call RenderObjectForm to render property values that are Objects */}
                      <RenderObjectForm
                        renderObject={renderObject[property]}
                        onChange={(subSelections: any) => handleRecursiveChange(property, subSelections)}
                        ontologyObject={ontologyObject}
                        fullJsonld={fullJsonld}
                        editEnabled={editEnabled}
                        parentProperty={property}
                        parentType={renderObject['@type']}
                      />
                      { Array.isArray(renderObject[property]) &&
                        // Create Add entry button at the bottom of the list, if the property value is an array
                        <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                          style={{marginTop: theme.spacing(1)}}
                          variant="contained" 
                          size="small"
                          className={classes.editButtons} 
                          startIcon={<AddIcon />}
                          color="default" >
                            Add {property} entry
                        </Button>
                      }
                    </Card>
                  </Grid>
                }
              {/* </Box> */}
              </Grid>
            </>
          }
        </div>
      ))}
      {typeof renderObject === 'object' && !Array.isArray(renderObject) && editEnabled &&
        // Buttons to add new properties or arrays for each object
        <>
          {/* <GridList cols={1}>
            <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
            </GridListTile>
            ))}
            </GridList> */}
          <Tooltip title={<Typography style={{textAlign: 'center'}}>Add a Data Property to the <code>{parentProperty}</code> object<br/>(new property with a string value)</Typography>}>
            <IconButton onClick={(subSelections: any) => handleAddProperty('dataProperty', subSelections)}
              style={{marginTop: theme.spacing(1)}}
              className={classes.editButtons}
              color="default" >
                <AddDataPropertyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Typography style={{textAlign: 'center'}}>Add a Data Array to the <code>{parentProperty}</code> object<br/>(new property pointing to an array of strings)</Typography>}>
            <IconButton onClick={(subSelections: any) => handleAddProperty('dataArray', subSelections)}
              style={{marginTop: theme.spacing(1)}}
              className={classes.editButtons} 
              color="default" >
                <AddDataArrayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Typography style={{textAlign: 'center'}}>Add an Object Property to the <code>{parentProperty}</code> object<br/>(new property pointing to a new object)</Typography>}>
            <IconButton onClick={(subSelections: any) => handleAddProperty('objectProperty', subSelections)}
              style={{marginTop: theme.spacing(1)}}
              className={classes.editButtons}
              color="default" >
                <AddObjectPropertyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Typography style={{textAlign: 'center'}}>Add an Object Array to the <code>{parentProperty}</code> object<br/>(new property pointing to an array of objects)</Typography>}>
            <IconButton onClick={(subSelections: any) => handleAddProperty('objectArray', subSelections)}
              style={{marginTop: theme.spacing(1)}}
              className={classes.editButtons} 
              color="default" >
                <AddObjectArrayIcon />
            </IconButton>
          </Tooltip>
        </>
      }
      {/* { typeof renderObject === 'object' && !Array.isArray(renderObject) &&
        // Buttons to add new properties or arrays for each object
        <>
          <Button onClick={(subSelections: any) => handleAddProperty('dataProperty', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.editButtons} 
            startIcon={<AddDataPropertyIcon />}
            color="primary" >
              Data Property
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('dataArray', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.editButtons} 
            startIcon={<AddDataArrayIcon />}
            color="primary" >
              Data array
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('objectProperty', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.editButtons} 
            startIcon={<AddObjectPropertyIcon />}
            color="primary" >
              Object Property
          </Button>
          <Button onClick={(subSelections: any) => handleAddProperty('objectArray', subSelections)}
            style={{marginTop: theme.spacing(1)}}
            variant="contained" 
            size="small"
            className={classes.editButtons} 
            startIcon={<AddObjectArrayIcon />}
            color="primary" >
              Object array
          </Button>
        </>
      } */}
    </div>
  )
}

// Default JSON-LD properties for Autocomplete
const jsonld_properties = [
  {
    '@id': '@value',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@id',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@type',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@graph',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@context',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@language',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@vocab',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@base',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@container',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@list',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@set',
    '@type': 'JSON-LD properties'
  },
  {
    '@id': '@reverse',
    '@type': 'JSON-LD properties'
  },
]