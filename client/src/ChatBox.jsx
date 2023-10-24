import React from 'react'
import Message from './Message'


function ChatBox({messages, user}) {
    
  return (
    <div>
        <h1>{user}</h1>
        {messages.map((message)=>{
            return <Message key={messages.indexOf(message)} message={message}/>
        })}
    </div>
  )
}

export default ChatBox