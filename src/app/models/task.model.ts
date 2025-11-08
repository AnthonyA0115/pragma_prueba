export interface Task {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  categoryId?: string | null;
  createdAt: number;
}