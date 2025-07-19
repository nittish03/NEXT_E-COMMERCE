'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { 
  FaEdit, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaCamera,
  FaCheck,
  FaTimes,
  FaCog,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaAward
} from "react-icons/fa";
import { 
  MdVerified, 
  MdEdit, 
  MdSave, 
  MdCancel,
  MdDashboard,
  MdSettings,
  MdSecurity,
  MdNotifications
} from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Passionate about coding and building amazing web applications. I love exploring new technologies and creating impactful solutions.");
  const [location, setLocation] = useState("New York, USA");
  const [website, setWebsite] = useState("https://yourwebsite.com");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    setIsLoading(true);
    const loading = toast.loading("Saving changes...");
    
    try {
      const response = await axios.post("/api/Profile", { newName: name });
      setName(response.data.newName);
      toast.dismiss(loading);
      setEdit(false);
      session.user.name = response.data.newName;
      toast.success("Profile updated successfully!");
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      if (e.response) {
        toast.error(e.response.data.message || "Failed to save changes");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleCancel = () => {
    setName(session?.user?.name || "");
    setEdit(false);
  };

  const stats = [
    { label: "Orders", value: "24", icon: FaShoppingBag, color: "text-blue-600" },
    { label: "Reviews", value: "18", icon: FaStar, color: "text-yellow-600" },
    { label: "Wishlist", value: "12", icon: FaHeart, color: "text-red-600" },
    { label: "Rewards", value: "156", icon: FaAward, color: "text-green-600" }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: MdDashboard },
    { id: 'orders', label: 'My Orders', icon: FaShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
    { id: 'settings', label: 'Settings', icon: MdSettings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/5 to-red-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-8"
        >
          {/* Cover Image */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group z-50">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 ">
              <div className="relative ">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Image
                    src={session?.user?.image || "https://www.w3schools.com/w3images/avatar2.png"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                  <button
                    onClick={() => setShowImageUpload(!showImageUpload)}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FaCamera size={14} />
                  </button>
                </motion.div>
                
                {/* Verified Badge */}
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <MdVerified className="text-white" size={18} />
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <button className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <FaCog size={18} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8 text-center">
            {!edit ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex justify-center items-center gap-3">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{name}</h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEdit(true)}
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <MdEdit size={18} />
                  </motion.button>
                </div>
                
                <div className="flex justify-center items-center gap-2 text-gray-600">
                  <FaEnvelope size={14} />
                  <span>{session?.user?.email}</span>
                </div>
                
                <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>Joined March 2024</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="max-w-md mx-auto">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-2xl lg:text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center py-2 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="flex justify-center items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <FaCheck size={16} />
                    )}
                    Save
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    <FaTimes size={16} />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaSignOutAlt size={16} />
                Logout
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <FaCog size={16} />
                Settings
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3`}>
                <stat.icon className={`${stat.color}`} size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* About Section */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <FaUser className="text-blue-600" />
                        About Me
                      </h2>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                        <p className="text-gray-700 leading-relaxed">{bio}</p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect with Me</h2>
                      <div className="flex gap-4">
                        {[
                          { icon: FaGithub, href: "https://github.com/nittish03", color: "hover:text-gray-800", bg: "hover:bg-gray-100" },
                          { icon: FaLinkedin, href: "https://linkedin.com/in/nittish03", color: "hover:text-blue-600", bg: "hover:bg-blue-50" },
                          { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400", bg: "hover:bg-blue-50" },
                          { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500", bg: "hover:bg-pink-50" }
                        ].map((social, index) => (
                          <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }}>
                            <Link
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 ${social.color} ${social.bg} transition-all duration-300 shadow-md hover:shadow-lg`}
                            >
                              <social.icon size={20} />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <FaEnvelope className="text-blue-600" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">Email</p>
                            <p className="text-gray-600">{session?.user?.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <FaMapMarkerAlt className="text-red-600" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">Location</p>
                            <p className="text-gray-600">{location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <FaShoppingBag className="text-blue-600" />
                      My Orders
                    </h2>
                    <div className="text-center py-12">
                      <FaShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No orders yet</p>
                      <p className="text-gray-400">Your orders will appear here once you make a purchase</p>
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <FaHeart className="text-red-600" />
                      My Wishlist
                    </h2>
                    <div className="text-center py-12">
                      <FaHeart size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                      <p className="text-gray-400">Save items you love for later</p>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <MdSettings className="text-blue-600" />
                      Account Settings
                    </h2>
                    <div className="space-y-6">
                      <div className="p-6 border border-gray-200 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy Settings</h3>
                        <p className="text-gray-600 mb-4">Manage your privacy preferences</p>
                        <button className="text-blue-600 hover:underline">Configure Privacy</button>
                      </div>
                      <div className="p-6 border border-gray-200 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Security</h3>
                        <p className="text-gray-600 mb-4">Update your password and security settings</p>
                        <button className="text-blue-600 hover:underline">Security Settings</button>
                      </div>
                      <div className="p-6 border border-gray-200 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Notifications</h3>
                        <p className="text-gray-600 mb-4">Choose what notifications you receive</p>
                        <button className="text-blue-600 hover:underline">Notification Settings</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
