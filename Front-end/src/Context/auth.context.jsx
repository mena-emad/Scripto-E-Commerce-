import { useEffect, useState, createContext } from "react";
import { authApi } from "../container";
const AuthContext = createContext(null);

function getStoredUser(){
    const stored = localStorage.getItem('scripto-user');
    if(!stored || stored === 'undefined' || stored === 'null') return null;
    try {
        return JSON.parse(stored);
    } catch {
        localStorage.removeItem('scripto-user');
        return null;
    }
}

export function AuthProvider({children}){
    const [user,setUser] = useState(getStoredUser);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getStoredUser()));

    useEffect(() => {
        const handleSessionExpired = () => {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('scripto-user');
        };

        window.addEventListener('auth:session-expired', handleSessionExpired);
        return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
    }, []);
    

    async function login(email,password){
        setLoading(true);
        try {
            const response = await authApi.login(email,password)
            const userContext = response.user
            setUser(userContext);
            setIsAuthenticated(true);
            localStorage.setItem('scripto-user', JSON.stringify(userContext));
            return userContext
        } finally {
            setLoading(false);
        }
    }

    async function getMe(){
        const response = await authApi.getProfile()
        let userContext = response.user;
        setUser(userContext);
        localStorage.setItem('scripto-user', JSON.stringify(userContext));
        return userContext
    }

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        getMe().catch(() => {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('scripto-user');
        }).finally(() => setLoading(false));
    }, []);

    async function signup(data){
        const response = await authApi.signUp(data)
        return response.userSafe;
    }

    async function verify(email,otp){
        const response = await authApi.verifyOtp(email,otp);
        const userContext = response.user;
        setUser(userContext);
        localStorage.setItem('scripto-user', JSON.stringify(userContext));
        return userContext;
    }
    async function resend(email){
        return authApi.generateOtp(email);
    }
    async function updatePassword(currentPassword,newPassword,confirmPassword){
        const response = await authApi.updatePassword(currentPassword,newPassword,confirmPassword);
        return response;
    }
    async function updateProfile(data){
        const response = await authApi.updateProfile(data);
        if (response.user) {
            setUser(response.user);
            localStorage.setItem('scripto-user', JSON.stringify(response.user));
        }
        return response;
    }
    async function forgotPassword(email){
        return authApi.forgotPassword(email);
    }
    async function resetPassword(email,otp,password,confirmPassword){
        return authApi.resetPassword(email,otp,password,confirmPassword);
    }
    async function deleteMyAccount(){
        const response = await authApi.deleteMyAccount();
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('scripto-user');
        return response;
    }
    async function logout(){
        try {
            await authApi.logout();
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('scripto-user');
        }
    }
    return <AuthContext.Provider value={{login,verify,resend,logout,updatePassword,updateProfile,forgotPassword,resetPassword,deleteMyAccount,user,loading,isAuthenticated,getMe,signup}}>
        {children}
    </AuthContext.Provider>

}

export default AuthContext;