import React from 'react'

const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input type="text" value={username} name="Username" onChange={handleUsername}/>
        </div>
        <div>
          Password
            <input type="password" value={password} name="Password" onChange={handlePassword}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm