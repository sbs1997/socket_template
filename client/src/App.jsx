import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import Token from './token';
let socket

const App = () => {
  
  const [serverMessage, setServerMessage] = useState(null);
  const [tokens, setTokens] = useState([])
  const [pos,setPos] = useState({x: 100, y:100})
  const [currGameCode, setCurrGameCode] = useState(null)
  console.log(tokens)
  // useEffect(()=>{
  //   fetch('/api/tokens')
  //   .then(r=>r.json())
  //   .then(data=>setTokens(data))
  // },[])
  // const filtered_token = tokens.filter(token=>token.owner.game.code === currGameCode)
  const react_token = tokens.map(token=><Token key = {token.id} token = {token}/>)
  useEffect(() => {
    socket = io('ws://localhost:5555');
    socket.on('from-ser', (msg) => {
      setServerMessage(msg);
    });
    return () => {
      socket.off('disconnected', (msg) => {
          console.log(msg);
        });
    }
  }, []);
  // socket.on('from-ser', (msg) => {
  //   setServerMessage(msg);
  // });

  // socket.on('disconnected', (msg) => {
  //   console.log(msg);
  // });

  const sendToServer = () => {
    console.log("Emmitting")
    socket.emit('to-server',"Hello");
  }

  const sendUser = (e) => {
    e.preventDefault()
    console.log(e.target.test.value)
    // setCurrGameCode(e.target.test.value)
    socket.emit('join_room', e.target.test.value)
    // fetch('/api/tokens')
    // .then(r=>r.json())
    // .then(data=>setTokens(data))
    
  }
  function dragStartHandler(event) {
    console.log(event.style); // undefined
    setPos({x:event.pageX,y:event.pageY})
  }
  console.log(pos)
  
  return (
    <div className="App">
      <div className="box" style={{height: '1000px', width: '1000px', position: 'relative', overflow: 'auto', padding: '0', border: '5px solid red'}}>
        {react_token}
      </div>
      <p>
        Server: <span>{serverMessage}</span>
      </p>
      <button onClick={sendToServer}>Send</button>
      <p>Join Room</p>
      <form onSubmit={sendUser}>
        <input name="test"></input>
      </form>
      {/* <img 
      src = "https://cdn.vox-cdn.com/thumbor/lWOGzsPeAD6YzEVVNH001nrSqPM=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24458108/captain_pikachu.jpg"
      style={{
          width: 100,
          height: 100,
          position: "absolute",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          textAlign: "center"
      }} onDragEnd={dragStartHandler} >
      </img> */}
    </div>
  );
}

export default App;