import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, AlertTriangle, CheckCircle, ArrowRight, Salad, Dumbbell, Stethoscope, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

const getRiskInfo = (risk: number) => {
  if (risk >= 60) return { label: "High Risk", color: "text-red-500", bg: "bg-red-500", ring: "border-red-500", gradient: "from-red-500 to-red-600" };
  if (risk >= 30) return { label: "Medium Risk", color: "text-yellow-500", bg: "bg-yellow-500", ring: "border-yellow-500", gradient: "from-yellow-500 to-yellow-600" };
  return { label: "Low Risk", color: "text-green-500", bg: "bg-green-500", ring: "border-green-500", gradient: "from-green-500 to-green-600" };
};

const recommendations = [
  { icon: Salad, title: "Heart-Healthy Diet", desc: "Adopt a Mediterranean diet rich in fruits, vegetables, whole grains, and lean proteins." },
  { icon: Dumbbell, title: "Regular Exercise", desc: "Aim for at least 150 minutes of moderate aerobic activity per week." },
  { icon: Stethoscope, title: "Regular Check-ups", desc: "Schedule routine cardiac screenings and follow up with your physician." },
  { icon: Pill, title: "Medication Adherence", desc: "If prescribed, take medications consistently and as directed by your doctor." },
];

export default function Result() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/" replace />;

  const { risk = 35 } = (location.state as { risk?: number }) || {};
  const info = getRiskInfo(risk);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (risk / 100) * circumference;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl font-bold">Your Risk Assessment</h1>
            <p className="text-muted-foreground">Based on your clinical data analysis</p>
          </div>

          {/* Risk Meter */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass rounded-2xl p-10 flex flex-col items-center"
          >
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="currentColor"
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className={info.color}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-display text-4xl font-bold ${info.color}`}>{risk}%</span>
                <span className="text-xs text-muted-foreground">Risk Score</span>
              </div>
            </div>
            <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${info.bg}/10 ${info.color} font-semibold`}>
              {risk >= 60 ? <AlertTriangle className="h-4 w-4" /> : risk >= 30 ? <Heart className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              {info.label}
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center max-w-md">
              {risk >= 60
                ? "Your results indicate elevated cardiac risk factors. We strongly recommend consulting a cardiologist promptly."
                : risk >= 30
                  ? "Some risk factors have been identified. Lifestyle modifications and regular monitoring are recommended."
                  : "Your cardiac risk profile is favorable. Continue maintaining a healthy lifestyle and schedule routine check-ups."
              }
            </p>
          </motion.div>

          {/* Recommendations */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Recommendations</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendations.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="glass rounded-xl p-5 space-y-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <r.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/assessment">
              <Button className="rounded-full bg-primary hover:bg-primary/90 gap-2">
                New Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="rounded-full">Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
