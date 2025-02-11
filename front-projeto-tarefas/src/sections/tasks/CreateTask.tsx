import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserTasks, postTask } from "@/service/tasks";
import { getCheckedById, getValueById } from "@/utils/handleElements";
import { useState } from "react";
import { actions, useGlobalContext } from "@/utils/reducer";
import toast from "react-hot-toast";

export function CreateTask() {
  const [selectedProject, setSelectedProject] = useState<string>("pessoais");
  const { dispatch } = useGlobalContext();

  async function createTask() {
    const isFirstTask = getCheckedById("is-first-task");
    const currentTasks = isFirstTask
      ? Number(
          [...document.querySelectorAll("#sortableTasks > div")].map((e) =>
            e.getAttribute("data-id")
          )[0]
        ) - 0.1
      : undefined;

    console.log("currentTasks: ", currentTasks);

    const body: TaskPostBody = {
      title: getValueById("tarefa"),
      dataVencimento: new Date(getValueById("data-vencimento")),
      projetoTitle: selectedProject,
      position: currentTasks,
    };

    console.log("body: ", body);

    const res = await postTask(body);
    toast.success("Tarefa criada com sucesso!");
    console.log("res: ", res);
    const updatedList = await getUserTasks(2, undefined, body.projetoTitle);
    dispatch({
      type: actions.CHANGE_TASKS,
      payload: { tasks: updatedList },
    });
    (document.getElementById("tarefa") as HTMLInputElement).value = "";
  }

  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Button>Criar tarefa</Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <section className="flex flex-col w-full items-center gap-1.5 mt-10">
          <h1 className="text-2xl">Criar Tarefa</h1>
          <LabelInput id="tarefa" labelText="Tarefa" required={true} />
          <LabelInput
            id="data-vencimento"
            labelText="Data de vencimento: "
            type="date"
            required={true}
          />
          <LabelSelect
            id="projeto"
            labelText="Projeto:"
            setSelectedProject={setSelectedProject}
          />
          <LabelCheckbox
            id="is-first-task"
            labelText="Criar no início das tarefas"
          />
          <Button onClick={createTask} className="mt-3">
            Criar Tarefa
          </Button>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
}

type LabelInputType = {
  id: string;
  type?: string;
  labelText: string;
  placeholder?: string;
  required?: boolean;
};

function LabelInput({
  id,
  type = "text",
  labelText,
  placeholder = labelText,
  required = false,
}: LabelInputType) {
  return (
    <div className="w-1/2 mt-2">
      <div className="mb-2">
        <Label htmlFor={id}>{labelText}</Label>
      </div>
      <Input
        defaultValue={
          type == "date" ? new Date().toISOString().split("T")[0] : ""
        }
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function LabelSelect(props: {
  id: string;
  labelText: string;
  setSelectedProject: SetState<string>;
}) {
  const { id, labelText, setSelectedProject } = props;
  return (
    <div className="w-1/2 mt-2">
      <div className="mb-2">
        <Label htmlFor={id}>{labelText}</Label>
      </div>
      <Select
        defaultValue="pessoais"
        onValueChange={(e) => setSelectedProject(e)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Projeto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pessoais">Pessoais</SelectItem>
          <SelectItem value="estudos">Estudos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function LabelCheckbox(props: { id: string; labelText: string }) {
  const { id, labelText } = props;
  return (
    <div className="w-1/2 mt-2">
      <div className="flex justify-center gap-1 mb-2 items-center">
        <Label htmlFor={id}>{labelText}</Label>
        <Input
          className="h-4 w-10"
          type="checkbox"
          id={id}
          defaultChecked={true}
        />
      </div>
    </div>
  );
}
