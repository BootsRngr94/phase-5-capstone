"""image to console

Revision ID: ec64ac8ddfe8
Revises: c2913cd7f78c
Create Date: 2023-11-08 15:22:59.416856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec64ac8ddfe8'
down_revision = 'c2913cd7f78c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('consoles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('img', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('consoles', schema=None) as batch_op:
        batch_op.drop_column('img')

    # ### end Alembic commands ###