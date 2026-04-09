import { motion } from "framer-motion";
import { Heart, Brain, Database, Shield, Activity, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { icon: Heart, title: "What is Heart Attack Risk Prediction?", text: "Heart attack risk prediction uses clinical parameters and machine learning algorithms to estimate the likelihood of a cardiac event. By analyzing factors such as age, cholesterol levels, blood pressure, and ECG results, our model identifies patterns associated with cardiovascular disease." },
  { icon: Brain, title: "Our AI/ML Approach", text: "We employ ensemble machine learning techniques including Random Forest, Gradient Boosting, and Neural Networks trained on the UCI Heart Disease dataset. Our model achieves over 95% accuracy through cross-validation and hyperparameter optimization." },
  { icon: Database, title: "Dataset & Methodology", text: "The model is trained on the Cleveland Heart Disease dataset from the UCI Machine Learning Repository, comprising 303 instances with 14 attributes. We use feature engineering, normalization, and SMOTE for class balancing." },
  { icon: Shield, title: "Privacy & Security", text: "All data processing occurs client-side. No personal health information is stored or transmitted to external servers. Our architecture ensures complete data privacy and HIPAA-compliant practices." },
  { icon: Activity, title: "Clinical Significance", text: "Early detection of cardiovascular risk factors can reduce mortality by up to 50%. Our tool empowers both patients and healthcare providers with data-driven insights for preventive care." },
  { icon: Cpu, title: "Technology Stack", text: "Built with React, TypeScript, and Tailwind CSS for the frontend. The ML pipeline uses Python with scikit-learn and TensorFlow. Real-time predictions are delivered through optimized model inference." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">About CardioPredict</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A research-driven platform leveraging artificial intelligence for early cardiac risk detection and prevention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
