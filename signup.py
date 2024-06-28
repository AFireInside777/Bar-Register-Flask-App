from flask import Blueprint, request, jsonify
from models import User, db, user_schema, users_schema


sign = Blueprint('sign', __name__) 

@sign.route('/signup', methods = ['POST'])
def signup():
    email = request.json['username']
    password = request.json['password']

    newUser = User(email, password=password)
    print(newUser)
    db.session.add(newUser)
    db.session.commit()

    return jsonify (f'{email}')


@sign.route('/returnusers', methods = ['GET'])
def showusers():
    theseUsers = User.query.all()
    response = users_schema.dump(theseUsers)
    return jsonify (response)