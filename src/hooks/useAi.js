import { useState } from "react";

const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAI = async (prompt, userText) => {
    if (!prompt || !userText.trim()) return null;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: `${prompt}\n\n"${userText}"\n\nReturn only the result. No explanation, no preamble.`,
              },
            ],
            max_tokens: 1000,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error("Rate limit reached. Please wait and try again.");
        }
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your .env file.");
        }
        throw new Error(
          errorData?.error?.message || `API error: ${response.status}`,
        );
      }

      const data = await response.json();
      const result = data?.choices?.[0]?.message?.content;

      if (!result) {
        throw new Error("No response received from AI");
      }

      return result.trim();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return { runAI, loading, error, clearError };
};

export default useAI;
