// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      <TaskCardsSection />

      <CreateTask />

      {/* <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs> */}
    </>
  );
}

export default App;
