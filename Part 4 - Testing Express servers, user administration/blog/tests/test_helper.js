const Blog = require('../models/blog')

const User = require('../models/user')

const oneBlog = {
    title: 'Yes',
    author: 'Yes',
    url: 'Yes.com',
    likes: 10,
  }
  const oneBlogNoLikes = {
    title: 'No',
    author: 'No',
    url: 'No.com',
  }
const oneBlogMissing = {
    author: 'Maybe',
    likes: 10,
  }

const initialBlogs = [
    {
    title: "Mark",
    author: "Mark",
    url: "Mark.com",
    likes: 55,
    },
    {
    title: "Kaili",
    author: "Kaili",
    url: "Kaili.com",
    likes: 693,
    },
    {
    title: "Dom",
    author: "Dom",
    url: "Dom.com",
    likes: 1243,
    },
    {
    title: "Fooffo",
    author: "Fooffo",
    url: "Fooffo.com",
    likes: 777,
    },
    {
    title: "Mango",
    author: "Mango",
    url: "Mango.com",
    likes: 4322,
    }
]

const oneUser = {
  username: 'Pumpkin',
  name: 'Pumpkin',
  password: 'SuperPumpkin',
}

const badUser = {
  username: 'pp',
  name: 'BadPumpkin',
  password: 'pp',
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    oneBlog, oneBlogNoLikes, oneBlogMissing, initialBlogs, blogsInDb, usersInDb, oneUser
}