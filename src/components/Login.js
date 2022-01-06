import React from 'react'
import propTypes from 'prop-types'
const LoginForm = ({ login, setUsername, setPassword }) => {
  LoginForm.prototype = {
    login: propTypes.object.isRequired,
    setUsername: propTypes.func.isRequired,
    setPassword: propTypes.func.isRequired
  }
  return (
    <>
      <form onSubmit={login.handleLogin}>
        username:<input id='username' type='text'
          name='username'
          value={login.username}
          onChange={({ target }) => setUsername(target.value)} />
        <br />
        password:<input id='password' type='password'
          name='password'
          value={login.password}
          onChange={({ target }) => setPassword(target.value)} />
        <br />
        <button type='sumbit'>login</button>
      </form>
    </>
  )
}

export default LoginForm