import { createContext, useState } from "react";
import { api } from "../api/api";
import { iDefaultProviderProps } from "./@types";

interface iUserLoginResponse{
    acessToken: string;
    user: iUser;
}

interface iUser{
    email: string;
    name: string;
    id: number;
}

interface iUserLoginFormData{
    email: string;
    password: string;
}

interface iUserRegisterFormData{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface iUserContext{
    user: iUser | null;
    userRegister: (formData: iUserRegisterFormData) => void;
    userLogin: (formData: iUserLoginFormData) => void;
    userLogout: () => void;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({children}: iDefaultProviderProps) => {
    const [user, setUser] = useState<iUser | null>(null); /* as vezes null */

    async function userRegister(formData: iUserRegisterFormData){
        try {
            await api.post("/users", formData);            
        } catch (error) {
            console.log(error);
        }    
    }

    async function userLogin(formData: iUserLoginFormData){
        try {
            const response = await api.post<iUserLoginResponse>("/login", formData); 
            setUser(response.data.user);  
            localStorage.setItem("@TOKEN", response.data.acessToken);
        } catch (error) {
            console.log(error);
        }
    }

    async function userLogout(){
        setUser(null);
        localStorage.removeItem("@TOKEN");
    }
    
    return(
        <UserContext.Provider value={{ user, userRegister, userLogin, userLogout }}>
            {children}
        </UserContext.Provider>
    )
}