from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas

from database import get_db
from datetime import date

router = APIRouter(
    prefix="/attendance",
    tags=["attendance"],
)

@router.post("/", response_model=schemas.Attendance)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db=db, attendance=attendance)

@router.get("/{employee_id}", response_model=List[schemas.Attendance])
def read_attendance(
    employee_id: int, 
    from_date: date = None, 
    to_date: date = None, 
    db: Session = Depends(get_db)
):
    # Check if employee exists first
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return crud.get_attendance_by_employee(db, employee_id=employee_id, from_date=from_date, to_date=to_date)
