import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { iDefaultProviderProps } from "./@types";

export interface iProduct{
    id: number;
    name: string;
    category: string;
    price: number;
    img: string;
}

interface iProductsContext{
    products: iProduct[];
}

export const ProductsContext = createContext({} as iProductsContext);

export const ProductsProvider = ({children}: iDefaultProviderProps) => {
    const [products, setProducts] = useState([] as iProduct[]);

    useEffect(() => {
        const token = localStorage.getItem("@TOKEN");
        if(token){
            (async () => {
                try {
                    const response = await api.get<iProduct[]>("products", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProducts(response.data);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, []);
    
    
    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}