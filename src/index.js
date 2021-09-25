import './wdyr'; // <--- first import
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import "tailwindcss/tailwind.css";
// import '.styles/app.css';
import './styles/app.css'

ReactDOM.render(
    <FirebaseContext.Provider value= {{ firebase, FieldValue }}>
        <App />
    </FirebaseContext.Provider>,

document.getElementById('root'));


//Client side rendered App : react(cra)
    // database which is firebase
    //react-loading-skeleton
    //tailwind

//folder structure
    //src
        // -->components,
        //-->consants,
        //-->context,
        //-->helpers,
        //-->hooks,
        //-->pages
        //-->lib (firebase is going to live here)
        // -->services(firebase functions in here)
        //-->styles ( tailwind's folder (app/tailwind))

