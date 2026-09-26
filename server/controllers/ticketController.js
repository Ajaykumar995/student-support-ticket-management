const Ticket = require("../models/Ticket");

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority: priority || "Medium",
      student: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get logged-in student's tickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      student: req.user.id,
    })
      .populate("student", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Get my tickets error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("student", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Get all tickets error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get single ticket
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("student", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Get ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Update ticket status
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Open",
      "In Progress",
      "Resolved",
      "Closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket status",
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Delete ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
};