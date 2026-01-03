"""create teacher_branch table

Revision ID: create_teacher_branch
Revises: 
Create Date: 2025-12-27 13:50:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'create_teacher_branch'
down_revision = None  # if this is not the first migration, set to previous revision ID
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'teacher_branch',
        sa.Column('teacher_id', sa.Integer, sa.ForeignKey('teachers.id'), primary_key=True),
        sa.Column('branch_id', sa.Integer, sa.ForeignKey('branches.id'), primary_key=True)
    )


def downgrade():
    op.drop_table('teacher_branch')
