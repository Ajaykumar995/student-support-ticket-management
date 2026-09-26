import { useEffect, useState } from "react";
import React from "react";

import api from "../services/api";
import TicketCard from "../components/TicketCard";
import Loading from "../components/Loading";

const MyTickets = () => {
  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchTickets = async () => {
    try {
      const response =
        await api.get(
          "/tickets/my-tickets"
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">
      <h1>My Tickets</h1>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <p>
            You haven't created any
            tickets yet.
          </p>
        </div>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;