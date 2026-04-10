import React, { useState, useRef, useEffect } from "react";
import "./otp.css";

export default function OtpLogin() {
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(30);

  const inputs = useRef([]);

  // SEND OTP
  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid phone number");
      return;
    }

    // 👉 API CALL HERE
    console.log("Send OTP to:", phone);

    setStep(2);
  };

  // OTP CHANGE
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // BACKSPACE
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // TIMER
  useEffect(() => {
    if (step === 2 && time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, step]);

  // VERIFY OTP
  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      alert("Enter complete OTP");
      return;
    }

    console.log("Verify OTP:", finalOtp);

    // 👉 API VERIFY HERE
  };

  // RESEND
  const handleResend = () => {
    setTime(30);
    console.log("Resend OTP");
  };

  return (
    <div className="otp-container">
      <div className="otp-card">

        {/* STEP 1: PHONE */}
        {step === 1 && (
          <>
            <h2>Login</h2>
            <p>Enter your phone number</p>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="phone-input"
            />

            <button className="btn" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <h2>Verify OTP</h2>
            <p>OTP sent to +91 {phone}</p>

            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button className="btn" onClick={handleVerify}>
              Verify OTP
            </button>

            <div className="resend">
              {time > 0 ? (
                <span>Resend in {time}s</span>
              ) : (
                <button onClick={handleResend}>Resend OTP</button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}