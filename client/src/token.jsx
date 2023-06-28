import { useEffect,useState } from 'react';
import Draggable from 'react-draggable';
import { Socket } from 'socket.io-client';
function Token({token,sendMovement,updateTokens,socket}){
    console.log(token)
    useEffect(()=>{
        socket.on('token-movement', (msg)=> {
            updateTokens(msg)
            })
    },[])
    
    function handleStop(event, dragElement){
        console.log(dragElement)
        fetch(`/api/tokens/${token.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                x_pos: dragElement.x,
                y_pos: dragElement.y
            })
        })
    }
    function handleDrag(event,dragElement){
        const tokenDeets = {id:token.id,x:dragElement.x,y:dragElement.y}
        updateTokens(tokenDeets)
        sendMovement(tokenDeets)
    }
    return(
        <Draggable
        handle=".handle"
        bounds="parent"
        defaultPosition={{x: token.x_pos, y: token.y_pos}}
        position={{x: token.x_pos, y: token.y_pos}}
        grid={[1, 1]}
        scale={1}
        onStop={handleStop}
        onDrag={handleDrag}>
        {/* onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}> */}
            <img src = {`${token.token_image}`}
            className="handle"
            draggable="false"
            style={{
              width: 100,
              height: 100,
              position: "absolute"
            }}/>     
      </Draggable>
    )
}
export default Token