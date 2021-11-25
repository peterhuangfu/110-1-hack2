import Post from './models/post'

const example = [
  {
    postId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    title: 'Example',
    content: 'Hope you guys have a nice experience while writing hackathon 2 !',
    timestamp: new Date()
  }
]

const dataInit = async () => {
  const checkData = await Post.find()
  if (checkData.length !== 1) {
    await Post.remove({})
    await Post.insertMany(example)
  }
}

export { dataInit }
