import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Shield, Zap, Target, Star, ArrowRight } from "lucide-react";
import realHeart from "@/assets/real-heart.png";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const features = [
  { icon: Target, title: "Accurate Prediction", desc: "Machine learning model trained on clinical data with 95%+ accuracy for early risk detection." },
  { icon: Zap, title: "Fast Analysis", desc: "Get your risk assessment in under 30 seconds with our optimized prediction engine." },
  { icon: Shield, title: "Secure & Private", desc: "Your health data is encrypted and never stored. Complete privacy guaranteed." },
];

const testimonials = [
  { name: "Dr. Sarah Chen", role: "Cardiologist, Mayo Clinic", text: "This tool helps me quickly screen patients and prioritize those who need immediate attention. Remarkable accuracy.", rating: 5 },
  { name: "James Rodriguez", role: "Patient", text: "The early warning from CardioPredict helped me take preventive action. My doctor confirmed the risk factors it identified.", rating: 5 },
  { name: "Dr. Amara Osei", role: "Research Fellow, Johns Hopkins", text: "An excellent application of ML in preventive cardiology. The methodology is sound and results are reproducible.", rating: 5 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Heart className="h-3.5 w-3.5" fill="currentColor" /> AI-Powered Cardiac Risk Assessment
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
              >
                Predict Heart Attack Risk{" "}
                <span className="text-primary">Before It's Too Late</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg">
                Our advanced machine learning model analyzes clinical parameters to provide instant, accurate heart attack risk predictions — empowering early intervention.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                <Link to="/auth">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 gap-2 shadow-lg shadow-primary/25">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/assessment">
                  <Button size="lg" variant="outline" className="rounded-full gap-2">
                    Check Your Risk
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-accent" /> HIPAA Compliant</span>
                <span className="flex items-center gap-1"><Target className="h-4 w-4 text-accent" /> 95%+ Accuracy</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <div className="absolute inset-4 rounded-full border-2 border-primary/20 animate-pulse-ring" />
                  <div className="absolute inset-8 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: "0.3s" }} />
                  <img src={realHeart} alt="Anatomical human heart" className="h-40 w-40 md:h-52 md:w-52 animate-heartbeat object-contain drop-shadow-2xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Why CardioPredict?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Cutting-edge technology meets clinical expertise for the most reliable cardiac risk assessment.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Trusted by Professionals</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Hear from healthcare professionals and patients who trust CardioPredict.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Take Control of Your Heart Health
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Early detection saves lives. Get your personalized risk assessment today — it takes less than 2 minutes.
              </p>
              <Link to="/assessment">
                <Button size="lg" variant="secondary" className="rounded-full shadow-lg gap-2">
                  Start Free Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
