import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Box, Button, Chip, Tooltip, Grid, Paper, CircularProgress, Card, CardContent, CardHeader, Collapse, CardActions, List, ListItem, ListItemAvatar, Avatar, ListItemText, Snackbar } from "@material-ui/core";
import { IconButton, InputBase } from "@material-ui/core";
import UploadIcon from '@material-ui/icons/Publish';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import MenuItem from '@material-ui/core/MenuItem';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import { Graph } from "perfect-graph";

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
    fontSize: '14px',
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
              Upload&nbsp;
              {!state.show_info_card &&
                <ExpandMoreIcon />
              }
              {state.show_info_card &&
                <ExpandLessIcon />
              }
            </IconButton>
          }
          title="Provide your JSON-LD"
          subheader={"Upload your JSON-LD as a template, and edit it easily."}
        />


        <Collapse in={state.show_info_card} timeout="auto" unmountOnExit>
          <CardContent>
            {/* <Typography>
              Paste the JSON-LD you want to edit here:
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
                />

                {/* <RenderObjectForm renderObject={state.wizard_jsonld} 
                  onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld}); console.log(state.wizard_jsonld) } }
                /> */}

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
                    The JSON-LD provided is not valid
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={state.json_loaded_open} onClose={closeJsonLoaded} autoHideDuration={8000}>
                  <MuiAlert elevation={6} variant="filled" severity="success">
                    Your JSON-LD has been loaded
                  </MuiAlert>
                </Snackbar>
              </FormControl>
            </form>

          </CardContent>
        </Collapse>
      </Card>
  )
}

const test_jsonld = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "label": "ECJ case law text similarity analysis",
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
  }
}