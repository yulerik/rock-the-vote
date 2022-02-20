import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    props.addIssue(inputs)
    setInputs(initInputs)
  }

  const { title, description, imgUrl } = inputs
  return (
    <form id='new-issue-form' onSubmit={handleSubmit}>
      <label>Issue:</label>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"
        required/>
      <label>Describe issue:</label>
      <textarea 
        rows='3'
        cols='50'
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"
        required/>
      <label>Image (optional):</label>
      <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button>Add Issue</button>
    </form>
  )
}