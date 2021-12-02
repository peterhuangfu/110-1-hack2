const mongoose = require('mongoose')
const Post = require('./server/models/postRequire')

const example = [
  {
    postId: '13fb0fd1-0df3-4980-8f3f-ed1e6fbaaaa4',
    title: 'Private Test 1',
    content: 'private test content 1',
    timestamp: new Date('2021-12-02T04:51:04.360Z')
  },
  {
    postId: '6992d97d-9f27-4dc6-9023-2cde8d7c093f',
    title: 'Private Test 2',
    content: 'private test content 2',
    timestamp: new Date('2021-12-02T05:01:04.360Z')
  },
  {
    postId: '9e59662a-0899-48a6-b3c7-f724caeffe6d',
    title: 'Private Test 3',
    content: 'private test content 3',
    timestamp: new Date('2021-12-02T05:11:04.360Z')
  },
  {
    postId: '6f8f917b-505a-4e12-957c-03ffea5c6e32',
    title: 'Private Test 4',
    content: 'private test content 4',
    timestamp: new Date('2021-12-02T05:21:04.360Z')
  },
  {
    postId: 'd15d37a3-3557-4f60-afaa-cbc770c9df9f',
    title: 'Private Test 5',
    content: 'private test content 5',
    timestamp: new Date('2021-12-02T05:31:04.360Z')
  },
  {
    postId: 'e1b881e5-c28e-4dc7-a106-7898c001242d',
    title: 'Private Test 6',
    content: 'private test content 6',
    timestamp: new Date('2021-12-02T05:41:04.360Z')
  },
  {
    postId: '94b34fef-9632-4bc9-b3f4-8c3c6b9e9cff',
    title: 'Private Test 7',
    content: 'private test content 7',
    timestamp: new Date('2021-12-02T05:51:04.360Z')
  }
]

const dataInit = async () => {
  const checkData = await Post.find()
  await Post.deleteMany({})
  await Post.insertMany(example)
}

const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://Peter:870213@cluster1.clsel.gcp.mongodb.net/hack2?retryWrites=true&w=majority', dboptions)
.then(async res => {
  await dataInit()
  console.log('db initialized.')
  mongoose.connection.close()
})
