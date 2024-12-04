import React, { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        let existcart = localStorage.getItem("cart")
        if (existcart) setCart(JSON.parse(existcart));
    },[])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
