import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, Paper, Button, Card, Chip } from "@material-ui/core";
import { FormControl, TextField, Input, InputLabel, FormHelperText, Select } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';

import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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

  // https://github.com/kodymoodley/fair-metadata-generator/blob/main/questions.csv
  // Full output: https://github.com/kodymoodley/fair-metadata-html-page-generator/blob/main/testdata/inputdata/test.jsonld
  const [state, setState] = React.useState({
    open: false,
    dialogOpen: false,
    wizard_jsonld: {
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
          "word embeddings",
          "word2vec",
          "ecj",
          "cjeu",
          "EU court of justice",
          "citations"
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
                  "name": "Pedro Hernandez Serrano"
              },
              {
                  "@type": "Person",
                  "name": "Gijs van Dijck"
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
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  
  const handleSubmit  = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Trigger file download
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
  // const handleClose = () => {
  //   setState({...state, open: false})
  // };
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target);
  //   setState({...state, [event.target.id]: event.target.value})
  // }
  // const handleCategoryDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({...state, category_dropdown: event.target.value})
  // }
  // const handleStatusDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({...state, project_status: event.target.value})
  // }

  return(
    <Container className='mainContainer'>
      <Typography variant="h4" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        🧙‍♂️ FAIR metadata wizard
      </Typography>

      <Typography variant="body1" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        Quickly generates JSON-LD metadata for your datasets by filling a simple form
      </Typography>

      {/* <Typography variant="body1" style={{textAlign: 'left', marginLeft: '30px', marginBottom: '20px'}}>
        <br/>Your project will be automatically be added to the website tomorrow 📊
        <br/>N.B. your project needs to be in <a href="https://github.com/MaastrichtU-IDS" className={classes.link}>MaastrichtU-IDS organization</a> to be retrieved automatically, <a href="https://github.com/MaastrichtU-IDS/fair-metadata-wizard/issues" className={classes.link}>create an issue</a> if it is hosted under a different name, we will add it to the list of external repositories.
      </Typography> */}
      
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.settingsForm}>

          <RenderQuestion renderObject={state.wizard_jsonld} 
            onChange={(wizard_jsonld: any) => {updateState({wizard_jsonld}); console.log(state.wizard_jsonld) } }
          />

          <div style={{width: '100%', textAlign: 'center'}}>
            <Button type="submit" 
              // style={{width: '100%'}}
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



// Recursive component
const RenderQuestion = ({ renderObject, onChange }: any) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target);
    // setState({...state, [event.target.id]: event.target.value})
    renderObject[event.target.id] = event.target.value 
    onChange(renderObject) 
  }

  // const handleChange = (selectedOptionId: any): any => {
  //   // // is currently selected
  //   // if(renderObject[selectedOptionId]){
  //   //   // remove selected key from options list
  //   //   delete renderObject[selectedOptionId]; 
  //   // } else { // is not currently selected
  //   //   // Add selected key to optionsList
  //   //   renderObject[selectedOptionId] = {} 
  //   // }
  //   console.log(selectedOptionId);
  //   renderObject[selectedOptionId] = {} 
  //   // call onChange function given by parent
  //   onChange(renderObject) 
  //   // console.log('renderObject');
  //   // console.log(renderObject);
  // }
  
  const handleRecursiveChange = (property: any, subSelections: any) => {
    // console.log('property');
    // console.log(property);
    // console.log(subSelections);
    renderObject[property] = subSelections;
    // call onChange function given by parent
    onChange(renderObject);
  }
  
  const handleAddEntry = (property: any, event: any) => {
    if (renderObject[property].length > 0) {
      renderObject[property].push(renderObject[property][0]);
    } else {
      renderObject[property].push('New entry');
    }
    onChange(renderObject);
  }
  
  // function wizard_render(json_object):
  // Iterate properties in the given json_object
  // if property startsWith('@') > ignore
  // if property value = array > Create button to add entry
  // if property value = string or object with @value > Create TextInput
  // if property value = object > Create Card and call wizard_render(object)
  // https://betterprogramming.pub/recursive-rendering-with-react-components-10fa07c45456
  return (
    <div>
      {/* Object.keys(renderObject).map(...) */}
      {Object.keys(renderObject).map((property: any, key: number) => (
        <div key={key}>
          {/* if property is a string : TextInput */}
          {(typeof renderObject[property] === 'string' && renderObject[property]) &&
            <TextField
              id={property}
              label={property}
              placeholder={property}
              value={renderObject[property]}
              required
              // className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.input
              }}
              // InputLabelProps={{
              //   className: classes.normalFont
              // }}
              // inputRef={this.formSearchQuery}
              // defaultValue={triplestore.search_query}
            />
          }
          {/* if property is an array: RenderQuestion recursion */}
          {/* {(typeof renderObject[property] === 'array' && renderObject[property]) &&
            <Card elevation={2} className={classes.paperPadding}>
              <Typography variant="body2" style={{textAlign: 'left', marginBottom: theme.spacing(1), marginLeft: theme.spacing(2)}}>
                {property}
              </Typography>
              <RenderQuestion
                renderObject={renderObject[property]}
                onChange={(subSelections: any) => handleRecursiveChange(property, subSelections)}
              />
            </Card>
          } */}

          {/* if property is an object : RenderQuestion recursion */}
          {(typeof renderObject[property] === 'object' && renderObject[property]) &&
            <Card elevation={2} className={classes.paperPadding}>
              {/* <Typography variant="body1" style={{textAlign: 'left', fontWeight: 900, marginBottom: theme.spacing(1), marginLeft: theme.spacing(2)}}>
                {property}
              </Typography> */}
              <Chip label={property}  style={{fontWeight: 900, marginBottom: theme.spacing(2), marginLeft: theme.spacing(1)}} />
              { Array.isArray(renderObject[property]) &&
                  <Button onClick={(subSelections: any) => handleAddEntry(property, subSelections)}
                  // style={{width: '100%'}}
                  variant="contained" 
                  size="small"
                  className={classes.addEntryButton} 
                  startIcon={<AddIcon />}
                  color="primary" >
                    Add entry
                </Button>
              }
              <RenderQuestion
                renderObject={renderObject[property]}
                onChange={(subSelections: any) => handleRecursiveChange(property, subSelections)}
              />
            </Card>
          }
        </div>
      ))}
    </div>
  )
}





          {/* <Paper elevation={2} className={classes.paperPadding}>
            <Typography variant="h5" className={classes.paperTitle}>
              📋 Project informations
            </Typography>
            <FormHelperText id="helper-programming-language">Required fields are marked with an <b>*</b></FormHelperText>

            <FormControl size='small' variant="outlined" className={classes.fullWidth}>
              <InputLabel id="form-graph-overview-label">
                🗂️ Type of project *
              </InputLabel>
              <Select
                id="category_dropdown"
                // value={state.category_dropdown}
                onChange={handleCategoryDropdown}
                label="🗂️ Type of project *"
                autoWidth
              >
                <MenuItem value="Research">🧪 Research</MenuItem>
                <MenuItem value="Development">👨‍💻 Development</MenuItem>
                <MenuItem value="Education">🎓 Education</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText id="helper-graphs-overview">Is your project for <b>research</b>, <b>education</b>, or <b>development</b> of a tool?</FormHelperText>

            <FormControl size='small' variant="outlined" className={classes.fullWidth}>
              <InputLabel id="form-graph-overview-label">
                ✔️ Status of the project *
              </InputLabel>
              <Select
                id="project_status"
                // value={state.category_dropdown}
                onChange={handleStatusDropdown}
                label="✔️ Status of the project *"
                autoWidth
              >
                <MenuItem value="Active">🚀 Active</MenuItem>
                <MenuItem value="Inactive">🗑️ Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText id="helper-status">Is your project <b>actively used</b> or <b>inactive</b> of a tool?</FormHelperText>

            <TextField
              id="project_name"
              label="Project name"
              placeholder="Project name"
              required
              className={classes.fullWidth}
              onChange={handleChange}
              variant="outlined"
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_description"
              label="Project description"
              placeholder="Project description"
              required
              onChange={handleChange}
              className={classes.fullWidth}
              variant="outlined"
              multiline={true}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />

            <TextField
              id="project_license"
              label="⚖️ License URL"
              placeholder="⚖️ License URL"
              required
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <FormHelperText id="helper-sparql-endpoint">Provide the URL to the LICENSE file</FormHelperText>

            <Autocomplete
              multiple
              id="language_autocomplete"
              options={['Python', 'R', 'Java', 'JavaScript', 'TypeScript', 'React', 'Angular', 'VueJS', 'PHP', 'Drupal', 'Symfony', 'Ruby', 'Perl', 'Julia', 'Kubernetes', 'Scala', 'Go', 'Haskell', 'C', 'C#', 'C++', 'Objective-C', 'Cocoa', 'ActionScript', 'D', 'Delphi', 'Erlang', 'OCaml', 'Smalltalk', 'SVG', 'Tcl']}
              onChange={(event, newInputValue: any) => {
                setState({...state, 'language_autocomplete': newInputValue})
              }}
              // getOptionLabel={option => option.title}
              // defaultValue={[top100Films[13]]}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  size='small'
                  label="☕ Programming languages *"
                  placeholder="☕ Programming languages *"
                />
              )}
            />
            <FormHelperText id="helper-programming-language">Provide the different programming languages used in the project</FormHelperText>

          </Paper>

          <Paper elevation={2} className={classes.paperPadding}>
            <Typography variant="h5" className={classes.paperTitle}>
              🔗 Project links
            </Typography>
            <FormHelperText>
              Links to the resources of this project. 
            </FormHelperText>
            <TextField
              id="project_git_repository"
              label="💾 Git repository URL (GitHub/GitLab)"
              placeholder="💾 Git repository URL (GitHub/GitLab)"
              required
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_issues"
              label="🚧 Issue tracker URL"
              placeholder="🚧 Issue tracker URL"
              required
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_homepage"
              label="🏠 Project homepage URL"
              placeholder="🏠 Project homepage URL"
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_wiki"
              label="📖 Project wiki"
              placeholder="📖 Project wiki"
              onChange={handleChange}
              className={classes.fullWidth}
              variant="outlined"
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_downloadpage"
              label="📥 Project download page"
              placeholder="📥 Project download page"
              onChange={handleChange}
              className={classes.fullWidth}
              variant="outlined"
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_service_endpoint"
              label="🛩️ Service endpoint URL"
              placeholder="🛩️ Service endpoint URL"
              onChange={handleChange}
              className={classes.fullWidth}
              variant="outlined"
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_mailinglist"
              label="💬 Mailing list or community chat URL"
              placeholder="💬 Mailing list or community chat URL"
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />

          </Paper>
          <Paper elevation={2} className={classes.paperPadding}>
            <Typography variant="h5" className={classes.paperTitle}>
             👤 Contact details
            </Typography>
            <FormHelperText>
              Informations about the developers and responsibles of this project. 
            </FormHelperText>
            <TextField
              id="project_contributor_name"
              label="🏷️ Contributor name"
              placeholder="🏷️ Contributor name"
              required
              className={classes.fullWidth}
              onChange={handleChange}
              // defaultValue={triplestore.search_query}
              variant="outlined"
              // inputRef={this.formSearchQuery}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
            />
            <TextField
              id="project_contributor_email"
              label="📬 Contributor email"
              placeholder="📬 Contributor email"
              required
              className={classes.fullWidth}
              variant="outlined"
              onChange={handleChange}
              size='small'
              InputProps={{
                className: classes.normalFont
              }}
              InputLabelProps={{
                className: classes.normalFont
              }}
              // inputRef={this.formSearchQuery}
              // defaultValue={triplestore.search_query}
            />
          </Paper>

          <Typography variant="body1" style={{textAlign: 'center', marginBottom: '20px'}}>
            Feel free to manually add more <a href="https://vemonet.github.io/doap/class-doapproject.html" className={classes.link} target="_blank">DOAP project properties</a> or contributors after downloading the turtle file.
          </Typography>

          <div style={{width: '100%', textAlign: 'center'}}>
            <Button type="submit" 
              // style={{width: '100%'}}
              variant="contained" 
              className={classes.saveButton} 
              startIcon={<GetAppIcon />}
              color="secondary" >
                Download DOAP description file
            </Button>
          </div>

          <Snackbar open={state.open} onClose={handleClose} autoHideDuration={3000}>
            <MuiAlert elevation={6} variant="filled" severity="success">
              Thanks!
            </MuiAlert>
          </Snackbar> */}