import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category';
import { TaskService } from 'src/app/services/task';
import { RemoteConfigService } from 'src/app/services/remote-config';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task-modal/task-modal.page';
import { CategoryModalPage } from '../category-modal/category-modal.page';
import { ThemeService } from 'src/app/services/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false

})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = '';
  showAdvancedFilter = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private rc: RemoteConfigService,
    private modalCtrl: ModalController,
    public themeService: ThemeService
  ) { }

  async ngOnInit() {
    await this.rc.fetchAndActivate();
    this.showAdvancedFilter = this.rc.getBoolean('features_enableAdvancedFilter'); // nombre del key en RC    
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll() {
    this.tasks = await this.taskService.getAll();
    this.categories = await this.categoryService.getAll();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.themeService.currentTheme === 'dark';
  }

  filteredTasks(): Task[] {
    if (!this.selectedCategoryId || this.selectedCategoryId === '') {
      return this.tasks;
    }
    return this.tasks.filter(t => t.categoryId === this.selectedCategoryId);
  }

  async toggleCompleted(task: Task, event: any) {
    const checked = event.detail.checked;
    task.completed = checked;
    await this.taskService.update(task);
    this.tasks = await this.taskService.getAll(); // recarga en memoria
  }

  async openTaskModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalPage,
      componentProps: { task }
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.loadAll();
  }

  async openCategoryModal(category?: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalPage,
      componentProps: { category }
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.loadAll();
  }

  async removeTask(id: string) {
    await this.taskService.remove(id);
    await this.loadAll();
  }

  getCategoryName(categoryId?: string | null): string {
    if (!categoryId) return 'Sin categoría';
    const found = this.categories ? this.categories.find(c => c.id === categoryId) : undefined;
    return found ? found.name : 'Sin categoría';
  }
}
