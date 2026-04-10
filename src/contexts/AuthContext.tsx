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

interface AuthContextType {
  user: User | null;
  assessments: AssessmentResult[];
  login: (email: string, password: string, name?: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addAssessment: (result: AssessmentResult) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  const login = (email: string, _password: string, name?: string) => {
    setUser({ name: name || email.split("@")[0], email });
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ name, email });
    setAssessments([]);
  };

  const logout = () => {
    setUser(null);
    setAssessments([]);
  };

  const addAssessment = (result: AssessmentResult) => {
    setAssessments((prev) => [...prev, result]);
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
