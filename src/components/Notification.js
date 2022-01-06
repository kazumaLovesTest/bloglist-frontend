import React from 'react'
const Notification = ({ notification }) => {
  if (notification.errorMessage === null && notification.succuses === null)
    return (
      <>
      </>
    )
  let message = notification.errorMessage
  const notificationStyle = {
    border: '5px solid red',
    borderRadius: '14px',
    fontSize: '20px',
    padding: '20px',
    textAlign:'center'
  }
  if (notification.errorMessage === null) {
    notificationStyle.border = '5px solid green'
    message = notification.succuses
  }

  return (
    <p style={notificationStyle} className='notification'>{message}</p>
  )
}

export default Notification