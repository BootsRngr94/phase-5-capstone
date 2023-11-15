"""empty message

Revision ID: 26a5ea9af004
Revises: 
Create Date: 2023-11-15 13:53:10.571686

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '26a5ea9af004'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('technicians',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('technicians_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['technicians_id'], ['technicians.id'], name=op.f('fk_clients_technicians_id_technicians')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pools',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pools_location', sa.String(), nullable=True),
    sa.Column('pools_size', sa.String(), nullable=True),
    sa.Column('pools_condition_last_check', sa.String(), nullable=True),
    sa.Column('clients_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['clients_id'], ['clients.id'], name=op.f('fk_pools_clients_id_clients')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pool_visits',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('visits_notes', sa.String(), nullable=True),
    sa.Column('visits_FILTER_PSI', sa.Integer(), nullable=True),
    sa.Column('visits_PH_record', sa.Integer(), nullable=True),
    sa.Column('visits_CHL_record', sa.Integer(), nullable=True),
    sa.Column('visits_CHEMS_USED_record', sa.Integer(), nullable=True),
    sa.Column('technicians_id', sa.Integer(), nullable=True),
    sa.Column('pools_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pools_id'], ['pools.id'], name=op.f('fk_pool_visits_pools_id_pools')),
    sa.ForeignKeyConstraint(['technicians_id'], ['technicians.id'], name=op.f('fk_pool_visits_technicians_id_technicians')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pool_visits')
    op.drop_table('pools')
    op.drop_table('clients')
    op.drop_table('technicians')
    # ### end Alembic commands ###