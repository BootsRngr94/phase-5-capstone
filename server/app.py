#!/usr/bin/env python3

# Standard library imports
from flask import Flask, make_response, jsonify, request
# Remote library imports
from flask import request
from flask_restful import Resource
from flask_migrate import Migrate
from flask import render_template, redirect, url_for, session

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
        # Check if the required fields are present in the request data
        if 'username' not in form_data or 'password' not in form_data:
            return jsonify({'error': 'Username and password are required'}), 400

        # Create a new Technician instance
        new_technician = Technician(username=form_data['username'], password_hash=form_data['password'])
        db.session.add(new_technician)
        db.session.commit()
        return jsonify(new_technician.to_dict()), 201
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
        
#sign in page route
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        # Get the username and password from the form
        username = request.form.get('username')
        password = request.form.get('password')

        # Find the technician with the given username
        technician = Technician.query.filter_by(username=username).first()

        # Check if the technician exists and the password is correct
        if technician and technician.authenticate(password):
            # Set a session variable to indicate that the user is logged in
            session['user_id'] = technician.id
            return redirect(url_for('dashboard'))  # Redirect to the dashboard or another page

        # If the username or password is incorrect, show an error message
        error_message = 'Invalid username or password'
        return render_template('signin.html', error_message=error_message)

    # If it's a GET request, render the sign-in page
    return render_template('signin.html')

    

if __name__ == '__main__':
    app.run(port=5555, debug=True)