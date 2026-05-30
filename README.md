# AI Writing Assistant ✦

An AI-powered writing tool that transforms your text instantly. Paste any text, select an action, and get a polished result in seconds.

🔗 **Live Demo** → [ai-writing-assistant-lime.vercel.app](https://ai-writing-assistantt.vercel.app/))

![AI Writing Assistant](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Groq](https://img.shields.io/badge/Powered%20by-Groq-orange?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

---

## What It Does

Paste an email, a prompt, a paragraph — anything. Pick one of 8 AI actions and get a transformed result instantly. No distractions, no chat interface. Just paste → select → transform → copy.

---

## Features

- **8 AI Transformation Modes** — Improve, Rewrite, Summarize, Expand, Fix Grammar, Make Formal, Make Casual, Shorten
- **Custom Instructions** — Type your own prompt like "Translate to Hindi" or "Rewrite as a tweet thread"
- **Action Chaining** — Use output as input to run multiple transformations in sequence
- **Session History** — Last 5 transformations saved with accordion expand and restore
- **Word & Character Counter** — Live count on both input and output
- **Copy to Clipboard** — One click copy with visual feedback
- **Keyboard Shortcut** — Ctrl+Enter to run without touching mouse
- **Responsive Design** — Works on all screen sizes
- **Premium Dark UI** — Linear-inspired dark theme with violet accents

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Component library |
| Groq API | AI inference (LLaMA 3.1) |
| Vercel | Deployment |

---

## Architecture Decisions

**Custom Hook for AI Logic**
All API logic lives in `useAI.js` — a custom React hook. Components never know how the AI works. They just call `runAI()` and receive a result. Switching AI providers requires changing only one file.

**useReducer for State Management**
9 state variables managed in a single `useReducer` instead of scattered `useState` calls. Every state update has a clear, named action. No Redux needed — state is simple enough to stay local.

**Separation of Concerns**
```
constants/  → static action data
utils/      → pure helper functions
hooks/      → reusable logic
components/ → UI only, no API calls
```

**Data Driven UI**
Actions are defined as data in `constants/actions.js`. Adding a new action requires zero component changes — just add one object to the array.

---

## Project Structure

```
src/
├── components/
│   ├── ui/                 ← shadcn components
│   ├── Editor/
│   │   ├── InputArea.jsx
│   │   └── OutputArea.jsx
│   ├── Actions/
│   │   ├── ActionBar.jsx
│   │   └── CustomPrompt.jsx
│   └── Sidebar/
│       └── HistorySidebar.jsx
├── hooks/
│   └── useAI.js            ← all API logic
├── constants/
│   └── actions.js          ← action definitions
├── utils/
│   └── textHelpers.js      ← pure helper functions
└── App.jsx                 ← state management
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repo
git clone https://github.com/pranjalipongde/ai-writing-assistant.git

# Navigate to project
cd ai-writing-assistant

# Install dependencies
npm install

# Create environment file
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

### Environment Variables

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

---

## What I Learned Building This

**Version compatibility matters.**
Tailwind v4 and shadcn's Nova preset had breaking conflicts. Debugging this taught me to always check version compatibility before following tutorials.

**API providers are not equal.**
Went through Gemini (quota 0), OpenAI (3 req/min free tier), and landed on Groq (30 req/min free). Knowing how to evaluate and switch API providers is a real skill.

**Security is not optional.**
Accidentally committed an API key to GitHub. GitHub's secret scanning blocked the push instantly. Had to revoke the key, clean git history with `git filter-repo`, and force push. Never making this mistake again.

**Architecture decisions compound.**
Isolating API logic in a custom hook meant switching from Gemini to OpenAI to Groq required changing exactly one file. Good architecture pays off immediately.

---

## Roadmap

- [ ] Before/After diff view
- [ ] Export as .txt / .md
- [ ] Prompt templates library
- [ ] Dark/Light mode toggle
- [ ] Reading level indicator
- [ ] Compare two actions side by side
- [ ] Keyboard shortcuts panel

---

## Author

**Pranjali Pongde**
Frontend Developer — React · Next.js · TypeScript

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/pranjalipongde)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/pranjalipongde)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-000000?style=flat-square)]((https://pranjalii-pongde.vercel.app/))

---

## License

MIT License — feel free to use this project as inspiration for your own.

---

⭐ If this project helped you or you found it interesting, consider giving it a star!
