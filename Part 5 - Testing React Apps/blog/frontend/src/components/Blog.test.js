/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog', () => {
  let component
  const blog = { title: 'yes', author: 'no', likes: 12, url: 'maybe.com' }
  const handleLikes = () => console.log('liked')
  const handleRemove = () => console.log('removed')

  test('renders the title and author but not the likes or url', () => {
    component = render(<Blog blog={blog} handleLikes={handleLikes} handleRemove={handleRemove}/>)
    expect(component.container).toHaveTextContent('yes')
    expect(component.container).toHaveTextContent('no')
    expect(component.container.querySelector('.likesUrl')).toHaveStyle('display: none')
  })

  test('likes and url are visible when pressed the button', () => {
    component = render(<Blog blog={blog} handleLikes={handleLikes} handleRemove={handleRemove}/>)
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container.querySelector('.titleAuthor')).toHaveStyle('display: none')
  })

  test('checking if it is possible to press the like button twice', () => {
    const mockHandler = jest.fn()
    component = render(<Blog blog={blog} handleLikes={mockHandler} handleRemove={handleRemove}/>)
    const button = component.getByText('like it')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
