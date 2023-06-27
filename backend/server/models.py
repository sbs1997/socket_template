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
    user_type = db.Column(db.String)
    _password_hash = db.Column(db.String)
    # we need to create a _password_hash = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hashf(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

class Game(db.Model,SerializerMixin):
    __tablename__ = 'games'
    serialize_rules = ('-gameusers.game',)
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String, unique = True)

class GameUser(db.Model,SerializerMixin):
    __tablename__ = 'gameusers'
    serialize_rules = ('-tokens.owner','-games.gameusers')
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    role = db.Column(db.String)
    game = db.relationship('Game', backref="gameusers")
    
class Token(db.Model, SerializerMixin):
    __tablename__ = 'tokens'
    serialize_rules = ('-owner.tokens',)
    id = db.Column(db.Integer, primary_key = True)
    x_pos = db.Column(db.Float)
    y_pos = db.Column(db.Float)
    token_image = db.Column(db.String)
    token_owner = db.Column(db.Integer, db.ForeignKey('gameusers.id'))
    owner = db.relationship('GameUser', backref="tokens")

class Ability(db.Model, SerializerMixin):
    __tablename__ = "abilities"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    uses = db.Column(db.Integer)
    token_id = db.Column(db.Integer, db.ForeignKey('tokens.id'))