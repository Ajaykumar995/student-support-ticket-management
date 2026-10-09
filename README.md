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

---

## User Roles

### STUDENT
- Register and login
- Create support tickets
- Select category and priority
- View own tickets (`/student`)
- View ticket details (`/tickets/:id`)
- Track ticket status

### STAFF
- Login to the system
- View support tickets (`/staff`)
- Review student requests
- Process support requests
- Update ticket status (`Open`, `In Progress`, `Resolved`, `Closed`)
- Handle assigned tickets

### MANAGER
- View all support tickets
- View dashboard statistics (`/manager`)
- Assign tickets to staff
- Monitor ticket ageing
- Monitor SLA status
- Identify SLA-breached tickets
- Update ticket status
- Set pending actions
- Monitor ticket priorities
- Delete tickets

---

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
```

---

## Priority & SLA

| Priority | SLA Window | Automatic SLA Due Calculation |
|---|---|---|
| Urgent | 24 Hours | `createdAt + 24 hours` |
| High | 36 Hours | `createdAt + 36 hours` |
| Medium | 48 Hours | `createdAt + 48 hours` |
| Low | 72 Hours | `createdAt + 72 hours` |

The system automatically calculates the SLA due date when a ticket is created.

**Example:**
- Priority: High
- SLA: 36 Hours
- Age: 20 Hours
- SLA Status: Within SLA

If the SLA deadline is exceeded on an active ticket:
- SLA Status: **BREACHED**

Completed tickets (`Resolved` or `Closed`) do not trigger breach alerts.

---

## Ticket Ageing

Ticket ageing shows how long a ticket has been active since its creation timestamp:

- Age: `5 hrs`
- Age: `1d 4h`
- Age: `3d 8h`

This helps managers identify tickets that have been pending for a long time.

---

## Ticket Assignment

Managers can assign tickets to available staff members.

```text
Ticket: Unable to download certificate
Assigned To: Staff User
```

The system stores the assigned staff member and assignment timestamp (`assignedAt`), providing clear ownership of support requests.

---

## Pending Action Workflow

Tickets can have a pending action to indicate what is currently blocking progress:

- `None`
- `Waiting for Student`
- `Waiting for Staff`
- `Waiting for Documents`
- `Waiting for Approval`

**Example:**
- Status: `In Progress`
- Pending Action: `Waiting for Documents`

---

## SLA Escalation

When an active ticket exceeds its SLA deadline, the system flags the ticket as SLA Breached. Managers can use the SLA-breached counter on the dashboard to identify tickets requiring urgent attention or escalation.

```text
Active Ticket
     ↓
SLA Deadline Exceeded
     ↓
SLA Breached
     ↓
Manager Attention / Escalation
```

---

## Manager Dashboard

The Manager Dashboard provides complete management visibility through:

- Total Tickets
- Open Tickets
- In Progress Tickets
- Resolved Tickets
- Closed Tickets
- SLA Breached Tickets
- Staff Assignment
- Ticket Ageing
- SLA Monitoring
- Pending Actions
- Status Management

---

## Authentication & Security

The application uses:

- JWT authentication with Bearer tokens
- bcrypt password hashing (`bcryptjs`)
- Protected API routes (`protect` middleware)
- Role-based authorization (`authorize` middleware)
- Environment variables for sensitive configuration

Students, staff, and managers receive access based on their assigned role: `STUDENT`, `STAFF`, or `MANAGER`.

---

## Technology Stack

### Frontend
- **React.js 19**: Component-based user interface
- **Vite 7**: Fast build tooling and development server
- **React Router 7**: Declarative client-side routing and protected routes
- **Axios**: HTTP client with request interceptors for token attachment
- **Custom CSS**: Responsive theme system (`client/src/index.css`)

### Backend
- **Node.js**: Server runtime environment
- **Express.js 5**: Web framework for REST APIs
- **REST APIs**: Modular routes and controllers
- **CORS**: Cross-origin request handling
- **dotenv**: Environment variable management

### Database
- **MongoDB**: NoSQL database for users and tickets
- **Mongoose 9**: Object Data Modeling (ODM)

### Authentication
- **JSON Web Token (JWT)**: Secure user session tokens (7-day validity)
- **bcryptjs**: Password hashing

### Development & Review Tools
- **Code0**: AI development tool (VS Code extension) used for architecture review, API validation, bug investigation, and test verification
- **Git & GitHub**: Version control and repository hosting
- **VS Code**: Code editor
- **Postman**: API testing and verification

---

## Project Structure

```text
student-support-ticket-management/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── TicketCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   ├── MyTickets.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── TicketDetails.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── ticketController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Ticket.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── AI_Usage.md
└── README.md
```

---

## Environment Variables Configuration

### Server (`server/.env`)

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_support
JWT_SECRET=your_jwt_secret_here
```

| Key | Description | Example |
|---|---|---|
| `PORT` | Server listening port | `5000` |
| `MONGO_URI` | MongoDB connection string (local or Atlas) | `mongodb://127.0.0.1:27017/student_support` |
| `JWT_SECRET` | Secret key used for signing JWT tokens | `your_secret_key` |

### Client

The client connects to the backend API through `client/src/services/api.js`. The default base URL is:

```text
http://localhost:5000/api
```

---

## API Endpoints

### Health Check

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Verify server is running |

### Authentication

| Method | Endpoint | Access | Request Body | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Public | `{ name, email, password, role, department }` | Register a new user |
| `POST` | `/api/auth/login` | Public | `{ email, password }` | Authenticate and obtain JWT |
| `GET` | `/api/auth/staff` | Protected (`MANAGER`) | *None* | Get list of staff users |

### Tickets

| Method | Endpoint | Access | Request Body | Description |
|---|---|---|---|---|
| `POST` | `/api/tickets` | Protected (`STUDENT`) | `{ title, description, category, priority }` | Create a support ticket |
| `GET` | `/api/tickets/my-tickets` | Protected (`STUDENT`) | *None* | Get tickets of logged-in student |
| `GET` | `/api/tickets/all` | Protected (`STAFF`, `MANAGER`) | *None* | Get all tickets in system |
| `GET` | `/api/tickets/:id` | Protected (Authenticated) | *None* | Get single ticket by ID |
| `PUT` | `/api/tickets/:id/status` | Protected (`STAFF`, `MANAGER`) | `{ status }` | Update ticket status |
| `PUT` | `/api/tickets/:id/assign` | Protected (`MANAGER`) | `{ staffId }` | Assign ticket to staff |
| `PUT` | `/api/tickets/:id/pending-action` | Protected (`STAFF`, `MANAGER`) | `{ pendingAction }` | Update pending action |
| `DELETE` | `/api/tickets/:id` | Protected (`MANAGER`) | *None* | Delete a ticket |

---

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB (running locally or MongoDB Atlas)
- Git

### Backend Setup

1. Open terminal and navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `.env` file in `server/`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/student_support
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

   Backend runs on: `http://localhost:5000`

5. Verify health check:
   ```text
   GET http://localhost:5000/api/health
   ```
   Response:
   ```json
   {
     "success": true,
     "message": "Student Support API is running"
   }
   ```

### Frontend Setup

1. Open another terminal and navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

4. Open the Vite URL displayed in terminal (typically `http://localhost:5173`).

---

## Application Workflow

```text
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
```

---

## Testing & Verification

### Student Flow
1. **Register**: Go to `/register`, enter details, select role `Student`.
2. **Login**: Go to `/login`, enter credentials.
3. **Student Dashboard**: Automatically redirected to `/student`.
4. **Create Ticket**: Click `+ Create Ticket` (`/create-ticket`), fill in title, description, category, and priority. Submit form.
5. **View My Tickets**: Verify the new ticket appears in the list.
6. **Track Status**: Click `View Details` to check status and SLA details.

### Staff Flow
1. **Login**: Login with a `Staff` account.
2. **Staff Dashboard**: Redirected to `/staff`.
3. **View Tickets**: Review incoming student tickets.
4. **Process Request**: Click `In Progress` to update ticket progress.
5. **Update Status**: Once resolved, click `Resolved` or `Closed`.

### Manager Flow
1. **Login**: Login with a `Manager` account.
2. **Manager Dashboard**: Redirected to `/manager`.
3. **View All Tickets**: Review total, open, in-progress, resolved, closed, and SLA breached counts.
4. **Assign Staff**: Select a staff member from the dropdown to assign the ticket.
5. **Monitor SLA & Ageing**: Check live ticket age and SLA due indicator.
6. **Set Pending Action**: Set blocker status (e.g., `Waiting for Documents`).
7. **Update Status / Delete**: Modify ticket status or delete unnecessary tickets.

---

## Known Limitations

- **Hardcoded Client API Base URL**: `client/src/services/api.js` currently uses `http://localhost:5000/api` directly rather than reading from `import.meta.env.VITE_API_URL`.
- **File Uploads**: Ticket creation currently supports text descriptions; file/document attachments are not yet supported.
- **Automated Testing Suite**: Automated unit and integration tests (e.g., Vitest or Jest) are not yet integrated; verification is conducted via manual role-based testing.
- **Real-Time WebSockets**: Ticket updates refresh on user action/page reload rather than real-time WebSocket pushes.
- **Password Reset**: Self-service email verification or password reset flows are not implemented.

---

## AI Development Experience (Code0)

The **Code0** AI development assistant (VS Code extension) was used to assist during code review, API verification, bug investigation, and testing formulation for this project.

### 1. Code Review: MERN Project Structure
- **Task**: Used Code0 to review the existing MERN project structure and identify areas for improvement.
- **Actual Prompt**:
  > *"Review the existing MERN stack project directory structure and architecture for my Student Support Ticket Management System, and highlight areas for improvement."*
- **Changes Made**: None to application code (preserved working project structure). Identified recommendations such as creating a root `.gitignore` to prevent tracking `node_modules` and client build artifacts, adding `.env.example` templates, and moving inline styles to a modular design system in future iterations.
- **Verification**: Verified directory layout against full-stack MERN conventions and verified that both server and client remain decoupled and operational.

### 2. API Review: Express.js REST APIs
- **Task**: Used Code0 to review the existing Express.js REST APIs and check request validation and error handling.
- **Actual Prompt**:
  > *"Review the Express.js REST API routes and controllers in server/controllers/ticketController.js and server/controllers/authControllers.js for request validation, role authorization, and error handling."*
- **Changes Made**: None to application code. Identified potential areas for enhancement such as centralized Express error-handling middleware, MongoDB ID format validation (`mongoose.Types.ObjectId.isValid`), and payload validation schemas.
- **Verification**: Tested API endpoints (`POST /api/auth/register`, `POST /api/auth/login`, `GET /api/health`, `GET /api/tickets/all`) via Postman and client requests to confirm role enforcement (`protect`, `authorize`) and error response formats.

### 3. Bug Fixing: SLA Breach Calculation Logic
- **Task**: Used Code0 to investigate an identified issue and understand the proposed solution regarding SLA calculation.
- **Actual Prompt**:
  > *"Investigate the ticket SLA breach calculation and date handling in ManagerDashboard.jsx and ticketController.js to ensure tickets marked as 'Resolved' or 'Closed' are not incorrectly marked as SLA breached."*
- **Changes Made**: None required. Code0 confirmed that `ManagerDashboard.jsx` already contains the guard clause `if (ticket.status === "Resolved" || ticket.status === "Closed") return false;`, properly preventing resolved tickets from being reported as breached.
- **Verification**: Created a ticket past its due time, confirmed it showed as breached while Open, and verified that transitioning it to Resolved immediately cleared the SLA breach indicator.

### 4. Code Quality: React Components
- **Task**: Used Code0 to review existing React components and identify opportunities to improve readability and maintainability.
- **Actual Prompt**:
  > *"Review the React components in client/src/pages/ and client/src/components/ for readability, state management, and maintainability."*
- **Changes Made**: None to application code. Recommended future optimizations such as extracting repetitive stat card markup in `ManagerDashboard.jsx` into a reusable `<StatCard />` component and using custom hooks for ticket data fetching.
- **Verification**: Inspected React component hierarchy and ensured components render smoothly without console warnings or layout shifts.

### 5. Testing and Verification: Test Scenarios
- **Task**: Used Code0 to help identify test cases and verify the affected functionality across all user roles.
- **Actual Prompt**:
  > *"Help identify comprehensive manual test scenarios and edge cases to verify the Student Support Ticket Management System across Student, Staff, and Manager roles."*
- **Changes Made**: None to code. Formulated a structured manual test checklist covering authentication, ticket creation, staff assignment, pending-action updates, and role-based route guard redirects.
- **Verification**: Manually ran all test cases through the browser across Student, Staff, and Manager accounts with local MongoDB running, confirming expected role behavior and route protection.

### Developer Oversight
All code inspection, execution, and testing were conducted and verified by the developer. Code0 was used as an advisory development tool, and no unapproved code was generated or committed.

---

## Future Enhancements

- Detailed activity and audit history
- Email notifications
- SMS notifications
- Automatic escalation notifications
- Staff workload management
- File and attachment upload
- Student feedback and ratings
- Advanced search and filtering
- Advanced analytics and reports
- Real-time notifications

---

## Project Summary

Student Support & Ticket Management is a full-stack web application designed to help educational institutions manage student support requests efficiently. It provides role-based access for students, staff, and managers while supporting ticket creation, prioritization, assignment, SLA monitoring, ageing, pending actions, status management, resolution tracking, and management visibility.

### Architecture

```text
React.js Frontend
       ↓
Axios / REST API
       ↓
Node.js + Express.js
       ↓
MongoDB + Mongoose
```

### Project Type
Full-Stack Web Application

### Domain
Student Support / Ticket Management

---

## License

This project was developed as an academic and assessment project for StartupMeu.
