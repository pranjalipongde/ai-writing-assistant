import { useState } from "react";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const useAi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAI = async (prompt, userText) => {
    //dont run if empty
    if (!prompt || !userText.trim()) return null;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${prompt}\n\n"${userText}"\n\nReturn only the result. No explanation, no preamble.`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      //safely extract the text

      const result = data?.candidate?.[0]?.content?.parts?.[0]?.text;

      if (!result) {
        throw new Error("No response received from AI");
      }

      return result.trim();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      //always runs- success or failure
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return {
    runAI,
    loading,
    error,
    clearError,
  };
};

export default useAi;
