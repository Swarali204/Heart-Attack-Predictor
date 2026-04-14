import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AssessmentResult {
  risk: number;
  date: string;
  data: Record<string, any>;
}

interface User {
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
  assessments: AssessmentResult[];
}

interface AuthContextType {
  user: User | null;
  assessments: AssessmentResult[];
  login: (email: string, password: string) => true | string;
  signup: (name: string, email: string, password: string) => true | string;
  logout: () => void;
  addAssessment: (result: AssessmentResult) => void;
}

const USERS_KEY = "heartlight-guardian-users";
const CURRENT_USER_KEY = "heartlight-guardian-current-user";

const getStoredUsers = (): Record<string, StoredUser> => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as Record<string, StoredUser>) : {};
  } catch {
    return {};
  }
};

const saveStoredUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentUserEmail = () => {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch {
    return null;
  }
};

const setCurrentUserEmail = (email: string) => {
  localStorage.setItem(CURRENT_USER_KEY, email);
};

const clearCurrentUserEmail = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const users = getStoredUsers();
    const currentEmail = getCurrentUserEmail();
    return currentEmail && users[currentEmail]
      ? { name: users[currentEmail].name, email: currentEmail }
      : null;
  });

  const [assessments, setAssessments] = useState<AssessmentResult[]>(() => {
    if (typeof window === "undefined") return [];
    const users = getStoredUsers();
    const currentEmail = getCurrentUserEmail();
    return currentEmail && users[currentEmail] ? users[currentEmail].assessments : [];
  });

  const persistAssessments = (email: string, nextAssessments: AssessmentResult[]) => {
    const users = getStoredUsers();
    if (!users[email]) return;
    users[email].assessments = nextAssessments;
    saveStoredUsers(users);
  };

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const stored = users[email.toLowerCase().trim()];
    if (!stored) return "No account found. Please sign up first.";
    if (stored.password !== password) return "Incorrect password. Please try again.";

    setUser({ name: stored.name, email: stored.email });
    setAssessments(stored.assessments || []);
    setCurrentUserEmail(stored.email);
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const users = getStoredUsers();
    if (users[normalizedEmail]) return "Account already exists. Please sign in instead.";

    const newUser: StoredUser = {
      name,
      email: normalizedEmail,
      password,
      assessments: [],
    };

    users[normalizedEmail] = newUser;
    saveStoredUsers(users);
    setUser({ name, email: normalizedEmail });
    setAssessments([]);
    setCurrentUserEmail(normalizedEmail);
    return true;
  };

  const logout = () => {
    setUser(null);
    setAssessments([]);
    clearCurrentUserEmail();
  };

  const addAssessment = (result: AssessmentResult) => {
    setAssessments((prev) => {
      const next = [...prev, result];
      if (user) persistAssessments(user.email, next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, assessments, login, signup, logout, addAssessment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
