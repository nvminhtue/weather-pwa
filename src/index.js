import React from 'react';
import { render } from 'react-dom';
import { ToastContainer } from 'react-toastify';

import './App.css'
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>, document.getElementById('root'))
