from models import Token

print(Token.query.filter(Token.x_pos <= 10).first())
