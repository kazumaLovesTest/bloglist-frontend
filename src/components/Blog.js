import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const BlogForm = ({ bloginfo, setAuthor, setTitle, setUrl }) => {
  return (
    <>
      <form onSubmit={bloginfo.handleAdding}>
        Author:<input type='text' name='author' value={bloginfo.author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        Title:<input type='text' name='title' value={bloginfo.title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        URL:<input type='url' name='url' value={bloginfo.url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type='submit'>Add blog</button>
      </form>
    </>
  )
}
export default {Blog,BlogForm}