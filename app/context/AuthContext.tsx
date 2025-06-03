import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
    createContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

type AuthState = {
    token: string | null;
    authenticated: boolean;
};

type AuthContextType = {
    authState: AuthState;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: false,
    });

    useEffect(() => {
        SecureStore.getItemAsync("token").then((token) => {
            if (token) setAuthState({ token, authenticated: true });
        });
    }, []);

    const login = async (token: string) => {
        await SecureStore.setItemAsync("token", token);
        setAuthState({ token, authenticated: true });
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        setAuthState({ token: null, authenticated: false });
        router.replace("/login");
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}