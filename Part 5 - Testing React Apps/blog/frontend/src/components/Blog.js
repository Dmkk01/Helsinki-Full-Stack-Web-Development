/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove }) => {

  Blog.displayName = 'Blog'
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpaned = { display: expanded ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded} className="titleAuthor">
        {blog.title} {blog.author} <button className="view" onClick={() => setExpanded(!expanded)}> view </button><br/>
      </div>
      <div style={showWhenExpaned} className="likesUrl" >
        {blog.title} {blog.author} <button onClick={() => setExpanded(!expanded)}> hide </button> <br/>
        <a href={blog.url}>{blog.url}</a> <br/>
        {blog.likes} likes  <button type='button' value={blog.id} onClick={handleLikes}>like</button><br/>
        added by {blog.username} <br/>
        <button type='button' value={blog.id} onClick={handleRemove}>delete</button>
      </div>
    </div>
  )}

export default Blog