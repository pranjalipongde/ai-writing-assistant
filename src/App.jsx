import { useCallback, useReducer } from "react";
import { countChars, countWords } from "./utils/textHelpers";
import useAi from "./hooks/useAi";

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
  const { runAI, loading, error, clearError } = useAi();

  //handle input text chnage
  const handleInputChange = useCallback((text) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: text });
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
  const handleRest = useCallback(() => {
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

  return (
    <div>
      <h1>AI writing Assistant.</h1>
      <p>State is ready. Components coming next.</p>
    </div>
  );
}

export default App;
