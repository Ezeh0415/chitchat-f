import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignupFunction from "../SignupFunction";

const EmailVerifyFunctionality = () => {
  const Base_Url = "http://localhost:8080";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const inputRefs = useRef([]);
  const navigation = useNavigate();

  const { userToken } = SignupFunction();

  // Auto-focus first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Retrieve email from localStorage if available
    const Users = localStorage.getItem("user");
    const emails = Users ? JSON.parse(Users).email : "";

    if (emails) {
      setEmail(emails);
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setMessage({ text: "Please enter a valid 6-digit code", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // API call to verify OTP
      const response = await fetch(`${Base_Url}/api/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Email verified successfully!", type: "success" });
        // Redirect user after successful verificatio
        localStorage.setItem("Token", userToken);

        setTimeout(() => {
          navigation("/success");
        }, 2000);
      } else {
        setMessage({
          text: data.message || "Verification failed",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${Base_Url}user/otpreset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "New code sent to your email", type: "success" });
        setTimer(300); // Reset timer to 5 minutes
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setMessage({
          text: data.message || "Failed to resend code",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  return {
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
  };
};

export default EmailVerifyFunctionality;
