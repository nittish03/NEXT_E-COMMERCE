'use client'
import React,{useState,useEffect} from 'react'
import {useSession,signOut} from 'next-auth/react'
import Image from 'next/image'
import { FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

const Page = () => {
    const {data:session, status} = useSession();
    const [edit,setEdit] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    const handleSave = async() =>{
        const loading = toast.loading("Saving Name")
        try {
            if (!name.trim()) {
                toast.error("Name cannot be empty");
                return;
            }
            const response = await axios.post("/api/Profile", { newName: name });
            setName(response.data.newName);
            toast.dismiss(loading);
            setEdit(false);
            session.user.name = response.data.newName;
            toast.success("New Name saved successfully");
            toast.success("Changes will take place when you log in again");
        } catch (e) {
            console.error(e);
            toast.dismiss(loading);
            if (e.response) {
                toast.error(e.response.data.message || "Failed to save name");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const handleLogout = () => {
        signOut();
        toast.success("Logged out successfully");
        router.push("/");
      };
      
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          <Image
            src={session?.user?.image || "https://www.w3schools.com/w3images/avatar2.png"} // Use a dynamic link for the profile picture
            alt="Profile"
            width={100}
            height={100}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={session?.user?.image || "https://www.w3schools.com/w3images/avatar2.png"} // Replace with the actual user profile picture
              alt="User Avatar"
              width={100}
              height={100}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="text-center py-8">
            {!edit?
            <><div className='flex justify-center items-center gap-4'>

                      <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
                      <FaEdit onClick={()=>{setEdit(true)}} className='text-blue-700 h-5 w-5' />
            </div>
            </>

: 
            <div className='flex justify-center items-center gap-4'>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className='text-3xl font-semibold text-gray-800 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500'
                />
                <button 
                    onClick={handleSave} 
                    className='bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition-colors duration-300'
                >
                    Save
                </button>
                <button 
                    onClick={() => setEdit(false)} 
                    className='bg-gray-400 px-4 py-2 rounded-md text-white font-semibold hover:bg-gray-500 transition-colors duration-300'
                >
                    Cancel
                </button>
            </div>
            }
            <div className='flex justify-center items-center gap-8 mt-4'>

          <p className="text-gray-500 mt-2">{session?.user?.email}</p>
          <button onClick={()=>{handleLogout()}} className='bg-red-600 px-2 py-1 rounded-sm text-white'>Logout</button>
            </div>

        </div>

        {/* Bio */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
          <p className="mt-2 text-gray-600">
            Passionate about coding and building web applications. I love exploring new technologies and creating impactful solutions. When I’m not coding, you’ll find me reading or enjoying nature.
          </p>
        </div>

        {/* Social Links */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Connect with Me</h2>
          <div className="flex justify-center space-x-6 mt-4">
          <Link href="https://github.com/nittish03" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform ease-in-out duration-300">
                <VscGithub className="h-8 w-8 text-gray-800 hover:text-orange-600 transition-colors duration-300" />
              </Link>
              <Link href="https://linkedin.com/in/nittish03" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform ease-in-out duration-300">
                <FaLinkedin className="h-8 w-8 text-blue-700 hover:text-orange-600 transition-colors duration-300" />
              </Link>

          </div>
        </div>

        {/* Contact */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
          <p className="text-gray-600 mt-2">Email: nittishbaboria123@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Page
