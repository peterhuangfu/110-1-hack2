import { GetAllPosts, GetPostDetail, CreatePost, DeletePost } from './post'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  app.get('/api/getAllPosts', wrap(GetAllPosts))
  app.get('/api/getPostDetail', wrap(GetPostDetail))
  app.post('/api/createPost', wrap(CreatePost))
  app.delete('/api/deletePost', wrap(DeletePost))
}

export default routes
