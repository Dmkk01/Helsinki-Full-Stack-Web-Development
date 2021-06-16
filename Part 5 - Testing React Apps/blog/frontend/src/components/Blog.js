import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.author}: {blog.title}
  </div>  
)

export default Blog