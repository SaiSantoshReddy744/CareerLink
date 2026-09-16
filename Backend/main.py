from fastapi import FastAPI,Depends
from database import engine, Base,get_db
from sqlalchemy.orm import Session
from schemas import UserCreate
from models import User
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI(title="CareerLink")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CareerLink API is running"}

@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            return {"message": "Database connected successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    return user

@app.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        return {"message": "User not found"}
    existing_user.name = user.name
    existing_user.email = user.email
    existing_user.password = user.password
    existing_user.role = user.role
    db.commit()
    db.refresh(existing_user)
    return existing_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}