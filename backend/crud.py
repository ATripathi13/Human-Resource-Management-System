from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException
from datetime import date

# --- Employee CRUD ---

def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()

def get_employee_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(models.Employee.email == email).first()

def get_employee_by_emp_id(db: Session, emp_id: str):
    return db.query(models.Employee).filter(models.Employee.employee_id == emp_id).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employee).offset(skip).limit(limit).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: int):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if db_employee:
        db.delete(db_employee)
        db.commit()
        return True
    return False

# --- Attendance CRUD ---

def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    # Verify employee exists
    db_employee = db.query(models.Employee).filter(models.Employee.id == attendance.employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db_attendance = models.Attendance(**attendance.dict())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

def get_attendance_by_employee(db: Session, employee_id: int, from_date: date = None, to_date: date = None):
    query = db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id)
    if from_date:
        query = query.filter(models.Attendance.date >= from_date)
    if to_date:
        query = query.filter(models.Attendance.date <= to_date)
    return query.all()

# --- Dashboard Stats ---

def count_employees(db: Session):
    return db.query(models.Employee).count()

def count_present_today(db: Session):
    today = date.today()
    return db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == models.AttendanceStatus.PRESENT
    ).count()

def count_absent_today(db: Session):
    today = date.today()
    return db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == models.AttendanceStatus.ABSENT
    ).count()
