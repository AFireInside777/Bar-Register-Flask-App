from flask import Flask, session, render_template, send_from_directory
from flask_session import Session
from flask_cors import CORS
from config import Config
from models import db
from flask_migrate import Migrate
import os

from .signup import sign
from .signin import thelog
from .drinksapi import senddrinks
from .ordersapi import orders

app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')
app.config.from_object(Config)

db.init_app(app)
CORS(app)
migrate = Migrate(app,db)
Session(app)

app.register_blueprint(sign)
app.register_blueprint(thelog)
app.register_blueprint(senddrinks)
app.register_blueprint(orders)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory(app.static_folder, path)