# Student Support & Ticket Management

A full-stack web application designed to manage student support requests through a centralized ticket management system. Students can raise requests related to fees, attendance, ID cards, documents, certificates, exams, hostel, library, technical issues, and other administrative matters. Staff can process and update tickets, while managers can assign, prioritize, monitor, and manage support requests.

## Business Problem

Students frequently raise support requests, but manual handling makes it difficult to track ticket ownership, priority, status, SLA, ageing, pending actions, and resolution. This system provides a centralized platform to create, assign, process, monitor, and resolve student support requests.

## Key Objectives

- Centralized ticket management
- Role-based access control
- Ticket status management
- Priority management
- Staff assignment and ownership
- SLA management
- Ticket ageing
- Pending-action workflow
- Resolution tracking
- Management visibility
- SLA breach identification

## User Roles

### STUDENT
- Register and login
- Create support tickets
- Select category and priority
- View own tickets
- View ticket details
- Track ticket status

### STAFF
- Login to the system
- View support tickets
- Review student requests
- Process support requests
- Update ticket status
- Handle assigned tickets

### MANAGER
- View all support tickets
- View dashboard statistics
- Assign tickets to staff
- Monitor ticket ageing
- Monitor SLA status
- Identify SLA-breached tickets
- Update ticket status
- Set pending actions
- Monitor ticket priorities

## Ticket Statuses

| Status | Description |
|---|---|
| Open | New ticket waiting to be processed |
| In Progress | Ticket is currently being handled |
| Resolved | Issue has been resolved |
| Closed | Ticket processing is completed |

Status Flow:

```text
Open → In Progress → Resolved → Closed

Priority & SLA
Priority	SLA
Urgent	24 Hours
High	36 Hours
Medium	48 Hours
Low	72 Hours

The system automatically calculates the SLA due date when a ticket is created.

Example:

Priority: High
SLA: 36 Hours
Age: 20 Hours
SLA Status: Within SLA

If the SLA deadline is exceeded:

SLA Status: BREACHED
Ticket Ageing

Ticket ageing shows how long a ticket has been active.

Examples:

Age: 5 hrs
Age: 1d 4h
Age: 3d 8h

This helps managers identify tickets that have been pending for a long time.

Ticket Assignment

Managers can assign tickets to available staff members.

Ticket: Unable to download certificate
Assigned To: Staff User

The system stores the assigned staff member and assignment time, providing clear ownership of support requests.

Pending Action Workflow

Tickets can have a pending action:

None
Waiting for Student
Waiting for Staff
Waiting for Documents
Waiting for Approval

Example:

Status: In Progress
Pending Action: Waiting for Documents

This helps identify what is currently blocking a ticket.

SLA Escalation

When an active ticket exceeds its SLA deadline, the system identifies the ticket as SLA Breached. Managers can use the SLA-breached count on the dashboard to identify tickets requiring attention or escalation.

Manager Dashboard

The Manager Dashboard provides management visibility through:

Total Tickets
Open Tickets
In Progress Tickets
Resolved Tickets
Closed Tickets
SLA Breached Tickets
Staff Assignment
Ticket Ageing
SLA Monitoring
Pending Actions
Status Management
Authentication & Security

The application uses:

JWT authentication
bcrypt password hashing
Protected API routes
Role-based authorization
Environment variables for sensitive configuration

Students, staff, and managers receive access based on their assigned role.

Technology Stack
Frontend
React.js
Vite
React Router
Axios
CSS
Backend
Node.js
Express.js
REST APIs
Database
MongoDB
Mongoose
Authentication
JSON Web Token (JWT)
bcryptjs
Tools
Git
GitHub
VS Code
Postman
Browser
Project Structure
student-support-ticket-management/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
API Endpoints
Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/staff
Tickets
POST   /api/tickets
GET    /api/tickets/my-tickets
GET    /api/tickets/all
GET    /api/tickets/:id
PUT    /api/tickets/:id/status
PUT    /api/tickets/:id/assign
PUT    /api/tickets/:id/pending-action
DELETE /api/tickets/:id
Installation & Setup
Prerequisites
Node.js
npm
MongoDB
Git
Backend Setup
cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

Backend:

http://localhost:5000
Frontend Setup

Open another terminal:

cd client
npm install
npm run dev

Open the Vite URL shown in the terminal.

Application Workflow
Student
   ↓
Create Support Ticket
   ↓
Select Category & Priority
   ↓
SLA Automatically Calculated
   ↓
Manager Reviews Ticket
   ↓
Staff Assigned
   ↓
Ticket In Progress
   ↓
Pending Action if Required
   ↓
Issue Resolved
   ↓
Ticket Closed

SLA Escalation:

Active Ticket
     ↓
SLA Deadline Exceeded
     ↓
SLA Breached
     ↓
Manager Attention / Escalation
Testing
Student Flow
Register
↓
Login
↓
Student Dashboard
↓
Create Ticket
↓
View My Tickets
↓
Track Status
Staff Flow
Login
↓
Staff Dashboard
↓
View Tickets
↓
Process Request
↓
Update Status
↓
Resolve / Close
Manager Flow
Login
↓
Manager Dashboard
↓
View All Tickets
↓
Assign Staff
↓
Monitor SLA & Ageing
↓
Set Pending Action
↓
Update Status
↓
Resolve / Close
Future Enhancements
Detailed activity and audit history
Email notifications
SMS notifications
Automatic escalation notifications
Staff workload management
File and attachment upload
Student feedback and ratings
Advanced search and filtering
Advanced analytics and reports
Real-time notifications
Project Summary

Student Support & Ticket Management is a full-stack web application designed to help educational institutions manage student support requests efficiently. It provides role-based access for students, staff, and managers while supporting ticket creation, prioritization, assignment, SLA monitoring, ageing, pending actions, status management, resolution tracking, and management visibility.

Architecture
React.js Frontend
       ↓
Axios / REST API
       ↓
Node.js + Express.js
       ↓
MongoDB + Mongoose
Project Type

Full-Stack Web Application

Domain

Student Support / Ticket Management

License

This project was developed as an academic/assignment project.
