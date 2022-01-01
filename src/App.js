import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginSevice from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ errorMessage: null, succuses: null })
  const [title, setTitle] = useState(null)
  const [url, setUrl] = useState(null)
  const [author, setAuthor] = useState(null)

  const resetInputSet = () => {
    setUsername(null)
    setPassword(null)
    setTitle(null)
    setUrl(null)
    setAuthor(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    if (username === null || password === null) {
      setNotification({ ...notification, errorMessage: 'Give both username and password' })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
      return
    }
    const credintials = {
      username: username,
      password: password
    }
    try {
      const user = await loginSevice.login(credintials)
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      resetInputSet()  
    }
    catch (exception) {
      setNotification({ ...notification, errorMessage: "wrong username or password" })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
    }
  }
  const handleAdding = async (event) => {
    event.preventDefault()
    if (author === null || url === null || title === null) {
      setNotification({ ...notification, errorMessage: "you must fill all blanks" })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      },3000)
      return
    }
    const blog = {
      author: author,
      title: title,
      url: url,
      userId: user._id,
    }
    try {
      blogService.addBlog(blog)
      setNotification({ ...notification, succuses: `${title} was added` })
      setTimeout(() => {
        setNotification({ ...notification, succuses: null })
      }, 3000)
    }
    catch (exception) {
      setNotification({ ...notification, errorMessage: `couldnt add blog because ${exception}` })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      },3000)
    }
    resetInputSet()
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }
  const loginInfo = {
    username: username,
    password: password,
    handleLogin: handleLogin,
  }
  const bloginfo = {
    title: title,
    url: url,
    author: author,
    handleAdding: handleAdding
  }
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const JsonLoggedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (JsonLoggedUser) {
      const user = JSON.parse(JsonLoggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])
  if (user === null)
    return (
      <>
        <LoginForm login={loginInfo} setUsername={setUsername} setPassword={setPassword} />
        <Notification notification={notification} />
      </>

    )
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog.Blog key={blog.id} blog={blog} />
      )}
      <br />
      {user.username} Logged in <button onClick={logOut}>Log Out</button>
      <h2>Add New blog</h2>
      <Blog.BlogForm bloginfo={bloginfo} setUrl={setUrl} setTitle={setTitle} setAuthor={setAuthor} />
      <Notification notification={notification} />
    </div>
  )
}

export default App