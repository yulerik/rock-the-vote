import React from 'react'
import { Link } from 'react-router-dom'

export default function IssueList(props){
  const { issues, downvoteIssue } = props

  const userIssues = issues.map(issue => 
    <div>
      <Link state={issue} to={`/issues/${issue._id}`} key={issue._id}>
        <h1>{issue.title}</h1>
      </Link>
      <button>Up</button>
      <h3>{issue.votes.total}</h3>
      <button onClick={downvoteIssue}>down</button>
    </div>
    )

  return (
    <div className="issue-list">
      {userIssues}
    </div>
  )
}