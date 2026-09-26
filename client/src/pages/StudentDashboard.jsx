import React from "react";

import {
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import MyTickets from "./MyTickets";

const StudentDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>
              Student Dashboard
            </h1>

            <p>
              Manage your support
              requests.
            </p>
          </div>

          <Link
            to="/create-ticket"
            className="primary-button"
          >
            + Create Ticket
          </Link>
        </div>

        <MyTickets />
      </div>
    </>
  );
};

export default StudentDashboard;