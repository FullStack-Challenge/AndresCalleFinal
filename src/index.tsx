import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppCompare from './AppCompare';
import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
    <Menu/>
      <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/compare" element={<AppCompare/>} />
      </Routes>
    </BrowserRouter>
);
