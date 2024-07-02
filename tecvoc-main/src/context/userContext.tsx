import React, { createContext, useContext, useState, ReactNode } from 'react';


interface User {
    email: string;
    name: string;
    surname: string;
    role: string;
   
}


interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void; 
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext) as UserContextType;

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
