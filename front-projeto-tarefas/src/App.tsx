import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { ModeToggle } from "./components/theme-toggle";
import { TaskCardsSection } from "./sections/tasks/TaskCardsSection";
import { CreateTask } from "./sections/tasks/CreateTask";

function App() {
  useEffect(() => console.clear(), []);

  return (
    <>
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
    </>
  );
}

export default App;
