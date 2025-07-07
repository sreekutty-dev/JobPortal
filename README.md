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

##  Project Structure

