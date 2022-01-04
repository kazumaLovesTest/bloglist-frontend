import React from 'react'
const LoginForm = ({ login, setUsername, setPassword }) => {
  return (
    <>
      <form onSubmit={login.handleLogin}>
        username:<input type='text'
          name='username'
          value={login.username}
          onChange={({ target }) => setUsername(target.value)} />
        <br />
        password:<input type='password'
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