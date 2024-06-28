from flask import Blueprint, jsonify
from models import Drinks, drinks_schema

senddrinks = Blueprint('senddrinks', __name__)

@senddrinks.route('/senddrinks', methods = ['GET', 'POST'])
def sendd():
    drinks = Drinks.query.all()
    drinks = drinks_schema.dump(drinks)
    return jsonify (drinks)