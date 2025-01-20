import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postTask } from "@/service/tasks";
import { getValueById } from "@/utils/handleElements";

export function CreateTask() {
  async function createTask() {
    const body: TaskPostBody = {
      title: getValueById("tarefa"),
      dataVencimento: new Date(getValueById("data-vencimento")),
    };

    console.log("body: ", body);

    const res = await postTask(body);
    console.log("res: ", res);
  }

  return (
    <section className="flex flex-col w-full items-center gap-1.5 mt-10">
      <h1 className="text-2xl">Criar Tarefa</h1>
      <LabelInput id="tarefa" labelText="Tarefa" required={true} />
      <LabelInput
        id="data-vencimento"
        labelText="Data de vencimento: "
        type="date"
        required={true}
      />
      <Button onClick={createTask} className="mt-3">
        Criar Tarefa
      </Button>
    </section>
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
