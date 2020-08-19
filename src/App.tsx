import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
// Scss
import './App.scss';
import { theme } from './core/config/theme';
// Component
import { HomePage } from './pages/home/Home.page';

// Mat
import { ThemeProvider } from '@material-ui/core/styles';


function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="**" component={HomePage} />

            </Switch>
          </Suspense>
        </ThemeProvider>
      </Fragment>
    </BrowserRouter>


  );
}

export default App;
