# from sqlalchemy import Column, Integer, String, ForeignKey, Time
# from sqlalchemy.orm import relationship
# from .database import Base



from sqlalchemy import Column, Integer, String, Table, ForeignKey, Time
from sqlalchemy.orm import relationship
from app.database import Base

teacher_branch = Table(
    "teacher_branch",
    Base.metadata,
    Column("teacher_id", ForeignKey("teachers.id"), primary_key=True),
    Column("branch_id", ForeignKey("branches.id"), primary_key=True),
)



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True)
    branch = Column(String(100), nullable=False)
    batch = Column(String(20), nullable=False)
    bid = Column(String(50), unique=True, nullable=False)

    teachers = relationship(
        "Teacher",
        secondary=teacher_branch,
        back_populates="branches"
    )

    subjects = relationship(
        "Subject",
        back_populates="branch",
        cascade="all, delete-orphan"
    )



class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    uid = Column(String(50), unique=True, nullable=False)

    branches = relationship(
        "Branch",
        secondary=teacher_branch,
        back_populates="teachers"
    )


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True)
    subject = Column(String(100), nullable=False)
    course_code = Column(String(50), nullable=False)
    teaching_hours = Column(Integer, nullable=False)

    branch_id = Column(Integer, ForeignKey("branches.id"))
    branch = relationship("Branch", back_populates="subjects")


class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True)
    block = Column(String(50), nullable=False)
    room = Column(String(50), nullable=False)
    uid = Column(String(50), unique=True, nullable=False)  # e.g. E203


class Division(Base):
    __tablename__ = "divisions"

    id = Column(Integer, primary_key=True)
    division = Column(String(10), nullable=False)  # e.g. A, B

    branch_id = Column(Integer, ForeignKey("branches.id"))
    branch = relationship("Branch")


class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(Integer, primary_key=True)

    teaching_hours = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))
    branch_id = Column(Integer, ForeignKey("branches.id"))
    division_id = Column(Integer, ForeignKey("divisions.id"))

    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    teacher = relationship("Teacher")
    subject = relationship("Subject")
    classroom = relationship("Classroom")
    branch = relationship("Branch")
    division = relationship("Division")


class NonROBlock(Base):
    __tablename__ = "non_ro_blocks"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    colour_code = Column(String(20), nullable=False)  # e.g. #FF5733


class ScheduledNonROBlock(Base):
    __tablename__ = "scheduled_non_ro_blocks"

    id = Column(Integer, primary_key=True)

    branch_id = Column(Integer, ForeignKey("branches.id"))
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))
    division_id = Column(Integer, ForeignKey("divisions.id"))

    semester = Column(Integer, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    branch = relationship("Branch")
    classroom = relationship("Classroom")
    division = relationship("Division")


