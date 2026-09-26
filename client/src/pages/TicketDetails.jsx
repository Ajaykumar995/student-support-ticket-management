import { useEffect, useState } from "react";
import React from "react";
import {
  useParams,
} from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response =
          await api.get(
            `/tickets/${id}`
          );

        setTicket(
          response.data.ticket
        );
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to load ticket"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!ticket) {
    return (
      <div className="page-container">
        <h2>Ticket not found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="ticket-details">
          <h1>
            {ticket.title}
          </h1>

          <p>
            {ticket.description}
          </p>

          <hr />

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

          <p>
            <strong>
              Created:
            </strong>{" "}
            {new Date(
              ticket.createdAt
            ).toLocaleString()}
          </p>

          {ticket.assignedTo && (
            <p>
              <strong>
                Assigned To:
              </strong>{" "}
              {
                ticket.assignedTo.name
              }
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketDetails;