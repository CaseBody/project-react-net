import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Films from "./pages/Films";
import Series from "./pages/Series";
import Item from "./pages/Item";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { theme } from "./theme"
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Vintage from './pages/Vintage';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Films />} />
          <Route path='series' element={<Series /> }/>
          <Route path='item' element={<Item /> }/>
          <Route path='login' element={<Login /> }/>
          <Route path='signup' element={<Signup /> }/>
          <Route path='account' element={<Account /> }/>
          <Route path='vintage' element={<Vintage	 /> }/>
          <Route path='*' element={<NotFound /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
