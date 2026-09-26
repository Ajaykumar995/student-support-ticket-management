import { Link } from "react-router-dom";
import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>

        <span
          className={`status status-${ticket.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {ticket.status}
        </span>
      </div>

      <p>
        {ticket.description}
      </p>

      <div className="ticket-info">
        <span>
          Category: {ticket.category}
        </span>

        <span>
          Priority: {ticket.priority}
        </span>
      </div>

      <Link
        to={`/tickets/${ticket._id}`}
        className="view-button"
      >
        View Details
      </Link>
    </div>
  );
};

export default TicketCard;