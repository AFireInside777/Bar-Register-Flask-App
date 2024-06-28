from flask import Blueprint, request, jsonify, session
from models import User, db, user_schema, users_schema
from werkzeug.security import generate_password_hash, check_password_hash


thelog = Blueprint('thelog', __name__)


@thelog.route('/login', methods=['POST'])
def login():
    message = "Good to go."
    username = request.json['username']
    password = request.json['password']
    ip_addr = request.remote_addr

    user = User.query.filter_by(email = username).first()
    if user and check_password_hash(user.password, password):
        session[username] = user.id
        return jsonify(message)
    
    return jsonify ("The information provided does not match data in our database.")


@thelog.route('/logout', methods=['POST'])
def logout():
    username = request.json['username']

    message = 'You have been logged out. Check the cookies.'
    session.pop(username, None)

    return jsonify(message)