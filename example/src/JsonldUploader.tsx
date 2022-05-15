import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { IconButton, Typography, Button, FormControl, TextField, Card, CardContent, CardHeader, Collapse, Snackbar,  List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import UploadIcon from '@mui/icons-material/CloudUpload';
import EditParamIcon from '@mui/icons-material/Link';
import LockFormParamIcon from '@mui/icons-material/Lock';
import WizardQuestionsIcon from '@mui/icons-material/LiveHelp';
// QuestionAnswer
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MuiAlert from '@mui/material/Alert';


export default function JsonldUploader({ renderObject, onChange }: any) {
  const theme = useTheme();
  
  const useStyles = makeStyles(() => ({
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
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    show_info_card: false,
    json_error_open: false,
    json_loaded_open: false,
    upload_jsonld: renderObject
    // upload_jsonld: JSON.stringify(renderObject, null, 4)
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update: any) => {
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
      onChange(state.upload_jsonld) 
      updateState({...state, json_loaded_open: true})
    } catch (e) {
      console.log("Invalid shape");
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
          title="Import your shape"
          subheader={"Paste your SHACL shape file content in the box, and submit it to generate a form for this shape."}
        />


        <Collapse in={state.show_info_card} timeout="auto" unmountOnExit>
          <CardContent>
            
            <form onSubmit={handleSubmit}>
              <FormControl className={classes.settingsForm}>

                <TextField
                  id='uploadJsonldInput'
                  label='Shape to upload'
                  placeholder='Shape to upload'
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
                    style={{ textTransform: 'none'}}
                    color="primary" >
                      Upload the shape
                  </Button>
                </div>
                <Snackbar open={state.json_error_open} onClose={closeJsonError} autoHideDuration={10000}>
                  <MuiAlert elevation={6} variant="filled" severity="error">
                    The shape provided is not valid ❌️
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={state.json_loaded_open} onClose={closeJsonLoaded} autoHideDuration={10000}>
                  <MuiAlert elevation={6} variant="filled" severity="info">
                    The shape has been loaded.
                  </MuiAlert>
                </Snackbar>
              </FormControl>
            </form>

          </CardContent>
        </Collapse>
      </Card>
  )
}

