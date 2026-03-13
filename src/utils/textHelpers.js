// counts words in a string
export const countWords = (text) => {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

// counts characters in a string
export const countChars = (text) => {
  if (!text) return 0;
  return text.length;
};

// copies text to clipboard
// returns true if successful, false if failed
export const copyToClipboard = async (text) => {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Copy failed:", error);
    return false;
  }
};

// truncates text for preview in history sidebar
// "This is a long text..." → "This is a lon..."
export const truncateText = (text, maxLength = 60) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
