import type {
  Question,
  Answer,
  Feedback,
  InterviewType,
  Difficulty,
} from "../types";

// ─── Toggle ───────────────────────────────────────────────────────────────────
// Set to true to skip the API and use hardcoded data (faster dev / UI testing).
// Set to false to hit the real Groq API using VITE_GROQ_API_KEY.
export const USE_DUMMY_DATA = true;
// ─────────────────────────────────────────────────────────────────────────────

// ── Real API ──────────────────────────────────────────────────────────────────

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

const callGroq = async (prompt: string, temperature = 0.7): Promise<string> => {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 3000,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(
      err?.error?.message || `Groq API error: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
};

const parseJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    let cleaned = text.replace(/```json|```/g, "").trim();

    // Fix truncated JSON array — add closing bracket if missing
    if (cleaned.startsWith("[") && !cleaned.endsWith("]")) {
      const lastComplete = cleaned.lastIndexOf("},");
      if (lastComplete !== -1) {
        cleaned = cleaned.substring(0, lastComplete + 1) + "]";
      } else {
        cleaned = cleaned + "]";
      }
    }

    return JSON.parse(cleaned);
  }
};

// ── Dummy data ────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const DUMMY_QUESTIONS: Question[] = [
  {
    id: "q1",
    question:
      "Explain the difference between controlled and uncontrolled components in React, and when you would choose one over the other.",
    category: "React",
    difficulty: "medium",
  },
  {
    id: "q2",
    question:
      "How does the JavaScript event loop work? Describe the relationship between the call stack, task queue, and microtask queue.",
    category: "JavaScript",
    difficulty: "hard",
  },
  {
    id: "q3",
    question:
      "Tell me about a time you had to deliver a project under a tight deadline. How did you prioritise and what was the outcome?",
    category: "Behavioural",
    difficulty: "medium",
  },
  {
    id: "q4",
    question:
      "Design a URL shortening service like bit.ly. Walk through your high-level architecture, data model, and scaling considerations.",
    category: "System Design",
    difficulty: "hard",
  },
  {
    id: "q5",
    question:
      "What is the virtual DOM in React and how does the reconciliation algorithm decide what to re-render?",
    category: "React",
    difficulty: "medium",
  },
  {
    id: "q6",
    question:
      "Describe the CSS box model. What is the difference between `box-sizing: content-box` and `box-sizing: border-box`?",
    category: "CSS",
    difficulty: "easy",
  },
  {
    id: "q7",
    question:
      "Describe a situation where you disagreed with a technical decision made by your team. How did you handle it?",
    category: "Behavioural",
    difficulty: "medium",
  },
];

export const DUMMY_ANSWERS: Answer[] = DUMMY_QUESTIONS.map((q) => ({
  questionId: q.id,
  text: "This is a sample answer used for direct-URL testing in dummy mode.",
  skipped: false,
}));

export const DUMMY_FEEDBACK: Feedback[] = [
  {
    questionId: "q1",
    score: 8,
    good: "Clear distinction between controlled and uncontrolled components with good examples. Demonstrated practical knowledge of when each pattern is appropriate.",
    improve:
      "Could have mentioned performance implications and the use of refs with uncontrolled components in more depth.",
    idealHint:
      "Highlight that controlled components keep React as the single source of truth and are preferred for form validation, while uncontrolled components are useful when integrating with non-React code.",
  },
  {
    questionId: "q2",
    score: 6,
    good: "Covered the basics of the call stack and task queue correctly. Good mention of async operations.",
    improve:
      "The microtask queue (Promises, queueMicrotask) was not clearly differentiated from the macrotask queue, which is a common interview focus.",
    idealHint:
      "Microtasks (Promise callbacks) always run before the next macrotask. Mention that the event loop drains the entire microtask queue after each macrotask.",
  },
  {
    questionId: "q3",
    score: 9,
    good: "Strong STAR structure with clear situation, concrete actions taken, and a measurable outcome. Showed ownership and communication skills.",
    improve:
      "Briefly mention what you would do differently in retrospect to show self-reflection.",
    idealHint:
      'Great answers quantify impact ("shipped 2 days early", "reduced scope by 30%") and end with a learning that changed future behaviour.',
  },
  {
    questionId: "q4",
    score: 7,
    good: "Good coverage of the core components: API layer, database, and cache. Mentioned hashing strategy for short codes.",
    improve:
      "Did not address read-heavy vs write-heavy trade-offs, CDN usage, or how to handle expired links and analytics.",
    idealHint:
      "A strong system design answer covers: requirements clarification, capacity estimation, data model, API design, bottlenecks, and at least one scaling strategy (e.g. read replicas, cache-aside pattern).",
  },
  {
    questionId: "q5",
    score: 8,
    good: "Accurate explanation of the virtual DOM as an in-memory representation and the diffing process. Mentioned keys for list optimisation.",
    improve:
      "Could elaborate on the Fiber architecture introduced in React 16 and how it enables concurrent rendering.",
    idealHint:
      'Mention that React compares the new virtual DOM tree with the previous one ("diffing"), batches DOM mutations, and uses keys to optimise list reconciliation.',
  },
  {
    questionId: "q6",
    score: 9,
    good: "Precise definition of content, padding, border, and margin layers. Clear explanation of both box-sizing values with a practical example.",
    improve:
      "Nothing significant — a thorough answer. Could optionally mention the universal `* { box-sizing: border-box }` reset pattern.",
    idealHint:
      "border-box makes layout math intuitive because width/height include padding and border, which is why most modern CSS resets apply it globally.",
  },
  {
    questionId: "q7",
    score: 7,
    good: "Showed respect for the team while still advocating for your technical opinion. Good use of data to back up your position.",
    improve:
      "The resolution was a bit vague — be specific about the outcome and what was ultimately decided.",
    idealHint:
      "Great answers show you raised the concern through the right channel, backed it with evidence, remained open to being wrong, and either influenced the outcome or accepted the team decision gracefully.",
  },
];

// ── Exports ───────────────────────────────────────────────────────────────────

export async function generateQuestions(
  jd: string,
  type: InterviewType,
  difficulty: Difficulty,
  count: number,
): Promise<Question[]> {
  if (USE_DUMMY_DATA) {
    await delay(1200);
    return DUMMY_QUESTIONS.slice(0, count);
  }

  const prompt = `You are an expert technical interviewer. Based on the job description below, generate exactly ${count} interview questions.

Interview type: ${type}
Difficulty: ${difficulty}

Job Description:
${jd}

Return ONLY a valid JSON array. No preamble, no explanation, no markdown, no code blocks.
Each item must have exactly these fields:
{ "id": "q1", "question": "string", "category": "string", "difficulty": "easy"|"medium"|"hard" }

Use id values q1, q2, q3 etc.`;

  const text = await callGroq(prompt);
  return parseJSON(text);
}

export async function evaluateAnswers(
  questions: Question[],
  answers: Answer[],
): Promise<Feedback[]> {
  if (USE_DUMMY_DATA) {
    await delay(1800);
    return questions.map((q) => {
      const match = DUMMY_FEEDBACK.find((f) => f.questionId === q.id);
      return (
        match ?? {
          questionId: q.id,
          score: 7,
          good: "Solid answer with clear structure and relevant points.",
          improve: "Could add more specific examples and quantify the impact.",
          idealHint:
            "Focus on concrete outcomes and what you learned from the experience.",
        }
      );
    });
  }

  const qaPairs = questions
    .map((q, i) => {
      const answer = answers.find((a) => a.questionId === q.id);
      return `Q${i + 1} [${q.category}]: ${q.question}
Answer: ${answer?.skipped ? "[Skipped]" : answer?.text || "[No answer]"}`;
    })
    .join("\n\n");

  const prompt = `You are an expert technical interviewer. Evaluate the following interview answers.

For each answer return a JSON object with exactly these fields:
- questionId: string (q1, q2, etc.)
- score: number 1-10
- good: string (what candidate did well, 1-2 sentences. If skipped say "Question was skipped.")
- improve: string (what to improve, 1-2 sentences)
- idealHint: string (brief hint toward ideal answer, 1-2 sentences)

Return ONLY a valid JSON array in the same order as the questions. No preamble, no markdown, no code blocks.

Questions and Answers:
${qaPairs}`;

  const text = await callGroq(prompt, 0.3);
  return parseJSON(text);
}
