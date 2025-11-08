import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskService } from 'src/app/services/task';
import { CategoryService } from 'src/app/services/category';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  standalone:false
})
export class TaskModalPage {
  @Input() task?: Task; // recibe tarea si se está editando
  categories: Category[] = [];

  // nuevo: objeto editable local que siempre existe
  editableTask: Partial<Task> = { title: '', notes: '', categoryId: null };

  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  async ionViewWillEnter() {
    this.categories = await this.categoryService.getAll();

    // Si llega una tarea (editar), copia sus valores.
    // Si no llega, mantiene los valores por defecto.
    if (this.task) {
      this.editableTask = { ...this.task };
    }
  }

  async save() {
    if (!this.editableTask.title) return;

    if (this.task && this.task.id) {
      // edición
      await this.taskService.update(this.editableTask as Task);
    } else {
      // nueva
      await this.taskService.add(this.editableTask);
    }

    await this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
