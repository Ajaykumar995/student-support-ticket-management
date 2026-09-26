import { useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import React from "react";

import api from "../services/api";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Technical");

  const [priority, setPriority] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/tickets", {
        title,
        description,
        category,
        priority,
      });

      alert(
        "Ticket created successfully!"
      );

      navigate("/student");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Create Support Ticket</h1>

      <form
        className="ticket-form"
        onSubmit={handleSubmit}
      >
        <label>Title</label>

        <input
          type="text"
          placeholder="Enter ticket title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <label>Description</label>

        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows="5"
          required
        />

        <label>Category</label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="Technical">
            Technical
          </option>

          <option value="Academic">
            Academic
          </option>

          <option value="Exam">
            Exam
          </option>

          <option value="Fees">
            Fees
          </option>

          <option value="Hostel">
            Hostel
          </option>

          <option value="Library">
            Library
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <label>Priority</label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Urgent">
            Urgent
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;