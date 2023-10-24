import React from 'react'

function Message({message}) {
  return (
    <p>{message.sender}: {message.message}</p>
  )
}

export default Message