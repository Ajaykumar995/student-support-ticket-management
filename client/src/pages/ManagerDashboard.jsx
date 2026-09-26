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

  const [staff, setStaff] =
    useState([]);

  const fetchTickets = async () => {
    try {
      const [
        ticketResponse,
        staffResponse,
      ] = await Promise.all([
        api.get("/tickets/all"),
        api.get("/auth/staff"),
      ]);

      setTickets(
        ticketResponse.data.tickets
      );

      setStaff(
        staffResponse.data.staff
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // UPDATE STATUS
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

  // ASSIGN STAFF
  const assignStaff = async (
    ticketId,
    staffId
  ) => {
    if (!staffId) return;

    try {
      await api.put(
        `/tickets/${ticketId}/assign`,
        {
          staffId,
        }
      );

      fetchTickets();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to assign ticket"
      );
    }
  };

  // UPDATE PENDING ACTION
  const updatePendingAction = async (
    ticketId,
    pendingAction
  ) => {
    try {
      await api.put(
        `/tickets/${ticketId}/pending-action`,
        {
          pendingAction,
        }
      );

      fetchTickets();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update pending action"
      );
    }
  };

  // CALCULATE TICKET AGE
  const getTicketAge = (
    createdAt
  ) => {
    const created =
      new Date(createdAt).getTime();

    const now = Date.now();

    const hours = Math.floor(
      (now - created) /
        (1000 * 60 * 60)
    );

    if (hours < 24) {
      return `${hours} hrs`;
    }

    const days = Math.floor(
      hours / 24
    );

    const remainingHours =
      hours % 24;

    return `${days}d ${remainingHours}h`;
  };

  // CHECK SLA
  const isSlaBreached = (ticket) => {
    if (
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
    ) {
      return false;
    }

    if (!ticket.slaDueAt) {
      return false;
    }

    return (
      new Date(ticket.slaDueAt) <
      new Date()
    );
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

  const breachedTickets =
    tickets.filter(
      (ticket) =>
        isSlaBreached(ticket)
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

          {/* SLA BREACHED */}

          <div className="manager-stat-card">
            <div className="stat-icon">
              ⚠️
            </div>

            <div>
              <span>
                SLA Breached
              </span>

              <strong>
                {breachedTickets}
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
                Review, assign and
                manage student
                requests.
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
                      {ticket.description}
                    </p>

                    {/* BASIC INFORMATION */}

                    <div className="manager-ticket-info">

                      <div>
                        <span>
                          Student
                        </span>

                        <strong>
                          {ticket.student
                            ?.name ||
                            "Unknown"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Email
                        </span>

                        <strong>
                          {ticket.student
                            ?.email ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Department
                        </span>

                        <strong>
                          {ticket.student
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

                    {/* SLA / AGEING INFORMATION */}

                    <div className="sla-info">

                      <div>
                        <span>
                          Assigned To
                        </span>

                        <strong>
                          {ticket.assignedTo
                            ?.name ||
                            "Unassigned"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Age
                        </span>

                        <strong>
                          {getTicketAge(
                            ticket.createdAt
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          SLA
                        </span>

                        <strong>
                          {ticket.slaHours ||
                            48}{" "}
                          hrs
                        </strong>
                      </div>

                      <div>
                        <span>
                          SLA Status
                        </span>

                        <strong
                          className={
                            isSlaBreached(
                              ticket
                            )
                              ? "sla-breached"
                              : "sla-within"
                          }
                        >
                          {isSlaBreached(
                            ticket
                          )
                            ? "⚠ BREACHED"
                            : "✓ Within SLA"}
                        </strong>
                      </div>

                    </div>

                    {/* ASSIGN STAFF */}

                    <div className="assignment-section">

                      <span>
                        Assign Staff
                      </span>

                      <select
                        value={
                          ticket.assignedTo
                            ?._id || ""
                        }
                        onChange={(e) =>
                          assignStaff(
                            ticket._id,
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          Select Staff
                        </option>

                        {staff.map(
                          (member) => (

                            <option
                              key={
                                member._id
                              }
                              value={
                                member._id
                              }
                            >
                              {member.name}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                    {/* PENDING ACTION */}

                    <div className="pending-action">

                      <span>
                        Pending Action
                      </span>

                      <select
                        value={
                          ticket.pendingAction ||
                          "None"
                        }
                        onChange={(e) =>
                          updatePendingAction(
                            ticket._id,
                            e.target.value
                          )
                        }
                      >

                        <option value="None">
                          None
                        </option>

                        <option value="Waiting for Student">
                          Waiting for Student
                        </option>

                        <option value="Waiting for Staff">
                          Waiting for Staff
                        </option>

                        <option value="Waiting for Documents">
                          Waiting for Documents
                        </option>

                        <option value="Waiting for Approval">
                          Waiting for Approval
                        </option>

                      </select>

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