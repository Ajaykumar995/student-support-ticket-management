import { useEffect, useState } from "react";
import React from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";
import Loading from "../components/Loading";

const StaffDashboard = () => {
  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchTickets = async () => {
    try {
      const response =
        await api.get(
          "/tickets/all"
        );

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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>
          Staff Dashboard
        </h1>

        <p>
          Manage student support
          tickets.
        </p>

        {tickets.length === 0 ? (
          <div className="empty-state">
            <p>
              No tickets available.
            </p>
          </div>
        ) : (
          <div className="staff-ticket-list">
            {tickets.map(
              (ticket) => (
                <div
                  className="staff-ticket"
                  key={ticket._id}
                >
                  <div>
                    <h3>
                      {ticket.title}
                    </h3>

                    <p>
                      {
                        ticket.description
                      }
                    </p>

                    <p>
                      <strong>
                        Student:
                      </strong>{" "}
                      {ticket.student
                        ?.name ||
                        "Unknown"}
                    </p>

                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {ticket.category}
                    </p>

                    <p>
                      <strong>
                        Priority:
                      </strong>{" "}
                      {ticket.priority}
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {ticket.status}
                    </p>
                  </div>

                  <div className="status-actions">
                    <button
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
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StaffDashboard;