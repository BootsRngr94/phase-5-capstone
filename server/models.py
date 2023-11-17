from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)


# Models go here!
#Main models are games, genres, consolegames, consoles. May add in user_games and users in the future.

class Technician(db.Model, SerializerMixin):
    __tablename__='technicians'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    #serialize rules and relationships below, is serialization nessecary? 
    serialize_rules = ('-clients','-password')

    clients = db.relationship('Client', back_populates='technicians', lazy='dynamic')
    pool_visits = db.relationship('PoolVisit', back_populates='technicians', lazy='subquery', cascade='all, delete-orphan')
    #validations
    @validates('username')
    def validate_username(self, key, username):
        if type (username) == str:
            return username
        else: 
            raise ValueError('Username must contain a string!')
    @validates('password')
    def validate_password(self, key, password):
        if type (password) == str:
            return password
        else:
            raise ValueError('Password must conatin a string!')
    def __repr__(self):
        return f'<Technicians {self.id}: {self.username}>'



class Client(db.Model, SerializerMixin):
    __tablename__='clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    #foreignkey
    technicians_id = db.Column(db.Integer, db.ForeignKey('technicians.id'))
    #serialize_rules
    serialize_rules = ('-technicians.clients', '-pools.client')  
    #relationships
    technicians = db.relationship('Technician', back_populates='clients', lazy='subquery')
    pools = db.relationship('Pool', back_populates='client', cascade='all, delete-orphan',)

class Pool(db.Model, SerializerMixin):
    __tablename__ = 'pools'
    id = db.Column(db.Integer, primary_key=True)
    pools_location = db.Column(db.String)
    pools_size = db.Column(db.String)
    pools_condition_last_check = db.Column(db.String)
    #foreignkey
    clients_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    #serialize_rules
    serialize_rules = ('-client.pools', '-pool_visits.pool')
    #relationships
    client = db.relationship('Client', back_populates='pools')
    pool_visits = db.relationship('PoolVisit', back_populates='pool', cascade='all, delete-orphan')

class PoolVisit(db.Model, SerializerMixin):
    __tablename__ = 'pool_visits'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    visits_notes = db.Column(db.String)
    visits_FILTER_PSI = db.Column(db.Integer)
    visits_PH_record = db.Column(db.Integer)
    visits_CHL_record = db.Column(db.Integer)
    visits_CHEMS_USED_record = db.Column(db.Integer)

    serialize_rules = ('-technicians.pool_visits' ,'-pool.pool_visits', '-pool.client', )

    technicians_id = db.Column(db.Integer, db.ForeignKey('technicians.id'))
    technicians = db.relationship('Technician', back_populates='pool_visits')
    
    pools_id = db.Column(db.Integer, db.ForeignKey('pools.id'))
    pool = db.relationship('Pool', back_populates='pool_visits')
