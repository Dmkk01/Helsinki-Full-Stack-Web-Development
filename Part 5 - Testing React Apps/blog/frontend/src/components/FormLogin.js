/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const FormLogin = ({ handleLogin, handleUsername, handlePassword, username, password }) => {

  FormLogin.displayName = 'FormLogin'
  FormLogin.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input className="username" type="text" value={username} name="Username" onChange={handleUsername}/>
        </div>
        <div>
          Password
          <input className="password" type="password" value={password} name="Password" onChange={handlePassword}/>
        </div>
        <button className="toLogin" type="submit">login</button>
      </form>
    </div>
  )
}

export default FormLogin