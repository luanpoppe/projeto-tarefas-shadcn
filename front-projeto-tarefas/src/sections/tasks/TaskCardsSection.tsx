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
import { getUserTasks } from "@/service/tasks";
import { useIsLoading } from "@/utils/customHooks";
import { useEffect, useState } from "react";

export function TaskCardsSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading, setIsLoading } = useIsLoading();
  const [qtdCards, setQtdCards] = useState(1);

  function carregarMais() {
    console.log("qtdCards.current: ", qtdCards);
    setQtdCards(qtdCards + 1);
    console.log("qtdCards.current: ", qtdCards);
  }

  useEffect(() => {
    async function asyncEffect() {
      setIsLoading(true);
      setQtdCards(1);
      try {
        const response = await getUserTasks(2);
        console.log("response: ", response);
        setTasks(response);
        setIsLoading(false);
      } catch (error) {
        console.error("error: ", error);
        setIsLoading(false);
      }
    }
    asyncEffect();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="flex flex-col items-center justify-center gap-3">
          {tasks.slice(0, qtdCards).map((task) => {
            return (
              <Card key={task.id} className="w-2/4">
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
                {/* <CardFooter>
              
                  return </section></section>
              <p>Card Footer</p>
            </CardFooter> */}
              </Card>
            );
          })}

          <Button onClick={carregarMais}>Carregar mais</Button>
        </section>
      )}
    </>
  );
}
