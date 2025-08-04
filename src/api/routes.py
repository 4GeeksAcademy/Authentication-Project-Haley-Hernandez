"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def user_signup():

    body = request.json
    new_user = User(email=body["email"], password=body["password"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify("User created successfully"), 200


@api.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    current_user_id= get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify ({"id": user.id, "email": user.email}), 200
