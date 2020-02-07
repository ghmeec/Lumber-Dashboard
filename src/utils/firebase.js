import React, { createContext } from 'react'
import app from 'firebase/app'

const FirebaseContext = createContext(null)
export { FirebaseContext }


export default ({ children }) => {  if (!app.apps.length) {
    app.initializeApp({
        apiKey: "AIzaSyAlZDp12JGMiuWB6QKsJcNEEhMFk87eG7E",
        authDomain: "markets-mpempa.firebaseapp.com",
        databaseURL: "https://markets-mpempa.firebaseio.com",
        projectId: "markets-mpempa",
        storageBucket: "markets-mpempa.appspot.com",
        messagingSenderId: "960453092929",
        appId: "1:960453092929:web:59d9fb1984d9a55984c8c0",
        measurementId: "G-F5EPCV773S"    
    })
  }  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )}