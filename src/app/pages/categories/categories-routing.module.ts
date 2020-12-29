import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';


const routes: Routes = [
  {path: '', component: CategorieListComponent},
  {path: 'new', component: CategorieFormComponent},
  {path: ':id/edit', component: CategorieFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
