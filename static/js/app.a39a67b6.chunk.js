(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{130:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(59),i=a(42),l=a(12),s=a(129),c=a(238),m=a(108),u=a.n(m),p=(a(148),a(224)),d=a(226),g=a(228),f=a(230),h=a(229),y=a(103),b=a.n(y),w=a(101),v=a.n(w),E=a(102),O=a.n(E),j=a(95),_=a.n(j),x=Object(p.a)((function(e){return{menuButton:{color:e.palette.common.white},linkButton:{textTransform:"none",textDecoration:"none"},linkLogo:{alignItems:"center",display:"flex"}}}));function k(){var e=x();return o.a.createElement(d.a,{title:"",position:"sticky"},o.a.createElement(g.a,{variant:"dense"},o.a.createElement(i.b,{to:"/",className:e.linkLogo},o.a.createElement(h.a,{title:"IDS Projects dashboard"},o.a.createElement("img",{src:_.a,style:{height:"2em",width:"2em",marginRight:"10px"},alt:"Logo"}))),o.a.createElement("div",{className:"flexGrow"}),o.a.createElement(i.b,{to:"/about",className:e.linkButton},o.a.createElement(h.a,{title:"About the Institute of Data Science"},o.a.createElement(f.a,{className:e.menuButton},o.a.createElement(v.a,null)))),o.a.createElement(h.a,{title:"Go to IDS Best Practices documentation"},o.a.createElement(f.a,{className:e.menuButton,target:"_blank",href:"https://maastrichtu-ids.github.io/best-practices"},o.a.createElement(O.a,null))),o.a.createElement(h.a,{title:"Go to https://github.com/MaastrichtU-IDS/fair-metadata-wizard "},o.a.createElement(f.a,{className:e.menuButton,target:"_blank",href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard "},o.a.createElement(b.a,null)))))}var D=a(69),N=a(231),S=Object(p.a)((function(e){return{darkLink:{textDecoration:"none",color:"inherit","&:hover":{color:e.palette.primary.light,textDecoration:"none"}},whiteLink:{textDecoration:"none",color:"inherit","&:hover":{color:e.palette.primary.dark,textDecoration:"none"}},footer:{padding:e.spacing(2),marginTop:"auto",color:"white",backgroundColor:e.palette.primary.main}}}));function C(){var e=S();return o.a.createElement(D.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",o.a.createElement("a",{className:e.darkLink,target:"_blank",href:"https://maastrichtuniversity.nl/ids"},"Institute of Data Science at Maastricht University")," ","2020.")}function L(){var e=S();return o.a.createElement("footer",{className:e.footer},o.a.createElement(N.a,{maxWidth:"md",style:{textAlign:"center"}},o.a.createElement(D.a,{variant:"body2"},"This website is licensed under the\xa0",o.a.createElement("a",{className:e.whiteLink,target:"_blank",href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard/blob/master/LICENSE"},"MIT license")),o.a.createElement(C,null)))}var z=a(34),A=a.n(z),P=a(45),I=a.n(P),B=a(36),T=a.n(B),U=a(26),M=a(237),F=a(232),J=a(244),R=a(243),W=a(239),H=a(241),G=a(107),q=a.n(G),K=a(74),Q=a.n(K),V=a(73),X=a.n(V),Y=a(72),Z=a.n(Y),$=a(233),ee=a(235),te=a(236),ae=a(242),ne=a(234),oe=a(106),re=a.n(oe),ie=a(104),le=a.n(ie),se=a(105),ce=a.n(se),me=a(240);function ue(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function pe(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(a),!0).forEach((function(t){I()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ue(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var de=Object(p.a)((function(e){return{link:{textDecoration:"none",color:e.palette.primary.main,"&:hover":{color:e.palette.secondary.main,textDecoration:"none"}},input:{background:"white",fontSize:"11px",fontFamily:"monospace"},settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},fullWidth:{width:"100%"}}}));function ge(e){var t=e.renderObject,a=e.onChange,n=de(),r=Object(U.a)(),i=o.a.useState({show_info_card:!1,json_error_open:!1,json_loaded_open:!1,upload_jsonld:JSON.stringify(t,null,4)}),l=T()(i,2),s=l[0],c=l[1],m=o.a.useRef(s),u=o.a.useCallback((function(e){m.current=pe(pe({},m.current),e),c(m.current)}),[c]);return o.a.createElement(F.a,{style:{margin:r.spacing(4,0)}},o.a.createElement($.a,{style:{textAlign:"center"},action:o.a.createElement(ne.a,{style:{fontSize:"16px"},onClick:function(){u({show_info_card:!s.show_info_card})},name:"show_info_card","aria-expanded":s.show_info_card,"aria-label":"show about"},"Upload\xa0",!s.show_info_card&&o.a.createElement(le.a,null),s.show_info_card&&o.a.createElement(ce.a,null)),title:"Provide your JSON-LD",subheader:"Upload your JSON-LD as a template, and edit it easily."}),o.a.createElement(ee.a,{in:s.show_info_card,timeout:"auto",unmountOnExit:!0},o.a.createElement(te.a,null,o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"All ",o.a.createElement("code",null,"@type")," values autocomplete based on the classes and properties described in the ontology."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"The main ",o.a.createElement("code",null,"@context")," URL is used to automatically download the related ontology as JSON-LD using Content-Negociation (accept application/json+ld)."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(1)}},"This feature has been tested with ",o.a.createElement("a",{href:"https://schema.org",className:n.link,target:"_blank",rel:"noopener noreferrer"},"https://schema.org"),"and ",o.a.createElement("a",{href:"http://www.w3.org/ns/csvw",className:n.link,target:"_blank",rel:"noopener noreferrer"},"http://www.w3.org/ns/csvw"),"."),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"left",marginBottom:r.spacing(3)}},"Provide a URL to download your ontology as JSON-LD in the main ",o.a.createElement("code",null,"@context"),", and feel free to ",o.a.createElement("a",{href:"https://github.com/MaastrichtU-IDS/fair-metadata-wizard/issues",className:n.link,target:"_blank",rel:"noopener noreferrer"},"create an issue")," on GitHub if the autocomplete does not work."),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();try{a(JSON.parse(s.upload_jsonld)),u(pe(pe({},s),{},{json_loaded_open:!0}))}catch(t){console.log("Invalid JSON-LD"),u(pe(pe({},s),{},{json_error_open:!0}))}}},o.a.createElement(R.a,{className:n.settingsForm},o.a.createElement(W.a,{id:"uploadJsonldInput",label:"JSON-LD to upload",placeholder:"JSON-LD to upload",value:s.upload_jsonld,required:!0,multiline:!0,className:n.fullWidth,variant:"outlined",onChange:function(e){u({upload_jsonld:e.target.value})},size:"small",InputProps:{className:n.input}}),o.a.createElement("div",{style:{width:"100%",textAlign:"center"}},o.a.createElement(f.a,{type:"submit",variant:"contained",className:n.saveButton,startIcon:o.a.createElement(re.a,null),color:"secondary"},"Upload your JSON-LD")),o.a.createElement(ae.a,{open:s.json_error_open,onClose:function(){u(pe(pe({},s),{},{json_error_open:!1}))},autoHideDuration:1e4},o.a.createElement(me.a,{elevation:6,variant:"filled",severity:"error"},"The JSON-LD provided is not valid")),o.a.createElement(ae.a,{open:s.json_loaded_open,onClose:function(){u(pe(pe({},s),{},{json_loaded_open:!1}))},autoHideDuration:8e3},o.a.createElement(me.a,{elevation:6,variant:"filled",severity:"success"},"Your JSON-LD has been loaded")))))))}function fe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function he(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(a),!0).forEach((function(t){I()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):fe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ye=Object(p.a)((function(e){return{link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{color:e.palette.primary.light,textDecoration:"none"}},settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},addEntryButton:{textTransform:"none",marginLeft:e.spacing(2),marginBottom:e.spacing(2)},fullWidth:{width:"100%"},input:{background:"white",fontSize:"14px",width:"100%"},smallerFont:{fontSize:"12px"},alignLeft:{textAlign:"left"},paperPadding:{padding:e.spacing(2,1),margin:e.spacing(2,2)},paperTitle:{fontWeight:300,marginBottom:e.spacing(1)}}}));function be(){var e=ye(),t=Object(U.a)(),a=o.a.useState({open:!1,dialogOpen:!1,wizard_jsonld:ve,ontology_jsonld:{}}),n=T()(a,2),r=n[0],i=n[1],l=o.a.useRef(r),s=o.a.useCallback((function(e){l.current=he(he({},l.current),e),i(l.current)}),[i]);o.a.useEffect((function(){var e="https://schema.org/";console.log(r.wizard_jsonld),console.log(r.wizard_jsonld["@context"]),r.wizard_jsonld["@context"]&&(e=r.wizard_jsonld["@context"]),(e.startsWith("https://schema.org")||e.startsWith("https://schema.org"))&&(e="https://schema.org/version/latest/schemaorg-current-https.jsonld"),Z.a.defaults.headers.common.Accept="application/ld+json",Z.a.get(e).then((function(e){console.log(e.data),s({ontology_jsonld:e.data})})).catch((function(e){console.log(e)}))}),[r.wizard_jsonld]);return o.a.createElement(N.a,{className:"mainContainer"},o.a.createElement(D.a,{variant:"h4",style:{textAlign:"center",marginBottom:t.spacing(1)}},"FAIR metadata wizard \ud83e\uddd9\u200d\u2642\ufe0f"),o.a.createElement(D.a,{variant:"body1",style:{textAlign:"center",marginBottom:t.spacing(1)}},"Quickly generates JSON-LD metadata for your datasets by filling a simple form"),o.a.createElement(ge,{renderObject:r.wizard_jsonld,onChange:function(e){s({wizard_jsonld:e}),console.log(r.wizard_jsonld)}}),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=document.createElement("a");t.setAttribute("href","data:text/turtle;charset=utf-8,"+encodeURIComponent(JSON.stringify(r.wizard_jsonld,null,4))),t.setAttribute("download","metadata.json"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t),i(he(he({},r),{},{open:!0}))}},o.a.createElement(R.a,{className:e.settingsForm},o.a.createElement(we,{renderObject:r.wizard_jsonld,ontologyObject:r.ontology_jsonld,onChange:function(e){s({wizard_jsonld:e}),console.log(r.wizard_jsonld)}}),o.a.createElement("div",{style:{width:"100%",textAlign:"center"}},o.a.createElement(f.a,{type:"submit",variant:"contained",className:e.saveButton,startIcon:o.a.createElement(q.a,null),color:"secondary"},"Download metadata as JSON-LD")))))}var we=function e(t){var a=t.renderObject,n=t.onChange,r=t.ontologyObject,i=ye(),l=Object(U.a)(),s=o.a.useState({autocompleteOntologyOptions:[]}),c=T()(s,2),m=c[0],u=c[1],p=o.a.useRef(m),d=o.a.useCallback((function(e){p.current=he(he({},p.current),e),u(p.current)}),[u]),g=function(e){a[e.target.id]=e.target.value,n(a)},h=function(e,t){a[e]=t,n(a)},y=function(e,t){"string"===typeof a[e][0]?a[e].push(e+" "+a[e].length):a[e].length>0&&a[e].push(he({},a[e][0])),n(a)},b=function(e,t){a.splice(e,1),n(a)};function w(e){var t="";return e["rdfs:label"]&&("string"===typeof e["rdfs:label"]&&(t+=e["rdfs:label"]),e["rdfs:label"].en&&(t+=e["rdfs:label"].en)),e["rdfs:comment"]&&("string"===typeof e["rdfs:comment"]&&(t+=e["rdfs:comment"]),e["rdfs:comment"].en&&(t+=e["rdfs:comment"].en)),t}function v(e){var t="";if(e&&e.target&&(t=e.target.value&&0!==e.target.value?e.target.value:e.target.innerText),t){var a=[],n=r["@graph"];Array.isArray(n)?a=n.filter((function(e){return-1!==w(e).toLowerCase().indexOf(t.toLowerCase())})):Object.keys(n).map((function(e){n[e]&&Array.isArray(n[e])&&(a=a.concat(n[e].filter((function(e){return-1!==w(e).toLowerCase().indexOf(t.toLowerCase())}))))})),d({autocompleteOntologyOptions:a.sort((function(e,t){return e["@type"]<t["@type"]?1:-1}))})}}return o.a.createElement("div",null,Object.keys(a).map((function(t,n){return o.a.createElement("div",{key:n},"@type"===t&&o.a.createElement(H.a,{id:t,onInputChange:v,value:a[t],options:m.autocompleteOntologyOptions,groupBy:function(e){return e["@type"]},getOptionLabel:function(e){return e["rdfs:label"]?"string"===typeof e["rdfs:label"]?e["rdfs:label"]:e["rdfs:label"].en?e["rdfs:label"].en:void 0:e},freeSolo:!0,includeInputInList:!0,renderInput:function(e){return o.a.createElement(W.a,A()({},e,{variant:"outlined",size:"small",label:"@type",placeholder:"@type",className:i.input}))}}),"string"===typeof a[t]&&"@type"!==t&&a[t]&&o.a.createElement(M.a,{container:!0},o.a.createElement(M.a,{item:!0},o.a.createElement(W.a,{id:t,label:t,placeholder:t,value:a[t],className:i.fullWidth,variant:"outlined",onChange:g,size:"small",InputProps:{className:i.input},required:!0,InputLabelProps:{required:!1}})),Array.isArray(a)&&"0"!==t&&o.a.createElement(M.a,{item:!0},o.a.createElement(f.a,{onClick:function(e){return b(t)},variant:"contained",size:"small",style:{textTransform:"none",marginLeft:l.spacing(2)},className:i.addEntryButton,startIcon:o.a.createElement(X.a,null),color:"primary"},"Delete"))),"object"===typeof a[t]&&a[t]&&o.a.createElement(F.a,{elevation:2,className:i.paperPadding},o.a.createElement(J.a,{label:t,style:{fontWeight:900,marginBottom:l.spacing(2),marginLeft:l.spacing(1)}}),Array.isArray(a)&&"0"!==t&&o.a.createElement(f.a,{onClick:function(e){return b(t)},variant:"contained",size:"small",style:{textTransform:"none",marginLeft:l.spacing(2)},className:i.addEntryButton,startIcon:o.a.createElement(X.a,null),color:"primary"},"Delete"),Array.isArray(a[t])&&o.a.createElement(f.a,{onClick:function(e){return y(t)},variant:"contained",size:"small",className:i.addEntryButton,startIcon:o.a.createElement(Q.a,null),color:"primary"},"Add ",t," entry"),o.a.createElement(e,{renderObject:a[t],onChange:function(e){return h(t,e)},ontologyObject:r}),Array.isArray(a[t])&&o.a.createElement(f.a,{onClick:function(e){return y(t)},variant:"contained",size:"small",className:i.addEntryButton,startIcon:o.a.createElement(Q.a,null),color:"primary"},"Add ",t," entry")))})))},ve={"@context":"https://schema.org","@type":"Dataset",name:"ECJ case law text similarity analysis",description:"results from a study to analyse how closely the textual similarity of ECJ cases resembles the citation network of the cases.",version:"v2.0",url:"https://doi.org/10.5281/zenodo.4228652",license:"https://www.gnu.org/licenses/agpl-3.0.txt",encodingFormat:"CSV",temporalCoverage:"2019-09-14/2020-07-01",dateCreated:{"@type":"Date","@value":"2019-09-14"},datePublished:{"@type":"Date","@value":"2020-07-01"},distribution:{"@type":"DataDownload",contentUrl:{"@type":"URL","@value":"https://zenodo.org/record/4228652/files/docona_cjeu_results_2018_v2_html.zip?download=1"},encodingFormat:"application/zip",contentSize:"1.1MB"},inLanguage:{"@type":"Language",name:"EN",alternateName:"EN"},keywords:["case law","court decisions","text similarity","network analysis"],creator:{"@type":"Person","@wizardRequired":!0,name:"concat @givenName @familyName",givenName:"Kody",familyName:"Moodley",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",jobTitle:"Postdoctoral researcher",email:"kody.moodley@maastrichtuniversity.nl",affiliation:{"@type":"Organization",name:"Maastricht Law & Tech Lab",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"},logo:{"@type":"ImageObject",contentUrl:"https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"}}},contributor:[{"@wizardMultivalueCheckArray":!0,"@type":"Person",givenName:"Pedro",familyName:"Hernandez Serrano",jobTitle:"Data Scientist",email:"p.hernandezserrano@maastrichtuniversity.nl",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/p.hernandezserrano/p.hernandezserrano_PP%20%287%20of%2013%29.jpg?itok=IUdreoIw&timestamp=1610395201",affiliation:{"@type":"Organization",name:"Institute of Data Science",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/research/institute-data-science"},logo:{"@type":"ImageObject",contentUrl:"https://avatars.githubusercontent.com/u/36262526?s=280&v=4"}}}],publisher:{"@type":"Person",name:"Kody Moodley",givenName:"Kody",familyName:"Moodley",jobTitle:"Postdoctoral researcher",image:"https://www.maastrichtuniversity.nl/sites/default/files/styles/text_with_image_mobile_portrait/public/profile/kody.moodley/kody.moodley_photo_kmoodley.jpg?itok=bN7b8s_-&timestamp=1583505301",email:"kody.moodley@maastrichtuniversity.nl",affiliation:{"@type":"Organization",name:"Maastricht Law & Tech Lab",url:{"@type":"URL","@value":"https://www.maastrichtuniversity.nl/about-um/faculties/law/research/law-and-tech-lab"},logo:{"@type":"ImageObject",contentUrl:"https://www.maastrichtuniversity.nl/sites/default/files/styles/page_photo/public/compacte20versie20law20and20tech20lab.jpg?itok=7lm6PEQF"}}},isBasedOn:[{"@type":"SoftwareApplication",name:"docona",description:"DoConA (Document Content and Citation Analysis Pipeline) is an open source, configurable and extensible Python tool to analyse the level of agreement between the citation network of a set of textual documents and the textual similarity of these documents.",applicationCategory:"Python script",operatingSystem:"cross-platform",version:"1.0",url:{"@type":"URL","@value":"https://github.com/MaastrichtU-IDS/docona"}},{"@type":"CreativeWork",name:"ECJ case law and citation network",description:"Citation network and full text documents of each judgement by the Court of Justice of the European Union that was published publicly on the EUR-LEX website (https://eur-lex.europa.eu/homepage.html) up until December 2018",version:"2.0",url:{"@type":"URL","@value":"https://doi.org/10.5281/zenodo.3926736"}}],citation:{"@type":"CreativeWork",name:"Similarity and Relevance of Court Decisions: A Computational Study on CJEU Cases",creator:[{"@type":"Person",name:"Kody Moodley"},{"@type":"Person",name:"Michel Dumontier"}],publisher:{"@type":"Organization",name:"IOS press",url:{"@type":"URL","@value":"https://www.iospress.nl"}},datePublished:{"@type":"Date","@value":"2019-12-10"},sameAs:{"@type":"URL","@value":"https://doi.org/10.3233/FAIA190307"}}},Ee=Object(p.a)((function(e){return{settingsForm:{width:"100%","& .MuiFormControl-root":{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"& .MuiFormHelperText-root":{marginTop:e.spacing(0),marginBottom:e.spacing(1)}},saveButton:{textTransform:"none",margin:e.spacing(2,2)},fullWidth:{width:"100%"},normalFont:{fontSize:"14px"},smallerFont:{fontSize:"12px"},alignLeft:{textAlign:"left"},paperPadding:{padding:e.spacing(2,2),margin:e.spacing(2,2)},paperTitle:{fontWeight:300,marginBottom:e.spacing(1)}}}));function Oe(){Ee();var e=o.a.useState({open:!1,dialogOpen:!1,project_license:"",language_autocomplete:[]}),t=T()(e,2);t[0],t[1];return o.a.createElement(N.a,{className:"mainContainer"},o.a.createElement(D.a,{variant:"body1",style:{textAlign:"center",marginBottom:"20px"}},"A wizard to generate Schema.org metadata for datasets in RDF JSON-LD format."))}var je=Object(s.a)({palette:{primary:{light:"#63a4ff",main:u.a[700],dark:"#004ba0"},secondary:{light:"#4caf50",main:"#087f23",dark:"#00600f"}},typography:{fontFamily:'"Open Sans", "Roboto", "Arial"',fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:500}});t.a=function(){return o.a.createElement(c.a,{theme:je},o.a.createElement(i.a,{basename:"/fair-metadata-wizard/"},o.a.createElement(r.a,{style:{height:"100%",backgroundColor:"#eceff1"}},o.a.createElement(k,null),o.a.createElement(l.a,{exact:!0,path:"/",component:be}),o.a.createElement(l.a,{path:"/about",component:Oe}),o.a.createElement(L,null))))}},141:function(e,t,a){a(142),e.exports=a(185)},142:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/fair-metadata-wizard/expo-service-worker.js",{scope:"/fair-metadata-wizard/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},148:function(e,t,a){var n=a(149),o=a(150);"string"===typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1};n(o,r);e.exports=o.locals||{}},150:function(e,t,a){(t=a(151)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans);"]),t.push([e.i,'.flexGrow {\n  flex-grow: 1; \n}\n\n.mainContainer {\n  margin-top: 30px;\n  margin-bottom: 20px;\n}\n\npre, code {\n  font-family: monospace, monospace;\n  border-radius: 6px;\n  padding: 2px;\n  color: white;\n  background-color: #455a64;\n  /* background-color: #1976d2; */\n}\n  \n/* @import url("https://fonts.googleapis.com/icon?family=Material+Icons");\nbody {\n  margin: 0;\n  padding: 0;\n  text-align: center; } */\n',""]),e.exports=t},95:function(e,t,a){e.exports=a.p+"static/media/icon.72626586.png"}},[[141,1,2]]]);
//# sourceMappingURL=app.a39a67b6.chunk.js.map