from flask import Flask, session
from flask_session import Session
from flask_cors import CORS
from config import Config
from models import db
from flask_migrate import Migrate

from .signup import sign
from .signin import thelog
from .drinksapi import senddrinks
from .ordersapi import orders

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)
migrate = Migrate(app,db)
Session(app)

app.register_blueprint(sign)
app.register_blueprint(thelog)
app.register_blueprint(senddrinks)
app.register_blueprint(orders)