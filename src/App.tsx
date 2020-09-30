import React, { Suspense, Fragment } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
// Scss
import './App.scss';
// Component
import LoadingComponent from './common/loading/Loading.component';
// Mat
import { ThemeProvider } from '@material-ui/styles';
import { themes } from './core/config/theme';

//page
const HomePage = React.lazy(() => import('./pages/home/Home.page'));


function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <ThemeProvider theme={themes}>
          <Suspense fallback={<LoadingComponent />}>
            <Switch>
              <Route path="/" component={HomePage} />

            </Switch>
          </Suspense>
        </ThemeProvider>
      </Fragment>
    </BrowserRouter >


  );
}

export default App;
