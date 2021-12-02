import React, { useState, useEffect } from 'react'
import moment from 'moment'
import instance from './instance'

import { useParams } from 'react-router-dom'
import { IconButton, Button, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

function Post(props) {
  const { pid } = useParams()
  const [data, setData] = useState(null)

  const getPostDetail = async (pid) => {
    const postContent = await instance.get(`/getPostDetail?pid=${pid}`)
    setData(postContent.data.post)
  }

  const delPost = async (info) => {
    await instance.delete(`/deletePost?pid=${info.postId}`)
      
    setTimeout(() => {
      props.navigate(-1)
    }, 300)
  }

  useEffect(() => {
    getPostDetail(pid)
  }, [pid])
  
  return (
    <div className="article-wrapper">
      <div>
        <Button variant="contained" color="primary" id="goback-reply-btn" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {data ?
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {data.title}
            <IconButton onClick={() => delPost(data)} className="post-delete" size="small" id="pid-detail-del-btn">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="article-time">
            <span id="pid-detail-time">{moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className="article-content-container">
            <Typography component={'span'} id="pid-detail-content">
              {data.content}
            </Typography>
          </div>
        </div> : <div className="article-container"><h1>Post not found</h1></div>
      }
    </div>
  );
}

export default Post
