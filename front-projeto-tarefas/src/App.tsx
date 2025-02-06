import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useReducer } from "react";
import { ModeToggle } from "./components/theme-toggle";
import { TaskCardsSection } from "./sections/tasks/TaskCardsSection";
import { CreateTask } from "./sections/tasks/CreateTask";
import { GlobalContext, reducer } from "./utils/reducer";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => console.clear(), []);
  const initialState: { tasks: Task[] } = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
      <Toaster position="top-center" />
      <ModeToggle />
      <h1>Tarefas</h1>

      <CreateTask />

      <Tabs defaultValue="pessoais" className="w-full mt-10">
        <TabsList>
          <TabsTrigger value="pessoais">Pessoais</TabsTrigger>
          <TabsTrigger value="estudos">Estudos</TabsTrigger>
        </TabsList>
        <TabsContent value="pessoais">
          <TaskCardsSection projeto="pessoais" />
        </TabsContent>
        <TabsContent value="estudos">
          <TaskCardsSection projeto="estudos" />
        </TabsContent>
      </Tabs>
    </GlobalContext.Provider>
  );
}

export default App;
