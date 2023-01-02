import { createContext, useEffect, useState } from "react";
import { iDefaultProviderProps } from "./@types";
import { iProduct } from "./ProductsContext";

interface iCartProduct extends iProduct{
    count: number;
}

interface iCartContext{
    cart: iCartProduct[];
    addProductToCart: (product: iProduct) => void;
    removeAllFromCart: () => void;
}

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({children}: iDefaultProviderProps) => {
    const localStorageCart = localStorage.getItem("@CART");
    const [cart, setCart] = useState<iCartProduct[]>(localStorageCart ? JSON.parse(localStorageCart) : [] as iCartProduct[]);

    useEffect(() => {
        localStorage.setItem("@CART", JSON.stringify(cart));
    }, [cart]);
    
    function addProductToCart(product: iProduct){
        if(!cart.some(cartProduct => cartProduct.id === product.id)){
            const newProduct = { ...product, count: 1 };
            setCart([...cart, newProduct]);
        } else {
            const newList = cart.map(cartProduct => {
                if(cartProduct.id === product.id){
                    return { ...cartProduct, count: cartProduct.count + 1}
                } else {
                    return cartProduct;
                }
            })
            setCart(newList);
        }        
    }

    function removeAllFromCart(){
        setCart([]);
    }
    
    return(
        <CartContext.Provider value={{ cart, addProductToCart, removeAllFromCart }}>
            {children}
        </CartContext.Provider>
    )
}