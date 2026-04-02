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
    <div className="flex flex-col gap-3">
      {/* Label */}
      <h2 className="text-sm font-semibold text-foreground">Select Action</h2>

      {/* Action Buttons Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 
                      lg:grid-cols-4 gap-2"
      >
        {ACTIONS.map((action) => (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive(action.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleClick(action)}
                className={`
                  text-xs h-9 transition-all duration-200
                  ${
                    isActive(action.id)
                      ? "ring-2 ring-offset-2 ring-primary"
                      : "hover:border-primary hover:text-primary"
                  }
                `}
              >
                {action.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Shortcut: {action.shortcut}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Separator between predefined and custom */}
        <div
          className="col-span-2 sm:col-span-3 
                        lg:col-span-4"
        >
          <Separator />
        </div>

        {/* Custom Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isActive(CUSTOM_ACTION.id) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                handleClick(CUSTOM_ACTION);
                onToggleCustom();
              }}
              className={`
                text-xs h-9 col-span-2 
                sm:col-span-1 transition-all duration-200
                ${
                  isActive(CUSTOM_ACTION.id)
                    ? "ring-2 ring-offset-2 ring-primary"
                    : "hover:border-primary hover:text-primary"
                }
              `}
            >
              ✎ Custom Prompt
            </Button>
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
