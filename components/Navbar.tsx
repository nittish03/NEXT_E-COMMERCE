"use client";
import { useEffect, useState, useRef } from "react";
import NavLink from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaCartPlus, FaSearch, FaBell, FaHeart } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDashboard, MdSettings, MdLogout } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { useAppContext } from "@/context";
import axios from "axios";

export default function Navbar() {
  const { cartCount, setCartCount } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Ref for dropdown to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    router.push("/");
    setIsProfileDropdownOpen(false); // Close dropdown on logout
  };

  // Handle dropdown closing on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Close dropdown when pathname changes
  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse move for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove as any);
    return () => window.removeEventListener("mousemove", handleMouseMove as any);
  }, []);

  // Get cart count
  useEffect(() => {
    const getTotalProducts = async () => {
      try {
        const response = await axios.get("/api/Cart/total-products");
        setCartCount(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };
    if (session) {
      getTotalProducts();
    }
  }, [cartCount, session, setCartCount]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/Men" },
    { name: "Women", href: "/Women" },
    { name: "Kids", href: "/Kids" },
  ];

  // Function to check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/30"
            : "bg-white/95 backdrop-blur-sm shadow-lg"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${
            (mousePosition.y - window.innerHeight / 2) * 0.001
          }deg)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section with Responsive Text */}
            <div className="flex items-center group cursor-pointer flex-shrink-0">
              <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3d">
                <Image
                  src={logo}
                  alt="E-Commerce Logo"
                  width={32}
                  height={32}
                  className="transition-all duration-500 group-hover:drop-shadow-2xl sm:w-10 sm:h-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <h2 className="ml-2 text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 whitespace-nowrap">
                E-Commerce
              </h2>
            </div>

            {/* Desktop Navigation with Active State Indicators */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {navItems.map((item, index) => {
                const active = isActiveLink(item.href);
                return (
                  <NavLink
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 lg:px-6 py-2 group overflow-hidden rounded-full transition-all duration-300 hover:scale-105 ${
                      active 
                        ? "text-white font-bold" 
                        : "text-gray-700 font-semibold hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 transition-colors duration-300 text-sm lg:text-base">
                      {item.name}
                    </span>
                    
                    {/* Active Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full transition-all duration-500 ${
                      active ? "scale-100 opacity-100" : "scale-x-0 group-hover:scale-x-100 opacity-90"
                    } origin-left`}></div>
                    
                    {/* Shimmer Effect for Active */}
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full animate-shimmer rounded-full"></div>
                    )}
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 rounded-full"></div>
                    
                    {/* Active Dot Indicator */}
                    {active && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Search Bar - Only on large screens */}
            <div
              className={`hidden xl:flex items-center relative transition-all duration-500 ${
                isSearchFocused ? "scale-105" : ""
              }`}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-48 lg:w-64 px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 focus:shadow-lg"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-500" />
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {session && (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 group">
                    <FaBell size={18} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
                  </button>

                  {/* Wishlist */}
                  <button className="relative p-2 text-gray-600 hover:text-red-500 transition-all duration-300 hover:scale-110 group">
                    <FaHeart size={18} />
                    <div className="absolute inset-0 bg-red-100 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                  </button>

                  {/* Cart with 3D Animation */}
                  <button
                    onClick={() => router.push("/cart")}
                    className={`relative p-2 transition-all duration-300 hover:scale-110 group ${
                      pathname === "/cart" 
                        ? "text-blue-600 bg-blue-100 rounded-full" 
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <FaCartPlus size={20} className="transform group-hover:rotate-12 transition-transform duration-300" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-[18px] h-4 flex items-center justify-center animate-bounce">
                        {cartCount}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-blue-100 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className={`flex items-center space-x-1 lg:space-x-2 p-2 rounded-full transition-all duration-300 group ${
                        pathname === "/profile" 
                          ? "bg-blue-100 text-blue-600" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="relative">
                        {session?.user?.image ? (
                          <Image
                            className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 transition-all duration-300 group-hover:scale-110 ${
                              pathname === "/profile" 
                                ? "border-blue-500" 
                                : "border-transparent group-hover:border-blue-500"
                            }`}
                            src={session.user.image}
                            alt={session.user.name ?? ""}
                            width={32}
                            height={32}
                          />
                        ) : (
                          <CgProfile size={28} className={`lg:w-8 lg:h-8 transition-colors duration-300 ${
                            pathname === "/profile" 
                              ? "text-blue-600" 
                              : "text-gray-600 group-hover:text-blue-600"
                          }`} />
                        )}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <span className={`hidden lg:block text-sm font-medium transition-colors duration-300 max-w-[100px] truncate ${
                        pathname === "/profile" 
                          ? "text-blue-600" 
                          : "text-gray-700 group-hover:text-blue-600"
                      }`}>
                        {session.user?.name}
                      </span>
                      <IoMdArrowDropdown className={`transform transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 transform transition-all duration-300 animate-slide-down">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
                          <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                        </div>
                        <Link 
                          href="/profile" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                            pathname === "/profile" 
                              ? "bg-blue-50 text-blue-600 font-semibold" 
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          <MdDashboard className="mr-3" size={16} />
                          Dashboard
                        </Link>
                        <Link 
                          href="/settings" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          <MdSettings className="mr-3" size={16} />
                          Settings
                        </Link>
                        <Link 
                          href="/security" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          <BsShieldCheck className="mr-3" size={16} />
                          Security
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <MdLogout className="mr-3" size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {!session && (
                <Link href="/login">
                  <button className="relative px-4 lg:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm lg:text-base">
                    <span className="relative z-10 whitespace-nowrap">Login/Signup</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group"
              >
                {isMenuOpen ? (
                  <HiX size={24} className="text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
                ) : (
                  <HiMenuAlt3 size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with Active States */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-xl border-l border-gray-200/50 transform transition-all duration-500 z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transform: `translateX(${isMenuOpen ? '0' : '100%'}) perspective(1000px) rotateY(${isMenuOpen ? '0' : '45deg'})`,
        }}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition-all duration-300 group"
          >
            <HiX size={24} className="text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
          </button>

          {/* Mobile Search */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links with Active States */}
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const active = isActiveLink(item.href);
              return (
                <NavLink
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    active
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-md"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInRight 0.5s ease-out forwards' : '',
                  }}
                >
                  {item.name}
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* User Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                  {session?.user?.image ? (
                    <Image
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      src={session.user.image}
                      alt={session.user.name ?? ""}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <CgProfile size={40} className="text-blue-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{session.user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    router.push("/cart");
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    pathname === "/cart"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <span className="flex items-center">
                    <FaCartPlus className="mr-3" size={18} />
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className={`text-sm font-bold rounded-full px-2 py-1 min-w-[24px] text-center ${
                      pathname === "/cart" 
                        ? "bg-white text-blue-600" 
                        : "bg-blue-600 text-white"
                    }`}>
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                  Login/Signup
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}
