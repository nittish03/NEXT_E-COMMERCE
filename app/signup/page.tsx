'use client'
import React, { FormEvent, useState } from 'react'
import { redirect } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { MdEmail, MdSecurity } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { signIn } from 'next-auth/react'
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleClick = () => {
    signIn("google", { callbackUrl: "/" })
  }

  const changeShowStatus = () => {
    setShowPass(!showPass);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (email === '' || password === '' || username === '') {
      setError("All fields are required!")
      setIsLoading(false);
      return;
    }
    
    if (!email.includes("@") || email.length < 5 || !email.includes(".") || email.length > 100) {
      setError("Please enter a valid email address!")
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!")
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", { username, email, password });
      const loading = toast.loading("Sending OTP...")
      
      if (response) {
        toast.dismiss(loading);
        toast.success("OTP sent successfully!")
        setRegister(true);
        setOtpTimer(60); // Start 60 second timer
      } else {
        toast.dismiss(loading)
        toast.error("Registration failed. Please try again.")
      }
    } catch (e) {
      toast.error("Registration failed. Please try again.");
      console.log(e);
      setRegister(false);
    }
    setIsLoading(false);
    return;
  }

  const handleOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit OTP")
      setIsLoading(false);
      return
    }
    
    try {
      const loading = toast.loading("Verifying OTP...")
      const response = await axios.post("/api/auth/otp-verification", { email, otp })
      
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: true
      })
      
      if (response) {
        toast.dismiss(loading)
        toast.success("Account created successfully!");
        router.push("/login")
      } else {
        toast.dismiss(loading);
        toast.error("Invalid OTP. Please try again!")
      }
    } catch (e) {
      toast.error("Verification failed. Please try again!");
      console.log(e);
    }
    setIsLoading(false);
    return;
  }

  const handleResendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpTimer > 0) return;
    
    try {
      const response = await axios.post("/api/auth/resend-otp", { email });
      if (response) {
        toast.success("OTP resent successfully!");
        setOtpTimer(60);
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  // Timer effect for OTP resend
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <AnimatePresence mode="wait">
        {!register ? (
          // Registration Form
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-md"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaUser className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-gray-300 text-sm">Join us and start your journey</p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => {
                      setError('');
                      setUsername(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setError('');
                      setEmail(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setError('');
                      setPassword(e.target.value);
                    }}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={changeShowStatus}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                    >
                      <p className="text-red-400 text-sm flex items-center">
                        <MdSecurity className="mr-2" />
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </motion.button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                      Sign In
                    </Link>
                  </p>
                </div>
              </motion.form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="px-4 text-gray-400 text-sm">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Google Sign In */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // OTP Verification Form
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-md"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
              
              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRegister(false)}
                className="absolute top-4 left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <FaArrowLeft />
              </motion.button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 mt-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
                <p className="text-gray-300 text-sm mb-4">We've sent a verification code to</p>
                <p className="text-blue-400 font-semibold break-all">{email}</p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleOTP}
                className="space-y-6"
              >
                {/* OTP Input */}
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      if (/^\d*$/.test(value)) {
                        setOtp(value);
                        setError('');
                      } else {
                        setError("Please enter only numeric digits");
                      }
                    }}
                  >
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-12 text-lg font-bold text-white bg-white/10 border border-white/20 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpTimer > 0}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Send Again"}
                  </button>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                    >
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Verify & Create Account"
                  )}
                </motion.button>

                {/* Change Email */}
                <div className="text-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setRegister(false)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Change email address
                  </button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;
