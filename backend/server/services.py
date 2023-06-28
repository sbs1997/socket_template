from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_socketio import SocketIO


metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })
app = Flask(__name__)
# socket_io = SocketIO(app, cors_allowed_origins="*",manage_session=False)
socket_io = SocketIO(app, cors_allowed_origins="*")
bcrypt = Bcrypt(app)
db = SQLAlchemy(metadata=metadata)