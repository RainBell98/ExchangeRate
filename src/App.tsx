import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Mdata } from './Mdata';
import SpinningGear from './SPinningGear';

function App() {
  return (
    <div className="main">
      <div className="box">
        <h2 className="h2">Main</h2>
        <SpinningGear></SpinningGear>
        <Mdata></Mdata>
      </div>
    </div>
  );
}

export default App;
