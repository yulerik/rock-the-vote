import { init } from 'express/lib/application'
import React, { useContext, useState } from 'react'
import {IssueContext} from '../context/issueProvider'

const initState = {
    title: ''
}

export default function SearchAndSort(props) {
    const {getAllIssues, searchCommentState, setSearchCommentState, setIssueState, getSearchComment, getSearchIssue, setSearchResultState, searchResultState} = useContext(IssueContext)
    const [searchState, setSearchState] = useState(initState)


    function handleSortChange(event) {
        console.dir(event.target.value)
        // everyonesIssues.sort((a, b) => (b.votes.total - a.votes.total))
        if (event.target.value === 'upvote')
        setIssueState(prevState => ({
            ...prevState,
            everyonesIssues: prevState.everyonesIssues.sort((a, b) => (b.votes.total - a.votes.total))
        }))
        else if (event.target.value === 'downvote') {
            setIssueState(prevState => ({
                ...prevState,
                everyonesIssues: prevState.everyonesIssues.sort((a, b) => (a.votes.total - b.votes.total))
            }))
        }
        else if (event.target.value === 'mostCommented') {
            setIssueState(prevState => ({
                ...prevState,
                everyonesIssues: prevState.everyonesIssues.sort((a, b) => (b.comments.length - a.comments.length))
            }))
        }
        else if (event.target.value === 'leastCommented') {
            setIssueState(prevState => ({
                ...prevState,
                everyonesIssues: prevState.everyonesIssues.sort((a, b) => (a.votes.total - b.votes.total))
            }))
        }
    }

    function handleSearchChange(event) {
        const {name, value} = event.target
        console.log(name)
        console.log(value)
        setSearchState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleSearchSubmit(event) {
        event.preventDefault()
        let searchKey = ''
        let searchValue = searchState.title
        // change searchKey to title or comment if checked
        for (let i = 0; i < event.target.length; i++) {
            let current = event.target[i]
            if (current.checked === true) {
                searchKey = current.value
            }
        }
        if (searchState.title === '') {
            setSearchResultState([])
            setSearchCommentState([])
            return getAllIssues()
        }
        else if (searchKey === 'comment') {
            getSearchComment(searchKey, searchValue)
            setSearchState(initState)
        }
        else if (searchKey === 'title') {
            getSearchIssue(searchKey, searchValue)
            setSearchState(initState)
        }
    }

    return (
        <>
            <p>Sort By:</p>
            <form id='sort' onChange={handleSortChange}>
                <label for='upvote' >Upvotes</label>
                <input type='radio' value='upvote' name='sort' />
                <label for='downvote' >Downvotes</label>
                <input name='sort' type='radio' value='downvote' />
                <label for='mostCommented'>Most Commented</label>
                <input type='radio' value='mostCommented' name='sort' />
                <label for='leastCommented'>Least Commented</label>
                <input type='radio' value='leastCommented' name='sort' />
            </form>
            <p>Search for: </p>
            <form id='search' onSubmit={handleSearchSubmit} >
                <label for='title' >issues</label>
                <input type='radio' value='title' name='search' defaultChecked/>
                <label for='comment' >comments</label>
                <input name='search' type='radio' value='comment' />
                <input name='title' value={searchState.title} onChange={handleSearchChange} type='search'></input>
                <button>Search</button>
            </form>
        </>
    )
}