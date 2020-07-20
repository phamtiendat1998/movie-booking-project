import React from 'react';
import logo from './logo.svg';
import './App.scss';
//page
import { HomePage } from './pages/home/Home.page';
import { LoginPage } from './pages/login/Login.page';


function App() {
  return (
    <div className="App">
      {/* <HomePage></HomePage> */}
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
