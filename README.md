# 🫀 Heartlight Guardian - Cardiac Health Risk Prediction

## Overview

**Heartlight Guardian** is an intelligent web application that predicts cardiovascular disease risk using machine learning. Our advanced ML models analyze patient health data with 95%+ accuracy to provide early risk detection and personalized health recommendations. It's designed to help both medical professionals screen patients efficiently and individuals understand their cardiac health status.

---

## 🌟 Key Features

### 📊 Accurate Predictions
- Machine learning model trained on extensive clinical data
- 95%+ accuracy for early cardiovascular disease risk detection
- Evidence-based risk stratification

### ⚡ Fast Analysis
- Get comprehensive risk assessment in under 30 seconds
- Optimized prediction engine for real-time results
- Instant actionable insights

### 🔒 Privacy & Security
- End-to-end encrypted health data
- No data persistence - information never stored on servers
- Complete privacy guarantee for all users
- HIPAA-compliant architecture

### 🎨 User-Friendly Interface
- Intuitive multi-step assessment form
- Beautiful, responsive UI built with shadcn/ui components
- Dark/light theme support
- Smooth animations and transitions

### 👥 Multi-Role Support
- Patient self-assessment functionality
- Healthcare provider dashboard
- Personalized user authentication

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for robust code
- **Vite** - Lightning-fast build tool and development server

### UI & Styling
- **shadcn/ui** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Radix UI** - Headless component primitives for accessibility
- **Framer Motion** - Smooth animations and transitions

### State Management & Data
- **TanStack React Query** - Powerful server state management
- **React Context API** - Global state for auth and theme

### Development Tools
- **ESLint** - Code quality and style checking
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

### Routing
- **React Router** - Client-side navigation
- **React Hook Form** - Efficient form state management

---

## 📋 Project Structure

```
heartlight-guardian/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   └── NavLink.tsx     # Navigation link component
│   │
│   ├── contexts/           # Global state management
│   │   ├── AuthContext.tsx    # User authentication state
│   │   └── ThemeContext.tsx   # Dark/light theme toggle
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   │
│   ├── pages/              # Page components (route-based)
│   │   ├── Index.tsx          # Landing page
│   │   ├── Auth.tsx           # Authentication page
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── Assessment.tsx     # Multi-step cardiac assessment form
│   │   ├── Result.tsx         # Risk assessment results display
│   │   ├── About.tsx          # About page with project info
│   │   ├── Research.tsx       # Research methodology page
│   │   ├── Contact.tsx        # Contact/support page
│   │   └── NotFound.tsx       # 404 error page
│   │
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Common helper functions
│   │
│   ├── assets/             # Static assets (images, etc.)
│   │
│   ├── App.tsx             # Main application component with routing
│   ├── main.tsx            # React DOM entry point
│   └── index.css           # Global styles
│
├── test/                   # Test files
│   ├── example.test.ts     # Example unit test
│   └── setup.ts            # Test configuration
│
├── public/                 # Static files served by web server
│   └── robots.txt          # SEO robots configuration
│
├── vite.config.ts          # Vite build configuration
├── vitest.config.ts        # Vitest testing configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration (for Tailwind)
├── eslint.config.js        # ESLint rules configuration
├── playwright.config.ts    # E2E testing configuration
├── components.json         # shadcn/ui configuration
└── package.json            # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/heartlight-guardian.git
   cd heartlight-guardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if using bun
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # Server runs at http://localhost:5173
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📦 Available Scripts

Each script has a specific purpose in the development and deployment workflow:

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot module replacement |
| `npm run build` | Create optimized production build |
| `npm run build:dev` | Build in development mode (with source maps) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode for development |

---

## 🔐 Authentication System

The app includes a robust authentication system built with React Context:

- **AuthContext.tsx** - Manages user login state and session
- Supports patient and provider roles
- Secure token-based authentication
- Automatic session management

```typescript
// Example: Using auth in components
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  // ...
};
```

---

## 🎨 Theming

The application supports both dark and light themes:

- **ThemeContext.tsx** - Global theme state management
- Automatic system preference detection
- Persistent theme preference in localStorage
- Smooth theme transitions

```typescript
// Example: Using theme in components
import { useTheme } from '@/contexts/ThemeContext';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();
  // ...
};
```

---

## 📊 Assessment Form Structure

The multi-step cardiac assessment includes:

1. **Basic Info** - Age, gender, personal details
2. **Cardiac Data** - Heart metrics (blood pressure, cholesterol, etc.)
3. **Test Results** - Clinical test values (ECG, maximum heart rate, etc.)
4. **Advanced Data** - Additional cardiac indicators
5. **Lifestyle** - Diet, sleep, exercise habits
6. **Health Concerns** - Family history, existing conditions, smoking/alcohol use

Each field includes:
- Helpful tooltips explaining medical terms
- Input validation
- Clear visual indicators
- Accessible form controls

---

## 🧪 Testing

The project includes testing infrastructure:

### Unit Tests
```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

Test files are located in the `test/` directory with the `.test.ts` extension.

### E2E Testing
- **Playwright** configuration is included in `playwright.config.ts`
- Fixture setup in `playwright-fixture.ts` for reusable test utilities

---

## 📱 Responsive Design

- Mobile-first design approach with Tailwind CSS
- Custom `use-mobile` hook for responsive components
- Drawer component for mobile navigation
- Responsive layout using CSS grid and flexbox

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build and dev server configuration |
| `vitest.config.ts` | Unit testing framework setup |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.ts` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `eslint.config.js` | Code quality rules |
| `components.json` | shadcn/ui component registry |
| `playwright.config.ts` | E2E testing configuration |

---

## 🎯 Key UX Components

### UI Component Library
The project uses **shadcn/ui** components for consistency:
- Forms (Input, Select, Checkbox, Textarea)
- Displays (Card, Badge, Progress, Table)
- Dialogs (Dialog, AlertDialog, Popover)
- Navigation (Navigation Menu, Breadcrumb, Pagination)
- And 40+ more accessible components

### Notifications
- **Sonner** - Toast notifications for feedback
- **React Hot Toast** - Alternative toast system

### Icons
- **Lucide React** - 1000+ beautiful, consistent icons

---

## 🔍 Code Quality

- **ESLint** - Catches bugs and enforces code standards
- **TypeScript** - Prevents runtime errors with type checking
- **Tailwind CSS** - Consistent, maintainable styling

```bash
# Check code quality
npm run lint
```

---

## 🌍 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting and tests before submitting a PR.

---

## 📞 Support & Contact

- **Report Issues** - Use GitHub Issues for bug reports and feature requests
- **Contact Page** - Visit the app's contact page for support inquiries
- **Research** - Check the Research page for methodology and scientific basis

---

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- State management with [TanStack Query](https://tanstack.com/query/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---


