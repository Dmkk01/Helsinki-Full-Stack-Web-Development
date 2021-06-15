const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObject = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe('blog posts', () => {
    test('returns the correct length', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      })
    test('the unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
      })
      test('can post new blog post', async () => {
        await api.post('/api/blogs').send(helper.oneBlog)
        const blogss = await helper.blogsInDb()
        expect(blogss.length).toBe(helper.initialBlogs.length + 1)
      })
      test('gives 0 likes if not included', async() => {
        await api.post('/api/blogs').send(helper.oneBlogNoLikes)
        const blogss = await helper.blogsInDb()
        expect(blogss.map(n => n.likes)).toContain(0)
        expect(blogss.map(n => n.likes)).not.toContain(undefined)
      })
      test('respond 400 if title and url missing', async() => {
        await api.post('/api/blogs').send(helper.oneBlogMissing).expect(400)
      })
})

describe('Blog users', () => {
  test('wrong password', async () => {
    const user1 = await api.post('/api/users').send(helper.oneUser)
    const user2 = await api.post('/api/users').send(helper.badUser)
    const users = await helper.usersInDb()
    expect(users.length).toBe(1)
  })
})
  afterAll(() => {
    mongoose.connection.close()
  })