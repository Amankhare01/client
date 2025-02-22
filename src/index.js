import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import App from './App';
import { AuthProvider } from './Pages/context/Auth';
import 'antd/dist/reset.css'
import { SearchProvider } from './Pages/context/Search';
import { CartProvider } from './Pages/context/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <BrowserRouter>
    <App/>
    </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
