import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
  normalFont: {
    fontSize: '14px',
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


export default function About() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    dialogOpen: false,
    project_license: '',
    language_autocomplete: [],
  });
  // const form_category_dropdown = React.createRef(); 

  return(
    <Container className='mainContainer'>
        {/* <Typography variant="h4" style={{textAlign: 'center', marginBottom: '20px'}}>
          About
        </Typography> */}

      <Typography variant="body1" style={{textAlign: 'center', marginBottom: '20px'}}>
        A wizard to generate Schema.org metadata for datasets in RDF JSON-LD format.
      </Typography>

      {/* image: {iconImage} */}
      {/* Color: https://perfectgraph-5c619.web.app/?path=/story/components-components--view */}
      {/* <Graph
        style={{ width: '100%', height: 250 }}
        nodes={[
          {
            id: 1,
            position: { x: 10, y: 10 },
            data: {
              name: 'Institute of Data Science',
              image: 'https://raw.githubusercontent.com/vemonet/json-ld-editor-react/main/assets/icon.png',
              story: `Develop responsible data science by design to accelerate discovery across all sectors of society.`,
              color: 'grey'
            }
          },
          {
            id: 2,
            position: { x: 600, y: 10 },
            data: {
              name: 'Maastricht University',
              image: 'https://raw.githubusercontent.com/vemonet/json-ld-editor-react/main/assets/icon.png',
              story: `The most international university in the Netherlands, stands out for its innovative education model, and multidisciplinary approach to research and education.`,
              color: 'grey'
            }
          },
        ]}
        edges={[
          { id: 51, source: 1, target: 2 }
        ]}
        renderNode={({ item: { data } }) => (
        <Graph.ProfileTemplate
          name={data.name}
          image={data.image}
          story={data.story}
          style={{ backgroundColor: '#eceff1' }}
        />
      )}
      /> */}
      
      

    </Container>
  )
}