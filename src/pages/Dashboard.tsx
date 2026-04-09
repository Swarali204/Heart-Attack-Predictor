import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Heart, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const heartRateData = [
  { day: "Mon", rate: 72 }, { day: "Tue", rate: 78 }, { day: "Wed", rate: 74 },
  { day: "Thu", rate: 80 }, { day: "Fri", rate: 76 }, { day: "Sat", rate: 71 }, { day: "Sun", rate: 73 },
];

const cholesterolData = [
  { month: "Jan", level: 210 }, { month: "Feb", level: 205 }, { month: "Mar", level: 198 },
  { month: "Apr", level: 195 }, { month: "May", level: 190 }, { month: "Jun", level: 185 },
];

const stats = [
  { icon: Heart, label: "Last Result", value: "Low Risk", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: AlertTriangle, label: "Risk Level", value: "18%", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Activity, label: "Assessments", value: "3 Total", color: "text-accent", bg: "bg-accent/10" },
  { icon: TrendingUp, label: "Health Score", value: "82/100", color: "text-primary", bg: "bg-primary/10" },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold">Welcome, {user?.name || "User"}</h1>
              <p className="text-muted-foreground">Here's your health overview</p>
            </div>
            <Link to="/assessment">
              <Button className="rounded-full bg-primary hover:bg-primary/90 gap-2">
                New Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 space-y-2"
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display font-bold text-xl">{s.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold mb-4">Heart Rate Trends</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={heartRateData}>
                  <defs>
                    <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(355, 82%, 56%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(355, 82%, 56%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                  <Area type="monotone" dataKey="rate" stroke="hsl(355, 82%, 56%)" fill="url(#hrGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold mb-4">Cholesterol Levels</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={cholesterolData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                  <Line type="monotone" dataKey="level" stroke="hsl(203, 39%, 44%)" strokeWidth={2} dot={{ fill: "hsl(203, 39%, 44%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
