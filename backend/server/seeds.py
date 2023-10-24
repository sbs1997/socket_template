from app import app 
from models import db, User,Game,GameUser, Token
from faker import Faker
from random import randint
from math import sqrt
faker = Faker()
with app.app_context():
    pass