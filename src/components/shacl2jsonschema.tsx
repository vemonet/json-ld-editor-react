import { Store, DataFactory } from 'n3';


const { namedNode } = DataFactory;
const shaclNs = "http://www.w3.org/ns/shacl#"
const sh = (prop: string) => {
  return namedNode(`${shaclNs}${prop}`)
}

export const shacl2jsonschema = (
    store: Store, 
    target: string, 
    prefixes: any, 
    title: any = null,
  ) => {
  
  // JSON-LD JSON Schema: https://github.com/json-ld/json-ld.org/blob/main/schemas/jsonld-schema.json
  // JSON form from schema: https://www.webcomponents.org/element/json-form-custom-element 
  // Demo: https://json-tools.github.io/json-form/
  console.log('TARGET of shacl2jsonschema:', target)
  const jsonschema: any = {
    "type": "object",
    "properties": {} 
  }
  if (title) {
    jsonschema["title"] = title
    jsonschema["ui"] = { "expandable": true }
  }
  const jsonld: any = {}

  // TODO: improve handling of the targetClass (used for the @type) for recursion
  const typeProp: any = {"enum": []}
  store.getQuads(namedNode(target), sh("targetClass"), null, null).map((targetClassQuad: any) => {
    typeProp['title'] = 'Type'
    typeProp['description'] = 'Type of the resource (@type)'
    typeProp["type"] = "string"
    typeProp["enum"].push(targetClassQuad.object.value.toString())
    typeProp["default"] = targetClassQuad.object.value.toString()

    console.log("TargetClass for:", target)
    console.log("Is:", targetClassQuad.object.value.toString())
      
    // typeProp["format"] = "uri"
    // typeProp["pattern"] = "^https?://"
    jsonld['@type'] = targetClassQuad.object.value.toString()
    
    // Disable changes to @type:
    // typeProp["ui"] = { 
    //   "rule": {
    //     "action": "disable",
    //     "path": "/enabled",
    //     "condition": { "const": false, "default": false }
    //   }
    // }
  })
  jsonschema["properties"]['@type'] = typeProp

  // for (const targetClassQuad of store.getQuads(namedNode(target), sh("targetClass"), null, null)) {
  //   // targetClass = targetClassQuad.object.value.toString()
  //   typeProp['title'] = 'Type'
  //   typeProp['description'] = 'Type of the resource (@type)'
  //   typeProp["type"] = "string"
  //   typeProp["enum"].push(targetClassQuad.object.value.toString())
  //   typeProp["default"] = targetClassQuad.object.value.toString()
      
  //   // typeProp["format"] = "uri"
  //   // typeProp["pattern"] = "^https?://"
  //   jsonld['@type'] = targetClassQuad.object.value.toString()
  //   // typeProp["ui"] = { "disable": true }
  //   typeProp["ui"] = { 
  //     "rule": {
  //       "action": "disable",
  //       "path": "/enabled",
  //       "condition": {
  //         "const": false,
  //         "default": false
  //       }
  //     }
  //   }
  //   // ui:readonly
  //   // updateState({targetClass: targetClassQuad.object.value})
  // }


  // jsonschema["properties"]['@type'] = typeProp
  
  // Checking every sh:property for the ShapeNode
  const requiredProps: any = ["@type"]
  for (const propQuad of store.getQuads(namedNode(target), sh("property"), null, null)) {
    
    console.log("Checking property:", propQuad);
    const propSubj = propQuad.object
    let propPath = ''
    let propSchema: any = {}

    // Check sh:path
    for (const pathQuad of store.getQuads(propSubj, sh("path"), null, null)) {
      propPath = pathQuad.object.value
      // console.log("Path of the property:", propPath)
      // console.log(pathQuad.termType);         // Quad
      // console.log(pathQuad.object.language);  // en
    }

    // Check sh:nodeKind
    for (const subProp of store.getQuads(propSubj, sh("nodeKind"), null, null)) {
      if (subProp.object.value == `${shaclNs}IRI`) {
        propSchema["format"] = "uri"
        propSchema["pattern"] = "^https?://"
      } else {
        propSchema['description'] = subProp.object.value
      }
    }

    // Check sh:name
    for (const subProp of store.getQuads(propQuad.object, sh("name"), null, null)) {
      propSchema['title'] = subProp.object.value
    }
    // Check sh:description
    for (const subProp of store.getQuads(propQuad.object, sh("description"), null, null)) {
      propSchema['description'] = subProp.object.value
    }
    // Check sh:message (override description if found)
    for (const subProp of store.getQuads(propQuad.object, sh("message"), null, null)) {
      propSchema['description'] = subProp.object.value
    }

    // Check sh:minCount
    let propMinCount = null;
    for (const minCountQuad of store.getQuads(propQuad.object, sh("minCount"), null, null)) {
      propMinCount = parseInt(minCountQuad.object.value)
      if (propMinCount > 0) {
        requiredProps.push(propPath)
      }
    }
    // Also check for sh:minInclusive if sh:minCount not found
    if (propMinCount === null) {
      for (const minCountQuad of store.getQuads(propQuad.object, sh("minInclusive"), null, null)) {
        propMinCount = parseInt(minCountQuad.object.value)
        if (propMinCount > 0) {
          requiredProps.push(propPath)
        }
      }
    }

    // Check sh:datatype (if integer)
    for (const subProp of store.getQuads(propQuad.object, sh("datatype"), null, null)) {
      if (subProp.object.value.toString() === 'http://www.w3.org/2001/XMLSchema#integer') {
        propSchema["type"] = "number"
      }
    }

    // Check if sh:pattern, override the URI pattern if present
    for (const subProp of store.getQuads(propQuad.object, sh("pattern"), null, null)) {
      propSchema["pattern"] = subProp.object.value
    }

    // Check if other nodes and process them recursively:
    for (const subProp of store.getQuads(propQuad.object, sh("node"), null, null)) {
      
      for (const subPropShape of store.getQuads(subProp.object, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), sh('NodeShape'), null)) {
        console.log(`Found a sh:node pointing to another NodeShape: ${subPropShape.subject.value.toString()}, generating nested object in the JSON Schema`)
        
        const subSchema = shacl2jsonschema(store, subPropShape.subject.value.toString(), prefixes, propSchema['title'])
        // console.log('subSchema!', subSchema['jsonschema'])
        propSchema = subSchema['jsonschema']
        jsonld[propPath] = subSchema['jsonld']
        // propSchema = subSchema['jsonld']
        // json
      }
    }

    if (!propSchema["type"]) {
      propSchema["type"] = "string"
    }
    jsonschema["properties"][propPath] = propSchema
  }
  jsonschema["required"] = requiredProps
  console.log('One of the JSON Schema generated for the SHACL shape:', jsonschema)
  return {jsonschema, jsonld}
}

