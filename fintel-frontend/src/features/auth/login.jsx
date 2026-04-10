import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useGoogleLogin, GoogleLogin} from "@react-oauth/google"; // ✅ added
import "./login.css";
import { loginUser, googleLogin } from "../../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  // 🔔 Toast
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // 🔐 EMAIL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res.data.success) {
        const { accessToken, user } = res.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        showToast("Login successful 🎉", "success");

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast(res.data.message || "Login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 GOOGLE LOGIN SUCCESS
  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const res = await googleLogin(tokenResponse.access_token);

      if (res.data.success) {
        const { accessToken, user } = res.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        showToast("Google login successful 🎉", "success");

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast("Google login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
  };

  // 🔵 GOOGLE LOGIN INIT
  const googleLoginHandler = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => showToast("Google Login Failed", "error"),
  });

  return (
    <div className="login-wrapper">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`toast-popup ${toast.type}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="login-card">
        {/* LEFT */}
        <div className="login-visual">
          <motion.div
            className="brand"
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.3,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <img
              src="../../../public/image.png"
              alt="Fintle"
              className="fintle-main-logo"
            />
          </motion.div>

          <div className="overlay-content">
            <h1>Accounting Made Global.</h1>
            <p>
              Empowering your global trade journey simplify sales, optimize
              purchases, and secure your financial future in one intelligent
              platform..
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }} // start a bit farther
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
          className="login-form-side"
        >
          <div className="login-form-inner">
            <header>
              <h2>Welcome back</h2>
              <p>Sign in to your Fintle account</p>
            </header>

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  className={errors.email ? "input-error" : ""}
                  placeholder="admin@fintel.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  className={errors.email ? "input-error" : ""}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="form-utils">
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* LOGIN BUTTON */}
              <motion.button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : "Login"}
              </motion.button>

              {/* DIVIDER */}
              <div className="divider">
                <span>OR CONTINUE WITH</span>
              </div>

              {/* GOOGLE BUTTON */}
              {/* <button
                type="button"
                className="google-btn"
                onClick={() => googleLoginHandler()}
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="G"
                />
                <span>Google Login</span>
              </button> */}

              <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await googleLogin({ idToken });

      if (res.data.success) {
        const { accessToken, user } = res.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        showToast("Google Login successful 🎉", "success");

        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      console.error(err);
      showToast("Google login failed", "error");
    }
  }}
  onError={() => {
    showToast("Google Login Failed", "error");
  }}
/>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
