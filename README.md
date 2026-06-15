# MockAI - Interview Preparation Platform

An AI-powered mock interview platform that generates personalized interview questions based on job descriptions and provides instant scoring with actionable feedback.

## Features

✨ **AI-Powered Question Generation** - Generates tailored interview questions from job descriptions using OpenAI API

🎯 **Multiple Interview Types** - Technical, Behavioural, System Design, and Mixed interview modes

📊 **Instant Scoring & Feedback** - Get immediate scores (0-10) with detailed feedback on strengths and improvement areas

⏱️ **Question Timer** - Optional countdown timer to simulate real interview conditions with auto-skip functionality

📈 **Score Tracking** - View historical sessions and track your progress over time with trend analytics

🎨 **Dark Mode Support** - Beautiful dark-first UI with smooth theme switching

🔐 **Firebase Authentication** - Secure login with Google and email authentication

📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## Built With

### Frontend
- **[React 18](https://react.dev)** - UI library for building interactive components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better developer experience
- **[Vite](https://vitejs.dev)** - Lightning-fast build tool and dev server
- **[React Router](https://reactrouter.com)** - Client-side routing
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org)** - CSS transformation tool

### Backend & Services
- **[OpenAI API](https://openai.com/api)** - LLM for question generation and answer evaluation
- **[Firebase](https://firebase.google.com)** - Authentication, real-time database, and hosting
  - Firebase Authentication (Google & Email)
  - Firestore Database

### Development Tools
- **[ESLint](https://eslint.org)** - Code quality and consistency
- **[Node.js](https://nodejs.org)** - JavaScript runtime

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- OpenAI API key
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
   VITE_OPENAI_API_KEY=your_openai_api_key
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
│   ├── QuestionCard.tsx
│   ├── QuestionTimer.tsx
│   ├── ScoreTrendChart.tsx
│   ├── ThemeToggle.tsx
│   └── UserButton.tsx
├── pages/            # Page components
│   ├── Feedback.tsx
│   ├── History.tsx
│   ├── Home.tsx
│   ├── Interview.tsx
│   ├── Login.tsx
│   └── Settings.tsx
├── services/         # External API integrations
│   ├── firebase.ts
│   └── openai.ts
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

1. **Log in** with Google or email
2. **Paste a job description** to customize the interview
3. **Select interview type** (Technical, Behavioural, System Design, Mixed)
4. **Choose difficulty level** (Junior, Mid, Senior)
5. **Generate questions** and start the interview
6. **Answer questions** with detailed responses (skip if unsure)
7. **Review feedback** with scores and improvement suggestions
8. **Track progress** in history with score trends

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments & Credits

### Inspired By
- Modern interview preparation platforms like LeetCode, Pramp, and Interviewing.io
- Best practices from technical interview preparation communities

### Community & Libraries
- React community for excellent documentation and best practices
- Tailwind CSS for beautiful, accessible component utilities
- Firebase for reliable authentication and database services
- OpenAI for powerful LLM capabilities

### Special Thanks
- Contributors and testers who provided valuable feedback
- The open-source community for amazing development tools

---

**Built with ❤️ by [Harish Rao](https://github.com/harishrao1)**

Have questions? [Open an issue](https://github.com/harishrao1/ai-mock-interviewer/issues) or reach out!
