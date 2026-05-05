import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard, countWords, countChars } from "@/utils/textHelpers";

const OutputArea = ({
  outputText,
  loading,
  error,
  onUseAsInput,
  onClearError,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(outputText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Result</h2>
        <div className="min-h-45 lg:min-h-55 rounded-lg bg-white/3 p-4 flex flex-col gap-3">
          {[100, 85, 92, 78, 65].map((width, i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-white/5 animate-pulse"
              style={{
                width: `${width}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
          <p className="text-xs text-muted-foreground mt-2 animate-pulse">
            AI is transforming your text...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Result</h2>

        <div className="min-h-45 lg:min-h-55 rounded-lg border border-destructive/50 bg-destructive/5 p-4 flex flex-col gap-3 items-start justify-center">
          <p className="text-sm text-destructive font-medium">
            ⚠ Something went wrong
          </p>

          <p className="text-xs text-muted-foreground">{error}</p>

          <Button
            variant="outline"
            size="sm"
            onClick={onClearError}
            className="text-xs mt-2"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!outputText) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Result</h2>
        <div className="min-h-45 lg:min-h-55 rounded-lg border border-dashed border-border p-4 flex items-center justify-center">
          <div className="text-center flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Your result will appear here.
            </p>

            <p className="text-xs text-muted-foreground/60">
              Paste text → select action → click Run
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Result State
  return (
    <div className="flex flex-col gap-3">
      {/* Header with counters */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Result</h2>

        <div className="flex items-center gap-1 lg:gap-2">
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {countWords(outputText)}{" "}
            {countWords(outputText) === 1 ? "word" : "words"}
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {countChars(outputText)}{" "}
            {countChars(outputText) === 1 ? "char" : "chars"}
          </Badge>
        </div>
      </div>

      {/* Output Text */}
      <div className="min-h-45 lg:min-h-55 rounded-lg bg-white/3 border-l-2 border-primary p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap fade-in">
        {outputText}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button size="sm" onClick={handleCopy} className="text-xs h-8">
          {copied ? "✓ Copied!" : "Copy"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onUseAsInput}
          className="text-xs h-8"
        >
          ↑ Use as Input
        </Button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Not satisfied? Use as input and try another action.
      </p>
    </div>
  );
};

export default OutputArea;
