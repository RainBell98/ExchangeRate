import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Mdata } from './Mdata';
import SpinningGear from './SPinningGear';
import { CompareData } from './compareData';
import { RateChart } from './rateChart';

function App() {
  return (
    <div className="main">
      <div className="box">
        <h2 className="h2">Main</h2>
        <SpinningGear></SpinningGear>
        <Mdata></Mdata>
        <CompareData></CompareData>
      </div>
      <RateChart></RateChart>
    </div>
  );
}

export default App;
