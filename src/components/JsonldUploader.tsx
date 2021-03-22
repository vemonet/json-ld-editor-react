import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Typography, Button, FormControl, TextField, CircularProgress, Card, CardContent, CardHeader, Collapse, Snackbar,  List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import UploadIcon from '@material-ui/icons/CloudUpload';
import EditParamIcon from '@material-ui/icons/Link';
import LockFormParamIcon from '@material-ui/icons/Lock';
import WizardQuestionsIcon from '@material-ui/icons/LiveHelp';
// QuestionAnswer
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  input: {
    background: 'white',
    fontSize: '11px',
    fontFamily: 'monospace'
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
  fullWidth: {
    width: '100%',
  },
}))


export default function JsonldUploader({ renderObject, onChange }: any) {
  const classes = useStyles();
  const theme = useTheme();
  
  const [state, setState] = React.useState({
    show_info_card: false,
    json_error_open: false,
    json_loaded_open: false,
    upload_jsonld: JSON.stringify(renderObject, null, 4)
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ upload_jsonld: event.target.value})
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Call onChange function given by parent
      onChange(JSON.parse(state.upload_jsonld)) 
      updateState({...state, json_loaded_open: true})
    } catch (e) {
      console.log("Invalid JSON-LD");
      updateState({...state, json_error_open: true})
    }
  }

  // Close Snackbar
  const closeJsonError = () => {
    updateState({...state, json_error_open: false})
  };
  const closeJsonLoaded = () => {
    updateState({...state, json_loaded_open: false})
  };

  return(
    <Card style={{margin: theme.spacing(4,0)}}>
        <CardHeader
          style={{ textAlign: 'center'}}
          action={
            <IconButton style={{fontSize: '16px'}}
              onClick={() => { updateState({ show_info_card: !state.show_info_card}) }}
              name='show_info_card'
              aria-expanded={state.show_info_card}
              aria-label="show about"
            >
              Import&nbsp;
              {!state.show_info_card &&
                <ExpandMoreIcon />
              }
              {state.show_info_card &&
                <ExpandLessIcon />
              }
            </IconButton>
          }
          title="Import your JSON-LD"
          subheader={"Paste your JSON-LD file content in the box, and start to edit it easily."}
        />


        <Collapse in={state.show_info_card} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(1)}}>
              All <code>@type</code> values and properties <b>autocompletes are based on the classes and properties described in the ontology loaded</b>.
            </Typography>
            <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(1)}}>
              The main <code>@context</code> URL is used to automatically download the related ontology as JSON-LD, using Content-Negociation (with accept <code>application/ld+json</code>). 
            {/* </Typography>
            <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(1)}}> */}
              &nbsp;This feature has been tested with the <a href="https://schema.org" className={classes.link} target="_blank" rel="noopener noreferrer">Schema.org vocabulary</a> 
              , the <a href="http://www.w3.org/ns/csvw" className={classes.link} target="_blank" rel="noopener noreferrer">CSVW ontology</a>
              , the <a href="https://raw.githubusercontent.com/MaastrichtU-IDS/semanticscience/master/ontology/sio.owl" className={classes.link} target="_blank" rel="noopener noreferrer">SemanticScience ontology</a>
              , and the <a href="https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.ttl" className={classes.link} target="_blank" rel="noopener noreferrer">BioLink model</a>
            </Typography>
            <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(2)}}>
              Provide a URL to download your ontology as JSON-LD in the main <code>@context</code>, and feel free to <a href="https://github.com/MaastrichtU-IDS/fair-metadata-wizard/issues" className={classes.link} target="_blank" rel="noopener noreferrer">create an issue</a> on GitHub if the autocomplete does not work.
            </Typography>

            <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(0)}}>
              A few other features are available:
            </Typography>
            <List style={{marginTop: theme.spacing(0), marginBottom: theme.spacing(1)}}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WizardQuestionsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <b>Provide human-readable questions</b> for each property to fill with the <code>@wizardQuestions</code> special property, refer to the default JSON-LD to use it.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EditParamIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <b>Provide the URL of the JSON-LD to edit</b> with the <code>edit=http://myjsonld</code> URL parameter, convenient to send the right form to a collaborator, e.g. <a href="https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json" className={classes.link}>https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json</a>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LockFormParamIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <b>Lock the form</b> with the <code>toysrus=closed</code> URL parameter, to insure your users can't play around, and can only change the property values in the provided structure, e.g. <a href="https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json&toysrus=closed" className={classes.link}>https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json&toysrus=closed</a>
                </ListItemText>
              </ListItem>
            </List>
            {/* <Typography variant="body1" style={{textAlign: 'left', marginBottom: theme.spacing(3)}}>
              You can also provide the JSON-LD file URL directly via the <code>?edit=</code> parameter in the URL to send the right form to fill to a collaborator, e.g. <a href="https://maastrichtu-ids.github.io/fair-metadata-wizard?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json" className={classes.link}>https://maastrichtu-ids.github.io/fair-metadata-wizard/?edit=https://raw.githubusercontent.com/w3c/csvw/gh-pages/tests%2Ftest086-metadata.json</a>
            </Typography> */}

            <form onSubmit={handleSubmit}>
              <FormControl className={classes.settingsForm}>

                <TextField
                  id='uploadJsonldInput'
                  label='JSON-LD to upload'
                  placeholder='JSON-LD to upload'
                  value={state.upload_jsonld}
                  required
                  multiline
                  className={classes.fullWidth}
                  variant="outlined"
                  onChange={handleChange}
                  size='small'
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{ required: false }}
                />

                <div style={{width: '100%', textAlign: 'center'}}>
                  <Button type="submit" 
                    variant="contained" 
                    className={classes.saveButton} 
                    startIcon={<UploadIcon />}
                    color="secondary" >
                      Upload your JSON-LD
                  </Button>
                </div>
                <Snackbar open={state.json_error_open} onClose={closeJsonError} autoHideDuration={10000}>
                  <MuiAlert elevation={6} variant="filled" severity="error">
                    The JSON-LD provided is not valid ❌️
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={state.json_loaded_open} onClose={closeJsonLoaded} autoHideDuration={10000}>
                  <MuiAlert elevation={6} variant="filled" severity="info">
                    Your JSON-LD has been loaded. Trying to load the ontology from the URL provided in @context...
                  </MuiAlert>
                </Snackbar>
              </FormControl>
            </form>

          </CardContent>
        </Collapse>
      </Card>
  )
}

// https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.ttl

// https://raw.githubusercontent.com/MaastrichtU-IDS/semanticscience/master/ontology/sio.owl

const csvw_jsonld = {
  "@context": "http://www.w3.org/ns/csvw",
  "url": "tree-ops.csv",
  "tableSchema": {
    "columns": [{
      "@type": "Schema",
      "name": "GID",
      "titles": "GID"
    }, {
      "name": "on_street",
      "titles": "On Street"
    }, {
      "name": "species",
      "titles": "Species"
    }, {
      "name": "trim_cycle",
      "titles": "Trim Cycle"
    }, {
      "name": "inventory_date",
      "titles": "Inventory Date",
      "datatype": {"base": "date", "format": "M/d/yyyy"}
    }]
  }
}
