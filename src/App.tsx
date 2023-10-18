import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Mdata } from './Mdata';
import { CompareData } from './compareData';

function App() {
  return (
    <div className="main">
      <div className="box">
        <Mdata></Mdata>
        <div className="compareBox">
          <CompareData></CompareData>
        </div>
      </div>
    </div>
  );
}

export default App;
