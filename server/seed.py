#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app  # Make sure 'app' is properly imported
from models import db, Technician, Client, Pool, PoolVisit

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Spring cleaning the database!")
        #Delete all db records
        db.session.query(Technician).delete()
        db.session.query(Client).delete()
        db.session.query(Pool).delete()
        db.session.query(PoolVisit).delete()

        print("Datsbase initializing...")

        print('Logging techs...')
        technicians = [
            Technician(),
            Technician(),
            
        ]
        db.session.add_all(technicians)
        db.session.commit()

        print('Setting up Clients...')
        clients = [
            Client(),
            Client(),
            Client(),
            Client(),
            Client(),
            Client(),
            

        ]
        db.session.add_all(clients)
        db.session.commit()

        print('Filling Pools...')
        pools = [
            Pool(),
            Pool(),
            Pool(),
            Pool(),
            Pool(),
            Pool(),
            
            
        ]
        db.session.add_all(pools)
        db.session.commit()

        pool_visits = [
            PoolVisit(),
            PoolVisit(),
            PoolVisit(),
            PoolVisit(),
            PoolVisit(),
            PoolVisit(),
            
        ]
        db.session.add_all(pool_visits)
        db.session.commit()

        print('Everything accounted for...')
        print('Lets get it done!')
