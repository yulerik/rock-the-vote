import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userProvider'
import { IssueContext } from '../context/issueProvider'


export default function Profile(){
  const [profileState, setProfileState] = useState({})
  const { user : {username, _id}} = useContext(UserContext)
  const { 
    issues,
    userComments, 
    getUserComments,
    getUserIssues,
    everyonesIssues,
    getVotedIssues,
    userVotes,
    userObjects,
    getAllIssues,
    getAllUsers,
    deleteIssue
  } = useContext(IssueContext)

// links to all issues user voted on
  // const displayUserVotes = Object.keys(userVotes).length === 0 ? 'no votes yet' : userVotes.map(each => {
  //   // if true user upvoted
  //   const findVote = each.votes.upvoteUsers.find(vote => vote === _id)
  //   const postedByUser = userObjects.length === 0 ? 'loading users' : userObjects.find(user => user._id === each.user)

  //   return (
  //     <div className='profile-link' style={{backgroundColor: findVote ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'}}>
  //       <Link to={`/issues/${each._id}`} state={each} key={each._id}>
  //         <h1>{each.title}</h1>
  //       </Link>
  //       <p style={{color: findVote ? 'green' : 'red'}}>{each.votes.total}</p>
  //       <p>posted by: {postedByUser.username}</p>
  //     </div>
  //   )
  // })
  
// links to all issues user commented on
  // const displayUserComments = Object.keys(userComments).length === 0 ? 'no comments yet' : userComments.length === 0 ? 'no issues yet' : userComments.map(each => {
  //   const findIssue = everyonesIssues.find(eachIssue => eachIssue._id === each.issue)
  //   const postedByUser = userObjects === undefined ? 'loading users' : userObjects.find(user => user._id === findIssue.user)

  //   return (
  //     <div className='profile-link'>
  //       <Link state={findIssue} to={`/issues/${each.issue}`} key={each.issue}>
  //         <h3>{findIssue.title}</h3>
  //       </Link>
  //       <h1>{each.comment}</h1>
  //       <p>posted by: {postedByUser.username}</p>
  //     </div>
  //   )
  // })
  
  function deleteIssueFromDb(event) {
    deleteIssue(event.target.parentElement.id)
  }
// links to all issues user posted
  const userIssues =  issues.length === 0 ? 'no posted issues yet' : issues.map(each => 
    <div id={each._id} className='profile-link'>
      <Link state={each} to={`/issues/${each._id}`} key={each._id}>
        <h1>{each.title}</h1>
      </Link>
      <h4 style={{color: each.votes.total >=0 ? 'green' : 'red'}}>{each.votes.total}</h4>
      <button onClick={deleteIssueFromDb} style={{fontSize: '12px', backgroundColor: 'red', marginTop: '5px'}}>delete</button>
    </div>
    )

  useEffect(() => {
    getUserIssues()
    getAllUsers()
    getAllIssues()
    getVotedIssues(_id)
    getUserComments(_id)
  }, [])

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Below are links to all of the issues that you've interacted with.</h3>
      <div className='profile-issues'>
        <h4>Posted Issues</h4>
        <hr></hr>
        {issues.length === 0 ? 'loading' : userIssues }
      </div>
      <div className='profile-comments'>
        <h4>Commented on issues</h4>
        <hr></hr>
        {/* { Object.keys(userComments).length === 0 ? 'no comments yet' : displayUserComments} */}
      </div>
      <div className='profile-votes'>
        <h4>Voted on issues</h4>
        <hr></hr>
        {/* {userVotes.length === 0 ? 'loading' : displayUserVotes} */}
      </div>
    </div>
  )
}