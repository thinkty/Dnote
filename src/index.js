import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// TODO: Modularize all these components by class and import them to use it
// Register Page

// Login Page

// Main Page
class Note extends React.Component {

}
class SearchBar extends React.Component {

}
class CreateNoteWindow extends React.Component {

}

// Profile Page

// Search Note Page

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();