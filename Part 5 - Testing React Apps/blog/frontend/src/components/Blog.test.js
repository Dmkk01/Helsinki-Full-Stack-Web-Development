/* eslint-disable linebreak-style */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog', () => {
  let component
  const blog = { title: 'yes', author: 'no', likes: 12, url: 'maybe.com' }
  const handleLikes = () => console.log('liked')
  const handleRemove = () => console.log('removed')

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLikes={handleLikes} handleRemove={handleRemove}/>)
  })
  test('renders the title and author but not the likes or url', () => {
    expect(component.container).toHaveTextContent('yes')
    expect(component.container).toHaveTextContent('no')
    expect(component.container.querySelector('.likesUrl')).toHaveStyle('display: none')
  })
})