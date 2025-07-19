'use client'
import React, { FormEvent, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import { MdSecurity, MdLogin } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleSignIn = async () => {
    const loading = toast.loading("Signing in with Google...");
    try {
      await signIn("google", { callbackUrl: '/' });
      toast.dismiss(loading);
      toast.success("Welcome back!");
    } catch (error) {
      toast.dismiss(loading);
      console.log(error);
      toast.error("Failed to sign in with Google");
    }
  }

  const changeShowStatus = () => {
    setShowPass(!showPass);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === '' || password === '') {
      setError("Please fill in all fields")
      setIsLoading(false);
      return;
    }

    if (!email.includes("@") || email.length < 5 || !email.includes(".") || email.length > 100) {
      setError("Please enter a valid email address")
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false);
      return;
    }

    const loading = toast.loading("Signing in...")
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        toast.dismiss(loading);
        toast.error("Invalid email or password");
        setError("Invalid email or password");
      } else {
        toast.dismiss(loading);
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Sign in failed. Please try again.");
      setError("Sign in failed. Please try again.");
      console.log(error);
    }
    setIsLoading(false);
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MdLogin className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-sm">Sign in to your account</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
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
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
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
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Forgot password?
              </Link>
            </motion.div>

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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaSignInAlt />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <p className="text-gray-300 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center my-6"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>

          {/* Social Sign In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="space-y-4"
          >
            {/* Google Sign In */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </motion.button>

            {/* Additional Social Options (if needed) */}
            {/* <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 border border-white/10 text-gray-300 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span className="text-blue-500">f</span>
                <span className="text-sm">Facebook</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 border border-white/10 text-gray-300 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span className="text-gray-400">@</span>
                <span className="text-sm">Apple</span>
              </motion.button>
            </div> */}
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          >
            <p className="text-blue-300 text-xs text-center flex items-center justify-center">
              <MdSecurity className="mr-2" />
              Your information is protected with bank-level security
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MdSecurity className="text-blue-400 text-sm" />
            </div>
            <p className="text-white text-xs font-medium">Secure</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FaUser className="text-green-400 text-sm" />
            </div>
            <p className="text-white text-xs font-medium">Trusted</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FaSignInAlt className="text-purple-400 text-sm" />
            </div>
            <p className="text-white text-xs font-medium">Fast</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
