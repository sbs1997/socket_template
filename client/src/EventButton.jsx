import React from 'react'

function EventButton({func, name}){
  return (
    <button onClick={func}>{name}</button>
  )
}

export default EventButton