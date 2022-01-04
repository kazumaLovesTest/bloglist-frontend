import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginSevice from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ errorMessage: null, succuses: null })

  const resetInputSet = () => {
    setUsername('')
    setPassword('')

  }
  const handleLogin = async (event) => {
    event.preventDefault()
    if (username === '' || password === '') {
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
  const handleAdding = async (blog) => {
    blog = { ...blog, userId: user._id }
    try {
      const recievedBlog = await blogService.addBlog(blog)
      setBlogs(blogs.concat(recievedBlog))
      blogFormref.current.toggleVisibility()
      setNotification({ ...notification, succuses: `${recievedBlog.title} was added` })
      setTimeout(() => {
        setNotification({ ...notification, succuses: null })
      }, 3000)
    }
    catch (exception) {
      setNotification({ ...notification, errorMessage: `couldnt add blog because ${exception}` })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
    }
  }
  const blogRef = useRef()
  const addLike = async (blog) => {
    blog = { ...blog, userId: user._id }
    blog.likes = blog.likes + 1 
    delete blog.user
    try{
      const recievedBlog = await blogService.updateBlog(blog)
      const updatedBlogs = blogs.map(blog => blog.id === recievedBlog.id?recievedBlog:blog)
      setBlogs(updatedBlogs)
    }
    catch(exception) {
      setNotification({ ...notification, errorMessage: `couldnt add like because ${exception}` })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
    }
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
  const blogFormref = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="add blog" ref={blogFormref}>
      <Blog.BlogForm handleAdding={handleAdding} />
    </Togglable>
  )
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
        <Blog.Blog key={blog.id} blog={blog} addLike = {addLike} ref={blogRef}/>
      )}
      <br />
      {user.username} Logged in <button onClick={logOut}>Log Out</button>
      {blogForm()}
      <Notification notification={notification} />
    </div>
  )
}

export default App