import * as React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Text, View, StyleSheet, Platform } from "react-native";
import { View } from 'react-native';
// import { Router, Route, Link } from "./react-router";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

// import NavBar from "./src/NavBar";
// import Footer from "./src/Footer";
import JsonldWizard from "./src/JsonldWizard";
// import About from "./src/About";
import "./App.css";
{/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link> */}

// Change theme color and typography here
const theme = createTheme({
  palette: {
    primary: { light: "#63a4ff", main: "#1976d2", dark: "#004ba0" },
    secondary: { light: "#ff7043", main: "#ff5722", dark: "#087f23" },
    // Green:
    // secondary: { light: '#4caf50', main: '#087f23', dark: '#00600f' },
    // primary: { light: blue[50], main: blue[600], dark: blue[900] },
    // red: { light: '#f05545', main: '#b71c1c', dark: '#7f0000' },
    // default: { light: '#fafafa', main: '#eceff1', dark: grey[600] }
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Arial"',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontSize: 11,
  },
});


// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement!);

export default () => {
  return(
    <ThemeProvider theme={theme}>
      {/* https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <View style={{ height: "100%", backgroundColor: "#eceff1" }}>
        <JsonldWizard />
      </View>
      {/* <Router basename="/json-ld-editor-react/">
        <View style={{ height: "100%", backgroundColor: "#eceff1" }}>
          <NavBar />
          <Route exact path="/" component={JsonldWizard} />
          <Route path="/about" component={About} />
          <Footer />
        </View>
      </Router> */}
    </ThemeProvider>
)}
// export default App;
