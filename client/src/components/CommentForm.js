import React, { useState } from 'react'

const initInputs = {
  comment: ""
}

export default function CommentForm(props){
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
    props.addComment(e.target.id, inputs)
    setInputs(initInputs)
  }

  const { comment } = inputs
  return (
    <form id={props.props._id} onSubmit={handleSubmit}>
        <label>Comment on this issue:</label>
        <textarea
            type='text'
            cols='50'
            rows='3'
            name='comment'
            value={comment}
            onChange={handleChange}
            placeholder='Comment here'
            required
        ></textarea>
        <button>Add Comment</button>
    </form>
  )
}