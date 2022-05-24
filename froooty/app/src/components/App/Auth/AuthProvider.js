import { createContext, useContext, useEffect, useState } from "react";

const KEY = "FROOOTY_AUTH";

const AuthContext = createContext();

const getAuthFromStorage = () => {
    const auth = localStorage.getItem(KEY);
    if (auth) {
        return JSON.parse(atob(auth));
    }
    return null;
};

const saveAuthToStorage = (auth) => {
    localStorage.setItem(KEY, btoa(JSON.stringify(auth)));
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthFromStorage());

    useEffect(() => {
        if (auth) {
            saveAuthToStorage(auth);
        } else {
            localStorage.removeItem(KEY);
        }
    }, [auth]);

    const handleLogout = () => {
        setAuth(null);
    };

    const handleLogin = (auth) => {
        setAuth(auth);
    };

    return (
        <AuthContext.Provider
            value={{ auth, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useUser = () => {
    const { auth } = useAuthContext();
    return auth?.user;
};

export default AuthProvider;
