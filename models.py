from flask_sqlalchemy import SQLAlchemy
from datetime import date
import uuid
from werkzeug.security import generate_password_hash
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()
ma = Marshmallow()

def set_id():
    return str(uuid.uuid4())

class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    email = db.Column(db.String(500), nullable=False)
    password = db.Column(db.String(1000), nullable=False, default='')
    date_created = db.Column(db.DateTime, nullable=False, default=date.today())

    def __init__(self, email, password=''):
        self.id = set_id()
        self.email = email
        self.password = self.set_password(password)  
        
    def set_password(self, password):
        self.pw_hash = generate_password_hash(password)
        return self.pw_hash
    
    def __repr__(self):
        return f'The following user has been added to the User database: {self.email}'
        
        
class Drinks(db.Model):
    drink_id = db.Column(db.String, primary_key=True)
    drink_name = db.Column(db.String(1000), nullable=False)
    drink_price = db.Column(db.String(20), nullable=False, default='0.00')
    drink_ingredients = db.Column(db.String(5000), nullable=True)
    drink_instructions = db.Column(db.String, nullable=True)
    drink_date_created = db.Column(db.String, nullable=False, default=date.today())
    drink_qty = db.Column(db.Integer, nullable=False)

    def __init__(self, drink_name, drink_price, drink_ingredients, drink_instructions, drink_qty=0):
        self.drink_id = set_id()
        self.drink_name = drink_name
        self.drink_price = drink_price
        self.drink_ingredients = drink_ingredients
        self.drink_instructions = drink_instructions
        self.drink_qty = drink_qty

    def __repr__(self):
        return f'The following drink has been added to the database: {self.drink_name}'
        
class Orders(db.Model):
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_date = db.Column(db.String, nullable=False)
    order_total = db.Column(db.String, nullable=False)
    order_payinfo = db.Column(db.String, nullable=False)
    order_payexp = db.Column(db.String, nullable=False)

    def __init__(self, order_date, order_total, order_payinfo, order_payexp):
        self.order_date = order_date
        self.order_total = order_total
        self.order_payinfo = order_payinfo
        self.order_payexp = order_payexp

    def __repr__(self):
        return f'Order# {self.order_id} has been added to the Orders database.'
        

class OrderDrink(db.Model):
    orderdrink_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
    drink_id = db.Column(db.String, db.ForeignKey('drinks.drink_id'), nullable=False)
    drink_qty= db.Column(db.String, nullable=False)
    drink_name = db.Column(db.String, nullable=False)
    drink_price = db.Column(db.String(100), nullable=False)

    def __init__(self, order_id, drink_id, drink_qty, drink_name, drink_price):
        self.order_id = order_id
        self.drink_id = drink_id
        self.drink_qty = drink_qty
        self.drink_name = drink_name
        self.drink_price = drink_price

    def __repr__(self):
        return f'{self.order_id} - {self.drink_id}, {self.drink_name} registered.'
        

class UserSchema(ma.Schema):
    class Meta:
        fields = ['id', 'email', 'date_created' ]

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class DrinkSchema(ma.Schema):
    class Meta:
        fields = ['drink_id', 'drink_name', 'drink_price', 'drink_qty', 'drink_ingredients', 'drink_instructions', 'drink_date_created']

drink_schema = DrinkSchema()
drinks_schema = DrinkSchema(many=True)

class OrderSchema(ma.Schema):
    class Meta:
        fields = ['order_id', 'order_date', 'order_total', 'order_payinfo', 'order_payexp', 'order_drinks']

Order_schema = OrderSchema()
Orders_schema = OrderSchema(many=True)


class DrinkOrderSchema(ma.Schema):
    class Meta:
        fields = ['order_id', 'drink_id', 'drink_qty', 'drink_name', 'drink_price']

DrinkOrder_schema = DrinkOrderSchema()
DrinkOrders_schema = DrinkOrderSchema(many=True)