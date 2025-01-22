declare type Task = {
  id: number;
  title: string;
  description?: string;
  dataVencimento: string;
  priority: "ALTA" | "MEDIO" | "BAIXO";
  userId?: number;
  projetoTitle?: string;
  isDone: boolean;
};

declare type TaskPostBody = {
  id?: number;
  title: string;
  description?: string;
  dataVencimento: Date;
  priority?: 1 | 2 | 3;
  userId?: number;
  projetoTitle?: string;
  isDone?: boolean;
};
