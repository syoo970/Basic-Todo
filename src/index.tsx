import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RecoilRoot} from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Darktheme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={Darktheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
