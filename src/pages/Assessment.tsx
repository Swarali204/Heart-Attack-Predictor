import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, Activity, Stethoscope, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";

interface FormData {
  age: string; gender: string; chestPain: string; restingBP: string;
  cholesterol: string; fastingBS: string; ecg: string; maxHR: string;
  exerciseAngina: string; stDepression: string; slope: string;
  vessels: string; thalassemia: string;
}

const steps = [
  { icon: User, title: "Basic Info", desc: "Personal details" },
  { icon: Heart, title: "Cardiac Data", desc: "Heart metrics" },
  { icon: Activity, title: "Test Results", desc: "Clinical tests" },
  { icon: Stethoscope, title: "Advanced", desc: "Additional data" },
];

const TipIcon = ({ tip }: { tip: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help inline ml-1" />
    </TooltipTrigger>
    <TooltipContent className="max-w-xs text-xs">{tip}</TooltipContent>
  </Tooltip>
);

const FieldLabel = ({ label, tip }: { label: string; tip?: string }) => (
  <label className="text-sm font-medium flex items-center gap-0.5">
    {label}{tip && <TipIcon tip={tip} />}
  </label>
);

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    age: "", gender: "", chestPain: "", restingBP: "", cholesterol: "",
    fastingBS: "", ecg: "", maxHR: "", exerciseAngina: "", stDepression: "",
    slope: "", vessels: "", thalassemia: "",
  });
  const navigate = useNavigate();
  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!data.age && !!data.gender;
    if (step === 1) return !!data.chestPain && !!data.restingBP && !!data.cholesterol && !!data.fastingBS;
    if (step === 2) return !!data.ecg && !!data.maxHR && !!data.exerciseAngina && !!data.stDepression;
    if (step === 3) return !!data.slope && !!data.vessels && !!data.thalassemia;
    return false;
  };

  const handleSubmit = () => {
    const age = parseInt(data.age);
    const bp = parseInt(data.restingBP);
    const chol = parseInt(data.cholesterol);
    let score = 0;
    if (age > 55) score += 30; else if (age > 45) score += 15;
    if (bp > 140) score += 20; else if (bp > 120) score += 10;
    if (chol > 240) score += 20; else if (chol > 200) score += 10;
    if (data.chestPain === "typical") score += 15;
    if (data.exerciseAngina === "yes") score += 15;
    if (data.fastingBS === "yes") score += 10;
    const risk = Math.min(score, 100);
    navigate("/result", { state: { risk, data } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-center mb-2">Health Assessment</h1>
          <p className="text-center text-muted-foreground mb-8">Complete the form for your risk analysis</p>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 text-primary border-2 border-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:block text-xs font-medium">{s.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {step === 0 && (
                  <>
                    <div className="space-y-2">
                      <FieldLabel label="Age" tip="Your current age in years" />
                      <Input type="number" placeholder="e.g. 45" value={data.age} onChange={(e) => set("age", e.target.value)} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Gender" />
                      <Select value={data.gender} onValueChange={(v) => set("gender", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <FieldLabel label="Chest Pain Type" tip="Typical angina, atypical angina, non-anginal pain, or asymptomatic" />
                      <Select value={data.chestPain} onValueChange={(v) => set("chestPain", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="typical">Typical Angina</SelectItem>
                          <SelectItem value="atypical">Atypical Angina</SelectItem>
                          <SelectItem value="non-anginal">Non-Anginal Pain</SelectItem>
                          <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Resting Blood Pressure (mm Hg)" tip="Blood pressure measured at rest, typically 120/80 is normal" />
                      <Input type="number" placeholder="e.g. 130" value={data.restingBP} onChange={(e) => set("restingBP", e.target.value)} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Serum Cholesterol (mg/dl)" tip="Total cholesterol level, desirable is below 200 mg/dl" />
                      <Input type="number" placeholder="e.g. 220" value={data.cholesterol} onChange={(e) => set("cholesterol", e.target.value)} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Fasting Blood Sugar > 120 mg/dl" tip="Whether fasting blood sugar exceeds 120 mg/dl" />
                      <Select value={data.fastingBS} onValueChange={(v) => set("fastingBS", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <FieldLabel label="Resting ECG Results" tip="Electrocardiographic results at rest" />
                      <Select value={data.ecg} onValueChange={(v) => set("ecg", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="st-abnormality">ST-T Wave Abnormality</SelectItem>
                          <SelectItem value="lv-hypertrophy">Left Ventricular Hypertrophy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Maximum Heart Rate Achieved" tip="Highest heart rate during exercise test" />
                      <Input type="number" placeholder="e.g. 150" value={data.maxHR} onChange={(e) => set("maxHR", e.target.value)} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Exercise Induced Angina" tip="Chest pain triggered by physical exertion" />
                      <Select value={data.exerciseAngina} onValueChange={(v) => set("exerciseAngina", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="ST Depression" tip="ST depression induced by exercise relative to rest" />
                      <Input type="number" step="0.1" placeholder="e.g. 1.5" value={data.stDepression} onChange={(e) => set("stDepression", e.target.value)} className="rounded-xl" />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <FieldLabel label="Slope of Peak Exercise ST Segment" tip="The slope of the peak exercise ST segment" />
                      <Select value={data.slope} onValueChange={(v) => set("slope", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upsloping">Upsloping</SelectItem>
                          <SelectItem value="flat">Flat</SelectItem>
                          <SelectItem value="downsloping">Downsloping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Number of Major Vessels (0-3)" tip="Number of major vessels colored by fluoroscopy" />
                      <Select value={data.vessels} onValueChange={(v) => set("vessels", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Thalassemia" tip="Blood disorder affecting hemoglobin production" />
                      <Select value={data.thalassemia} onValueChange={(v) => set("thalassemia", v)}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fixed">Fixed Defect</SelectItem>
                          <SelectItem value="reversible">Reversible Defect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button variant="outline" className="rounded-xl" onClick={() => setStep(step - 1)} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {step < 3 ? (
                <Button className="rounded-xl bg-primary hover:bg-primary/90" onClick={() => setStep(step + 1)} disabled={!canNext()}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="rounded-xl bg-primary hover:bg-primary/90" onClick={handleSubmit} disabled={!canNext()}>
                  Get Results
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
