import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }

    if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid email";
    }

    if (name === "password" && !passwordRegex.test(value)) {
      error =
        "Password must be 8–16 chars with upper, lower & special";
    }

    if (name === "confirmPassword" && value !== form.password) {
      error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    Object.values(errors).every((e) => e === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    setTimeout(() => {
      alert("Registered Successfully 🚀");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="rp">
      <div className="rp-container">

        {/* LEFT SIDE */}
        <div className="rp-left">
          <img
            src="https://img.freepik.com/free-vector/modern-online-registration-composition_23-2147993862.jpg"
            alt="illustration"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="rp-right">
          <div className="rp-form">
            <h2>Create Account</h2>
            <p>Join us and start your journey</p>

            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Full Name" onChange={handleChange} />
              {errors.name && <span>{errors.name}</span>}

              <input name="email" placeholder="Email Address" onChange={handleChange} />
              {errors.email && <span>{errors.email}</span>}

              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              {errors.password && <span>{errors.password}</span>}

              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

              <button disabled={!isValid || loading}>
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </form>

            <div className="rp-links">
              <Link to="/forgot-password">Forgot password?</Link>
              <Link to="/login">Login →</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}