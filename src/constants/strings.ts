/**
 * Centralized strings and UI text constants
 * Single source of truth for all English copy in the application
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BRANDING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BRAND = {
    name: "MockAI",
    tagline: "Your next offer starts here.",
    slogan: "AI-powered · Zero data retention",
    fullDescription:
        "An AI-powered interview coaching platform that creates personalized mock interviews, evaluates your responses, and provides actionable feedback to help you land your next role.",
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERVIEW TYPES & DIFFICULTIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const INTERVIEW_TYPES = {
    TECHNICAL: { label: "Technical", value: "technical" },
    BEHAVIORAL: { label: "Behavioral", value: "behavioral" },
    SYSTEM_DESIGN: { label: "System Design", value: "system-design" },
    MIXED: { label: "Mixed", value: "mixed" },
} as const;

export const DIFFICULTIES = {
    JUNIOR: { label: "Junior", value: "junior" },
    MID: { label: "Mid-level", value: "mid" },
    SENIOR: { label: "Senior", value: "senior" },
} as const;

export const QUESTION_COUNTS = [5, 6, 7] as const;

export const TYPE_LABELS: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    "system-design": "System Design",
    mixed: "Mixed",
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOME PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HOME = {
    heroTitle: "MockAI",
    heroSubtitle: [
        "Drop in a job description.",
        "Get questions built for that role.",
        "Walk in ready.",
    ],
    features: [
        "Questions generated from the actual job description",
        "Technical, behavioral, and system design rounds",
        "Instant scoring with specific, actionable feedback",
    ],
    setupTitle: "Configure your interview",
    setupSubtitle: "Tailor the session to the role you're applying for",
    labels: {
        jobDescription: "Job description",
        interviewType: "Interview type",
        difficulty: "Difficulty",
        questions: "Questions",
    },
    placeholders: {
        jobDescription:
            "We are looking for a Senior Frontend Engineer with 3+ years of React experience…",
    },
    buttons: {
        generateQuestions: "Build my question set →",
        generatingQuestions: "Building your question set…",
        startInterview: "Start an interview →",
    },
    errors: {
        emptyJD: "Add a job description to get started.",
        failedToGenerate: "Could not generate questions. Verify your API key and try again.",
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
        "Sharpen your interview skills with AI.",
        "Get scored. Close the gap.",
    ],
    features: [
        "Questions generated from the actual job description",
        "Technical, behavioral, and system design rounds",
        "Instant scoring with specific, actionable feedback",
        "Track your scores and measure progress over time",
    ],
    sideNote: "AI-powered · Your data stays in your browser",
    mobileSubtitle: "Sharpen your interview skills with AI",
    welcomeTitle: "Good to see you again",
    welcomeSubtitle: "Sign in to pick up where you left off",
    buttons: {
        google: "Continue with Google",
        mockAccount: "Sign in with mock account (dev mode)",
    },
    authNotes: [
        "We use Google only to verify your identity — we never store passwords.",
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
        "Structure your answer: Situation → Task → Action → Result",
        "Name the tools you used and the outcomes you delivered",
        "Stay concise — a tight two-minute answer beats a rambling five",
    ],
    loadingMessage: "Reviewing your responses…",
    loadingSubtext: "Hang tight — this usually takes 10–20 seconds.",
    errors: {
        failedToEvaluate: "Could not evaluate your answers. Please try again.",
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
    printTitle: "MockAI — Interview feedback report",
    sessionComplete: "Interview complete — here's how you did",
    stats: {
        overallScore: "Overall score",
        outOf10: "out of 10",
        questionsAnswered: "Answered",
        questions: "questions",
        areasToImprove: "Areas to improve",
        areas: "areas",
        vsAvg: "vs. your avg.",
    },
    perQuestionFeedback: "Question-by-question breakdown",
    feedbackSubtitle: "See exactly where you excelled and what to sharpen",
    buttons: {
        share: "Share",
        copied: "Copied!",
        exportPDF: "Export PDF",
        exporting: "Exporting…",
        viewHistory: "View history →",
        startNewSession: "Practice again →",
    },
    feedbackSections: {
        whatWasGood: "What went well",
        whatToImprove: "What to improve",
        idealAnswerHint: "What a strong answer looks like",
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
    noSessions: "Nothing here yet",
    noSessionsSubtitle: "Finish your first interview and your results will appear here.",
    clearAll: "Clear all",
    confirmClear: "Delete all sessions? This cannot be undone.",
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
            "An AI-powered interview preparation platform that generates personalized questions and provides instant feedback to help you land your next role.",
    },
    builtWith: {
        title: "Built with",
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
            { label: "GitHub repository", url: "https://github.com/harishrao1/ai-mock-interviewer" },
            { label: "Report a bug", url: "https://github.com/harishrao1/ai-mock-interviewer/issues" },
            { label: "Creator profile", url: "https://github.com/harishrao1" },
        ],
    },
    credits: {
        builtBy: "Built with",
        by: "by",
        poweredBy: "Powered by",
        and: "and",
        specialThanks: "Built on the shoulders of open-source.",
    },
    copyright: {
        year: new Date().getFullYear(),
        text: `© ${new Date().getFullYear()} MockAI. All rights reserved.`,
        license: "Licensed under MIT",
        separator: "|",
    },
} as const;

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
        loading: "Loading…",
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
        loadingMore: "Loading more…",
    },
    time: {
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days",
    },
} as const;

export function getInterviewTypeLabel(value: string): string {
    return TYPE_LABELS[value] || value;
}

export function getInterviewTypeOptions() {
    return Object.values(INTERVIEW_TYPES);
}

export function getDifficultyOptions() {
    return Object.values(DIFFICULTIES);
}

export function getScoreTag(score: number): { label: string; cls: string } {
    if (score === 0)
        return { label: FEEDBACK.scoreTags.skipped, cls: "bg-gray-400/10 text-gray-400" };
    if (score >= 7)
        return { label: FEEDBACK.scoreTags.strong, cls: "bg-green-400/10 text-green-400" };
    if (score >= 5)
        return { label: FEEDBACK.scoreTags.average, cls: "bg-blue-400/10 text-blue-400" };
    return { label: FEEDBACK.scoreTags.needsWork, cls: "bg-yellow-400/10 text-yellow-400" };
}

export function getScoreColor(score: number): string {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
}

export function getScoreBg(score: number): string {
    if (score >= 8) return "bg-green-400/10 border-green-400/20 text-green-400";
    if (score >= 6) return "bg-yellow-400/10 border-yellow-400/20 text-yellow-400";
    return "bg-red-400/10 border-red-400/20 text-red-400";
}

export function formatSessionDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}