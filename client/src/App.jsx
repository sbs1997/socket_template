import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import EventButton from './EventButton';
let socket

const App = () => {
  
  const [serverMessage, setServerMessage] = useState(null);
  const [localColor, setColor] = useState("blue")


  useEffect(() => {
    socket = io('ws://localhost:5555');
    socket.on('from-ser', (msg) => {
      console.log(serverMessage)
      setServerMessage(msg);
    });
    socket.on('new-color', (serverColor)=>{
      console.log(serverColor)
      setColor(serverColor)
    })
    return () => {
      socket.off('disconnected', (msg) => {
          console.log(msg);
        });
    }
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      setServerMessage(null)
      console.log('reset')
    }, 1000)
  }, [serverMessage])

  function pingem(){
    console.log("Pingin")
    socket.emit('pinging');
  }

  function pingPong(){
    console.log('ping-pong!')
    socket.emit('ping_pong')
  }

  function colorChange(){
    localColor == "blue" ?
      setColor("red")
      :
      setColor("blue")
  }

  function sendColor(){
    socket.emit('send-color', localColor)
  }
  // function sendUser(e){
  //   e.preventDefault()
  //   console.log(e.target.test.value)
  //   setCurrGameCode(e.target.test.value)
  //   socket.emit('join_room', e.target.test.value)
  //   fetch('/api/tokens')
  //   .then(r=>r.json())
  //   .then(data=>setTokens(data)) 
  // }
  // function sendMovement(token){
  //   socket.emit('move-token',{id:token.id, x:token.x,y:token.y})
  // }
  // function dragStartHandler(event) {
  //   console.log(event.style); // undefined
  //   setPos({x:event.pageX,y:event.pageY})
  // }  
  return (
    <div className="App">
      <EventButton name="Ping" func={pingem}/>
      <EventButton name = "PingPong" func = {pingPong}/>
      <EventButton name = "Change Color" func = {colorChange}/>
      <EventButton name = "Send Color" func = {sendColor}/>
      <button style={{color : localColor}}>I am the color</button>
      <p>{serverMessage}</p>
    </div>
  );
}

export default App;