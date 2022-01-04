import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (recivedToken) => {
  token = `bearer ${recivedToken}`
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.put(blogUrl,blog,config)
  return response.data
}

const deleteBlog =  async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.delete(blogUrl,config)
  return response
}

export default { getAll, addBlog, setToken,updateBlog,deleteBlog }