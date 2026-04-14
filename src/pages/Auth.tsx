import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isLogin) {
      const result = login(email, password);
      if (result === true) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error(result);
      }
    } else {
      const result = signup(name, email, password);
      if (result === true) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error(result);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 flex items-center justify-center px-4 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <Heart className="h-10 w-10 text-primary mx-auto animate-heartbeat" fill="currentColor" />
              <h1 className="font-display text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h1>
              <p className="text-sm text-muted-foreground">{isLogin ? "Sign in to your account" : "Start your health journey"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 rounded-xl" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-xl" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 rounded-xl" />
              </div>
              <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
