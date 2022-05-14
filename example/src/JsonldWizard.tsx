import React from 'react';
import { useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Typography, Container, Button, Card, FormControl, Snackbar, TextField } from "@mui/material";
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import DownloadJsonldIcon from '@mui/icons-material/Description';
// import UploadTriplestoreIcon from '@mui/icons-material/Share';
import axios from 'axios';
const $rdf = require('rdflib')
// import { LoggedIn, LoggedOut, Value } from '@solid/react';
// import * as jsonld from 'jsonld'
// import {$rdf} from 'rdflib'
// const jsonld = require('jsonld')

// import JsonldUploader from "../../src/components/JsonldUploader";
// import CsvUploader from "../../src/components/CsvUploader";
// import RenderObjectForm from "../../src/components/RenderObjectForm";

// @ts-ignore
import { JsonldForm } from 'json-ld-editor-react';
// import { JsonldEditor, JsonldForm } from 'json-ld-editor-react';


export default function JsonldWizard() {

  // TODO: use sx https://github.com/mui/material-ui/blob/master/examples/create-react-app-with-typescript/src/index.tsx
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
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
  const classes = useStyles();
  
  // useLocation hook to get URL params
  // let location = useLocation();  
  const [state, setState] = React.useState({
    open: false,
    dialogOpen: false,
    wizard_jsonld: wizard_jsonld,
    csvwColumnsArray: [],
    jsonld_uri_provided: null,
    ontology_jsonld: {},
    edit_enabled: true,
    ontoload_error_open: false,
    ontoload_success_open: false,
    sparql_endpoint: '',
    sparql_username: '',
    sparql_password: '',
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update: any) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  
  // Original form and output:
  // Questions: https://github.com/kodymoodley/fair-metadata-generator/blob/main/questions.csv
  // Full output: https://github.com/kodymoodley/fair-metadata-html-page-generator/blob/main/testdata/inputdata/test.jsonld

  // React.useEffect(() => {
  //   // Get the edit URL param if provided, and download ontology if @context changed
  //   // Ontology is stored in state.ontology_jsonld 
  //   // and passed to renderObjectForm to resolve classes and properties
  //   const params = new URLSearchParams(location.search + location.hash);
  //   let jsonld_uri_provided = params.get('edit');
  //   let editionEnabled = params.get('toysrus');
  //   if (editionEnabled === 'closed') {
  //     // Disable edit if toysrus=closed
  //     updateState({ edit_enabled: false })
  //   }
  //   if (jsonld_uri_provided) {
  //     axios.get(jsonld_uri_provided)
  //       .then(res => {
  //         updateState({
  //           wizard_jsonld: res.data,
  //           jsonld_uri_provided: jsonld_uri_provided,
  //         })
  //         downloadOntology(res.data['@context'])
  //       })
  //   } else {
  //     downloadOntology(state.wizard_jsonld['@context'])
  //   }
    
  // }, [state.wizard_jsonld['@context']])

  const downloadOntology  = (contextUrl: string) => {
    // Download the ontology JSON-LD 
    if (!contextUrl) {
      // Handle when no @context provided, use schema.org by default
      contextUrl = 'https://schema.org/'
      // if (!state.wizard_jsonld['@context']) updateState({...state.wizard_jsonld, '@context': contextUrl})
      console.log('No @context provided, using schema.org by default');
    }
    if (contextUrl.startsWith('https://schema.org') || contextUrl.startsWith('https://schema.org')) {
      // Schema.org does not enable content-negociation 
      contextUrl = 'https://schema.org/version/latest/schemaorg-current-https.jsonld'
    }
    if (contextUrl.startsWith('http://')) {
      // Resolving http:// ontologies is prevented by mixed active content (query http from https)
      // We would need to deploy on our own DNS to use http (https is forced on github.io URLs)
      contextUrl = contextUrl.replace('http://', 'https://')
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
          // TODO: support other types than just RDF/XML
          toJSONLD(res.data, contextUrl)
            .then((jsonld_rdf) => {
              console.log('Ontology downloaded, and converted to JSON-LD RDF:');
              console.log(jsonld_rdf);
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
  }

  const toJSONLD = (data: any, uri: any) => {
    // Convert RDF to JSON-LD using rdflib
    let rdf_format = 'application/rdf+xml';
    if (uri.endsWith('.ttl')) rdf_format = 'text/turtle'
    if (uri.endsWith('.nq')) rdf_format = 'application/n-quads'
    // Or text/x-nquads
    if (uri.endsWith('.nt')) rdf_format = 'application/n-triples'
    if (uri.endsWith('.n3')) rdf_format = 'text/n3'
    if (uri.endsWith('.trig')) rdf_format = 'application/trig'
    return new Promise((resolve, reject) => {
        let store = $rdf.graph()
        let doc = $rdf.sym(uri);
        $rdf.parse(data, store, uri, rdf_format)
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
    // Trigger JSON-LD file download
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

  // Close Snackbars
  const closeOntoloadError = () => {
    updateState({...state, ontoload_error_open: false})
  };
  const closeOntoloadSuccess = () => {
    updateState({...state, ontoload_success_open: false})
  };

  // Handle TextField changes for SPARQL endpoint upload
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({[event.target.id]: event.target.value})
  }
  const handleUploadToSparql  = (event: any) => {
    // TODO: Use UpdateManager.update? Or iterate store and generate INSERT
    // https://github.com/linkeddata/rdflib.js/issues/310
    // var friends = store.each(me, FOAF('knows'), undefined)
    // for (var i=0; i<friends.length;i++) {
    //     friend = friends[i]
    //     console.log(friend.uri) // the WebID of a friend
    //     ...
    // }
    // https://github.com/MaastrichtU-IDS/translator-openpredict/blob/master/openpredict/rdf_utils.py#L58
    // Then run POST query providing username and password
    event.preventDefault();
    console.log('Uploading RDF to: ' + state.sparql_endpoint);
    console.log('With username: ' + state.sparql_username);
    console.log('With password: ' + state.sparql_password);
    console.log('WORK IN PROGRESS: triplestore upload currently not implemented');
  }

  return(
    <Container className='mainContainer'>

      {/* <Typography variant="h4" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        🧙‍♂️ FAIR Metadata Wizard, a JSON-LD editor 📝
      </Typography> */}
      
      {/* <Typography variant="body1" style={{textAlign: 'center', marginBottom: theme.spacing(1)}}>
        Load and edit <a href="https://json-ld.org/" className={classes.link} target="_blank" rel="noopener noreferrer">JSON-LD</a> <a href="https://en.wikipedia.org/wiki/Resource_Description_Framework" className={classes.link} target="_blank" rel="noopener noreferrer">RDF</a> files in a user-friendly web interface, with autocomplete based on the classes and properties of the ontology magically loaded from <code>@context</code> ✨️
      </Typography> */}
      
      {/* <JsonldEditor /> */}

      <JsonldForm 
        shape={shaclShape} 
        target="http://purl.org/hcls-metadata-spec/HCLSDistributionShape" 
      />

    </Container>
  )
}


// SHACL shapes examples:
// Articles: https://raw.githubusercontent.com/NCATS-Gamma/omnicorp/master/shacl/omnicorp-shapes.ttl

const shaclShape = `@prefix : <http://purl.org/hcls-metadata-spec/> .
@prefix dctypes: <http://purl.org/dc/dcmitype/> .
@prefix schemaorg: <http://schema.org/> .
@prefix void:  <http://rdfs.org/ns/void#> .
@prefix pav:   <http://purl.org/pav/> .
@prefix freq:  <http://purl.org/cld/freq/> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix void-ext: <http://ldf.fi/void-ext#> .
@prefix cito:  <http://purl.org/spar/cito/> .
@prefix idot:  <http://identifiers.org/idot/> .
@prefix sd:    <http://www.w3.org/ns/sparql-service-description#> .
@prefix dct:   <http://purl.org/dc/terms/> .
@prefix sh:    <http://www.w3.org/ns/shacl#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix sio:   <http://semanticscience.org/resource/> .
@prefix lexvo: <http://lexvo.org/id/iso639-3/> .
@prefix dcat:  <http://www.w3.org/ns/dcat#> .
@prefix prov:  <http://www.w3.org/ns/prov#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .

## See the HCLS dataset metadata specs at https://www.w3.org/TR/hcls-dataset
# This SHACL shape validates most MUST and SHOULD properties for HCLS dataset summary, version and distribution (regular and RDF)
# Missing MUST properties generate a Violation
# Missing SHOULD properties generate a Warning
# Other issues are reported as Info
# This shape has predefined targets to validate (classes, subject and/or object).


:HCLSDistributionShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI ;
    sh:targetClass dcat:Distribution ;
    sh:targetObjectsOf dcat:distribution ;
    sh:severity sh:Info ;

    sh:property [
        sh:path dct:title ;
        sh:name "Title" ;
        sh:description "Title of the distribution" ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
        sh:nodeKind sh:Literal
    ] ;
    sh:property [
        sh:path dct:language ;
        sh:severity sh:Warning ;
        sh:name "Language" ;
        sh:description "Language of the distribution" ;
        sh:message "Distribution SHOULD use dct:language with a lexvo URI: http://lexvo.org/id/iso639-3/{tag}" ;
        sh:nodeKind sh:IRI
    ] ;
    sh:property [
        sh:path dct:creator ;
        sh:severity sh:Violation ;
        sh:name "Creator" ;
        sh:description "Creator of the distribution" ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;

    .



:HCLSAgentShape
    a sh:NodeShape ;
    sh:targetClass dct:Agent ;
    sh:nodeKind sh:IRI ;
    
    sh:property [
        sh:path dct:title ;
        sh:name "Title" ;
        sh:description "Title of the agent" ;
        sh:severity sh:Violation ;
        sh:minCount 1 ;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
        sh:nodeKind sh:Literal ;
    ] 
    .

`


const fullShaclShape = `@prefix : <http://purl.org/hcls-metadata-spec/> .
@prefix dctypes: <http://purl.org/dc/dcmitype/> .
@prefix schemaorg: <http://schema.org/> .
@prefix void:  <http://rdfs.org/ns/void#> .
@prefix pav:   <http://purl.org/pav/> .
@prefix freq:  <http://purl.org/cld/freq/> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix void-ext: <http://ldf.fi/void-ext#> .
@prefix cito:  <http://purl.org/spar/cito/> .
@prefix idot:  <http://identifiers.org/idot/> .
@prefix sd:    <http://www.w3.org/ns/sparql-service-description#> .
@prefix dct:   <http://purl.org/dc/terms/> .
@prefix sh:    <http://www.w3.org/ns/shacl#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix sio:   <http://semanticscience.org/resource/> .
@prefix lexvo: <http://lexvo.org/id/iso639-3/> .
@prefix dcat:  <http://www.w3.org/ns/dcat#> .
@prefix prov:  <http://www.w3.org/ns/prov#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .

## See the HCLS dataset metadata specs at https://www.w3.org/TR/hcls-dataset
# This SHACL shape validates most MUST and SHOULD properties for HCLS dataset summary, version and distribution (regular and RDF)
# Missing MUST properties generate a Violation
# Missing SHOULD properties generate a Warning
# Other issues are reported as Info
# This shape has predefined targets to validate (classes, subject and/or object).


:HCLSDistributionShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI ;
    sh:targetClass dcat:Distribution ;
    sh:targetObjectsOf dcat:distribution ;
    sh:severity sh:Info ;

    sh:property [
        sh:path dct:title ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] )
    ] ;
    sh:property [
        sh:path dct:description ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
    ] ;
    sh:property [
        sh:path dct:format ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:node [ sh:nodeKind sh:IRI ] ] ) ;
    ] ;

    sh:property [
        sh:path dcat:accessURL ;
        sh:minCount 0;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path dct:created ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:dateTime ] [ sh:datatype xsd:date ] [ sh:datatype xsd:gYearMonth ] [ sh:datatype xsd:gYear ] ) ;
    ] ;
    sh:property [
        sh:path dct:creator ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;
    sh:property [
        sh:path dct:publisher ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;
    sh:property [
        sh:path dct:issued ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:dateTime ] [ sh:datatype xsd:date ] [ sh:datatype xsd:gYearMonth ] [ sh:datatype xsd:gYear ] ) ;
    ] ;
    sh:property [
        sh:path dct:license ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path dct:language ;
        sh:severity sh:Warning ;
        sh:message "Distribution SHOULD use dct:language with a lexvo URI: http://lexvo.org/id/iso639-3/{tag}" ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path pav:createdWith ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:message "Distribution SHOULD provide the data source provenance with dct:source, pav:retrievedFrom or prov:wasDerivedFrom" ;
        sh:or ( 
            [ sh:path dct:source ; sh:minCount 1 ] 
            [ sh:path pav:retrievedFrom ; sh:minCount 1 ] 
            [ sh:path prov:wasDerivedFrom ; sh:minCount 1 ] 
        ) ;
        sh:severity sh:Warning ;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;

    .



:HCLSRDFDistributionShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI ;
    sh:targetClass void:Dataset ;
    ## SHACL web services don't support SHACL "advanced features": https://www.w3.org/TR/shacl-af/#SPARQLTarget
    # sh:target [
	# 	a void:Dataset 
    #   sh:not [ a void:Linkset ]
	# ] ;
    # sh:target [
    #     a sh:SPARQLTarget ;
    #     sh:prefixes void: ;
    #     sh:select """
    #     SELECT ?this 
    #     WHERE {
    #         ?this a void:Dataset .
    #         FILTER NOT EXISTS { ?this a void:Linkset }
    #     }
    #     """ ;
    # ] ;

    sh:severity sh:Info ;

    sh:property [
        sh:path void:subset ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    # Check for HCLS descriptive statistics
    sh:property [
        sh:path void:triples ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:datatype xsd:integer
    ] ;
    sh:property [
        sh:path void:entities ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:datatype xsd:integer
    ] ;
    sh:property [
        sh:path void:distinctSubjects ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:datatype xsd:integer
    ] ;
    sh:property [
        sh:path void:properties ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:datatype xsd:integer
    ] ;
    sh:property [
        sh:path void:distinctObjects ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:datatype xsd:integer
    ] ;
    sh:property [
        sh:path void:classPartition ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:BlankNodeOrIRI ]
    ] ;

    .



:HCLSVersionShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI ;
    sh:targetSubjectsOf dcat:distribution, dct:isVersionOf ;
    sh:severity sh:Info ;

    sh:property [
        sh:path dct:title ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
    ] ;
    sh:property [
        sh:path dct:description ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
    ] ;
    sh:property [
        sh:path dct:created ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:dateTime ] [ sh:datatype xsd:date ] [ sh:datatype xsd:gYearMonth ] [ sh:datatype xsd:gYear ] ) ;
    ] ;
    sh:property [
        sh:path dct:issued ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:dateTime ] [ sh:datatype xsd:date ] [ sh:datatype xsd:gYearMonth ] [ sh:datatype xsd:gYear ] ) ;
    ] ;
    sh:property [
        sh:path dct:creator ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;
    sh:property [
        sh:path dct:publisher ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;
    sh:property [
        sh:path dct:license ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path dct:language ;
        sh:severity sh:Warning ;
        sh:message "Version SHOULD use dct:language with a lexvo URI: http://lexvo.org/id/iso639-3/{tag}" ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path pav:version ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:datatype xsd:string
    ] ;

    sh:property [
        sh:path dct:isVersionOf ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSSummaryShape
    ] ;
    sh:property [
        sh:path dcat:distribution ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node :HCLSDistributionShape
    ] ;
    sh:property [
        sh:path pav:createdWith ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:message "Version SHOULD provide the data source provenance using dct:source, pav:retrievedFrom or prov:wasDerivedFrom" ;
        sh:or ( 
            [ sh:path dct:source ; sh:minCount 1 ] 
            [ sh:path pav:retrievedFrom ; sh:minCount 1 ] 
            [ sh:path prov:wasDerivedFrom ; sh:minCount 1 ] 
        ) ;
        sh:severity sh:Warning ;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;

    .



:HCLSSummaryShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI ;
    sh:targetObjectsOf dct:isVersionOf ;
    sh:severity sh:Info ;

    sh:property [
        sh:path dct:title ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
    ] ;
    sh:property [
        sh:path dct:description ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:or ( [ sh:datatype xsd:string ] [ sh:datatype rdf:langString ] ) ;
    ] ;
    sh:property [
        sh:path dct:publisher ;
        sh:severity sh:Violation ;
        sh:minCount 1;
        sh:node :HCLSAgentShape
    ] ;
    sh:property [
        sh:path foaf:page ;
        sh:severity sh:Warning ;
        sh:minCount 0;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path dct:accrualPeriodicity ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;
    sh:property [
        sh:path void:sparqlEndpoint ;
        sh:severity sh:Warning ;
        sh:minCount 1;
        sh:node [ sh:nodeKind sh:IRI ]
    ] ;

    ## This will trigger an InternalError due to too much recursion:
    # sh:property [
    #     sh:path pav:hasCurrentVersion ;
    #     sh:severity sh:Info ;
    #     sh:minCount 1;
    #     sh:node :HCLSVersionShape
    # ] ;
    
    .



:HCLSAgentShape
    a sh:NodeShape ;
    sh:nodeKind sh:IRI .`

    
const wizard_jsonld = {
  "@context": "https://schema.org",
  "@wizardQuestions": {
    'name': 'Provide the name of this entity:',
    'description': 'Give a short description of the content:',
    'creator': 'Provide the details of the person who created, or initiated, the creation of this work:',
    'contributor': 'Other persons who contributed to, or co-authored, the dataset:',
    'publisher': 'Person, or organization, who published this work:',
    'inLanguage': 'What language is used in the description of this dataset? Use ISO 2 language code e.g. EN for English',
    'version': 'What is the version number for this dataset? e.g. 1.1.1 or v1.2',
    'license': 'Link to the full text of the terms of use (license) for this dataset:',
    'encodingFormat': 'What is the file format of this data?',
    'url': 'Link to the website or homepage:',
    'temporalCoverage': 'What is the creation or publishing date range for the documents or contents of this dataset? Use https://en.wikipedia.org/wiki/ISO_8601#Time_intervals format - e.g. 2007-03-01/2008-05-11:',
    'keywords': 'Provide keywords describing the content in this dataset:',
    'distribution': 'Supply a direct download link for this dataset:',
    'contentSize': 'How large is the download file size e.g. 128KB, 54MB, 1.5GB?',
    'isBasedOn': 'Was this dataset generated with the aid of or using a piece of software?',
    'applicationCategory': 'Indicate type of software e.g. Python script or Java GUI application:',
    'citation': 'Is there an academic publication which describes or centrally makes use of this dataset?',
    'datePublished': 'On what date was the dataset published? YYYY-MM-DD',
    'dateCreated': 'On what date was the dataset created? YYYY-MM-DD',
    'affiliation': 'This person is affiliated to or employed by:',
    'logo': 'Link to an image depicting the logo of this organisation:',
    'image': 'Provide a link (URL) to a profile photo of the author of the dataset:',
    'sameAs': 'Provide a Digital Object Identifier (DOI) for this publication:',
    'frequency': 'How often does a new version get published for this dataset? e.g. daily, weekly, monthly',
    // 'encodingFormat': 'What is the download file format e.g. Zip archive, CSV file, JSON file etc:',
  },
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