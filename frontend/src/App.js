import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MainRouter />
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
