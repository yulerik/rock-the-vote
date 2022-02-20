import React, { useState} from 'react'
import axios from 'axios'
import req from 'express/lib/request'

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props) {
    const initState = {
        issues: [],
        everyonesIssues: [],
        userObjects: [],
        specificUser: {},
        specificIssue: {},
        userComments: [],
        userVotes: []
    }

    const [issueState, setIssueState] = useState(initState)
    const [commentState, setCommentState] = useState([])
    const [issueComments, setIssueComments] = useState([])
    const [showComments, setShowComments] = useState({ showComments: true }) 
    const [searchReturns, setSearchReturns] = useState([])
    const [searchResultState, setSearchResultState] = useState([])
    const [searchCommentState, setSearchCommentState] = useState([])

// get all issues user voted on
    function getVotedIssues(userId) {
        userAxios.get(`/api/user/${userId}/votes`)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    userVotes: res.data
                }))
            })
            .catch(err => console.log(err))
    }
    
// get all user comments 
    function getUserComments(userId) {
        userAxios.get(`/api/comments/${userId}`)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    userComments: res.data
                }))
            })
            .catch(err => console.log(err))
    }

// get all comments
    function allComments() {
        userAxios.get('/api/comments')
            .then(res => {
                setCommentState(prevState => ([...prevState, ...res.data]))
            })
    }  
// get all comments for an issue
    function commentsForIssue(issueId) {
        userAxios.get(`/api/issue/${issueId}/comments`)
            .then(res => {
                setIssueComments(prevState => res.data)
            })
            .catch(err => console.log(err))
    }

// add an issue
    function addIssue(newIssue) {
        userAxios.post('/api/issue', newIssue)
            .then(res => {
                getAllIssues()
                setIssueState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
// get all users
    function getAllUsers() {
        userAxios.get('/api/user')
            .then(res => {
                if (res.data.length === 0) {
                    // const noIssues = {
                    //         title: 'no issues yet',
                    //         desc: 'go to issues to add a new issue',
                    //         _id: '',
                    //         comments: [],
                    //         // user: req.user._id,
                    //         // imgUrl: '',
                    //         votes: {
                    //             total: 0,
                    //             upvoteUser: [],
                    //             downvoteUser: 0
                    //         }
                        // }
                        // setIssueState(prevState => ({
                        //     ...prevState,
                        //     issues: [noIssues]
                        // }))
                        return
                }
                setIssueState(prevState => ({
                    ...prevState,
                    userObjects: res.data
                }))
            })
            .catch(err => console.log(err))
    }
// get all issues
    function getAllIssues() {
        userAxios.get('/api/issue')
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    everyonesIssues: res.data
                }))
            })
            .catch(err => console.log(err))
    }
// get all issues for user
    function getUserIssues() {
        userAxios.get('/api/issue/user')
            .then(res => {
                if (res.data.length === 0) {
                    const noIssues = {
                            title: 'no issues yet',
                            desc: 'go to issues to add a new issue',
                            _id: '',
                            comments: [],
                            // user: req.user._id,
                            // imgUrl: '',
                            votes: {
                                total: 0,
                                upvoteUser: [],
                                downvoteUser: 0
                            }
                        }
                        setIssueState(prevState => ({
                            ...prevState,
                            issues: [noIssues]
                        }))
                        return
                }
                else {
                    setIssueState(prevState => ({
                        ...prevState,
                        issues: res.data
                    }))
                    getAllIssues()
                }
            })
            .catch(err => console.log(err))
    }
// user upvotes issue
    function upvoteIssue(issueId) {
        userAxios.put(`/api/issue/${issueId}/upvote`)
        .then(res => {
            getAllIssues()
            getIssue(issueId)
            setIssueState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => alert(err.response.data.errMsg))
    }
// user downvotes issue
    function downvoteIssue(issueId) {
        userAxios.put(`/api/issue/${issueId}/downvote`)
        .then(res => {
            getAllIssues()
            getIssue(issueId)
            setIssueState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => alert(err.response.data.errMsg))
    }
// get specific user from db
    function getUserObj(userId) {
        userAxios.get(`/api/user/${userId}`)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    specificUser: res.data
                }))
            })
            .catch(err => console.log(err))
    }
// add a comment to an issue
    function addComment(issueId, newComment) {
        userAxios.post(`/api/issue/${issueId}`, newComment)
            .then(res => {
                setCommentState(prevState => [...prevState, res.data])
                commentsForIssue(issueId)
            })
            .catch(err => console.log(err))
    }

// get specific issue
    function getIssue(issueId) {
        userAxios.get(`/api/issue/${issueId}`)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    specificIssue: res.data[0]
                }))
            })
            .catch(err => console.log(err))
    }
// get issue by search term
    function getSearchIssue(key, value) {
        userAxios.get(`/api/issue/search?${key}=${value}`)
        .then(res => {
            setIssueState(prevState => ({
                ...prevState,
                everyonesIssues: res.data
            }))
        })
        .catch(err => console.log(err))
    }

// get comment by search
    function getSearchComment(key, value) {
        getAllIssues()
        userAxios.get(`/api/comments/search?${key}=${value}`)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    everyonesIssues: res.data.map(each => prevState.everyonesIssues.find(issue => issue._id === each.issue))
                }))
            })
            .catch(err => console.log(err))
        console.log(searchCommentState)
    }
// delete an issue
    function deleteIssue(issueId) {
        userAxios.delete(`/api/issue/${issueId}`)
            .then(res => getAllIssues())
            .catch(err => console.log(err))
    }

    return (
        <IssueContext.Provider
            value = {{
                ...issueState,
                deleteIssue,
                getSearchComment,
                addIssue,
                getUserIssues,
                getAllIssues,
                getAllUsers,
                upvoteIssue,
                downvoteIssue,
                getUserObj,
                addComment,
                commentsForIssue,
                allComments,
                getUserComments,
                getVotedIssues,
                setShowComments,
                getIssue,
                setIssueState,
                getSearchIssue,
                setSearchResultState,
                setSearchCommentState,
                searchCommentState,
                searchResultState,
                showComments,
                issueComments
            }}
        >
            {props.children}
        </IssueContext.Provider>
    )


}