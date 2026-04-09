
# Heart Attack Risk Predictor — Premium Healthcare Web App

## Design System
- **Primary**: Red (#e63946) for heart/health theme
- **Secondary**: White + Light Gray backgrounds
- **Accent**: Soft Blue (#457b9d) for trust
- **Dark mode** support with toggle
- **Typography**: Clean, modern with proper hierarchy
- **Style**: Glassmorphism cards, subtle gradients, smooth animations via Framer Motion

## Pages & Features

### 1. Home Page
- Hero with animated heart pulse graphic (CSS keyframe animation)
- Headline: "Predict Heart Attack Risk Before It's Too Late"
- Two CTA buttons: "Get Started" and "Check Your Risk"
- Feature cards (Accurate Prediction, Fast Analysis, Secure Data) with hover effects
- Testimonials carousel with realistic healthcare testimonials
- Footer with navigation links and social icons

### 2. Authentication (Login / Sign Up)
- Toggle between Login and Sign Up on same page
- Clean medical-themed form with input validation
- Success/error toast messages
- Local state auth (no backend) — stores user info in context

### 3. Patient Dashboard
- Sidebar navigation (collapsible)
- Welcome message with user name
- Stat cards: Last Prediction, Risk Level, Health Summary
- Charts using Recharts: heart rate trends, cholesterol levels
- "Start New Assessment" button

### 4. Health Data Form (Multi-Step)
- 4-step form with animated progress bar
- Step 1: Basic Info (Age, Gender)
- Step 2: Cardiac Data (Chest Pain, BP, Cholesterol, Blood Sugar)
- Step 3: Test Results (ECG, Max Heart Rate, Exercise Angina, ST Depression)
- Step 4: Advanced (Slope, Vessels, Thalassemia)
- Tooltips on medical terms, icons per field, validation per step

### 5. Result Page
- Large circular risk meter (animated)
- Color-coded result: Green (Low), Yellow (Medium), Red (High)
- Risk explanation text
- Recommendations section with lifestyle tips and doctor advice
- "Download Report" and "New Assessment" buttons

### 6. About Page
- Project explanation for research context
- What is heart attack risk prediction section
- Technologies used (AI/ML overview)
- Healthcare importance section

### 7. Research Section
- Abstract display
- Methodology overview with visual diagram
- Dataset explanation (UCI Heart Disease dataset info)

### 8. Contact Page
- Contact form with validation
- Email, phone info cards
- Social media links

## Global Features
- Dark mode toggle in navbar
- Sticky header with smooth scroll navigation
- Scroll-triggered animations (Framer Motion)
- Skeleton loaders for dashboard
- Fully responsive (mobile + desktop)
- Professional spacing, typography, and micro-interactions throughout
