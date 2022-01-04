import React, { useState,useImperativeHandle } from 'react'
const Blog = React.forwardRef(({ blog, addLike},ref) => {
  const [view, setView] = useState(false)
  const [likes, setLike] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }
  const handleSetLikes = () => {
    const increasedLikes = likes + 1
    setLike(increasedLikes)
  }
 useImperativeHandle (ref, () => {
   return {
    handleSetLikes
   }
 })
  if (view === false)
    return (
      <ul style={blogStyle}>
        <li>Title:{blog.title}<button onClick={() => setView(!view)}>view</button></li>.
      </ul>
    )
  if (view === true)
    return (
      <ul style={blogStyle}>
        <li>Title:{blog.title} <button onClick={() => setView(!view)}>view</button></li>
        <li>Link:{blog.url}</li>
        <li>Likes:{blog.likes}<button onClick={() =>addLike(blog)}>Like</button></li>
        <li>Author:{blog.author}</li>
        <li>Id:{blog.id}</li>
      </ul>
    )
})

const BlogForm = ({ handleAdding }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const resetInputSet = () => {
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  const addBlog = (event) => {
    event.preventDefault()
    if (author === '' || url === '' || title === '') {
      alert('You must fill all blanks')
      return
    }
    const blog = {
      author: author,
      title: title,
      url: url,
    }
    handleAdding(blog)
    resetInputSet()
  }
  return (
    <>
      <form onSubmit={addBlog}>
        Author:<input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        Title:<input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        URL:<input type='url' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type='submit'>Add blog</button>
      </form>
    </>
  )
}
export default { Blog, BlogForm }