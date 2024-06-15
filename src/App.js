import React from 'react';
import './App.css';
import Widget from './components/Widget';
import { Routes } from 'react-router-dom';
import Form from './components/Form';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Widget/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
