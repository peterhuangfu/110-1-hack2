import React, { useState, useEffect } from 'react'
import agent from './agent'
import moment from 'moment'

import { Button } from '@material-ui/core'

function Board(props) {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const postRes = await agent.get('/getAllPosts')
      setPosts(postRes.data.data)
    }

    fetchData()
  }, [])
  
  return (
    <>
      <div className="board-navbar">
        <div style={{ fontWeight: 'bold', fontSize: 28 }}>Board</div>
        <Button className="board-launch-btn" variant="contained" color="primary" onClick={() => props.navigate('/new')}>New Post</Button>
      </div>
      
      <div className="board-discuss-container">
        {posts.length ?
          <div className="articles-container">
            {posts.map((e, i) => (
              <div className="article-post" key={i}>
                <div className="article-prefix">
                  <span className="each-tag">【心得】</span> &nbsp;
                  <span className="each-id" onClick={() => props.navigate(`/post/${e.postId}`)}>Hello</span>
                </div>
                <div className="article-postfix">
                  <span className="each-name">HuangFu</span> &nbsp;&nbsp;
                  <span className="each-time">{moment(new Date()).format('YYYY-MM-DD')}</span>
                </div>
              </div>
            ))}
          </div> : <div></div>
        }
      </div>
    </>
  )
}

export default Board
