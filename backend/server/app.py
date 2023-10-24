from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from time import time
# from models import User
from flask_socketio import join_room, leave_room
# from sqlalchemy import extract
from flask_bcrypt import Bcrypt
from services import app,bcrypt,db, socket_io

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SESSION_TYPE'] = 'filesystem'

app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)

app.secret_key = b'\xcd\x9f.\xe9n\x18\x1c\x8f\xeby\xbf#\xaf\xa8z{'

    


@socket_io.on('connect')
def handle_connect():
    print('new connection')
    # print(request.sid)
    # session["user"] = request.sid

@socket_io.on('client-message')
def chat_message(name, message):
    print(message)
    socket_io.emit('server-message', {
        'sender': name,
        'message': message
        })
    


# @socket_io.on('join_room')
# def handle_connect(room_code):
#     print(f'Joining {room_code}')
#     session["room"] = room_code
#     join_room(room_code)

# @socket_io.on('to-server')
# def handle_to_server(arg):
#     print(session)
#     print(f'new to-server event: {arg}')
#     socket_io.emit('from-ser', str(time()), room=session["room"])

# @socket_io.on('to-login')
# def handle_user(arg):
#     print(arg)
#     session["user"] = arg

# @socket_io.on('move-token')
# def handle_move(arg):
#     print(arg)
#     socket_io.emit('token-movement',arg, room = session["room"])

@socket_io.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    # socket_io.emit('disconnected', str(time()))
    # socket_io.emit("disconnected",f"user {session['user']} disconnected")

if __name__ == '__main__':
    socket_io.run(app, port=5555)