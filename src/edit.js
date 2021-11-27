import React, { useState } from 'react'
import agent from './agent'

import { Button, TextField } from '@material-ui/core'
import { Delete as DeleteIcon, Send as SendIcon } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

import './styles/post.css'

function Edit(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const text = (type, e) => {
    type === 'title' ? setTitle(e.target.value) : setContent(e.target.value)
  }

  const handleSubmit = async () => {
    const postId = uuidv4();
    const newPost = {
      postId: postId,
      title: title,
      content: content,
      timestamp: new Date(),
    }

    if (newPost.title.trim() === '' || newPost.content.trim() === '') {
      return
    }
    
    await agent.post('/createPost', newPost, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setTimeout(() => {
      props.navigate(-1);
    }, 300)
  }

  return (
    <div className="post-wrapper">
      <div className="post-text-container">
        <div style={{ fontWeight: 'Bold', fontSize: 18 }}>New Post</div>

        <div className="post-title">
          <TextField
            onChange={e => text('title', e)}
            label="Title"
            size="small"
            variant="outlined"
            className="post-title"
          />
        </div>

        <div className="post-content-container">
          <TextField
            onChange={e => text('content', e)}
            label="Content"
            variant="outlined"
            className="post-content-editor"
          />
        </div>

        <div className="post-btn-wrapper">
          <Button variant="contained" color="primary" className="post-btn" startIcon={<SendIcon />} onClick={handleSubmit}>Submit</Button>
          <Button variant="contained" color="secondary" className="post-cancel-btn" endIcon={<DeleteIcon />} onClick={e => props.navigate(-1)}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Edit
