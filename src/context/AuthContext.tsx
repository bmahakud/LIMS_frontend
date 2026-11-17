import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, UserProfile, MembershipInfo } from '../api/client';

interface AuthContextType {
  user: UserProfile | null;
  activeMembership: MembershipInfo | null;
  setActiveMembership: (membership: MembershipInfo | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeMembership, setActiveMembershipState] = useState<MembershipInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const determineActiveMembership = (profile: UserProfile | null): MembershipInfo | null => {
    if (!profile || !profile.memberships || profile.memberships.length === 0) {
      return null;
    }
    const storedId = localStorage.getItem('dc_lims_active_membership_id');
    if (storedId) {
      const match = profile.memberships.find(m => m.id === storedId && m.is_active);
      if (match) return match;
    }
    return profile.memberships.find(m => m.is_primary && m.is_active) ||
           profile.memberships.find(m => m.is_active) ||
           null;
  };

  const setActiveMembership = (membership: MembershipInfo | null) => {
    setActiveMembershipState(membership);
    if (membership) {
      localStorage.setItem('dc_lims_active_membership_id', membership.id);
    } else {
      localStorage.removeItem('dc_lims_active_membership_id');
    }
  };

  const refreshUser = async () => {
    try {
      const profile = await apiClient.getCurrentUser();
      setUser(profile);
      setActiveMembershipState(determineActiveMembership(profile));
    } catch {
      setUser(null);
      setActiveMembershipState(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await apiClient.login(email, pass);
      setUser(loggedInUser);
      setActiveMembershipState(determineActiveMembership(loggedInUser));
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.logout();
    } finally {
      setUser(null);
      setActiveMembershipState(null);
      localStorage.removeItem('dc_lims_active_membership_id');
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeMembership,
        setActiveMembership,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
