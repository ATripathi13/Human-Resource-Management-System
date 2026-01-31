from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_employees = crud.count_employees(db)
    present_today = crud.count_present_today(db)
    absent_today = crud.count_absent_today(db)
    
    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today
    }
