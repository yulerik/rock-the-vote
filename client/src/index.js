import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/userProvider'
import IssueProvider from './context/issueProvider'
import './css/styles.css'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <IssueProvider>
        <App/>
      </IssueProvider>
    </UserProvider>
  </BrowserRouter>, 
  document.getElementById('root')
)