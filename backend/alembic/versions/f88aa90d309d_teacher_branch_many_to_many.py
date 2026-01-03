"""teacher branch many to many

 Revision ID: f88aa90d309d
 Revises: 9b1bdeeedde5
 Create Date: 2025-12-27 12:34:25.576015

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# # revision identifiers, used by Alembic.
revision: str = 'f88aa90d309d'
down_revision: Union[str, Sequence[str], None] = '9b1bdeeedde5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1️⃣ Create association table
    op.create_table(
        "teacher_branch",
        sa.Column("teacher_id", sa.Integer(), sa.ForeignKey("teachers.id"), primary_key=True),
        sa.Column("branch_id", sa.Integer(), sa.ForeignKey("branches.id"), primary_key=True),
    )

    # 2️⃣ Remove old foreign key column from teachers table
    op.drop_constraint("teachers_branch_id_fkey", "teachers", type_="foreignkey")
    op.drop_column("teachers", "branch_id")


def downgrade() -> None:
    # 1️⃣ Add branch_id back to teachers table
    op.add_column(
        "teachers",
        sa.Column("branch_id", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        "teachers_branch_id_fkey",
        "teachers",
        "branches",
        ["branch_id"],
        ["id"]
    )

    # 2️⃣ Drop association table
    op.drop_table("teacher_branch")



# from alembic import op
# import sqlalchemy as sa

# def upgrade() -> None:
#     # 1️⃣ Create association table
#     op.create_table(
#         "teacher_branch",
#         sa.Column("teacher_id", sa.Integer(), sa.ForeignKey("teachers.id"), primary_key=True),
#         sa.Column("branch_id", sa.Integer(), sa.ForeignKey("branches.id"), primary_key=True),
#     )

#     # 2️⃣ Remove old foreign key column from teachers table
#     op.drop_constraint("teachers_branch_id_fkey", "teachers", type_="foreignkey")
#     op.drop_column("teachers", "branch_id")


# def downgrade() -> None:
#     # 1️⃣ Add branch_id back to teachers table
#     op.add_column(
#         "teachers",
#         sa.Column("branch_id", sa.Integer(), nullable=True)
#     )
#     op.create_foreign_key(
#         "teachers_branch_id_fkey",
#         "teachers",
#         "branches",
#         ["branch_id"],
#         ["id"]
#     )

#     # 2️⃣ Drop association table
#     op.drop_table("teacher_branch")
