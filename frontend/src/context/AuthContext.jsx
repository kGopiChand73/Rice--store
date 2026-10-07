import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    }, []);

    const loadUser = useCallback(async () => {

        const token = localStorage.getItem("access");

        if (!token) {
            setLoading(false);
            return;
        }

        try {

            const response = await authService.getProfile();

            setUser(response.data);

        } catch {

            logout();

        } finally {

            setLoading(false);

        }

    }, [logout]);

    useEffect(() => {

        loadUser();

    }, [loadUser]);

    async function login(username, password) {

        const response = await authService.login(
            username,
            password
        );

        localStorage.setItem(
            "access",
            response.data.access
        );

        localStorage.setItem(
            "refresh",
            response.data.refresh
        );

        await loadUser();

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                setUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}