import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const phoneRegex = /^[6-9]\d{9}$/;
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

    if (name === "phone_number" && !phoneRegex.test(value)) {
      error = "Invalid phone number";
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
    form.phone_number &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    Object.values(errors).every((e) => e === "");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const payload = {
        tenant_name: form.name,
        name: form.name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        plan: "free"
      };

      const res = await registerUser(payload);

      if (res?.data?.success) {
        alert("Registered Successfully 🚀");
        navigate("/login");
        return;
      }

      alert(res?.data?.message || "Registration failed");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
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

              <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
              {errors.phone_number && <span>{errors.phone_number}</span>}

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