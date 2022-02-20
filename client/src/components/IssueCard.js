import React, { useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommentForm from './CommentForm'
import {IssueContext} from '../context/issueProvider'

export default function IssueCard(props){
  const {userObjects, issueComments, specificIssue, getIssue, getUserObj, commentsForIssue} = useContext(IssueContext)
  const location = useLocation()
  const {title, description, user, votes, _id} = location.state
  
  function findUsername(users, userId) {
    const findUserObj = users.find(each => each._id === userId)
    return findUserObj.username
  }

  const displayComments = issueComments.map(each => 
    <div className='comment'>
      <h3>{each.comment}</h3>
      <p>commented by: {findUsername(userObjects, each.user)}</p>
    </div>
  )

  function commentsHideShow() {
    props.setShowComments(prevState => ({showComments: !prevState.showComments}))
  }

  useEffect(() => {
    getIssue(_id)
    getUserObj(user)
    commentsForIssue(_id)
  }, [])

  return (
    <div className="issue-card">
      <div className='issue-info'>
        <div className='vote'>
          <button onClick={() => {props.upvoteIssue(_id)}}>Upvote</button>
          <h4>{Object.keys(specificIssue).length === 0 ? 'loading' : specificIssue.votes.total}</h4>
          <button onClick={() => props.downvoteIssue(_id)}>Downvote</button>
        </div>
        <div className='issue'>
          <p>posted by: {props.user.username}</p>
          <h1>issue title: {title}</h1>
          <h3>issue description: {description}</h3>
          <h5>comments({props.issueComments.length})</h5>
        </div>
      </div>
      <div className='comments-for-issue'>
        <button onClick={commentsHideShow}>{props.showComments.showComments ? 'hide comments' : 'show comments'}</button>
        <CommentForm props={location.state} addComment={props.addComment} />
      </div>
      <div style={{display: props.showComments.showComments ? 'grid' : 'none' }} className='all-issues-comments'>
        {displayComments}
      </div>
    </div>
  )
}