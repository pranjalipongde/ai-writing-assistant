import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InputArea = ({
  inputText,
  wordCount,
  charCount,
  onInputChange,
  onReset,
}) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleClear = () => {
    onReset();
    textareaRef.current?.focus();
  };

  const handlePaste = (e) => {
    setTimeout(() => {
      if (textareaRef.current) {
        onInputChange(textareaRef.current.value);
      }
    }, 0);
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold text-foreground">Your Text</h2>

        {/* counters and clear button */}
        <div className="flex items-center gap-1 lg:gap-2">
          {inputText && (
            <>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </Badge>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {charCount} {charCount === 1 ? "char" : "chars"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive"
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder="Paste or type your text here..."
        className="min-h-45 lg:min-h-55 resize-none text-sm leading-relaxed bg-transparent border-white/8 focus:border-primary/50 placeholder:text-muted-foreground/40 transition-colors duration-200"
      />

      {/* helper text */}
      <p className="text-xs text-muted-foreground">
        {inputText
          ? "Select an action below to transform your text."
          : "Start by pasting or typing your text above."}
      </p>
    </div>
  );
};

export default InputArea;
