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
            Technician(username='MikeMike', password='letsgetThisWIN'),
            Technician(username='Lwest', password='c0dingsGR8T'),
            
        ]
        db.session.add_all(technicians)
        db.session.commit()

        print('Setting up Clients...')
        clients = [
            Client(name='Greg', phone='832-100-0000', email='gregH@gmail.com'),
            Client(name='Pam', phone='832-500-0000', email='pamL@gmail.com'),
            Client(name='Charles', phone='832-800-0000', email='charlesH@gmail.com'),
            Client(name='Heul', phone='832-600-0000', email='heulJ@gmail.com'),
            Client(name='Carlos', phone='832-400-0000', email='carlosV@gmail.com'),
            Client(name='Selvester', phone='832-200-0000', email='selvesterB@gmail.com'),
            

        ]
        db.session.add_all(clients)
        db.session.commit()

        print('Filling Pools...')
        pools = [
            Pool(pools_location ='2010 palmeto ct', pools_size='800 sq ft',  pools_condition_last_check='blue, all chemicals normal'),
            Pool(pools_location ='2040 gulfcreek', pools_size='600 sq ft',  pools_condition_last_check='blue, all chemicals normal'),
            Pool(pools_location ='1050 hillcroft ln', pools_size='50 sq ft',  pools_condition_last_check='high in copper'),
            Pool(pools_location ='0501 greenfern ct', pools_size='200 sq ft',  pools_condition_last_check='blue, all chemicals normal'),
            Pool(pools_location ='068 beachnut st', pools_size='1500 sq ft',  pools_condition_last_check='green on arrival, blue on leave'),
            Pool(pools_location ='2040 palmeto ct', pools_size='3000 sq ft',  pools_condition_last_check='perfect'),
            
            
        ]
        db.session.add_all(pools)
        db.session.commit()

        pool_visits = [
            PoolVisit(visits_notes='write here',
                visits_FILTER_PSI='15', visits_PH_record='7.8', visits_CHL_record='0', visits_CHEMS_USED_record='2 quarts muriatic acid, 4 x 2.5 gal jug of chlorine', technicians_id=1, pools_id=1),
            PoolVisit(visits_notes='write here', 
                visits_FILTER_PSI='15', visits_PH_record='7.6', visits_CHL_record='5', visits_CHEMS_USED_record='0.5 quarts muriatic acid'),
            PoolVisit(visits_notes='write here', 
                visits_FILTER_PSI='12', visits_PH_record='7.8', visits_CHL_record='2', visits_CHEMS_USED_record='2 quarts muriatic acid, 2 x 2.5 gal jug of chlorine'),
            PoolVisit(visits_notes='write here', 
                visits_FILTER_PSI='10', visits_PH_record='7.6', visits_CHL_record='3', visits_CHEMS_USED_record='1 quarts muriatic acid, 1 x 2.5 gal jug chlorine'),
            PoolVisit(visits_notes='write here', 
                visits_FILTER_PSI='15', visits_PH_record='7.4', visits_CHL_record='5', visits_CHEMS_USED_record='none'),
            PoolVisit(visits_notes='write here', 
                visits_FILTER_PSI='25', visits_PH_record='7.8', visits_CHL_record='5', visits_CHEMS_USED_record='1 quart muriatic acid'),
            
        ]
        db.session.add_all(pool_visits)
        db.session.commit()

        print('Everything accounted for...')
        print('Lets get it done!')
