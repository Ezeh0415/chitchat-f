import React from "react";
import "./EmailVerify.css";
import { useMyContext } from "../../../Context/MyContext";

const EmailVerification = () => {
  const {
    otp,
    email,
    handleChange,
    handleKeyDown,
    handlePaste,
    inputRefs,
    isLoading,
    formatTime,
    timer,
    message,
    verifyOtp,
    resendOtp,
    setNavOpen,
  } = useMyContext();
  return (
    <div className="email-verify-container ">
      <div className="email-verify-card">
        <div className="email-verify-header">
          <div className="email-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h1>Verify Your Email</h1>
          <p>
            We've sent a 6-digit code to{" "}
            <strong>{email || "your email"}</strong>
          </p>
          <p>Enter the code below to continue</p>
        </div>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-digit"
              disabled={isLoading}
            />
          ))}
        </div>

        <div className="timer-section">
          <p>
            Code expires in: <span className="timer">{formatTime(timer)}</span>
          </p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <button
          onClick={() => {
            verifyOtp();
            setNavOpen(true);
          }}
          disabled={isLoading || otp.join("").length !== 6}
          className="verify-button"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>

        <div className="resend-section">
          <p>Didn't receive the code?</p>
          <button
            onClick={resendOtp}
            disabled={isLoading || timer > 0}
            className="resend-button"
          >
            {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend Code"}
          </button>
        </div>

        <div className="support-section">
          <p>
            Having trouble? <a href="/support">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
