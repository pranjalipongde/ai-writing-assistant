import { ACTIONS, CUSTOM_ACTION } from "@/constants/actions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const ActionBar = ({
  activeAction,
  onActionSelect,
  showCustomPrompt,
  onToggleCustom,
}) => {
  const handleClick = (action) => {
    onActionSelect(action);
  };

  const isActive = (actionId) => {
    return activeAction?.id === actionId;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        Select Action
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleClick(action)}
                className={`text-xs px-4 py-2 rounded-full
                border transition-all duration-200 font-medium
                ${
                  isActive(action.id)
                    ? `bg-primary border-primary 
                     text-white glow-violet-sm`
                    : `bg-transparent border-white/10 
                     text-muted-foreground
                     hover:border-primary/50 
                     hover:text-foreground
                     hover:bg-white/5`
                }
              `}
              >
                {action.label}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Shortcut: {action.shortcut}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Separator orientation="vertical" className="h-8 mx-1 bg-white/10" />

        {/* Custom Action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                handleClick(CUSTOM_ACTION);
                onToggleCustom();
              }}
              className={`
              text-xs px-4 py-2 rounded-full
              border transition-all duration-200
              font-medium
              ${
                isActive(CUSTOM_ACTION.id)
                  ? `bg-primary border-primary 
                   text-white glow-violet-sm`
                  : `bg-transparent border-white/10 
                   text-muted-foreground
                   hover:border-primary/50 
                   hover:text-foreground
                   hover:bg-white/5`
              }
            `}
            >
              ✎ Custom
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Write your own instruction</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionBar;
