import Draggable from 'react-draggable';
function Token({token}){
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
    return(
        <Draggable
        handle=".handle"
        bounds="parent"
        defaultPosition={{x: token.x_pos, y: token.y_pos}}
        position={null}
        grid={[10, 10]}
        scale={1}
        onStop={handleStop}>
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