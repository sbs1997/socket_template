import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './ChatBox';

let socket

const App = () => {
  
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [connected, setConnected] = useState(false)
  
  useEffect(() => {
    socket = io('ws://localhost:5555');
    setConnected(true)
    return () => {
      socket.off('disconnected', (msg) => {
          console.log(msg);
        });
    }
  }, []);

  useEffect(() => {
    console.log("use effect")
    if (connected){
        console.log('the thing!')
        socket.on('server-message', (serverMessage)=>{
            addMessage(serverMessage)
        })
      }
        return () => {
        console.log('clean-up!')
        socket.removeListener('server-message', (msg) => {
            console.log(msg);
        });
        }
  }, [messages, connected]);


  function sendMessage(sender, message){
    socket.emit('client-message', sender, message)
  }

  function addMessage(message){
    // console.log(message)
    // console.log(messages)
    setMessages([...messages, {'sender': message.sender, 'message': message.message}])
  }

  return (
    <div className="App">
      <label>Name:</label>
      <input onChange={(e)=>setUser(e.target.value)}></input>
      <ChatBox messages={messages} user={user} addMessage={addMessage} socket={socket}/>
      {/* sockets */}
      <form onSubmit={(e)=>{
        e.preventDefault()
        sendMessage(user, newMessage)
      }}>
        <label>Server Message:</label>
        <input onChange={(e)=>setNewMessage(e.target.value)}/>
      </form>
      {/* local */}
      <form onSubmit={(e)=>{
        e.preventDefault()
        // setMessages([...messages, {'sender': user, 'message': newMessage}])
        let newMessageObj = {'sender': user, 'message': newMessage}
        addMessage(newMessageObj)
      }}>
        <label>Local Message:</label>
        <input onChange={(e)=>setNewMessage(e.target.value)}/>
      </form>
    </div>
  );
}

export default App;