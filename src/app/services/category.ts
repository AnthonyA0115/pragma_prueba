import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private storageInstance: Storage | null = null;
  private readonly KEY = 'categories_v1';

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this.storageInstance = await this.storage.create();
  }

  async getAll(): Promise<Category[]> {
    return (await this.storageInstance?.get(this.KEY)) || [];
  }

  async add(name: string, color?: string): Promise<Category> {
    const c: Category = { id: uuidv4(), name, color: color || '#3880ff' };
    const all = await this.getAll();
    all.unshift(c);
    await this.storageInstance?.set(this.KEY, all);
    return c;
  }

  async update(category: Category): Promise<void> {
    const all = await this.getAll();
    const idx = all.findIndex(x => x.id === category.id);
    if (idx >= 0) {
      all[idx] = category;
      await this.storageInstance?.set(this.KEY, all);
    }
  }

  async remove(id: string): Promise<void> {
    let all = await this.getAll();
    all = all.filter(x => x.id !== id);
    await this.storageInstance?.set(this.KEY, all);
  }
}
