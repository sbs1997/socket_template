# imports
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from services import bcrypt,db

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String)
    # we need to create a _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hashf(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

# class Chat(db.Model,SerializerMixin):
#     __tablename__ = 'chats'
#     serialize_rules = ('-chat_users.chat',)
#     id = db.Column(db.Integer, primary_key=True)
#     code = db.Column(db.String, unique = True)

# class ChatUser(db.Model,SerializerMixin):
#     __tablename__ = 'chat_users'
#     id = db.Column(db.Integer, primary_key=True)
#     chat_id = db.Column(db.Integer, db.ForeignKey('games.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     role = db.Column(db.String)
#     game = db.relationship('Chat', back_populates="chat_users") 

#     # serialize rules

class ChatMessage(db.Model, SerializerMixin):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer)
    message = db.Column(db.string)