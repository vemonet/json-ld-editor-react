import React, { useEffect } from 'react';

import { Parser, Store } from 'n3';
// import { DataFactory, Parser } from 'n3';

import 'json-form-custom-element'

// import hljs from 'highlight.js/lib/core';
// import json from 'highlight.js/lib/languages/json';
// import 'highlight.js/styles/github-dark-dimmed.css';

// @ts-ignore
import { shacl2jsonschema } from 'json-ld-editor-react'

// import Form from '@rjsf/material-ui/v5';
// import Form from 'react-jsonschema-form'


type Props = {
  shape: string;
  target: string;
  value: object;
}


export const JsonldForm = ({ shape, target, value }: Props) => {
  // const theme = useTheme();

  const parser = new Parser();
  const store = new Store();

  const [state, setState] = React.useState({
    shape: shape,
    store: store,
    prefixes: {},
    jsonld: {},
    generatedJsonld: {},
    jsonschema: {},
    jsonErrors: {},
    jsonValid: false,
    showJsonld: false,
    targetClass: '',
    showJsonBtnHover: false,
  });

  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update: any) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);
  

  useEffect(() => {
    // hljs.registerLanguage('json', json);

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

  }, [shape])


  const handleShowJsonld = (event: any) => {    
    event.preventDefault();
    updateState({showJsonld: !state.showJsonld})

    // setTimeout(function() {
    //   hljs.highlightAll();
    //   // const blocks: any = document.querySelectorAll('pre code');
    //   // blocks.forEach(hljs.highlightBlock);
    // }, 200);
  }

  const handleChange = (event: any) => {
    console.log("Handle Change:", event);
    updateState({
      jsonld: event.detail.value,
      jsonErrors: event.detail.errors,
      jsonValid: event.detail.isValid,
    })
    // if (state.showJsonld) {
    //   hljs.highlightAll();
    // }
    // const blocks: any = document.querySelectorAll('pre code');
    // blocks.forEach(hljs.highlightBlock);
    console.log('Has jsonld changed after handleChange?', state.jsonld)
  }

  const jsonFormConfig = {
    "collapseNestedObjects": false, 
    "dense": true, 
    "name": `json-form-${target}`,
    // "textFieldStyle": "filled",
    "customCss": customCss
  }

  return(
    <div>

      {/* @ts-ignore https://github.com/json-tools/json-form-custom-element */}
      <json-form
        id={target}
        schema={JSON.stringify(state.jsonschema)}
        config={JSON.stringify(jsonFormConfig)}
        // value={JSON.stringify(state.jsonld)}
        // value={`{}`}
        // config={`{"collapseNestedObjects": false, "dense": true, "name": "json-form-${target}"}`}
        // @ts-ignore
      ></json-form>
      
      {/* More modern, react and mui based JSON schema form: https://github.com/rjsf-team/react-jsonschema-form/tree/master/packages/material-ui */}
      {/* But weird imports v4/v5 for mui not working properly */}
      {/* <Form schema={state.jsonschema}/> */}


      <div style={{width: '100%', textAlign: 'center', marginTop: '16px'}}>
        {/* <Button 
          onClick={handleShowJsonld}
          variant="contained" 
          startIcon={<DownloadJsonldIcon />}
          color="primary" 
          style={{ textTransform: 'none', margin: theme.spacing(2, 2) }}
        >
            Generate JSON-LD
        </Button> */}

        {/* https://stackoverflow.com/questions/56646500/add-hover-effect-to-react-div-using-inline-styling */}
        <button
          onClick={handleShowJsonld}
          // style={styles.btn}
          style={{
            color:'#00251a',
            background: '#80cbc4', // Teal
            border: '0.1em solid #4f9a94',
            borderRadius: '0.30em',
            display: 'inline-block',
            padding: '0.35em 1.2em',
            margin: '0 0.3em 0.3em 0',
            textDecoration: 'none',
            fontWeight: '400',
            transition: 'all 0.2s',
            ...(state.showJsonBtnHover && { cursor: 'pointer',background: "#4f9a94" }),
          }}
          onMouseEnter={() => {updateState({showJsonBtnHover: true})}}
          onMouseLeave={() => {updateState({showJsonBtnHover: false})}}
          // style={{ textTransform: 'none', margin: theme.spacing(2, 2) }}
        >
          {state.showJsonld ? '🥷 Hide' : '🔦 Show generated'} JSON-LD
        </button>
      </div>

      {/* Show generated JSON-LD */}
      {/* { Object.keys(state.generatedJsonld).length > 0 && state.jsonValid && */}
      { state.showJsonld && state.jsonValid &&
        // <pre style={{whiteSpace: 'pre-wrap', margin: theme.spacing(0,0)}}>
        <pre style={{whiteSpace: 'pre-wrap', background: '#22272e', border: '0.2em solid #80cbc4'}}>
          <code className="language-json" style={{background: '#22272e', color: '#b0bec5'}}>
            <>
              {JSON.stringify({ 
                "@graph": [ {...state.jsonld} ], 
                '@context': state.prefixes
              }, null, 2)}
            </>
          </code>
        </pre>
      }

      {/* Show error JSON */}
      { state.showJsonld && !state.jsonValid &&
        <pre style={{whiteSpace: 'pre-wrap', background: '#7f0000'}}>
          {/* <code className="language-json" style={{backgroundColor: '#7f0000'}}> */}
          <code style={{background: '#7f0000'}}>
            {JSON.stringify(state.jsonErrors, null, 2)}
          </code>
        </pre>
      }

    </div>
  )
}

// const styles = {
//   btn: {
//     // color:'#FFFFFF',
//     color:'#00251a',
//     backgroundColor: '#80cbc4', // Teal
//     border: '0.1em solid #4f9a94',
//     borderRadius: '0.30em',

//     display: 'inline-block',
//     padding: '0.35em 1.2em',
//     margin: '0 0.3em 0.3em 0',
//     textDecoration: 'none',
//     fontWeight: '400',
//     transition: 'all 0.2s',

//     // fontFamily: 'Roboto,sans-serif',
//     // boxSizing: 'border-box',
//     // textAlign:'center',
//     // '&:hover': {
//     //   color: '#000000',
//     //   cursor: 'pointer',
//     //   background: "#4f9a94",
//     // },
//   },
// }


// Unfortunately, the easiest way I found to get the custom CSS in the component 
// is to have it has a string here
// It mainly make the original style more compact
const customCss = `
:root {
  --color-active: #27b9cc;
  --color-inactive: #8a8a8a;
  --color-invalid: #d95559;
  --color-active--054: #8fd9e3;
  box-sizing: border-box;
  --form-background: #fafafa;
  --nested-object-padding: 0px;
  --expandable-section-padding: 0 20px;
}

.app-topbar {
background-color: var(--color-mono--700);
color: var(--color-mono--300);
font-size: 14px;
}

.app-content {
padding: 16px;
}

.example-section {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.example-section__heading {
  font-size: 24px;
  margin: 30px 0;
  text-align: center;
}

.example-section__content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.example-section__content > * {
  margin-bottom: 20px;
  max-width: 350px;
}

@media (min-width: 400px) {
}

@media (min-width: 730px) {
  .example-section__content {
      flex-direction: row;
      align-items: initial;
  }

  .example-section__content > * {
      margin-right: 20px;
      max-width: unset;
  }

  .example-section__heading {
      text-align: left;
  }
}

@media (min-width: 4080px) {

  .example-section__content {
      flex-direction: row;
      align-items: initial;
  }

  .example-section__content > * {
      margin-right: 50px;
  }

  .example-section__heading {
      text-align: left;
  }
}

.jf-checkbox {
  width: 280px;
  max-width: 100%;
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 0;
  font-size: 16px;
  vertical-align: top;
}

.jf-checkbox__input {
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
  position: absolute;
  border: 0;
  appearance: none;
  opacity: 0;
}

.jf-checkbox__label {
  cursor: pointer;
}

.jf-checkbox__box-outline {
  width: 16px;
  height: 16px;
  position: absolute;
  top: calc(50% - 8px);
  right: 2px;
  border-radius: 2px;
  border: 2px solid #0000008a;
  cursor: pointer;
  z-index: 2;
}

.jf-checkbox__tick-outline {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: 0 0;
  transition-duration: .28s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-property: background;
}

.jf-checkbox--on .jf-checkbox__tick-outline {
  background: var(--color-active) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K);
}

.jf-checkbox--on .jf-checkbox__box-outline {
  border: 2px solid var(--color-active);
}

.jf-checkbox__helper-text {
  font-size: 11px;
  padding-top: 4px;
  padding-right: 44px;
  color: rgba(0, 0, 0, 0.54);
}

.jf-checkbox--invalid .jf-checkbox__helper-text {
  color: var(--color-red--500);
}

.jf-checkbox--disabled .jf-checkbox__label,
.jf-checkbox--disabled .jf-checkbox__helper-text {
  color: var(--color-inactive);
  cursor: default;
}

.jf-checkbox--disabled .jf-checkbox__tick-outline {
  background-color: var(--color-inactive);
}

.jf-checkbox--disabled .jf-checkbox__box-outline {
  border-color: var(--color-inactive);
  cursor: default;
}

/* HOVER */
.jf-checkbox__box-outline:after {
  background-color: lightgrey;
  content: '';
  width: 20px;
  height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  opacity: 0;
  border-radius: 50%;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}

.jf-checkbox:hover .jf-checkbox__box-outline:after {
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  opacity: 0.2;
}

.jf-checkbox:active .jf-checkbox__box-outline:after {
  opacity: 0.4;
}

.jf-checkbox--on .jf-checkbox__box-outline:after {
  background-color: var(--color-active);
}

.jf-checkbox--disabled:hover .jf-checkbox__box-outline:after {
  opacity: 0;
}

.jf-checkbox--disabled {
  opacity: 0.54;
}

:host {
  --font-family: helvetica, sans-serif;
  --color-active: #27b9cc;
  --color-active--054: #8fd9e3;
  --color-inactive: #8a8a8a;
  --color-invalid: #c72227;
  --form-background: #fafafa;
  box-sizing: border-box;
}

.card {
  box-shadow: 0 1px 1px 0 rgba(60,64,67,.08),0 1px 3px 1px rgba(60,64,67,.16);
  border-radius: 4px;
  overflow: hidden;
  max-width: 500px;
}

.card__title {
  font-size: 16px;
  display: block;
  padding: 10px;
}

.array-item-add {
  padding: 16px;
}

.array-item-add .button {
  font-size: 16px;
}

.jf-object {
}

.jf-json-form {
  background: var(--form-background);
}

.jf-heading {
  font-size: 16px;
  padding: 0;
  padding-top: 10px;
  padding-bottom: 0px;
}

.jf-heading--expandable {
  cursor: pointer;
  font-size: 19px;
  margin-left: -20px;
}

.jf-heading--expandable:before {
  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'><polyline points='9 18 15 12 9 6'></polyline></svg>");
  padding: 4px;
}

.jf-heading--expandable.jf-heading--expanded {
}

.jf-heading--expandable.jf-heading--expanded:before {
  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'><polyline points='6 9 12 15 18 9'></polyline></svg>");
}

.jf-section--expandable {
  /* padding: var(--expandable-section-padding); */
}

.jf-section {
  padding-left: 20px;
}
.jf-element {
  display: inline-flex;
  flex-direction: column;
  margin-top: 12px;
  margin-right: 16px;
  max-width: 300px;
}

.jf-element--hidden {
  display: none;
}

.jf-helper-text {
  margin-top: 3px;
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.54);
  box-sizing: border-box;
  font-size: 10px;
}

.jf-element--invalid .jf-helper-text {
  color: var(--color-invalid);
}
.json-view {
  width: 100%;
  line-height: 1.3;
  padding: 10px;
  /* background: #002b36; */
  background: #fdf6e3;
  /* color: #839496; */
  color: #657b83;
  white-space: pre-wrap;
  font-family: var(--font-family--mono);
  overflow: auto;
}

.json-view__attr {
  color: #b58900;
}

.json-view__bool,
.json-view__null,
.json-view__string {
  color: #2aa198;
}

.json-view__nested-props {
  border-left: 2px solid transparent;
  padding-left: 4ch;
  margin-left: 2px;
}

.json-view__nested-props:hover {
  border-left-color: rgba(0, 0, 0, 0.05);
}
.json-viewer {
  font-family: var(--font-family--mono);
  line-height: 1.6;
}

.json-viewer--collapsed {
  color: grey;
  cursor: pointer;
  background-color: var(--color-blue--100);
}

.json-viewer__object-property {
  margin-left: 4ch;
}

.json-viewer__array-item {
  margin-left: 4ch;
}

.json-viewer__key--object {
  color: var(--color-mono--700);
}

.json-viewer__key:after {
  content: ': ';
}

.json-viewer__key--array {
  color: royalblue;
}

.json-viewer--string {
  color: var(--color-yellow--700);
}

.json-viewer--number {
  color: var(--color-blue--700);
}

.json-viewer--null {
  color: var(--color-red--700);
}

.json-viewer--bool {
  color: var(--color-brand-blue--600);
}

.jf-switch {
  width: 280px;
  max-width: 100%;
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 0;
  font-size: 16px;
  vertical-align: top;
}

.jf-switch__input {
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
  position: absolute;
  border: 0;
  appearance: none;
  opacity: 0;
}

.jf-switch__label {
  cursor: pointer;
}

.jf-switch__track {
  background-color: lightgrey;
  width: 36px;
  height: 14px;
  position: absolute;
  top: calc(50% - 7px);
  right: 0;
  border-radius: 14px;
  cursor: pointer;
}

.jf-switch__thumb {
  background-color: #fafafa;
  width: 20px;
  height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  right: 18px;
  cursor: pointer;
  border-radius: 50%;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
}

.jf-switch .jf-switch__thumb:after {
  background-color: lightgrey;
  content: '';
  width: 20px;
  height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  left: 0px;
  opacity: 0;
  border-radius: 50%;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}

.jf-switch:hover .jf-switch__thumb:after {
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  left: -10px;
  opacity: 0.2;
}

.jf-switch:active .jf-switch__thumb:after {
  opacity: 0.4;
}

.jf-switch--on .jf-switch__thumb:after {
  background-color: var(--color-active);
}

.jf-switch--on .jf-switch__thumb {
  right: 0;
}

.jf-switch--on .jf-switch__thumb {
  background-color: var(--color-active);
}

.jf-switch--on .jf-switch__track {
  background-color: var(--color-active--054);
}

.jf-switch__helper-text {
  max-width: calc(100% - 32px);
  font-size: 10px;
  color: rgba(0, 0, 0, 0.54);
  padding-top: 4px;
}

.jf-switch--invalid .jf-textfield__helper-text {
  color: var(--color-red--500);
}

.jf-switch--disabled {
  opacity: 0.54;
}

.jf-switch--disabled:hover .jf-switch__thumb:after {
  opacity: 0;
}

.jf-switch--disabled .jf-switch__label,
.jf-switch--disabled .jf-checkbox__helper-text {
  cursor: default;
}

.jf-switch--disabled .jf-switch__thumb {
  cursor: default;
}

.jf-switch--disabled .jf-switch__track {
  cursor: default;
}

.tab {
border-bottom: 3px solid transparent;
display: inline-block;
font-size: 14px;
min-width: 160px;
padding-top: 0;
padding-left: 12px;
padding-right: 12px;
padding-bottom: 20px;
height: 48px;
line-height: 48px;
color: rgba(255,255,255,.7);
text-transform: uppercase;
text-align: center;
vertical-align: middle;
cursor: pointer;
}

.tab--active {
  color: white;
cursor: default;
border-bottom: 3px solid var(--color-red--500);
}

.jf-textfield {
  --field-height: 56px;
  --label-top: 21px;
  --large-font-size: 16px;
  --side-padding: 12px;
  --filled-background: rgba(0, 0, 0, 0.09);
  --top-padding: 22px;
  --bottom-padding: 13px;
}

.jf-textfield--dense {
  --field-height: 36px;
  --label-top: 9px;
  --large-font-size: 11px;
  --side-padding: 8px;
  --top-padding: 22px;
  --bottom-padding: 13px;
}

.jf-textfield--dense.jf-textfield--outlined {
  --top-padding: 19px;
  --bottom-padding: 13px;
}

.jf-textfield--dense.jf-textfield--multiline {
  --top-padding: 22px;
  --bottom-padding: 6px;
}

.jf-textfield--multiline {
  --top-padding: 23px;
  --bottom-padding: 6px;
}

.jf-textfield {
  position: relative;
  height: var(--field-height);
  font-size: var(--large-font-size);
  display: inline-block;
  box-sizing: border-box;
  width: 280px;
  max-width: 100%;
  margin: 0;
  padding: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  cursor: pointer;
  background-color: var(--filled-background);
  color: #00000099;
  outline: none;
}

.jf-textfield--outlined {
  background-color: var(--form-background);
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
}

.jf-textfield:hover {
  background-color: #dedede;
  color: #000000de;
}

.jf-textfield--focused.jf-textfield--outlined {
  box-shadow: 0 0 0 2px var(--color-active);
}

.jf-textfield--focused:hover {
  background-color: #e8e8e8;
  color: #00000099;
}

.jf-textfield--outlined:hover {
  background: var(--form-background);
}

.jf-textfield__input {
  border: none;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  outline: none;
  display: block;
  font-size: var(--large-font-size);
  font-family: var(--font-family);
  margin: 0;
  padding-left: var(--side-padding);
  padding-right: var(--side-padding);
  padding-top: var(--top-padding);
  padding-bottom: var(--bottom-padding);
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
  caret-color: var(--color-active);
  position: absolute;
  top: 0px;
  left: 0px;
  height: var(--field-height);
  box-sizing: border-box;
}

.jf-textfield--focused .jf-textfield__input {
  /* color: var(--color-active); */
  color: inherit;
}

.jf-textfield--outlined.jf-textfield--empty .jf-textfield__label, .jf-textfield--empty .jf-textfield__label {
  top: var(--label-top);
  font-size: var(--large-font-size);
}

.jf-textfield--focused .jf-textfield__label {
  color: var(--color-active);
  visibility: visible;
  font-size: 11px;
  top: 10px;
}

.jf-textfield__label {
  color: var(--color-inactive);
  padding-left: var(--side-padding);
  padding-right: var(--side-padding);
  font-size: 10px;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  display: block;
  bottom: 0;
  top: 6px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  box-sizing: border-box;
  border-radius: 20%;
}

.jf-textfield--empty .jf-textfield__label {
  font-size: var(--large-font-size);
}

.jf-textfield--outlined .jf-textfield__label {
  padding-left: 4px;
  padding-right: 4px;
  font-size: 10px;
  left: var(--side-padding);
  bottom: auto;
  right: auto;
  width: auto;
  background-color: var(--form-background);
}

.jf-textfield--focused.jf-textfield--outlined .jf-textfield__label {
  top: -7px;
  font-size: 10px;
}

.jf-textfield--focused .jf-textfield__label {
  top: 6px;
  font-size: 10px;
}

.jf-textfield--outlined .jf-textfield__label {
  top: -7px;
}

.jf-textfield--outlined .jf-textfield__input {
  padding-left: var(--side-padding);
  padding-right: var(--side-padding);
  padding-top: var(--top-padding);
  padding-bottom: var(--bottom-padding);
  border-radius: 4px;
}

.jf-textfield--multiline {
  min-height: var(--field-height);
  height: auto;
}

.jf-textfield--multiline
.jf-textfield__input {
  max-width: 100%;
  min-width: 100%;
  position: initial;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-bottom: var(--bottom-padding);
  line-height: 18px;
  display: block;
  height: auto;
}

.jf-textfield--json textarea {
  font-family: menlo, monospace;
}

/*
.jf-textfield__bottom-border  {
  border-bottom: 2px solid var(--color-active);
  height: 0;
  position: absolute;
  top: 46px;
  transition: width .1s ease-in 0s;
  width: 0;
}
.jf-textfield--focused .jf-textfield__bottom-border {
  width: 100%;
}
*/

.jf-textfield__label:after {
  background-color: var(--color-active);
  bottom: 0;
  content: '';
  height: 2px;
  left: 45%;
  position: absolute;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  visibility: hidden;
  width: 10px;
}

.jf-textfield--focused {
  cursor: auto;
}

.jf-textfield--focused .jf-textfield__label:after {
  left: 0;
  visibility: visible;
  width: 100%;
}

.jf-textfield--outlined .jf-textfield__label:after {
  background-color: transparent;
  display: none;
}

/*
.jf-textfield:before {
content: '';
background-color: rgba(0,0,0,0.06);
position: absolute;
top: 0;
bottom: 20px;
width: calc(100% + 32px);
z-index: -1;
border-radius: 4px;
margin-left: -16px;
}
*/

.jf-textfield:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  background-color: var(--color-inactive);
  /* background-color: transparent; */
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}

.jf-textfield--outlined.jf-textfield:after {
  display: none;
}

.jf-textfield:after:hover {
  background-color: var(--color-inactive);
}

.jf-textfield--focused:after {
  background-color: transparent;
}

.jf-textfield:hover:after {
  background-color: #222;
  height: 2px;
}

.jf-textfield--focused:hover:after {
  background-color: transparent;
}

.jf-textfield__helper-text {
}

.jf-textfield svg {
  position: absolute;
  top: 6px;
  right: var(--side-padding);
}

.jf-textfield--invalid svg {
  color: var(--color-invalid);
}

.jf-textfield--has-icon .jf-textfield__input {
  padding-right: 40px;
}

/*
.jf-textfield--outlined .jf-textfield__helper-text {
  padding-left: 11px;
}
*/

.jf-textfield--outlined .jf-textfield__label:after {
  display: none;
}

/* INVALID */
.jf-textfield--invalid .jf-textfield__label:after {
  background-color: var(--color-invalid);
}

.jf-textfield--invalid .jf-textfield__label {
  color: var(--color-invalid);
  animation: shake .5s linear;
}

.jf-textfield--invalid:after {
  background-color: var(--color-invalid) !important;
}

.jf-textfield--invalid .jf-textfield__input {
  caret-color: var(--color-invalid);
}

.jf-textfield--outlined.jf-textfield--invalid {
  box-shadow: 0 0 0 2px var(--color-invalid);
}

/* DISABLED */
.jf-textfield--disabled {
  color: var(--color-inactive);
  background-color: #e0e0e0;
  cursor: default;
}

.jf-textfield--disabled:hover {
  background-color: #e0e0e0;
}

.jf-textfield--disabled:hover:after {
  background-color: transparent;
}

.jf-textfield--disabled:after {
  background-color: transparent;
  border-bottom: 1px dotted var(--color-inactive);
}

.jf-textfield--outlined.jf-textfield--disabled:hover {
  background: var(--form-background);
}

.jf-textfield--outlined.jf-textfield--disabled:after {
  display: none;
}

.jf-textfield--outlined.jf-textfield--disabled {
  background-color: var(--form-background);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
}

@keyframes shake {
  8%, 41% { transform: translateX(-4px); }
  25%, 58% { transform: translateX(4px); }
  75% { transform: translateX(-1px); }
  92% { transform: translateX(1px); }
  0%, 100% { transform: translateX(0); }
}`