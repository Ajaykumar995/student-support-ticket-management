const express = require("express");

const {
  createTicket,
  getMyTickets,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/ticketController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// STUDENT - CREATE TICKET
router.post(
  "/",
  protect,
  authorize("STUDENT"),
  createTicket
);

// STUDENT - GET OWN TICKETS
router.get(
  "/my-tickets",
  protect,
  authorize("STUDENT"),
  getMyTickets
);

// STAFF / MANAGER - GET ALL TICKETS
router.get(
  "/all",
  protect,
  authorize(
    "STAFF",
    "MANAGER"
  ),
  getAllTickets
);

// AUTHENTICATED USER - GET SINGLE TICKET
router.get(
  "/:id",
  protect,
  getTicketById
);

// STAFF / MANAGER - UPDATE STATUS
router.put(
  "/:id/status",
  protect,
  authorize(
    "STAFF",
    "MANAGER"
  ),
  updateTicketStatus
);

// MANAGER - DELETE TICKET
router.delete(
  "/:id",
  protect,
  authorize("MANAGER"),
  deleteTicket
);

module.exports = router;