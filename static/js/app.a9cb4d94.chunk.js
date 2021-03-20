(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{166:function(e,t,a){e.exports=a.p+"static/media/icon.72626586.png"},204:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(109),i=a(84),l=a(26),s=a(203),c=a(345),m=a(182),p=a.n(m),u=(a(224),a(331)),d=a(333),f=a(335),g=a(337),h=a(336),y=a(174),w=a.n(y),b=a(172),v=a.n(b),E=a(173),_=a.n(E),O=a(166),j=a.n(O),x=Object(u.a)((function(e){return{menuButton:{color:e.palette.common.white},linkButton:{textTransform:"none",textDecoration:"none"},linkLogo:{alignItems:"center",display:"flex"}}}));function k(){var e=x();return o.a.createElement(d.a,{title:"",position:"sticky"},o.a.createElement(f.a,{variant:"dense"},o.a.createElement(i.b,{to:"/",className:e.linkLogo},o.a.createElement(h.a,{title:"IDS Projects dashboard"},o.a.createElement("img",{src:j.a,style:{height:"2em",width:"2em",marginRight:"10px"},alt:"Logo"}))),o.a.createElement("div",{className:"flexGrow"}),o.a.createElement(i.b,{to:"/about",className:e.linkButton},o.a.createElement(h.a,{title:"About the Institute of Data Science"},o.a.createElement(g.a,{className:e.menuButton},o.a.createElement(v.a,null)))),o.a.createElement(h.a,{title:"Go to IDS Best Practices documentation"},o.a.createElement(g.a,{className:e.menuButton,target:"_blank",href:"https://maastrichtu-ids.github.io/best-practices"},o.a.createElement(_.a,null))),o.a.createElement(h.a,{title:"Go to https://github.com/MaastrichtU-IDS/fair-metadata-wizard "},o.a.createElement(g.a,{className:e.menuButton,target:"_blank",href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard "},o.a.createElement(w.a,null)))))}var D=a(127),S=a(338),N=Object(u.a)((function(e){return{darkLink:{textDecoration:"none",color:"inherit","&:hover":{color:e.palette.primary.light,textDecoration:"none"}},whiteLink:{textDecoration:"none",color:"inherit","&:hover":{color:e.palette.primary.dark,textDecoration:"none"}},footer:{padding:e.spacing(2),marginTop:"auto",color:"white",backgroundColor:e.palette.primary.main}}}));function C(){var e=N();return o.a.createElement(D.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",o.a.createElement("a",{className:e.darkLink,target:"_blank",href:"https://maastrichtuniversity.nl/ids"},"Institute of Data Science at Maastricht University")," ","2020.")}function L(){var e=N();return o.a.createElement("footer",{className:e.footer},o.a.createElement(S.a,{maxWidth:"md",style:{textAlign:"center"}},o.a.createElement(D.a,{variant:"body2"},"This website is licensed under the\xa0",o.a.createElement("a",{className:e.whiteLink,target:"_blank",href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard/blob/master/LICENSE"},"MIT license")),o.a.createElement(C,null)))}var A=a(74),z=a.n(A),P=a(90),B=a.n(P),I=a(77),T=a.n(I),U=a(56),M=a(349),F=a(344),J=a(339),R=a(351),W=a(350),H=a(346),G=a(348),q=a(347),K=a(181),Q=a.n(K),V=a(139),X=a.n(V),Y=a(138),Z=a.n(Y),$=a(136),ee=a.n($),te=a(340),ae=a(342),ne=a(343),oe=a(341),re=a(180),ie=a.n(re),le=a(178),se=a.n(le),ce=a(179),me=a.n(ce);function pe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ue(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?pe(Object(a),!0).forEach((function(t){B()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):pe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var de=Object(u.a)((function(e){return{link:{textDecoration:"none",color:e.palette.primary.main,"&:hover":{color:e.palette.secondary.main,textDecoration:"none"}},input:{background:"white",fontSize:"11px",fontFamily:"monospace"},settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},fullWidth:{width:"100%"}}}));function fe(e){var t=e.renderObject,a=e.onChange,n=de(),r=Object(U.a)(),i=o.a.useState({show_info_card:!1,json_error_open:!1,json_loaded_open:!1,upload_jsonld:JSON.stringify(t,null,4)}),l=T()(i,2),s=l[0],c=l[1],m=o.a.useRef(s),p=o.a.useCallback((function(e){m.current=ue(ue({},m.current),e),c(m.current)}),[c]);return o.a.createElement(J.a,{style:{margin:r.spacing(4,0)}},o.a.createElement(te.a,{style:{textAlign:"center"},action:o.a.createElement(oe.a,{style:{fontSize:"16px"},onClick:function(){p({show_info_card:!s.show_info_card})},name:"show_info_card","aria-expanded":s.show_info_card,"aria-label":"show about"},"Upload\xa0",!s.show_info_card&&o.a.createElement(se.a,null),s.show_info_card&&o.a.createElement(me.a,null)),title:"Provide your JSON-LD",subheader:"Upload your JSON-LD as a template, and edit it easily."}),o.a.createElement(ae.a,{in:s.show_info_card,timeout:"auto",unmountOnExit:!0},o.a.createElement(ne.a,null,o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"All ",o.a.createElement("code",null,"@type")," values autocomplete are based on the classes and properties described in the ontology."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"The main ",o.a.createElement("code",null,"@context")," URL is used to automatically download the related ontology as JSON-LD using Content-Negociation (accept application/json+ld)."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"This feature has been tested with ",o.a.createElement("a",{href:"https://schema.org",className:n.link,target:"_blank",rel:"noopener noreferrer"},"https://schema.org"),", ",o.a.createElement("a",{href:"http://www.w3.org/ns/csvw",className:n.link,target:"_blank",rel:"noopener noreferrer"},"http://www.w3.org/ns/csvw")," and ",o.a.createElement("a",{href:"https://raw.githubusercontent.com/MaastrichtU-IDS/semanticscience/master/ontology/sio.owl",className:n.link,target:"_blank",rel:"noopener noreferrer"},"the SemanticScience ontology"),"."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(3)}},"Provide a URL to download your ontology as JSON-LD in the main ",o.a.createElement("code",null,"@context"),", and feel free to ",o.a.createElement("a",{href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard/issues",className:n.link,target:"_blank",rel:"noopener noreferrer"},"create an issue")," on GitHub if the autocomplete does not work."),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();try{a(JSON.parse(s.upload_jsonld)),p(ue(ue({},s),{},{json_loaded_open:!0}))}catch(t){console.log("Invalid JSON-LD"),p(ue(ue({},s),{},{json_error_open:!0}))}}},o.a.createElement(W.a,{className:n.settingsForm},o.a.createElement(H.a,{id:"uploadJsonldInput",label:"JSON-LD to upload",placeholder:"JSON-LD to upload",value:s.upload_jsonld,required:!0,multiline:!0,className:n.fullWidth,variant:"outlined",onChange:function(e){p({upload_jsonld:e.target.value})},size:"small",InputProps:{className:n.input}}),o.a.createElement("div",{style:{width:"100%",textAlign:"center"}},o.a.createElement(g.a,{type:"submit",variant:"contained",className:n.saveButton,startIcon:o.a.createElement(ie.a,null),color:"secondary"},"Upload your JSON-LD")),o.a.createElement(M.a,{open:s.json_error_open,onClose:function(){p(ue(ue({},s),{},{json_error_open:!1}))},autoHideDuration:1e4},o.a.createElement(q.a,{elevation:6,variant:"filled",severity:"error"},"The JSON-LD provided is not valid")),o.a.createElement(M.a,{open:s.json_loaded_open,onClose:function(){p(ue(ue({},s),{},{json_loaded_open:!1}))},autoHideDuration:1e4},o.a.createElement(q.a,{elevation:6,variant:"filled",severity:"info"},"Your JSON-LD has been loaded. Trying to load the ontology from the URL provided in @context...")))))))}function ge(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function he(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ge(Object(a),!0).forEach((function(t){B()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ge(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ye=a(133),we=Object(u.a)((function(e){return{link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{color:e.palette.primary.light,textDecoration:"none"}},settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},addEntryButton:{textTransform:"none",marginLeft:e.spacing(2),marginBottom:e.spacing(2)},fullWidth:{width:"100%"},input:{background:"white",fontSize:"14px",width:"100%"},smallerFont:{fontSize:"12px"},alignLeft:{textAlign:"left"},paperPadding:{padding:e.spacing(2,1),margin:e.spacing(2,2)},paperTitle:{fontWeight:300,marginBottom:e.spacing(1)}}}));function be(){var e=we(),t=Object(U.a)(),a=o.a.useState({open:!1,dialogOpen:!1,wizard_jsonld:Ee,ontology_jsonld:{},ontoload_error_open:!1,ontoload_success_open:!1}),n=T()(a,2),r=n[0],i=n[1],l=o.a.useRef(r),s=o.a.useCallback((function(e){l.current=he(he({},l.current),e),i(l.current)}),[i]);o.a.useEffect((function(){var e="https://schema.org/";r.wizard_jsonld["@context"]&&(e=r.wizard_jsonld["@context"]),(e.startsWith("https://schema.org")||e.startsWith("https://schema.org"))&&(e="https://schema.org/version/latest/schemaorg-current-https.jsonld"),ee.a.defaults.headers.common.Accept="application/ld+json",ee.a.get(e).then((function(t){"object"!==typeof t.data?c(t.data,e,"application/rdf+xml").then((function(t){s({ontology_jsonld:{"@context":e,"@graph":t}}),s({ontoload_success_open:!0})})):(s({ontology_jsonld:t.data}),s({ontoload_success_open:!0}))})).catch((function(e){s({ontoload_error_open:!0}),console.log(e)}))}),[r.wizard_jsonld["@context"]]);var c=function(e,t,a){return new Promise((function(n,o){var r=ye.graph(),i=ye.sym(t);ye.parse(e,r,t,a),ye.serialize(i,r,t,"application/ld+json",(function(e,t){return n(JSON.parse(t).sort((function(e,t){return e["@type"]&&t["@type"]&&Array.isArray(e["@type"])&&Array.isArray(t["@type"])?e["@type"][0]<t["@type"][0]?1:-1:e["@type"]<t["@type"]?1:-1})))}))}))};return o.a.createElement(S.a,{className:"mainContainer"},o.a.createElement(D.a,{variant:"h4",style:{textAlign:"center",marginBottom:t.spacing(1)}},"FAIR metadata wizard \ud83e\uddd9\u200d\u2642\ufe0f"),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"center",marginBottom:t.spacing(1)}},"Load and edit JSON-LD RDF metadata files in a user-friendly web interface, with autocomplete for ",o.a.createElement("code",null,"@types"),", based on the ",o.a.createElement("code",null,"@context")," classes and properties"),o.a.createElement(fe,{renderObject:r.wizard_jsonld,onChange:function(e){s({wizard_jsonld:e})}}),o.a.createElement(M.a,{open:r.ontoload_error_open,onClose:function(){s(he(he({},r),{},{ontoload_error_open:!1}))},autoHideDuration:1e4},o.a.createElement(q.a,{elevation:6,variant:"filled",severity:"error"},"The ontology at the URL ",r.wizard_jsonld["@context"]," provided in @context could not be loaded")),o.a.createElement(M.a,{open:r.ontoload_success_open,onClose:function(){s(he(he({},r),{},{ontoload_success_open:!1}))},autoHideDuration:1e4},o.a.createElement(q.a,{elevation:6,variant:"filled",severity:"success"},"The ontology ",r.wizard_jsonld["@context"]," from @context has been loaded successfully, it will be used for @types autocomplete")),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=document.createElement("a");t.setAttribute("href","data:text/turtle;charset=utf-8,"+encodeURIComponent(JSON.stringify(r.wizard_jsonld,null,4))),t.setAttribute("download","metadata.json"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t),i(he(he({},r),{},{open:!0}))}},o.a.createElement(W.a,{className:e.settingsForm},o.a.createElement(ve,{renderObject:r.wizard_jsonld,ontologyObject:r.ontology_jsonld,onChange:function(e){s({wizard_jsonld:e})}}),o.a.createElement("div",{style:{width:"100%",textAlign:"center"}},o.a.createElement(g.a,{type:"submit",variant:"contained",className:e.saveButton,startIcon:o.a.createElement(Q.a,null),color:"secondary"},"Download metadata as JSON-LD")))))}var ve=function e(t){var a=t.renderObject,n=t.onChange,r=t.ontologyObject,i=we(),l=Object(U.a)(),s=o.a.useState({autocompleteOntologyOptions:[]}),c=T()(s,2),m=c[0],p=c[1],u=o.a.useRef(m),d=o.a.useCallback((function(e){u.current=he(he({},u.current),e),p(u.current)}),[p]),f=function(e){a[e.target.id]=e.target.value,n(a)},h=function(e,t){"string"===typeof a[e][0]?a[e].push(e+" "+a[e].length):a[e].length>0&&a[e].push(he({},a[e][0])),n(a)},y=function(e,t){a.splice(e,1),n(a)};function w(e){var t="";return e["rdfs:label"]&&("string"===typeof e["rdfs:label"]&&(t+=e["rdfs:label"]),e["rdfs:label"].en&&(t+=e["rdfs:label"].en)),e["rdfs:comment"]&&("string"===typeof e["rdfs:comment"]&&(t+=e["rdfs:comment"]),e["rdfs:comment"].en&&(t+=e["rdfs:comment"].en)),e["http://www.w3.org/2000/01/rdf-schema#label"]&&("string"===typeof e["http://www.w3.org/2000/01/rdf-schema#label"]&&(t+=e["http://www.w3.org/2000/01/rdf-schema#label"]),e["http://www.w3.org/2000/01/rdf-schema#label"][0]&&e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]&&(t+=e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"])),t}function b(e){var t="";if(e&&e.target&&(t=e.target.value&&0!==e.target.value?e.target.value:e.target.innerText),t){var a=[],n=r["@graph"];Array.isArray(n)?a=n.filter((function(e){return-1!==w(e).toLowerCase().indexOf(t.toLowerCase())})):Object.keys(n).map((function(e){n[e]&&Array.isArray(n[e])&&(a=a.concat(n[e].filter((function(e){return-1!==w(e).toLowerCase().indexOf(t.toLowerCase())}))))})),d({autocompleteOntologyOptions:a.sort((function(e,t){return e["@type"]&&t["@type"]&&Array.isArray(e["@type"])&&Array.isArray(t["@type"])?e["@type"][0]<t["@type"][0]?1:-1:e["@type"]<t["@type"]?1:-1}))})}}return o.a.createElement("div",null,Object.keys(a).map((function(t,s){return o.a.createElement("div",{key:s},"@type"===t&&o.a.createElement(G.a,{key:t+s,id:t,defaultValue:{"rdfs:label":a[t]},options:m.autocompleteOntologyOptions,onInputChange:b,onSelect:b,onChange:function(e,o){o&&(o["rdfs:label"]?a[t]=o["rdfs:label"]:a[t]=o,n(a))},groupBy:function(e){return e["@type"]&&Array.isArray(e["@type"])?e["@type"][0]:e["@type"]},getOptionSelected:function(e,t){if(e["rdfs:label"]){if("string"===typeof e["rdfs:label"])return e["rdfs:label"]===t["rdfs:label"];if(e["rdfs:label"].en)return e["rdfs:label"].en===t}return e["http://www.w3.org/2000/01/rdf-schema#label"]&&e["http://www.w3.org/2000/01/rdf-schema#label"][0]&&e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]?e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]===t["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]:e===t},getOptionLabel:function(e){if(e["rdfs:label"]){if("string"===typeof e["rdfs:label"])return e["rdfs:label"];if(e["rdfs:label"].en)return e["rdfs:label"].en}return e["http://www.w3.org/2000/01/rdf-schema#label"]&&e["http://www.w3.org/2000/01/rdf-schema#label"][0]&&e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]?e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]:e},renderInput:function(e){return o.a.createElement(H.a,z()({},e,{variant:"outlined",size:"small",label:"@type",placeholder:"@type",className:i.input}))}}),"string"===typeof a[t]&&"@type"!==t&&a[t]&&o.a.createElement(F.a,{container:!0},o.a.createElement(F.a,{item:!0},o.a.createElement(H.a,{id:t,label:t,placeholder:t,value:a[t],className:i.fullWidth,variant:"outlined",onChange:f,size:"small",InputProps:{className:i.input},required:!0,InputLabelProps:{required:!1}})),Array.isArray(a)&&"0"!==t&&o.a.createElement(F.a,{item:!0},o.a.createElement(g.a,{onClick:function(e){return y(t)},variant:"contained",size:"small",style:{textTransform:"none",marginLeft:l.spacing(2)},className:i.addEntryButton,startIcon:o.a.createElement(Z.a,null),color:"primary"},"Delete"))),"object"===typeof a[t]&&a[t]&&o.a.createElement(J.a,{elevation:2,className:i.paperPadding},o.a.createElement(R.a,{label:t,style:{fontWeight:900,marginBottom:l.spacing(2),marginLeft:l.spacing(1)}}),Array.isArray(a)&&"0"!==t&&o.a.createElement(g.a,{onClick:function(e){return y(t)},variant:"contained",size:"small",style:{textTransform:"none",marginLeft:l.spacing(2)},className:i.addEntryButton,startIcon:o.a.createElement(Z.a,null),color:"primary"},"Delete"),Array.isArray(a[t])&&o.a.createElement(g.a,{onClick:function(e){return h(t)},variant:"contained",size:"small",className:i.addEntryButton,startIcon:o.a.createElement(X.a,null),color:"primary"},"Add ",t," entry"),o.a.createElement(e,{renderObject:a[t],onChange:function(e){return function(e,t){a[e]=t,n(a)}(t,e)},ontologyObject:r}),Array.isArray(a[t])&&o.a.createElement(g.a,{onClick:function(e){return h(t)},variant:"contained",size:"small",className:i.addEntryButton,startIcon:o.a.createElement(X.a,null),color:"primary"},"Add ",t," entry")))})))},Ee={"@context":"https://schema.org","@type":"Dataset",name:"ECJ case law text similarity analysis",description:"results from a study to analyse how closely the textual similarity of ECJ cases resembles the citation network of the cases.",version:"v2.0",url:"https://doi.org/10.5281/zenodo.4228652",license:"https://www.gnu.org/licenses/agpl-3.0.txt",encodingFormat:"CSV",temporalCoverage:"2019-09-14/2020-07-01",dateCreated:{"@type":"Date","@value":"2019-09-14"},datePublished:{"@type":"Date","@value":"2020-07-01"},distribution:{"@type":"DataDownload",contentUrl:{"@type":"URL","@value":"https://zenodo.org/record/4228652/files/docona_cjeu_results_2018_v2_html.zip?download=1"},encodingFormat:"application/zip",contentSize:"1.1MB"},inLanguage:{"@type":"Language",name:"EN",alternateName:"EN"},keywords:["case law","court decisions","text similarity","network analysis"],creator:{"@type":"Person","@wizardRequired":!0,name:"concat @givenName @familyName",givenName:"Kody",familyName:"Moodley",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",jobTitle:"Postdoctoral researcher",email:"kody.moodley@maastrichtuniversity.nl",affiliation:{"@type":"Organization",name:"Maastricht Law & Tech Lab",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"},logo:{"@type":"ImageObject",contentUrl:"https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"}}},contributor:[{"@wizardMultivalueCheckArray":!0,"@type":"Person",givenName:"Pedro",familyName:"Hernandez Serrano",jobTitle:"Data Scientist",email:"p.hernandezserrano@maastrichtuniversity.nl",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/p.hernandezserrano/p.hernandezserrano_PP%20%287%20of%2013%29.jpg?itok=IUdreoIw&timestamp=1610395201",affiliation:{"@type":"Organization",name:"Institute of Data Science",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/research/institute-data-science"},logo:{"@type":"ImageObject",contentUrl:"https://avatars.githubusercontent.com/u/36262526?s=280&v=4"}}}],publisher:{"@type":"Person",name:"Kody Moodley",givenName:"Kody",familyName:"Moodley",jobTitle:"Postdoctoral researcher",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",email:"kody.moodley@maastrichtuniversity.nl",affiliation:{"@type":"Organization",name:"Maastricht Law & Tech Lab",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"},logo:{"@type":"ImageObject",contentUrl:"https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"}}},isBasedOn:[{"@type":"SoftwareApplication",name:"docona",description:"DoConA (Document Content and Citation Analysis Pipeline) is an open source, configurable and extensible Python tool to analyse the level of agreement between the citation network of a set of textual documents and the textual similarity of these documents.",applicationCategory:"Python script",operatingSystem:"cross-platform",version:"1.0",url:{"@type":"URL","@value":"https://github.com/MaastrichtU-IDS/docona"}},{"@type":"CreativeWork",name:"ECJ case law and citation network",description:"Citation network and full text documents of each judgement by the Court of Justice of the European Union that was published publicly on the EUR-LEX website (https://eur-lex.europa.eu/homepage.html) up until December 2018",version:"2.0",url:{"@type":"URL","@value":"https://doi.org/10.5281/zenodo.3926736"}}],citation:{"@type":"CreativeWork",name:"Similarity and Relevance of Court Decisions: A Computational Study on CJEU Cases",creator:[{"@type":"Person",name:"Kody Moodley"},{"@type":"Person",name:"Michel Dumontier"}],publisher:{"@type":"Organization",name:"IOS press",url:{"@type":"URL","@value":"https://www.iospress.nl"}},datePublished:{"@type":"Date","@value":"2019-12-10"},sameAs:{"@type":"URL","@value":"https://doi.org/10.3233/FAIA190307"}}},_e=Object(u.a)((function(e){return{settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},fullWidth:{width:"100%"},normalFont:{fontSize:"14px"},smallerFont:{fontSize:"12px"},alignLeft:{textAlign:"left"},paperPadding:{padding:e.spacing(2,2),margin:e.spacing(2,2)},paperTitle:{fontWeight:300,marginBottom:e.spacing(1)}}}));function Oe(){_e();var e=o.a.useState({open:!1,dialogOpen:!1,project_license:"",language_autocomplete:[]}),t=T()(e,2);t[0],t[1];return o.a.createElement(S.a,{className:"mainContainer"},o.a.createElement(D.a,{variant:"body1",style:{textAlign:"center",marginBottom:"20px"}},"A wizard to generate Schema.org metadata for datasets in RDF JSON-LD format."))}var je=Object(s.a)({palette:{primary:{light:"#63a4ff",main:p.a[700],dark:"#004ba0"},secondary:{light:"#4caf50",main:"#087f23",dark:"#00600f"}},typography:{fontFamily:'"Open Sans", "Roboto", "Arial"',fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:500}});t.a=function(){return o.a.createElement(c.a,{theme:je},o.a.createElement(i.a,{basename:"/fair-metadata-wizard/"},o.a.createElement(r.a,{style:{height:"100%",backgroundColor:"#eceff1"}},o.a.createElement(k,null),o.a.createElement(l.a,{exact:!0,path:"/",component:be}),o.a.createElement(l.a,{path:"/about",component:Oe}),o.a.createElement(L,null))))}},217:function(e,t,a){a(218),e.exports=a(292)},218:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/fair-metadata-wizard/expo-service-worker.js",{scope:"/fair-metadata-wizard/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},224:function(e,t,a){var n=a(225),o=a(226);"string"===typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1};n(o,r);e.exports=o.locals||{}},226:function(e,t,a){(t=a(227)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans);"]),t.push([e.i,'.flexGrow {\n  flex-grow: 1; \n}\n\n.mainContainer {\n  margin-top: 30px;\n  margin-bottom: 20px;\n}\n\npre, code {\n  font-family: monospace, monospace;\n  border-radius: 6px;\n  padding: 2px;\n  color: white;\n  background-color: #455a64;\n  /* background-color: #1976d2; */\n}\n  \n/* @import url("https://fonts.googleapis.com/icon?family=Material+Icons");\nbody {\n  margin: 0;\n  padding: 0;\n  text-align: center; } */\n',""]),e.exports=t},260:function(e,t){},267:function(e,t){},276:function(e,t){},277:function(e,t){}},[[217,1,2]]]);
//# sourceMappingURL=app.a9cb4d94.chunk.js.map