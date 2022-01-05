import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'hello',
  author: 'mekbib',
  link: 'www.google.com',
  likes: 0
}
describe('Rendering', () => {
  test('When view is false, it only displays title and author', () => {
    const component = render(
      <Blog.Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent('Author' && 'Title')
    expect(component.container).not.toHaveTextContent('Likes' && 'URL')
  })

  test('when view is true, it displays author,title,url, and likes', () => {
    const component = render(
      <Blog.Blog blog={blog} />
    )

    const buttonView = component.getByText('View')
    fireEvent.click(buttonView)
    const whenViewed = component.container.querySelector('.Blog_When_Viewed')
    expect(whenViewed).toBeDefined()

    const buttonHide = component.getByText('Hide')
    fireEvent.click(buttonHide)
    const whenHidden = component.container.querySelector('.Blog_When_Hidden')
    expect(whenHidden).toBeDefined()

  })
})

test('if the like button working', () => {
  const mockHandler = jest.fn()

  const blogActions = {
    addLike: mockHandler
  }
  const component = render(
    <Blog.Blog blog={blog} blogActions={blogActions} />
  )
  const buttonView = component.getByText('View')
  fireEvent.click(buttonView)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('if the submitting calls a function with correct details', () => {
  const handleAdding = jest.fn()
  const component = render(
    <Blog.BlogForm handleAdding={handleAdding} />
  )

  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: { value: 'mekbib' }
  })
  const title = component.container.querySelector('#title')
  fireEvent.change(title, {
    target: { value: 'google' }
  })
  const url = component.container.querySelector('#url')
  fireEvent.change(url, {
    target: { value: 'www.google.com' }
  })

  fireEvent.submit(form)

  expect(handleAdding.mock.calls).toHaveLength(1)

  expect(handleAdding.mock.calls[0][0].author).toBe('mekbib')
  expect(handleAdding.mock.calls[0][0].title).toBe('google')
  expect(handleAdding.mock.calls[0][0].url).toBe('www.google.com')
})