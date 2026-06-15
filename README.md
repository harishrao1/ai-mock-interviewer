# MockAI - Interview Preparation Platform

An AI-powered mock interview platform that generates personalized interview questions based on job descriptions and provides instant scoring with actionable feedback.

## Features

✨ **AI-Powered Question Generation** - Generates tailored interview questions from job descriptions using Groq API (Llama 3.1)

🎯 **Multiple Interview Types** - Technical, Behavioral, System Design, and Mixed interview modes

📊 **Instant Scoring & Feedback** - Get immediate scores (0-10) with detailed feedback on strengths and improvement areas

⏱️ **Question Timer** - Optional countdown timer to simulate real interview conditions with auto-skip functionality

📈 **Score Tracking** - View historical sessions and track your progress over time with trend analytics

🎨 **Theme Support** - Dark, light, midnight, forest, ocean, ember, dawn, and arctic themes

🔐 **Firebase Authentication** - Secure login with Google authentication

📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

📄 **PDF Export** - Export interview feedback as a printable PDF report

## Built With

### Frontend
- **[React 19](https://react.dev)** - UI library for building interactive components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better developer experience
- **[Vite](https://vitejs.dev)** - Lightning-fast build tool and dev server
- **[React Router v7](https://reactrouter.com)** - Client-side routing
- **[Zustand](https://zustand-demo.pmnd.rs)** - Lightweight state management
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Recharts](https://recharts.org)** - Score trend chart visualizations
- **[Inter](https://fonts.google.com/specimen/Inter)** - Primary typeface

### AI & Services
- **[Groq API](https://groq.com)** - Fast LLM inference (Llama 3.1 8b) for question generation and answer evaluation
- **[Firebase](https://firebase.google.com)** - Authentication and hosting
  - Firebase Authentication (Google)
  - Firestore Database

### PDF Export
- **[html2canvas](https://github.com/niklasvh/html2canvas)** + **[jsPDF](https://github.com/parallax/jsPDF)** - Client-side PDF generation

### Development Tools
- **[ESLint](https://eslint.org)** - Code quality and consistency
- **[PostCSS](https://postcss.org)** - CSS transformation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Groq API key (free at [console.groq.com](https://console.groq.com))
- Firebase project credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harishrao1/ai-mock-interviewer.git
   cd ai-mock-interviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── AnswerInput.tsx
│   ├── AuthGuard.tsx
│   ├── FeedbackCard.tsx
│   ├── Footer.tsx
│   ├── QuestionCard.tsx
│   ├── QuestionTimer.tsx
│   ├── ScoreTrendChart.tsx
│   ├── ThemeToggle.tsx
│   └── UserButton.tsx
├── constants/        # Centralized strings and UI copy
│   └── strings.ts
├── pages/            # Page components
│   ├── Feedback.tsx
│   ├── History.tsx
│   ├── Home.tsx
│   ├── Interview.tsx
│   ├── Login.tsx
│   └── Settings.tsx
├── services/         # External API integrations
│   ├── firebase.ts
│   └── openai.ts     # Groq API client
├── store/            # Zustand state management
│   ├── useAuthStore.ts
│   ├── useHistoryStore.ts
│   ├── useInterviewStore.ts
│   ├── useSettingsStore.ts
│   └── useThemeStore.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Helper functions
│   ├── exportPDF.ts
│   └── shareSession.ts
└── main.tsx          # Application entry point
```

## Usage

1. **Log in** with Google
2. **Paste a job description** to customize the interview
3. **Select interview type** (Technical, Behavioral, System Design, Mixed)
4. **Choose difficulty level** (Junior, Mid, Senior)
5. **Generate questions** and start the interview
6. **Answer questions** with detailed responses (skip if unsure)
7. **Review feedback** with scores and improvement suggestions
8. **Track progress** in history with score trends
9. **Export** your feedback report as a PDF

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments & Credits

- React community for excellent documentation and best practices
- Tailwind CSS for beautiful, accessible component utilities
- Firebase for reliable authentication and database services
- Groq for fast, free LLM inference
- The open-source community for amazing development tools

---

**Built with ❤️ by [Harish Rao](https://github.com/harishrao1)**

Have questions? [Open an issue](https://github.com/harishrao1/ai-mock-interviewer/issues) or reach out!
