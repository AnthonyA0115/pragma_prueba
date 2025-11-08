import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'category-modal',
    loadChildren: () => import('./pages/category-modal/category-modal.module').then( m => m.CategoryModalPageModule)
  },
  {
    path: 'task-modal',
    loadChildren: () => import('./pages/task-modal/task-modal.module').then( m => m.TaskModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
