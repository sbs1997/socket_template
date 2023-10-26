import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './ChatBox';

let socket

const App = () => {
  
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [connected, setConnected] = useState(false)
  const [roomNum, setRoomNum] = useState("1")
  
  useEffect(() => {
    socket = io('ws://localhost:5555');
    setConnected(true)
    socket.emit('room-change', "1")
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
  }, [messages, connected, roomNum]);


  function sendMessage(sender, message, room){
    socket.emit('client-message', sender, message, room)
  }

  function addMessage(message){
    // console.log(message)
    // console.log(messages)
    setMessages([...messages, {'sender': message.sender, 'message': message.message}])
  }

  function handleRoomChange(){
    if (roomNum == "1"){
      setRoomNum("2")
      socket.emit('room-change', "2")
    }else{
      setRoomNum("1")
      socket.emit('room-change', "1")
    }
  }

  return (
    <div className="App">
      <h1 className="title">Chatty McChatApp</h1>
      <button onClick={handleRoomChange}>Room {roomNum}</button>
      <br/>
      <label>Username:</label>
      <input className="name-line" onChange={(e)=>setUser(e.target.value)}></input>
      <h2 id="chat-title">{user}</h2>
      <ChatBox messages={messages} user={user} addMessage={addMessage} socket={socket}/>
      {/* sockets */}
      <form onSubmit={(e)=>{
        e.preventDefault()
        sendMessage(user, newMessage, roomNum)
        setNewMessage("")
      }}>
        <label>Message:</label>
        <input onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
      </form>
    </div>
  );
}

export default App;