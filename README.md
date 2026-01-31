# Human Resource Management System Lite

A production-grade Internal HR Tool for Employee and Attendance Management.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, Lucide React
- **Backend:** FastAPI, Python 3.x, SQLAlchemy, Pydantic
- **Database:** PostgreSQL

## 📂 Project Structure

```
/
├── backend/            # FastAPI Backend
│   ├── routers/        # API Routes (Employees, Attendance)
│   ├── main.py         # App Entry Point
│   ├── models.py       # DB Models
│   ├── schemas.py      # Pydantic Schemas
│   └── ...
└── frontend/           # React Frontend
    ├── src/
    │   ├── components/ # Reusable Components
    │   ├── pages/      # Application Pages
    │   └── ...
```

## 🛠️ Local Setup

### Backend

1. Navigate to the `backend` directory.
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the database URL in `.env` (create if needed, see `database.py`).
5. Run the server:
   ```bash
   uvicorn backend.main:app --reload
   ```
   Server will run at `http://localhost:8000`. API docs at `/docs`.

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   App will run at `http://localhost:5173`.

## 🌍 Deployment

### Backend (Render/Railway)
- Set up a PostgreSQL database.
- Set `DATABASE_URL` environment variable.
- Deploy the `backend` folder as a Python service.
- Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.

### Frontend (Vercel/Netlify)
- Set `VITE_API_URL` environment variable to your backend URL.
- Deploy the `frontend` folder.
- Build command: `npm run build`.
- Output directory: `dist`.

## 📝 Assumptions
- PostgreSQL is available locally or via connection string.
- Node.js (v18+) and Python (3.9+) are installed.

- "Production-grade" refers to code structure/practices, though validation/tests are minimal for this scope.
- Portal is opened as Admin 
