from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Cart, db, Plant
from flask import jsonify

# url prefix - api/cart

cart_routes = Blueprint("cart", __name__)

# get all cart items by user id
@cart_routes.route('')
@login_required
def get_all_cart_items():
    """
    Returns all the items in a cart by user id
    """
    # first get current user id
    user = current_user

    # then query for all the cart items with the same user_id
    cart_items = Cart.query.filter(Cart.user_id == user.id).all()



    # # if it is empty you need to return a message
    # if len(cart_items) == 0 :
    #     return {"message": "You have nothing in your cart"}

    # go through each cart item and put it in normalized notation
    res = {"all_items": {item.id: item.to_dict() for item in cart_items}}
    return res


# add item to cart
@cart_routes.route('', methods=["POST"])
@login_required
def add_to_cart():
    """
    Add item to a cart
    needed: user_id, plant_id, quantity
    """
    data = request.get_json()
    print("now create backend 🎁💛", data)

    form_plant_id = data["plant_id"]
    form_user_id = data["user_id"]
    form_quantity = data["quantity"]


    plant = Plant.query.get(form_plant_id)


    # check that the plant exists
    if plant is None:
        return {"message": "Plant does not exist"}


     # find the plant quantity available
    plant_quantity = plant.quantity

     # check that the quantity is not more than the quantity available for that plant
    if form_quantity > plant_quantity:
        return {"message": "You can't buy more than is available"}

    # check if this plant is already in this users cart
    cart_item = Cart.query.filter(Cart.plant_id == form_plant_id, Cart.user_id == form_user_id).first()


    # check that the new quantity does not exceed the quantity available
    if(cart_item):
        if form_quantity > plant_quantity:
            return {"message": "there are not that many plants of this kind in stock"}

        cart_item.quantity += form_quantity
        db.session.commit()
        print("we had that item in cart ✨😎", cart_item.to_dict() )
        return jsonify({"current_item": cart_item.to_dict()})

    # if item is not in cart then create a new entry
    res = Cart(
        user_id= form_user_id,
        plant_id=form_plant_id,
        quantity=form_quantity
    )
    db.session.add(res)
    db.session.commit()

    print("alas the end what do we have ✔🐱‍👤", res.to_dict())
    return {"current_item": res.to_dict()}




# prefix is /api/cart
# add to quantity of item in cart (remember you aren't really adding you are just replacing the quantity)
@cart_routes.route('', methods=["PUT"])
@login_required
def change_quantity():
    """
    Change the quantity in the cart
    """
    # grab the variables from the request
    data = request.get_json()

    print("DARE I SAY WE MADE IT TO THE BACKEND 🍟", data)

    form_plant_id = data["plant_id"]
    form_quantity = data["quantity"]

    # first find the cart item in the carts table with the correct user_id and plant_id
    user = current_user

    cart_item = Cart.query.filter(Cart.user_id == user.id and Cart.plant_id == form_plant_id).first()

    # get the plant product so you know what quantity total is available
    plant = Plant.query.get(form_plant_id)

    # check that the quantity they want to add plus the quantity already in the cart does not exceed to total quantity of the item
    if form_quantity  > plant.quantity:
        return {"message": "You can't buy more than is available"}

    # now change the quantity in the cart item and commit
    cart_item.quantity = form_quantity
    db.session.commit()

    # return the new current_item
    print("what are we going to send for the store (still in backend ) ✨😜", cart_item.to_dict())
    return {"current_item": cart_item.to_dict()}



# subtract from quantity of item in cart (remember you aren't really subtracting you are just replacing the quantity)
@cart_routes.route('/subtract', methods=["PUT"])
@login_required
def subtract_quantity():
    """
    Subtract the quantity from the cart
    """
    # grab the variables from the request
    data = request.get_json()

    form_plant_id = data["plant_id"]
    form_quantity = data["quantity"]

    # first find the cart item in the carts table with the correct user_id and plant_id
    user = current_user

    cart_item = Cart.query.filter(Cart.user_id == user.id, Cart.plant_id == form_plant_id).first()

    if cart_item is None:
        return {"message": "Cart item not found"}

    # subtract the quantity from the cart item and commit
    cart_item.quantity = form_quantity
    db.session.commit()

    # return the new current_item
    return {"current_item": cart_item.to_dict()}

# delete item from cart
@cart_routes.route('/<int:form_cart_id>', methods=['DELETE'])
@login_required
def delete_cart_item(form_cart_id):
    """
    Delete the product from a cart
    """
    # find the correct cart item by id
    cart_item = Cart.query.get(form_cart_id)

    if not cart_item:
        return {
            "message": "cart item not found"
        }

    # delete the cart item and commit
    db.session.delete(cart_item)
    db.session.commit()

    return{
        "message": "cart item deleted"
    }
