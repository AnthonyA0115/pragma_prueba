import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private _storage: Storage | null = null;
  private readonly KEY = 'tasks_v1';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  private async getStorage() {
    if (!this._storage) {
      await this.init();
    }
    return this._storage!;
  }

  async getAll(): Promise<Task[]> {
    const storage = await this.getStorage();
    return (await storage.get(this.KEY)) || [];
  }

  async add(partial: Partial<Task>): Promise<Task> {
    const storage = await this.getStorage();
    const all = await this.getAll();

    const newTask: Task = {
      id: uuidv4(),
      title: partial.title || 'Sin título',
      notes: partial.notes || '',
      completed: false,
      categoryId: partial.categoryId || null,
      createdAt: Date.now()
    };
    all.unshift(newTask);
    await storage.set(this.KEY, all);
    return newTask;
  }

  async update(updated: Task): Promise<void> {
    const storage = await this.getStorage();
    const all = await this.getAll();
    const index = all.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      all[index] = { ...updated };
      await storage.set(this.KEY, all);
    }
  }

  async remove(id: string): Promise<void> {
    const storage = await this.getStorage();
    let all = await this.getAll();
    all = all.filter(t => t.id !== id);
    await storage.set(this.KEY, all);
  }

  async clearAll() {
    const storage = await this.getStorage();
    await storage.set(this.KEY, []);
  }
}
