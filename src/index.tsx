import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './components/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
