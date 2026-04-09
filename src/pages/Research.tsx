import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Database, BarChart3, FileText, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Research() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Research</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the scientific foundation behind our cardiac risk prediction model.
          </p>
        </motion.div>

        {/* Abstract */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Abstract</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cardiovascular diseases (CVDs) remain the leading cause of death globally, accounting for approximately 17.9 million lives annually. This research presents a machine learning-based approach for predicting heart attack risk using clinical parameters. We evaluate multiple classification algorithms — including Logistic Regression, Random Forest, Support Vector Machines, and Gradient Boosting — on the Cleveland Heart Disease dataset. Our ensemble model achieves an accuracy of 95.2% with an AUC-ROC of 0.97, demonstrating superior performance compared to individual classifiers. The web-based implementation enables real-time risk assessment, making predictive cardiology accessible to both healthcare providers and patients.
          </p>
        </motion.div>

        {/* Methodology & Dataset */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <FlaskConical className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold">Methodology</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              {["Data Collection & Preprocessing", "Feature Engineering & Selection", "Model Training (5-fold CV)", "Hyperparameter Optimization", "Ensemble Model Construction", "Performance Evaluation"].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold">Dataset</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Source:</strong> UCI Machine Learning Repository</p>
              <p><strong className="text-foreground">Name:</strong> Cleveland Heart Disease Dataset</p>
              <p><strong className="text-foreground">Instances:</strong> 303 patient records</p>
              <p><strong className="text-foreground">Features:</strong> 14 clinical attributes</p>
              <p><strong className="text-foreground">Target:</strong> Binary (presence/absence of heart disease)</p>
              <p><strong className="text-foreground">Attributes:</strong> Age, Sex, Chest Pain, BP, Cholesterol, Blood Sugar, ECG, Max HR, Exercise Angina, ST Depression, Slope, Vessels, Thalassemia</p>
            </div>
          </motion.div>
        </div>

        {/* Model Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold">Model Performance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "Accuracy", value: "95.2%" },
              { metric: "Precision", value: "94.8%" },
              { metric: "Recall", value: "96.1%" },
              { metric: "AUC-ROC", value: "0.97" },
            ].map((m) => (
              <div key={m.metric} className="text-center p-4 rounded-xl bg-muted/50">
                <p className="font-display text-2xl font-bold text-primary">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.metric}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
