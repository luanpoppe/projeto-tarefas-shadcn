import { createContext, useContext } from "react";

type State = { tasks: Task[] };

export function reducer(
  state: State,
  action: { type: actions; payload: State }
) {
  if (action.type == actions.CHANGE_TASKS) {
    return {
      ...state,
      tasks: action.payload.tasks,
    };
  } else return { tasks: [] };
}

export enum actions {
  CHANGE_TASKS = "CHANGE_TASKS",
}

type Context = {
  state: State;
  dispatch: React.Dispatch<{
    type: actions;
    payload: State;
  }>;
};

export const GlobalContext = createContext<Context | null>(null);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context) return context;
  else throw new Error("Erro");
}
