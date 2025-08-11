import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Define the user type
type User = {
  empID: string;
  // add other properties from your API if needed
};

// Define the AuthContext type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user data from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('userData');
        if (json) {
          setUser(JSON.parse(json));
        } else {
          // Redirect to login if no user is found
          router.replace('/(tabs)/users/login/page');
        }
      } catch (e) {
        console.error('Failed to load user data', e);
        router.replace('/(tabs)/users/login/page');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Function to log in (store to AsyncStorage + state)
  const login = async (userData: User) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.error('Login storage error', e);
    } finally {
      setLoading(false);
      router.replace('/(tabs)/forms/start_form/page');
    }
  };

  // Function to log out (clear storage + state)
  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setLoading(false);
      router.replace('/(tabs)/users/login/page');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
