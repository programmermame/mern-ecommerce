/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => setUser(response.data.user))
                .catch((error) => {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem('token')
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token)
        axios.get('/api/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => setUser(response.data.user))
    }
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };