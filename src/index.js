import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import Sequencer from './Sequencer';
import main from './main.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Sequencer />, document.getElementById('root'));


serviceWorker.register();
