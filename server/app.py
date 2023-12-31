#!/usr/bin/env python3

# Standard library imports
from flask import Flask, make_response, jsonify, request
# Remote library imports
from flask import request
from flask_restful import Resource
from flask_migrate import Migrate
from flask import render_template, redirect, url_for, session
from helpers import get_assigned_pools, get_related_clients, get_pool_visits

# Local imports
from config import app, api
# Add your model imports
from models import db, Technician, Client, Pool, PoolVisit

# Views go here!

@app.route('/')
def index():
    return '<h1>This is the server</h1>'

#--------------------------------------------------------------------------------------------------------------------------------Technician Routes 
@app.route('/technicians', methods=['GET'])
def get_technicians():
    technicians = Technician.query.all()
    technicians_dict = [technician.to_dict(rules=('-technicians',)) for technician in technicians]
    response = make_response(technicians_dict, 200)
    return response

#-----------------------------------------------------------------------------------------------------------------------------Clients Routes
@app.route('/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        clients = Client.query.all()
        clients_dict = [client.to_dict(rules=('-clients',)) for client in clients]
        response = make_response(jsonify(clients_dict), 200)
    elif request.method == 'POST':
        try:
            form_data = request.get_json()
            new_client = Client(**form_data)
            db.session.add(new_client)
            db.session.commit()
            response = make_response(jsonify(new_client.to_dict(rules=('-clients',))), 201)
        except Exception as e:
            response = make_response(jsonify({'error': str(e)}), 400)

    return response

#----------------------------------------------------------------------------------------------------------------------Pools Routes
#pools route base set up
@app.route('/pools', methods=['GET', 'POST'])
def pools():
    if request.method == 'GET':
        pools = Pool.query.all()
        pools_dict = [pool.to_dict(rules=('-pools',))for pool in pools]
        response = make_response(pools_dict, 200)
    elif request.method == 'POST':
        try:
            print("poop")
            form_data = request.get_json()
            print(form_data)
            new_pool = Pool(**form_data)
            print (new_pool)
            db.session.add(new_pool)
            db.session.commit()
            response = make_response(jsonify(new_pool.to_dict(rules=('-pools',))), 201)
        except Exception as e:
            response = make_response(jsonify({'error': str(e)}), 400)

    return response
    
#-----------------------------------------------------------------------------------------------------PoolVisits Routes
#pool_visits base route set up, needs PATCH included for user to change data
@app.route('/pool_visits', methods=['POST'])
def create_pool_visit():
    if request.method == 'POST':
        try:
            data = request.get_json()
            new_pool_visit = PoolVisit(**data)
            db.session.add(new_pool_visit)
            db.session.commit()
            return jsonify(new_pool_visit.to_dict()), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400

@app.route('/pool_visits/<int:visit_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update_or_delete_pool_visit(visit_id):
    pool_visit = PoolVisit.query.get(visit_id)

    if not pool_visit:
        return jsonify({'error': 'Pool visit not found'}), 404

    if request.method == 'GET':
        # Handle GET request to retrieve pool visit data
        return jsonify(pool_visit.to_dict()), 200

    elif request.method == 'PATCH':
        try:
            data = request.get_json()
            for key, value in data.items():
                setattr(pool_visit, key, value)
            db.session.commit()
            return jsonify(pool_visit.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 400

    elif request.method == 'DELETE':
        try:
            db.session.delete(pool_visit)
            db.session.commit()
            return jsonify({'message': 'Pool visit deleted successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500


#--------------------------------------------------------------------------------------------------------------SignIn page route

@app.route('/signin', methods=['POST'])
def signin():
    print(session)
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400

    username = data['username']
    password = data['password']

    # Find the technician with the given username
    technician = Technician.query.filter_by(username=username).first()
    print(data)
    if technician and technician.authenticate(password):
        # Set a session variable to indicate that the user is logged in
        session['user_id'] = technician.id
        print(session)
        return jsonify({'message': 'Login successful'}), 200
    else:
        # If the username or password is incorrect, show an error message
        return jsonify({'error': 'Invalid username or password'}), 401
    
#-----------------------------------------------------------------------------------------------Check session

#build out a check session, it's a get route.
@app.route('/check_session', methods=['GET'])
def check_session():
    print(session)
    if 'user_id' in session:
        # Fetch user info
        user_id = session['user_id']
        technician = Technician.query.get(user_id)
        username = technician.username if technician else None
        
        # Retrieve additional information
        assigned_pools = get_assigned_pools(technician)
        related_client = get_related_clients(technician)
        pool_visits = get_pool_visits(technician)
        
        return jsonify({
            'logged_in': True,
            'user_id': user_id,
            'username': username,
            'assigned_pools': assigned_pools,
            'related_client': related_client,
            'pool_visits': pool_visits
        }), 200
        
    else:
        return jsonify({'logged_in': False}), 200
    
 
#<---------------------------------------------------------------------------------------------------------------------------->
if __name__ == '__main__':
    app.run(port=5555, debug=True)