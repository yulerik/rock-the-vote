import React, { useContext, useEffect } from 'react'
import { IssueContext } from '../context/issueProvider'
import { Link } from 'react-router-dom'
import IssueForm from './IssueForm'
import SearchAndSort from './SearchAndSort'


export default function Issues() {
    const {
        addIssue, 
        getAllIssues, 
        everyonesIssues, 
        upvoteIssue, 
        downvoteIssue,
        specificIssue,
        searchResultState
    } = useContext(IssueContext)
    
    const allIssues = everyonesIssues.map(issue => 
        <div className='issue-link' key={issue._id}>
            <div className='issue-vote'>
                <button onClick={() => upvoteIssue(issue._id)}>Up</button>
                <h6 style={{color: issue.votes.total >= 0 ? 'green' : 'red'}}>{issue.votes.total}</h6>
                <button onClick={() => downvoteIssue(issue._id)}>down</button>
            </div>
            <Link state={issue} to={issue._id} key={issue._id}>
                <h1>{issue.title}</h1>
                <p>{issue.description}</p>
            </Link>
        </div>
    )
    const displaySearchResults = searchResultState.map(issue => 
        <div className='issue-link' key={issue._id}>
            <div className='issue-vote'>
                <button onClick={() => upvoteIssue(issue._id)}><i className="fas fa-arrow-up"></i></button>
                <h6 style={{color: issue.votes.total >= 0 ? 'green' : 'red'}}>{issue.votes.total}</h6>
                <button onClick={() => downvoteIssue(issue._id)}>down</button>
            </div>
            <Link state={issue} to={issue._id} key={issue._id}>
                <h1>{issue.title}</h1>
                <p>{issue.description}</p>
            </Link>
        </div>
    )
    
    useEffect(() => {
        getAllIssues()
    }, [])
    
    return (
        <div className='all-issues'>
            <IssueForm addIssue={addIssue} />
            <SearchAndSort />
            <div className='all-issue-links'>
                <h3>All issues</h3>
                {allIssues}
            </div>
        </div>

    )
}