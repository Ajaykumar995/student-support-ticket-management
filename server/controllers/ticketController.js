const Ticket = require("../models/Ticket");

// CREATE TICKET
const createTicket = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
    } = req.body;

    if (
      !title ||
      !description ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description and category are required",
      });
    }

    const selectedPriority =
      priority || "Medium";

    const slaHours =
      selectedPriority === "Urgent"
        ? 24
        : selectedPriority === "High"
        ? 36
        : selectedPriority === "Medium"
        ? 48
        : 72;

    const slaDueAt = new Date(
      Date.now() +
        slaHours * 60 * 60 * 1000
    );

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority: selectedPriority,
      student: req.user.id,
      slaHours,
      slaDueAt,
    });

    return res.status(201).json({
      success: true,
      message:
        "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(
      "Create ticket error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET MY TICKETS
const getMyTickets = async (
  req,
  res
) => {
  try {
    const tickets =
      await Ticket.find({
        student: req.user.id,
      })
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error(
      "Get my tickets error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ALL TICKETS
const getAllTickets = async (
  req,
  res
) => {
  try {
    const tickets =
      await Ticket.find()
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error(
      "Get all tickets error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET SINGLE TICKET
const getTicketById = async (
  req,
  res
) => {
  try {
    const ticket =
      await Ticket.findById(
        req.params.id
      )
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error(
      "Get ticket error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE TICKET STATUS
const updateTicketStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Open",
      "In Progress",
      "Resolved",
      "Closed",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid ticket status",
      });
    }

    const updateData = {
      status,
    };

    if (status === "Resolved") {
      updateData.resolvedAt =
        new Date();
    }

    if (status === "Closed") {
      updateData.closedAt =
        new Date();
    }

    const ticket =
      await Ticket.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    console.error(
      "Update status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ASSIGN TICKET TO STAFF
const assignTicket = async (
  req,
  res
) => {
  try {
    const { staffId } = req.body;

    const User = require("../models/User");

    const staff =
      await User.findOne({
        _id: staffId,
        role: "STAFF",
      });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message:
          "Staff member not found",
      });
    }

    const ticket =
      await Ticket.findByIdAndUpdate(
        req.params.id,
        {
          assignedTo: staffId,
          assignedAt: new Date(),
        },
        {
          new: true,
        }
      )
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Ticket assigned successfully",
      ticket,
    });
  } catch (error) {
    console.error(
      "Assign ticket error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE PENDING ACTION
const updatePendingAction = async (
  req,
  res
) => {
  try {
    const {
      pendingAction,
    } = req.body;

    const allowedActions = [
      "None",
      "Waiting for Student",
      "Waiting for Staff",
      "Waiting for Documents",
      "Waiting for Approval",
    ];

    if (
      !allowedActions.includes(
        pendingAction
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid pending action",
      });
    }

    const ticket =
      await Ticket.findByIdAndUpdate(
        req.params.id,
        {
          pendingAction,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "student",
          "name email department"
        )
        .populate(
          "assignedTo",
          "name email department"
        );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Pending action updated successfully",
      ticket,
    });
  } catch (error) {
    console.error(
      "Update pending action error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE TICKET
const deleteTicket = async (
  req,
  res
) => {
  try {
    const ticket =
      await Ticket.findByIdAndDelete(
        req.params.id
      );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Ticket deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete ticket error:",
      error
    );

    return res.status(500).json({
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
  assignTicket,
  updatePendingAction,
  deleteTicket,
};