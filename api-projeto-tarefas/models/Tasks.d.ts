declare type Task = {
  id?: number;
  title: string;
  description?: string;
  dataVencimento: string;
  priority: 1 | 2 | 3;
  userId?: number;
  projetoTitle?: string;
  position: number;
  isDone: boolean;
};
