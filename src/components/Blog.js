import React,{useState} from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const BlogForm = ({handleAdding}) => {
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
export default {Blog,BlogForm}