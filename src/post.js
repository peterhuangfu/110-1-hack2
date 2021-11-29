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
      <div id="goback-reply-btn">
        <Button variant="contained" color="primary" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {data ?
        <div className="article-container">
          <div className="article-title">
            <div>
              {data ? data.title : ''}
              <IconButton onClick={() => delPost(data)} className="post-delete" size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div className="article-author-time-container">
              <span>{moment(data ? data.timestamp : new Date()).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>

            <div className="article-content-container">
              <div className="accordion-container">
                <Typography className="article-subtitle">{data ? data.title : ''}</Typography>
                <Typography component={'span'}>
                  {data ? data.content : ''}
                </Typography>
              </div>     
            </div>
          </div>
        </div> : <div className="article-container"><h1>Post not found</h1></div>
      }
    </div>
  );
}

export default Post
