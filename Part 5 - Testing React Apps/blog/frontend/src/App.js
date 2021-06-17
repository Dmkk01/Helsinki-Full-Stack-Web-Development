/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import FormLogin from './components/FormLogin'
import FormBlog from './components/FormBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })

  }
  const handleRemove = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Do you want to remove the ${blog.title} by ${blog.author}`)) {
      blogService.removePost(id)
        .catch(() => {
          setBlogs(blogs.filter(n => n.id !== id))
        })
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <FormLogin handleLogin={handleLogin} handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)} username={username} password={password} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} is logged in
        <button type='button' onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <FormBlog setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogs={blogs} blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} />)}
    </div>
  )
}

export default App