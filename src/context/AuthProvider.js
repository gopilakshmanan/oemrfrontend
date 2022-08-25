import { createContext } from "react"
import { useRemoteStorage } from "../hooks/useStorage"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useRemoteStorage('auth-info', {})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext