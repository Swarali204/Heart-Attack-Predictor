import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Heart, TrendingUp, AlertTriangle, ArrowRight, ClipboardList } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const getRiskLabel = (risk: number) => {
  if (risk >= 60) return { label: "High Risk", color: "text-red-500", bg: "bg-red-500/10" };
  if (risk >= 30) return { label: "Medium Risk", color: "text-yellow-500", bg: "bg-yellow-500/10" };
  return { label: "Low Risk", color: "text-green-500", bg: "bg-green-500/10" };
};

function EmptyState({ userName }: { userName: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Welcome, {userName}</h1>
        <p className="text-muted-foreground">Let's get started with your first health assessment</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-10 md:p-16 flex flex-col items-center text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <ClipboardList className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold">No Assessments Yet</h2>
        <p className="text-muted-foreground max-w-md">
          Take your first heart health assessment to see your risk analysis, personalized insights, and health trends on your dashboard.
        </p>
        <Link to="/assessment">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 gap-2 text-lg px-8 py-6">
            Start Your First Assessment <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Heart, title: "Quick & Easy", desc: "Complete a simple health questionnaire in under 2 minutes." },
          { icon: Activity, title: "AI-Powered Analysis", desc: "Get instant risk predictions based on clinical parameters." },
          { icon: TrendingUp, title: "Track Progress", desc: "Monitor your heart health trends over multiple assessments." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass rounded-2xl p-5 space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="font-display font-semibold">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DataDashboard({ userName }: { userName: string }) {
  const { assessments } = useAuth();
  const latest = assessments[assessments.length - 1];
  const latestRisk = getRiskLabel(latest.risk);
  const avgRisk = Math.round(assessments.reduce((s, a) => s + a.risk, 0) / assessments.length);
  const healthScore = Math.max(0, 100 - avgRisk);

  // Build chart data from assessments
  const cholesterolData = assessments.map((a, i) => ({
    assessment: `#${i + 1}`,
    level: parseInt(a.data.cholesterol) || 200,
  }));

  const heartRateData = assessments.map((a, i) => ({
    assessment: `#${i + 1}`,
    rate: parseInt(a.data.maxHR) || 150,
  }));

  const stats = [
    { icon: Heart, label: "Last Result", value: latestRisk.label, color: latestRisk.color, bg: latestRisk.bg },
    { icon: AlertTriangle, label: "Risk Level", value: `${latest.risk}%`, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Activity, label: "Assessments", value: `${assessments.length} Total`, color: "text-accent", bg: "bg-accent/10" },
    { icon: TrendingUp, label: "Health Score", value: `${healthScore}/100`, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome, {userName}</h1>
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
          <h3 className="font-display font-semibold mb-4">Max Heart Rate by Assessment</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={heartRateData}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(355, 82%, 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(355, 82%, 56%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="assessment" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
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
          <h3 className="font-display font-semibold mb-4">Cholesterol by Assessment</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={cholesterolData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="assessment" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
              <Line type="monotone" dataKey="level" stroke="hsl(203, 39%, 44%)" strokeWidth={2} dot={{ fill: "hsl(203, 39%, 44%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user, assessments } = useAuth();
  const hasAssessments = assessments.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        {hasAssessments ? (
          <DataDashboard userName={user?.name || "User"} />
        ) : (
          <EmptyState userName={user?.name || "User"} />
        )}
      </div>
    </div>
  );
}
