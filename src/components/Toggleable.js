import React, { useState, useImperativeHandle } from 'react'
const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'togglable'
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hiddenWHenVisible = { display: visible ? 'none' : '' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <>
      <div style={hiddenWHenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

export default Togglable