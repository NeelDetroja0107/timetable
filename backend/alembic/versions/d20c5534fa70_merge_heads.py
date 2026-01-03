"""merge heads

Revision ID: d20c5534fa70
Revises: 92ac03a71db0, create_teacher_branch
Create Date: 2025-12-27 13:54:04.358371

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd20c5534fa70'
down_revision: Union[str, Sequence[str], None] = ('92ac03a71db0', 'create_teacher_branch')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
