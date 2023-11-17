#!/usr/bin/env python3

# Standard library imports
from flask import Flask, make_response, jsonify, request
# Remote library imports
from flask import request
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, api
# Add your model imports
from models import db, Technician, Client, Pool, PoolVisit

# Views go here!

@app.route('/')
def index():
    return '<h1>This is the server</h1>'

#model routes below

#technicians route base setup
@app.route('/technicians', methods=['GET', 'POST'])
def technicians():
    if request.method == 'GET':
        technicians = Technician.query.all()
        technicians_dict = [technician.to_dict(rules=('-technicians',))for technician in technicians]
        response = make_response(technicians_dict, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        print(form_data)
    return response
    
#clients route base set up
@app.route('/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        clients = Client.query.all()
        clients_dict = [client.to_dict(rules=('-clients',))for client in clients]
        response = make_response(clients_dict, 200)
    # elif request.method == 'POST':
    #     form_data = request.get_json()
    #     print(form_data)
        return response

#pools route base set up
@app.route('/pools', methods=['GET', 'POST'])
def pools():
    if request.method == 'GET':
        pools = Pool.query.all()
        pools_dict = [pool.to_dict(rules=('-pools',))for pool in pools]
        response = make_response(pools_dict, 200)
    # elif request.method == 'POST':
    #     form_data = request.get_json()
    #     print(form_data)
        return response
    
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

@app.route('/pool_visits/<int:visit_id>', methods=['PATCH', 'DELETE'])
def update_or_delete_pool_visit(visit_id):
    pool_visit = PoolVisit.query.get(visit_id)

    if not pool_visit:
        return jsonify({'error': 'Pool visit not found'}), 404

    if request.method == 'PATCH':
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


    

if __name__ == '__main__':
    app.run(port=5555, debug=True)