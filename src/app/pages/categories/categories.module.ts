import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';


@NgModule({
  declarations: [CategorieListComponent, CategorieFormComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
