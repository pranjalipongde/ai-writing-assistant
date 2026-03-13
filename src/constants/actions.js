export const ACTIONS = [
  {
    id: "improve",
    label: "Improve",
    prompt:
      "Improve the writing quality, clarity, and flow of this text. Keep the same meaning but make it more polished and professional. Return only the improved text, no explanation:",
    color: "emerald",
    shortcut: "1",
  },
  {
    id: "rewrite",
    label: "Rewrite",
    prompt:
      "Completely rewrite this text in a fresh, engaging way while keeping the core meaning. Return only the rewritten text, no explanation:",
    color: "blue",
    shortcut: "2",
  },
  {
    id: "summarize",
    label: "Summarize",
    prompt:
      "Summarize this text concisely in 2-3 sentences, capturing only the key points. Return only the summary, no explanation:",
    color: "orange",
    shortcut: "3",
  },
  {
    id: "expand",
    label: "Expand",
    prompt:
      "Expand this text with more detail, examples, and depth. Make it more comprehensive and informative. Return only the expanded text, no explanation:",
    color: "purple",
    shortcut: "4",
  },
  {
    id: "formal",
    label: "Make Formal",
    prompt:
      "Rewrite this text in a formal, professional tone suitable for business communication. Return only the rewritten text, no explanation:",
    color: "slate",
    shortcut: "5",
  },
  {
    id: "casual",
    label: "Make Casual",
    prompt:
      "Rewrite this text in a friendly, casual, conversational tone. Return only the rewritten text, no explanation:",
    color: "pink",
    shortcut: "6",
  },
  {
    id: "shorter",
    label: "Shorten",
    prompt:
      "Make this text shorter and more concise without losing the key message. Return only the shortened text, no explanation:",
    color: "yellow",
    shortcut: "7",
  },
  {
    id: "grammar",
    label: "Fix Grammar",
    prompt:
      "Fix all grammar, spelling, and punctuation errors in this text. Return only the corrected text, no explanation:",
    color: "red",
    shortcut: "8",
  },
];

export const CUSTOM_ACTION = {
  id: "custom",
  label: "Custom",
  color: "zinc",
  shortcut: "9",
};
