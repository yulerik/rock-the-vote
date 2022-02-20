import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Issues from './components/Issues'
import IssueCard from './components/IssueCard'

import {IssueContext} from './context/issueProvider'
import {UserContext} from './context/userProvider'

export default function App(){
  const {token, logout} = useContext(UserContext)
  const {
    getUserObj, 
    specificUser, 
    specificIssue,
    addComment,
    commentsForIssue,
    issueComments,
    userObjects,
    showComments,
    setShowComments,
    upvoteIssue,
    downvoteIssue,
    getIssue
  } = useContext(IssueContext)

  return (
    <div className="app">
      {/* if token is truthy then show the navbar */}
      { token && <Navbar logout={logout} />}
      <Routes>
        <Route 
          index
          path="/" 
          element={token ? 
            <Navigate 
              to='profile' 
              element={<Profile />} 
              replace 
            /> : 
            <Auth />
          }
        /> 
        <Route 
          path="/profile"
          element={ token ?  
            <Profile /> : 
            <Navigate to='/' replace />
          }
        />
        <Route 
          path="/issues"
          element={ token ? 
            <Issues /> : 
            <Navigate to='/' replace/>
          }
        />
        <Route 
          path='/issues/:issueId' 
          element={ token ? 
            <IssueCard 
              commentsForIssue={commentsForIssue} 
              addComment={addComment} 
              user={specificUser}
              getUser={getUserObj}
              issueComments={issueComments} 
              userObjects={userObjects}
              showComments={showComments}
              setShowComments={setShowComments}
              upvoteIssue={upvoteIssue}
              downvoteIssue={downvoteIssue}
              getIssue={getIssue}
              specificIssue={specificIssue}
            /> : 
            <Navigate to='/' replace/>
          }
        /> 
      </Routes>
    </div>
  )
}