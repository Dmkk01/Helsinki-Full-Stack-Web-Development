/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef, setBlogs, setErrorMessage, blogs }) => {

  BlogForm.displayName = 'BlogForm'
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  return (
    <div>
      <h2>Create a new Blog Post</h2>
      <form onSubmit={addBlog}>
        <div>
            title: <input type="text" value={newTitle} name="Title" onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
        <div>
            author: <input type="text" value={newAuthor} name="Author" onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
        <div>
            url: <input type="text" value={newUrl} name="URL" onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm