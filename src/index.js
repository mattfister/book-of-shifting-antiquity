import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Page from './components/Page';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter forceRefresh>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/page/:page" element={<Page/>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

document.body.style = 'background: black;';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
