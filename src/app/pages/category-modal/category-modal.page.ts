import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/app/services/category';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.page.html',
  styleUrls: ['./category-modal.page.scss'],
  standalone:false
})
export class CategoryModalPage {
  @Input() category?: Category;
  name = '';
  color = '#3880ff';
  categories: Category[] = [];

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.loadCategories();
    if (this.category) {
      this.name = this.category.name;
      this.color = this.category.color || this.color;
    }
  }

  async loadCategories() {
    this.categories = await this.categoryService.getAll();
  }

  async save() {
    if (!this.name) return;

    if (this.category && this.category.id) {
      await this.categoryService.update({ ...this.category, name: this.name, color: this.color });
    } else {
      await this.categoryService.add(this.name, this.color);
    }

    this.name = '';
    this.color = '#3880ff';
    this.category = undefined;
    await this.loadCategories();
  }

  async editCategory(c: Category) {
    this.category = c;
    this.name = c.name;
    this.color = c.color || '#3880ff';
  }

  async confirmDelete(c: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      message: `¿Seguro que deseas eliminar la categoría "<strong>${c.name}</strong>"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.categoryService.remove(c.id);
            await this.loadCategories();
          }
        }
      ]
    });
    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
