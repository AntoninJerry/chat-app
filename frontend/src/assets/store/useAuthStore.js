import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check-auth');
            set({ authUser: res.data});
        } catch (error) {
            console.log('Error in checkAuth', error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    }
}))