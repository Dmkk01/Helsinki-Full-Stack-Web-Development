const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

  
module.exports = blogRouter