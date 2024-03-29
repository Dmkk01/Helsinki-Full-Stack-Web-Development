const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    if (request.body.title === undefined && request.body.url === undefined) {
      response.status(400).end()
      return
    }
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
  
      const user = await User.findById(decodedToken.id)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    try {
      if (blog.user.toString() !== decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        return response.status(401).json({ error: 'you are not the author of the blog post' })
      }
    } catch (exception) {
      response.status(400).end()
      next(exception)
    }
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