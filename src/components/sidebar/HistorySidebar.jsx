import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { truncateText } from "@/utils/textHelpers";

const HistorySidebar = ({ history, onRestore }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Empty state
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">History</h2>
        <div className="rounded-lg border border-dashed border-border p-6 flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground text-center">
            No history yet.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center">
            Your last 5 transformations will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">History</h2>
        <Badge variant="secondary" className="text-xs">
          {history.length} / 5
        </Badge>
      </div>

      {/* History Items */}
      <div className="flex flex-col gap-2">
        {history.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-background overflow-hidden transition-all duration-200 hover:border-primary/50"
          >
            {/* Item Header */}
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs shrink-0">
                  {item.action}
                </Badge>
                <span className="text-xs text-muted-foreground truncate max-w-30">
                  {truncateText(item.input, 30)}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground/60">
                  {item.timestamp}
                </span>
                <span className="text-xs text-muted-foreground">
                  {expandedIndex === index ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedIndex === index && (
              <div className="border-t border-border">
                <div className="p-3 flex flex-col gap-3">
                  {/* Original Text */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Original
                    </p>
                    <p className="text-xs text-foreground leading-relaxed bg-muted/30 rounded p-2">
                      {truncateText(item.input, 150)}
                    </p>
                  </div>

                  <Separator />

                  {/* AI Result */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Result
                    </p>
                    <p className="text-xs text-foreground leading-relaxed bg-muted/30 rounded p-2">
                      {truncateText(item.output, 150)}
                    </p>
                  </div>

                  {/* Restore Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore(item)}
                    className="w-full text-xs h-8"
                  >
                    ↑ Restore this result
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <p className="text-xs text-muted-foreground/60 text-center">
        History clears when you refresh the page.
      </p>
    </div>
  );
};

export default HistorySidebar;
