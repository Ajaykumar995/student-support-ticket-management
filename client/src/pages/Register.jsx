import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("STUDENT");

  const [department, setDepartment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
        role,
        department:
          department || null,
      });

      alert(
        "Registration successful! Please login."
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Student Support</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength={6}
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="STUDENT">
              Student
            </option>

            <option value="STAFF">
              Staff
            </option>

            <option value="MANAGER">
              Manager
            </option>
          </select>

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;