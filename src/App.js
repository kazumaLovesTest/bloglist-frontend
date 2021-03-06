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
      setNotification({ ...notification, errorMessage: 'wrong username or password' })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
    }
  }
  const handleAdding = async (blog) => {
    try {
      const recievedBlog = await blogService.addBlog(blog)
      setBlogs(blogs.concat(recievedBlog))
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
  const addLike = async (blog) => {
    const blogCopy = { ...blog, likes: blog.likes + 1, user: user._id }
    try {
      const recievedBlog = await blogService.updateBlog(blogCopy)
      const updatedBlogs = blogs.map(blog => blog.id === recievedBlog.id ? recievedBlog : blog)
      const sortedBlogs = updatedBlogs.sort((a, b) => {
        if (a.likes < b.likes)
          return 1
        else if (a.likes > b.likes)
          return -1
        return 0
      })
      setBlogs(sortedBlogs)
    }
    catch (exception) {
      setNotification({ ...notification, errorMessage: `couldnt add like because ${exception}` })
      setTimeout(() => {
        setNotification({ ...notification, errorMessage: null })
      }, 3000)
    }
  }
  const deleteBlog = async (toBeDeleted) => {
    if (window.confirm('Are you sure you want to delete this blog?') === false)
      return
    try {
      await blogService.deleteBlog(toBeDeleted)
      const filteredBlogs = blogs.filter(blog => blog.id === toBeDeleted.id ? false : true)
      setBlogs(filteredBlogs)
      setNotification({ ...notification, succuses: `${toBeDeleted.title} was deleted` })
      setTimeout(() => {
        setNotification({ ...notification, succuses: null })
      }, 3000)
    }
    catch (exception) {
      setNotification({ ...notification, errorMessage: `couldnt delete blog because ${exception}` })
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
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => {
        if (a.likes < b.likes)
          return 1
        if (a.likes > b.likes)
          return -1
        return 0
      })
      setBlogs(sortedBlogs)
    })
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
  const blogActions = {
    addLike: addLike,
    deleteBlog: deleteBlog
  }
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
        <Blog.Blog key={blog.id} blog={blog} blogActions={blogActions} />
      )}
      <br />
      {user.username} Logged in <button onClick={logOut}>Log Out</button>
      {blogForm()}
      <Notification notification={notification} />
    </div>
  )
}

export default App