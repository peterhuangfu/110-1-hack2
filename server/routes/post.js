import Post from '../models/post'
import moment from 'moment'

const sortData = (data) => {
  return (data.sort((a, b) => moment(a.timestamp).diff(moment(b.timestamp))))
}

// 1st API
const GetAllPosts = async (req, res) => {
  let data = []
  let sortedData = []
  
  try {
    data = await Post.find()
    sortedData = sortData(data)

    if (sortedData.length) {
      res.status(200).send({
        message: 'success',
        data: sortedData
      })
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
      data: null
    })
  }
}

// 2nd API
const GetPostDetail = async (req, res) => {
  let postInfo = {}

  try {
    const pid = req.query.pid
    postInfo = await Post.findOne({ postId: pid })
    
    if (Object.keys(postInfo).length) {
      res.status(200).send({
        message: 'success',
        post: postInfo
      })
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
      post: null
    })
  }
}

// 3rd API
const CreatePost = async (req, res) => {
  try {
    const newPost = new Post(req.body)
    await newPost.save()
    
    res.status(200).send({
      message: 'success',
    })
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
    })
  }
}

// 4th API
const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ postId: req.query.pid })
    
    res.status(200).send({
      message: 'success',
    })
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
    })
  }
}

export { GetAllPosts, GetPostDetail, CreatePost, DeletePost }
