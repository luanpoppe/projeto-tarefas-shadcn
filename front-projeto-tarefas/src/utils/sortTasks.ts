import { changeTaskPostion } from "@/service/tasks";
import Sortable from "sortablejs";

export function sortTasks() {
  const container = document.getElementById("sortableTasks");
  let positions: string[] = [];

  if (!container) return;
  const sortable = new Sortable(container, {
    onStart: () => {
      positions = sortable.toArray();
      console.log("positions OnStart: ", positions);
    },
    onUpdate: async (param) => {
      if (!param || param.newIndex == null) throw Error("Algo deu errado");

      const newIndex: number = param.newIndex;

      const arrayOfChildren = Array.from(container.children);

      const itemAnterior = Number(positions[newIndex - 1]);
      const itemPosterior = Number(positions[newIndex]);

      if (newIndex == 0) {
        arrayOfChildren[newIndex].setAttribute(
          "data-id",
          (itemPosterior - 0.1).toFixed(4)
        );
      } else if (newIndex == positions.length - 1) {
        arrayOfChildren[newIndex].setAttribute(
          "data-id",
          (itemPosterior + 0.1).toFixed(4)
        );
      } else if (itemPosterior - itemAnterior > 0.11) {
        arrayOfChildren[newIndex].setAttribute(
          "data-id",
          (itemPosterior + 0.1).toFixed(4)
        );
      } else {
        arrayOfChildren[newIndex].setAttribute(
          "data-id",
          ((itemAnterior + itemPosterior) / 2).toFixed(4)
        );
      }

      console.log("sortable.toArray(): ", sortable.toArray());
      const taskId = Number(arrayOfChildren[newIndex].id);
      const newPosition = arrayOfChildren[newIndex].getAttribute("data-id");
      await changeTaskPostion(taskId, Number(newPosition));
    },
  });
}
