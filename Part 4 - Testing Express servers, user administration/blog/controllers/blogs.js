const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (request.body.title === undefined && request.body.url === undefined) {
      response.status(400).end()
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  })

  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).end()
  })

  
module.exports = blogRouter