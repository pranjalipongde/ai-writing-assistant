import { useCallback, useReducer, useState } from "react";
import { countChars, countWords } from "./utils/textHelpers";
import useAi from "./hooks/useAi";
import InputArea from "./components/editor/InputArea";
import ActionBar from "./components/actions/ActionBar";
import CustomPrompt from "./components/actions/CustomPrompt";
import OutputArea from "./components/editor/OutputArea";
import { Button } from "./components/ui/button";
import HistorySidebar from "./components/sidebar/HistorySidebar";

//all possible state updates have a name
const ACTIONS = {
  SET_INPUT: "SET_INPUT",
  SET_OUTPUT: "SET_OUTPUT",
  SET_ACTIVE_ACTION: "SET_ACTIVE_ACTION",
  SET_CUSTOM_PROMPT: "SET_CUSTOM_PROMPT",
  ADD_TO_HISTORY: "ADD_TO_HISTORY",
  RESET: "RESET",
};

//initial state-app starts here
const initialState = {
  inputText: "",
  outputText: "",
  activeAction: null,
  customPrompt: "",
  history: [],
  wordCount: 0,
  charCount: 0,
};

//reducer function - rules for how state changes

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INPUT:
      return {
        ...state,
        inputText: action.payload,
        wordCount: countWords(action.payload),
        charCount: countChars(action.payload),
      };

    case ACTIONS.SET_OUTPUT:
      return {
        ...state,
        outputText: action.payload,
      };

    case ACTIONS.SET_ACTIVE_ACTION:
      return {
        ...state,
        activeAction: action.payload,
      };

    case ACTIONS.SET_CUSTOM_PROMPT:
      return {
        ...state,
        customPrompt: action.payload,
      };

    case ACTIONS.ADD_TO_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 5),
      };

    case ACTIONS.RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const { runAI, loading, error, clearError } = useAi();

  //handle input text chnage
  const handleInputChange = useCallback((text) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: text });
  }, []);

  //hnadle toggle
  const handleToggleCustom = useCallback(() => {
    setShowCustomPrompt((prev) => !prev);
  }, []);

  //hnadle action button click
  const handleActionSelect = useCallback((action) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_ACTION, payload: action });
  }, []);

  //hnadle custom prompt change
  const handleCustomPromptChange = useCallback((text) => {
    dispatch({ type: ACTIONS.SET_CUSTOM_PROMPT, payload: text });
  }, []);

  //handle use output as input
  const hnadleUseAsInput = useCallback(() => {
    if (!state.outputText) return;

    dispatch({ type: ACTIONS.SET_INPUT, payload: state.outputText });
    dispatch({ type: ACTIONS.SET_OUTPUT, payload: "" });
  }, [state.outputText]);

  //handle reset
  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
    clearError();
  }, [clearError]);

  //main function= runs AI transformation
  const handleRun = useCallback(async () => {
    if (!state.inputText.trim() || !state.activeAction) return;

    //get prompt=custom or predefined
    const prompt =
      state.activeAction.id === "custom"
        ? state.customPrompt
        : state.activeAction.prompt;

    if (!prompt) return;

    const result = await runAI(prompt, state.inputText);

    if (result) {
      dispatch({ type: ACTIONS.SET_OUTPUT, payload: result });

      //add to history
      dispatch({
        type: ACTIONS.ADD_TO_HISTORY,
        payload: {
          action: state.activeAction.label,
          input: state.inputText,
          output: result,
          timestamp: new Date().toLocaleTimeString(),
        },
      });
    }
  }, [state.inputText, state.activeAction, state.customPrompt, runAI]);

  const handleRestore = useCallback((item) => {
    dispatch({ type: ACTIONS.SET_OUTPUT, payload: item.output });
    dispatch({ type: ACTIONS.SET_INPUT, payload: item.input });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-foreground">
              AI Writing Assistant
            </h1>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Improve, rewrite, and transform your text instantly
            </p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-6 w-full lg:w-[70%]">
            <InputArea
              inputText={state.inputText}
              wordCount={state.wordCount}
              charCount={state.charCount}
              onInputChange={handleInputChange}
              onReset={handleReset}
            />
            <ActionBar
              activeAction={state.activeAction}
              onActionSelect={handleActionSelect}
              showCustomPrompt={showCustomPrompt}
              onToggleCustom={handleToggleCustom}
            />

            {/* only show when selected */}
            {showCustomPrompt && (
              <CustomPrompt
                customPrompt={state.customPrompt}
                onPromptChange={handleCustomPromptChange}
              />
            )}

            <Button
              onClick={handleRun}
              disabled={
                loading || !state.inputText.trim() || !state.activeAction
              }
            >
              {loading ? "Running..." : "→ Run"}
            </Button>

            <OutputArea
              outputText={state.outputText}
              loading={loading}
              error={error}
              onUseAsInput={hnadleUseAsInput}
              onClearError={clearError}
            />
          </div>

          {/* Right — Sidebar  */}
          <div className="w-full lg:w-[30%]">
            <HistorySidebar history={state.history} onRestore={handleRestore} />
          </div>

          {/* visible on desktop, bottom on mobile */}
          <div className="w-full lg:w-[30%]">
            {/* HistorySidebar goes here */}
            <div className="rounded-lg border border-border p-4">
              <p className="text-sm text-muted-foreground">
                History sidebar coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
