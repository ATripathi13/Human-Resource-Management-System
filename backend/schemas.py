from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

# --- Employee Schemas ---
class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True

# --- Attendance Schemas ---
class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int

    class Config:
        from_attributes = True
