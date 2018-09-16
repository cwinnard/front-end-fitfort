import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FitForm from './components/FitForm';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><App /><FitForm /></div>, document.getElementById('root'));
registerServiceWorker();
