const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Technical",
        "Academic",
        "Exam",
        "Fees",
        "Attendance",
        "ID Card",
        "Documents",
        "Certificates",
        "Hostel",
        "Library",
        "Other",
      ],
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Urgent",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Resolved",
        "Closed",
      ],
      default: "Open",
    },

    pendingAction: {
      type: String,
      enum: [
        "None",
        "Waiting for Student",
        "Waiting for Staff",
        "Waiting for Documents",
        "Waiting for Approval",
      ],
      default: "None",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    slaHours: {
      type: Number,
      default: 48,
    },

    slaDueAt: {
      type: Date,
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

    closedAt: {
      type: Date,
      default: null,
    },

    resolutionNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Ticket",
  ticketSchema
);