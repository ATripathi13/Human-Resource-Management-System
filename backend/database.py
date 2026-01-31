from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# Use a default URL for local dev if not provided, but in production this should come from env
# For now, we default to a local postgres instance. 
# PLEASE UPDATE THIS IN .env
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/hrms_lite")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
