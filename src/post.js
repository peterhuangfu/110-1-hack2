import React, { useState, useEffect } from 'react'
import moment from 'moment'
import agent from './agent'

import { useParams } from 'react-router-dom'
import { IconButton, Button, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

function Post(props) {
  const { pid } = useParams()
  console.log(pid)
  const [unlock, setUnlock] = useState(false)
  const [data, setData] = useState(null)
  setTimeout(() => {
    setUnlock(true)
  }, 300)

  const getPostDetail = async (pid) => {
    const postContent = await agent.get(`/getPostDetail?pid=${pid}`)
    setData(postContent.data.post)
  }

  const delPost = async (info) => {
    await agent.delete('/deletePost', info, {
      headers: {
        type: 'application/json'
      }
    })
      
    setTimeout(() => {
      props.navigate(-1)
    }, 300)
  }

  useEffect(() => {
    getPostDetail(pid)
  }, [pid])
  console.log(data)
  return (
    <div className="article-wrapper">
      <div id="goback-reply-btn">
        <Button variant="contained" color="primary" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {unlock ?
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
        </div> : <div></div>
      }
    </div>
  );
}

export default Post
