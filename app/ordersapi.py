from flask import Blueprint, jsonify, request
from models import Orders, Orders_schema, Order_schema, DrinkOrders_schema, db, OrderDrink, Drinks
from datetime import datetime, date
from sqlalchemy import select
import ast

orders = Blueprint('orders', __name__)
    
@orders.route('/receiveorder', methods=['GET','POST'])
def receiveorders():
    
    # theorder = request.json
    # print(theorder, 'line 13, ordersapi.py')
    drinkOrderdate = request.json["order_date"]
    drinkOrderTotal = request.json["order_total"]
    dPayInfo = request.json["order_payinfo"]
    dPayExp = request.json["order_payexp"]
    drinkorders = request.json['order_drinks']

    neworder = Orders(drinkOrderdate, drinkOrderTotal, dPayInfo, dPayExp)
    db.session.add(neworder)
    db.session.commit()

    for i in drinkorders:
        newODrink = OrderDrink(**i)
        db.session.add(newODrink)
        db.session.commit()

    obj = db.session.query(Orders).order_by(Orders.order_id.desc()).first()

    message = f'Order#{obj.order_id} has been received.'
    return jsonify (message)


@orders.route('/sendorder/<orderid>', methods=['GET'])
def sendorder(orderid):
    procorder = Orders.query.filter_by(order_id = orderid).first()
    procorder = Order_schema.dump(procorder)
    procorderds = OrderDrink.query.filter_by(order_id = orderid).all()
    procorderds = DrinkOrders_schema.dump(procorderds)
    procorder['order_drinks'] = procorderds
    return jsonify(procorder)


@orders.route('/sendallorders', methods=['GET'])
def sendallorders():
    procorders = Orders.query.all()
    procorders = Orders_schema.dump(procorders)

    for i in procorders:
        index = procorders.index(i)
        orddrinks = OrderDrink.query.filter_by(order_id = i['order_id']).all()
        orddrinks = DrinkOrders_schema.dump(orddrinks)
        procorders[index]["order_drinks"] = orddrinks

    newprocorders = sorted(procorders, key=lambda x: x['order_id'])
        
    return jsonify(newprocorders)


@orders.route('/receiveedit/<orderid>', methods=['PUT'])
def receiveedit(orderid):

    editorder = Orders.query.filter_by(order_id = orderid).first()
    editorder.order_total = request.json['order_total']
    editorder.order_payinfo = request.json['order_payinfo']
    editorder.order_payexp = request.json['order_payexp']

    drinkorders = OrderDrink.query.filter_by(order_id = orderid).all()
    for i in drinkorders:
        db.session.delete(i)
        db.session.commit()
    
    for i in request.json['order_drinks']:
        drinkid =  i["drink_id"]
        drinkqty = Drinks.query.filter_by(drink_id = drinkid).first()
        drinkqty.drink_qty = int(drinkqty.drink_qty) - int(i["drink_qty"])

    for i in request.json['order_drinks']:
        newODrink = OrderDrink(**i)
        db.session.add(newODrink)
        db.session.commit()

    db.session.add(editorder)
    db.session.commit()
    db.session.add(drinkqty)
    db.session.commit()

    return jsonify ("Edit received. Check the table in DBeaver")


@orders.route('/deleteorder/<orderid>', methods=['DELETE'])
def deleteorder(orderid):

    drinkorders = OrderDrink.query.filter_by(order_id = orderid).all()

    for i in drinkorders:
        db.session.delete(i)
        db.session.commit()

    order = Orders.query.filter_by(order_id = orderid).first()
    db.session.delete(order)
    db.session.commit()

    message = f'Order# {order.order_id} has been deleted.'
    return jsonify (message)



@orders.route('/dateordernum', methods=['GET'])
def dateorder():
    formdict = lambda x, y: {"OrderNum": x, "OrderDate": y.strftime("%B %d, %Y")}

    today = date.today()
    orders = db.session.query(Orders).order_by(Orders.order_id.desc()).first()
    orderslen = orders.order_id
    return jsonify (formdict(orderslen+1, today))