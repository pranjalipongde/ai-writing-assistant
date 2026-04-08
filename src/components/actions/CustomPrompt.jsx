import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const CustomPrompt = ({ customPrompt, onPromptChange }) => {
  const textareaRef = useRef(null);

  // auto focus when component appears
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    onPromptChange(e.target.value);
  };

  const suggestions = [
    "Translate this to Hindi",
    "Rewrite this as a tweet thread",
    "Make this sound more confident",
    "Simplify this for a 10 year old",
  ];

  const handleSuggestionClick = (suggestion) => {
    onPromptChange(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-muted/30">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">
          Custom Instruction
        </h3>
        <p className="text-xs text-muted-foreground">
          Tell the AI exactly what you want to do with your text.
        </p>
      </div>

      {/* Input */}
      <Textarea
        ref={textareaRef}
        value={customPrompt}
        onChange={handleChange}
        placeholder="e.g. Translate this to Hindi..."
        className="min-h-20 lg:min-h-25 resize-none text-sm"
      />

      {/* Suggestions */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-medium">Try these:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Character counter */}
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">
          {customPrompt.length} characters
        </span>
      </div>
    </div>
  );
};

export default CustomPrompt;
