/* eslint-disable linebreak-style */
import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return (
    <div className={loggedUserJSON ? 'notification good' : 'notification bad'}>
      {message}
    </div>
  )
}
export default Notification