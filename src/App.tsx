import React from 'react';
// Scss
import './App.scss';
// Component
import { HomePage } from './pages/home/Home.page';
// Mat
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './core/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage></HomePage>
    </ThemeProvider>
  );
}

export default App;
