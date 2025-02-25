import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { getUserTasks, markTaskAsDone } from "@/service/tasks";
import { useIsLoading } from "@/utils/customHooks";
import { actions, useGlobalContext } from "@/utils/reducer";
import { sortTasks } from "@/utils/sortTasks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function TaskCardsSection({ projeto = "" }: { projeto?: string }) {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading, setIsLoading } = useIsLoading();
  const [qtdCards, setQtdCards] = useState(1);

  const { dispatch, state } = useGlobalContext();

  function carregarMais() {
    console.log("qtdCards.current: ", qtdCards);
    setQtdCards(qtdCards + 4);
    console.log("qtdCards.current: ", qtdCards);
  }

  function markAsDone(task: Task) {
    markTaskAsDone(task.id);
    const updatedTaskList = state.tasks.filter((t) => t.id != task.id);
    // setTasks(updatedTaskList);
    dispatch({
      type: actions.CHANGE_TASKS,
      payload: { tasks: updatedTaskList },
    });
    toast.success("Tarefa finalizada com sucesso");
  }

  useEffect(() => {
    async function asyncEffect() {
      setIsLoading(true);
      setQtdCards(1);
      try {
        const response = await getUserTasks(2, undefined, projeto);
        console.log("response: ", response);
        // setTasks(response);
        dispatch({
          type: actions.CHANGE_TASKS,
          payload: { tasks: response },
        });
        setIsLoading(false);
        setTimeout(sortTasks, 0);

        toast.success("Tarefas atualizadas");
      } catch (error) {
        console.error("error: ", error);
        setIsLoading(false);
        toast.error("Algo deu errado ao atualizar as tarefas");
      }
    }
    asyncEffect();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div
            className="flex flex-col items-center justify-center gap-3"
            id="sortableTasks"
          >
            {state.tasks.slice(0, qtdCards).map((task) => {
              return (
                <Card
                  key={task.id}
                  id={task.id.toString()}
                  className="w-5/6 lg:w-2/4"
                  data-id={task.position}
                >
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>
                      Vencimento:{" "}
                      {new Date(task.dataVencimento).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {task.description && <p>Descrição: {task.description}</p>}
                    <p>Prioridade: {task.priority}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button
                      onClick={() => markAsDone(task)}
                      className="bg-green-400"
                    >
                      Feito
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <Button onClick={carregarMais} className="mt-3">
            Carregar mais
          </Button>
        </section>
      )}
    </>
  );
}
