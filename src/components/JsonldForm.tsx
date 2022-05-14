import React, { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material";
import DownloadJsonldIcon from '@mui/icons-material/Description';
// import axios from 'axios';
// const $rdf = require('rdflib')

import { Parser, Store } from 'n3';
// import { DataFactory, Parser } from 'n3';

import 'json-form-custom-element'

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github-dark-dimmed.css';

// @ts-ignore
import { shacl2jsonschema } from 'json-ld-editor-react'


// import Form from '@rjsf/material-ui/v5';
// import Form from 'react-jsonschema-form'

// import memdown from 'memdown';
// import {DataFactory} from 'rdf-data-factory';
// import {Quadstore} from 'quadstore';
// import {Engine} from 'quadstore-comunica';

// import { useLocation } from "react-router-dom";
// import { makeStyles } from '@mui/styles';
// import { Typography, Button, Card, FormControl, Snackbar, TextField } from "@mui/material";
// import MuiAlert from '@mui/material/Alert';
// // import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import DownloadJsonldIcon from '@mui/icons-material/Description';
// import UploadTriplestoreIcon from '@mui/icons-material/Share';
// import $rdf from 'rdflib';

// import * as jsonld from 'jsonld'
// import {$rdf} from 'rdflib'
// const jsonld = require('jsonld')

// import RenderObjectForm from "./RenderObjectForm";


type Props = {
  shape: string;
  target: string;
  value: object;
}


export const JsonldForm = ({ shape, target, value }: Props) => {
  const theme = useTheme();


  // const { namedNode, literal, defaultGraph, quad } = DataFactory;
  // const { namedNode } = DataFactory;
  // const shaclNs = "http://www.w3.org/ns/shacl#"
  // const sh = (prop: string) => {
  //   return namedNode(`${shaclNs}${prop}`)
  // }
  const parser = new Parser();
  const store = new Store();

  const [state, setState] = React.useState({
    store: store,
    prefixes: {},
    jsonld: {},
    generatedJsonld: {},
    jsonschema: {},
    jsonErrors: {},
    jsonValid: false,
    targetClass: '',
  });

  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update: any) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  

  useEffect(() => {
    hljs.registerLanguage('json', json);

    const jsonForm: any = document.getElementById(target);
    // const event = new CustomEvent('change');
    jsonForm.addEventListener("change", (event: any) => {
      handleChange(event);
    });

    // setTimeout(function() {
    //   jsonForm.dispatchEvent(event)
    // }, 2000);


    parser.parse(
      shape,
      (error: any, quad: any, prefixes: any) => {
        if (quad) {
          store.add(quad)
        } else {
          console.log("Prefixes:", prefixes);

          const {jsonschema, jsonld} = shacl2jsonschema(store, target, prefixes)

          console.log('🏁 Final JSON Schema generated for the SHACL shape:', jsonschema)
          updateState({
            prefixes: prefixes,
            jsonschema: jsonschema,
            jsonld: jsonld,
          })

        }
      });

  }, [])


  const handleGenerateRdf = (event: any) => {    
    event.preventDefault();
    updateState({
      generatedJsonld: {
        "@graph": [
          {...state.jsonld}
        ], 
        '@context': state.prefixes
      }
    })

    setTimeout(function() {
      hljs.highlightAll();
    }, 200);
  }

  const handleChange = (event: any) => {
    console.log("Handle Change:", event);
    updateState({
      jsonld: event.detail.value,
      jsonErrors: event.detail.errors,
      jsonValid: event.detail.isValid,
    })
  }


  return(
    <div>

      {/* @ts-ignore https://github.com/json-tools/json-form-custom-element */}
      <json-form
        id={target}
        schema={JSON.stringify(state.jsonschema)}
        // value={JSON.stringify(state.jsonld)}
        // value={`{}`}
        config={`{"collapseNestedObjects": false, "dense": true, "name": "json-form-${target}"}`}
        // @ts-ignore
      ></json-form>
      
      {/* More modern, react and mui based JSON schema form: https://github.com/rjsf-team/react-jsonschema-form/tree/master/packages/material-ui */}
      {/* But weird imports v4/v5 for mui not working properly */}
      {/* <Form schema={state.jsonschema}/> */}


      <div style={{width: '100%', textAlign: 'center'}}>
        <Button 
          onClick={handleGenerateRdf}
          variant="contained" 
          startIcon={<DownloadJsonldIcon />}
          color="primary" 
          style={{ textTransform: 'none', margin: theme.spacing(2, 2) }}
        >
            Generate JSON-LD
        </Button>
      </div>

      {/* Show generated JSON-LD */}
      { Object.keys(state.generatedJsonld).length > 0 && state.jsonValid &&
        <pre style={{whiteSpace: 'pre-wrap', margin: theme.spacing(0,0)}}>
          <code className="language-json">
            <>
              {JSON.stringify(state.generatedJsonld, null, 2)}
            </>
          </code>
        </pre>
      }

      {/* Show error JSON */}
      { Object.keys(state.generatedJsonld).length > 0 && !state.jsonValid &&
        <pre style={{whiteSpace: 'pre-wrap', margin: theme.spacing(0,0), backgroundColor: theme.palette.error.dark}}>
          <code className="language-json" style={{backgroundColor: theme.palette.error.dark}}>
            <>
              {JSON.stringify(state.jsonErrors, null, 2)}
            </>
          </code>
        </pre>
      }

    </div>
  )
}

