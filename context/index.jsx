'use client'
import { createContext,useState,useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export function AppWrapper({children}){

const [cartCount,setCartCount] = useState(0);

const addToCart = async(id)=>{
    const loading = toast.loading("Adding to cart")
    try{
        const response = await axios.post("/api/Cart/add-product",{id});
        toast.dismiss(loading);
        toast.success("Added to cart successfully")
        console.log(response)
        setCartCount(cartCount+1);
    }catch(e){
        console.log(e);
        toast.dismiss(loading);
        toast.error("Failed to add to cart")
    }
}























    return (
        <AppContext.Provider value={{
            cartCount,
            setCartCount,
            addToCart,
    
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}

