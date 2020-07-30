import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Scss
import './App.scss';
import { theme } from './core/theme';
// Component
import { HomePage } from './pages/home/Home.page';
// Mat
import { ThemeProvider } from '@material-ui/core/styles';
import { LoginPage } from './pages/login/Login.page';
import { RegisterPage } from './pages/register/Register.page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>

  );
}

export default App;
