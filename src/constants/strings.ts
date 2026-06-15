/**
 * Centralized strings and UI text constants
 * Single source of truth for all English copy in the application
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BRANDING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BRAND = {
    name: "MockAI",
    tagline: "Personalized interview preparation powered by AI.",
    slogan: "Powered by AI · No answers stored",
    fullDescription:
        "An AI-powered interview coaching platform that creates personalized mock interviews, evaluates your responses, and provides actionable feedback to help you succeed in real-world interviews.",
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERVIEW TYPES & DIFFICULTIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const INTERVIEW_TYPES = {
    TECHNICAL: { label: "Technical", value: "technical" },
    BEHAVIOURAL: { label: "Behavioural", value: "behavioural" },
    SYSTEM_DESIGN: { label: "System Design", value: "system-design" },
    MIXED: { label: "Mixed", value: "mixed" },
} as const;

export const DIFFICULTIES = {
    JUNIOR: { label: "Junior", value: "junior" },
    MID: { label: "Mid", value: "mid" },
    SENIOR: { label: "Senior", value: "senior" },
} as const;

export const QUESTION_COUNTS = [5, 6, 7] as const;

// Type labels for display (full sentences)
export const TYPE_LABELS: Record<string, string> = {
    technical: "Technical",
    behavioural: "Behavioural",
    "system-design": "System Design",
    mixed: "Mixed",
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOME PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HOME = {
    heroTitle: "MockAI",
    heroSubtitle: [
        "Paste a job description.",
        "Get tailored interview questions.",
        "Ace your next interview.",
    ],
    features: [
        "AI-generated questions tailored to any job description",
        "Technical, behavioural, and system design rounds",
        "Instant scoring with actionable improvement tips",
    ],
    setupTitle: "Set up your session",
    setupSubtitle: "Configure the interview to match your target role",
    labels: {
        jobDescription: "Job description",
        interviewType: "Interview type",
        difficulty: "Difficulty",
        questions: "Questions",
    },
    placeholders: {
        jobDescription:
            "We are looking for a Senior Frontend Engineer with 3+ years of React experience...",
    },
    buttons: {
        generateQuestions: "Generate questions →",
        generatingQuestions: "Generating questions...",
        startInterview: "Start an interview →",
    },
    errors: {
        emptyJD: "Please paste a job description first",
        failedToGenerate:
            "Failed to generate questions. Check your API key and try again.",
    },
    nav: {
        history: "History",
        settings: "Settings",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOGIN PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LOGIN = {
    heroSubtitle: [
        "Practice interviews with AI.",
        "Get scored. Improve faster.",
    ],
    features: [
        "AI-generated questions tailored to any job description",
        "Technical, behavioural, and system design rounds",
        "Instant scoring with actionable improvement tips",
        "Session history and score trend tracking",
    ],
    sideNote: "Powered by AI · Your data stays in your browser",
    mobileSubtitle: "Practice interviews with AI",
    welcomeTitle: "Welcome back",
    welcomeSubtitle: "Sign in to access your sessions and history",
    buttons: {
        google: "Continue with Google",
        mockAccount: "Sign in with Mock Account (Dev Mode)",
    },
    authNotes: [
        "We only use Google to identify you — no passwords stored.",
        "Your interview history is saved locally in your browser.",
    ],
    nav: {
        home: "Home",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERVIEW PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const INTERVIEW = {
    progressLabel: "complete",
    questionLabel: "Question",
    ofLabel: "of",
    yourAnswer: "Your answer",
    tipsTitle: "Tips for a strong answer",
    tips: [
        "Use the STAR method — Situation, Task, Action, Result",
        "Be specific: name tools, metrics, and outcomes",
        "Keep answers focused — quality over length",
    ],
    loadingMessage: "Evaluating your answers…",
    loadingSubtext: "This may take a moment",
    errors: {
        failedToEvaluate: "Failed to evaluate answers. Please try again.",
    },
    nav: {
        history: "History",
        settings: "Settings",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FEEDBACK PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FEEDBACK = {
    printTitle: "MockAI — Interview Feedback Report",
    sessionComplete: "Session complete",
    stats: {
        overallScore: "Overall score",
        outOf10: "out of 10",
        questionsAnswered: "Answered",
        questions: "questions",
        areasToImprove: "To improve",
        areas: "areas",
        vsAvg: "vs your avg",
    },
    perQuestionFeedback: "Per-question feedback",
    feedbackSubtitle: "Detailed breakdown of each answer",
    buttons: {
        share: "Share",
        copied: "Copied!",
        exportPDF: "Export PDF",
        exporting: "Exporting…",
        viewHistory: "View history →",
        startNewSession: "Start new session →",
    },
    feedbackSections: {
        whatWasGood: "What was good",
        whatToImprove: "What to improve",
        idealAnswerHint: "Ideal answer hint",
    },
    scoreTags: {
        strong: "Strong",
        average: "Average",
        needsWork: "Needs work",
        skipped: "Skipped",
    },
    nav: {
        history: "History",
        settings: "Settings",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HISTORY PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HISTORY = {
    title: "History",
    scoreTrend: "Score trend",
    scoreTrendLabel: "Score trend",
    stats: {
        sessions: "Sessions",
        bestScore: "Best score",
        average: "Average",
    },
    pastSessions: "Past sessions",
    noSessions: "No sessions yet",
    noSessionsSubtitle: "Complete an interview to see your history here.",
    clearAll: "Clear all",
    clearAllConfirmation: "Clear all session history?",
    confirmClear: "Clear all session history?",
    deleteSession: "Delete session",
    startInterview: "Start an interview →",
    nav: {
        back: "Home",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FOOTER = {
    about: {
        title: "About MockAI",
        description:
            "AI-powered interview preparation platform that generates personalized questions and provides instant feedback to help you ace your next interview.",
    },
    builtWith: {
        title: "Built With",
        technologies: [
            { label: "React 18 + TypeScript", url: "https://react.dev" },
            { label: "Vite", url: "https://vitejs.dev" },
            { label: "Tailwind CSS", url: "https://tailwindcss.com" },
            { label: "OpenAI API", url: "https://openai.com" },
            { label: "Firebase", url: "https://firebase.google.com" },
        ],
    },
    links: {
        title: "Links",
        items: [
            {
                label: "GitHub Repository",
                url: "https://github.com/harishrao1/ai-mock-interviewer",
            },
            {
                label: "Report Issues",
                url: "https://github.com/harishrao1/ai-mock-interviewer/issues",
            },
            { label: "Creator Profile", url: "https://github.com/harishrao1" },
        ],
    },
    credits: {
        builtBy: "Built with",
        by: "by",
        poweredBy: "Powered by",
        and: "and",
        specialThanks: "Special thanks to the open-source community.",
    },
    copyright: {
        year: new Date().getFullYear(),
        text: `&copy; {{year}} MockAI. All rights reserved.`,
        license: "Licensed under MIT",
        separator: "|",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMMON / SHARED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const COMMON = {
    buttons: {
        submit: "Submit",
        skip: "Skip",
        next: "Next",
        previous: "Previous",
        back: "Back",
        cancel: "Cancel",
        delete: "Delete",
        clear: "Clear",
        save: "Save",
        copy: "Copy",
        share: "Share",
        close: "Close",
    },
    labels: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        warning: "Warning",
        info: "Info",
    },
    messages: {
        confirmAction: "Are you sure?",
        deleted: "Deleted successfully",
        saved: "Saved successfully",
        copied: "Copied to clipboard",
        loadingMore: "Loading more...",
    },
    time: {
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days",
    },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITY HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Get interview type label by value
 */
export function getInterviewTypeLabel(
    value: string
): string {
    return TYPE_LABELS[value] || value;
}

/**
 * Get all interview type options
 */
export function getInterviewTypeOptions() {
    return Object.values(INTERVIEW_TYPES);
}

/**
 * Get all difficulty options
 */
export function getDifficultyOptions() {
    return Object.values(DIFFICULTIES);
}

/**
 * Get score tag label and styling based on score
 */
export function getScoreTag(
    score: number
): { label: string; cls: string } {
    if (score >= 7)
        return {
            label: FEEDBACK.scoreTags.strong,
            cls: "bg-green-400/10 text-green-400",
        };
    if (score === 0)
        return {
            label: FEEDBACK.scoreTags.skipped,
            cls: "bg-gray-400/10 text-gray-400",
        };
    return {
        label: FEEDBACK.scoreTags.needsWork,
        cls: "bg-yellow-400/10 text-yellow-400",
    };
}

/**
 * Get score color class based on score value
 */
export function getScoreColor(score: number): string {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
}

/**
 * Get score background class based on score value
 */
export function getScoreBg(score: number): string {
    if (score >= 8)
        return "bg-green-400/10 border-green-400/20 text-green-400";
    if (score >= 6)
        return "bg-yellow-400/10 border-yellow-400/20 text-yellow-400";
    return "bg-red-400/10 border-red-400/20 text-red-400";
}

/**
 * Format date for display (e.g., "15 Jun 2026, 14:30")
 */
export function formatSessionDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
