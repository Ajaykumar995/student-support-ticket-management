import React, {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../services/api";

const ManagerDashboard = () => {
  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchTickets = async () => {
    try {
      const response =
        await api.get("/tickets/all");

      setTickets(
        response.data.tickets
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load tickets"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (
    ticketId,
    status
  ) => {
    try {
      await api.put(
        `/tickets/${ticketId}/status`,
        {
          status,
        }
      );

      fetchTickets();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  const totalTickets =
    tickets.length;

  const openTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Open"
    ).length;

  const inProgressTickets =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        "In Progress"
    ).length;

  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        "Resolved"
    ).length;

  const closedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Closed"
    ).length;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <main className="dashboard">
        {/* HEADER */}

        <div className="dashboard-header">
          <div>
            <h1>
              Manager Dashboard
            </h1>

            <p>
              Monitor and manage
              student support
              requests.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}

        <div className="manager-stats">
          <div className="manager-stat-card">
            <div className="stat-icon">
              📋
            </div>

            <div>
              <span>
                Total Tickets
              </span>

              <strong>
                {totalTickets}
              </strong>
            </div>
          </div>

          <div className="manager-stat-card">
            <div className="stat-icon">
              🟢
            </div>

            <div>
              <span>
                Open
              </span>

              <strong>
                {openTickets}
              </strong>
            </div>
          </div>

          <div className="manager-stat-card">
            <div className="stat-icon">
              🟡
            </div>

            <div>
              <span>
                In Progress
              </span>

              <strong>
                {inProgressTickets}
              </strong>
            </div>
          </div>

          <div className="manager-stat-card">
            <div className="stat-icon">
              🔵
            </div>

            <div>
              <span>
                Resolved
              </span>

              <strong>
                {resolvedTickets}
              </strong>
            </div>
          </div>

          <div className="manager-stat-card">
            <div className="stat-icon">
              ⚫
            </div>

            <div>
              <span>
                Closed
              </span>

              <strong>
                {closedTickets}
              </strong>
            </div>
          </div>
        </div>

        {/* TICKETS */}

        <div className="manager-section">
          <div className="section-heading">
            <div>
              <h2>
                All Support Tickets
              </h2>

              <p>
                Review and update
                student requests.
              </p>
            </div>

            <span className="ticket-count">
              {tickets.length} Tickets
            </span>
          </div>

          {tickets.length === 0 ? (
            <div className="empty-state">
              <p>
                No tickets available.
              </p>
            </div>
          ) : (
            <div className="manager-ticket-list">
              {tickets.map(
                (ticket) => (
                  <div
                    className="manager-ticket-card"
                    key={ticket._id}
                  >
                    {/* TOP */}

                    <div className="manager-ticket-top">
                      <div>
                        <h3>
                          {ticket.title}
                        </h3>

                        <p className="ticket-date">
                          Created{" "}
                          {new Date(
                            ticket.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`status status-${ticket.status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* DESCRIPTION */}

                    <p className="manager-description">
                      {
                        ticket.description
                      }
                    </p>

                    {/* INFORMATION */}

                    <div className="manager-ticket-info">
                      <div>
                        <span>
                          Student
                        </span>

                        <strong>
                          {ticket
                            .student
                            ?.name ||
                            "Unknown"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Email
                        </span>

                        <strong>
                          {ticket
                            .student
                            ?.email ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Department
                        </span>

                        <strong>
                          {ticket
                            .student
                            ?.department ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Category
                        </span>

                        <strong>
                          {ticket.category}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Priority
                        </span>

                        <strong>
                          {ticket.priority}
                        </strong>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="manager-actions">
                      <span>
                        Update Status
                      </span>

                      <div>
                        <button
                          className={
                            ticket.status ===
                            "Open"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              "Open"
                            )
                          }
                        >
                          Open
                        </button>

                        <button
                          className={
                            ticket.status ===
                            "In Progress"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              "In Progress"
                            )
                          }
                        >
                          In Progress
                        </button>

                        <button
                          className={
                            ticket.status ===
                            "Resolved"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              "Resolved"
                            )
                          }
                        >
                          Resolved
                        </button>

                        <button
                          className={
                            ticket.status ===
                            "Closed"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              "Closed"
                            )
                          }
                        >
                          Closed
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ManagerDashboard;