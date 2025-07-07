#  Full Stack Job Portal

This is a full-featured job portal built with **Angular (Frontend)** and **Django REST Framework (Backend)**, supporting authentication via JWT, admin and candidate dashboards, file uploads, and status tracking.

---

##  Features

###  Authentication
- JWT-based login system
- Admin and Candidate roles
- Protected routes and token handling

###  Admin Module
- Add job listings
- View submitted applications
- Update application status (e.g. Pending → Selected/Rejected)

###  Candidate Module
- View job vacancies
- Apply for jobs (Resume + Voice Upload)
- Track application status

---

##  Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | Angular 17+, Bootstrap      |
| Backend    | Django 5, DRF, JWT (SimpleJWT) |
| Database   | SQLite (Development)        |
| Auth       | JWT (via djangorestframework-simplejwt) |
| Deployment | Localhost (or optional: Render, Railway) |

---

## Project Setup

###  Backend Setup (Django)

####  Prerequisites

- Python 3.10+
- Virtualenv (optional but recommended)

####  Setup

```bash
cd backend
python -m venv env
env\Scripts\activate          # Windows
source env/bin/activate       # Linux/Mac

pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (for admin login)
python manage.py createsuperuser

# Run the server
python manage.py runserver

---
```

### Frontend Setup (Angular)
#### Prerequisites
Node.js (18+ recommended)
Angular CLI

#### Setup
```bash
cd frontend/jobportal-frontend
npm install
ng serve
```
Visit: http://localhost:4200
