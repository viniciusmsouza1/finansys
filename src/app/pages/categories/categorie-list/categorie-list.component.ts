import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../shared/categorie.service';
import { Categorie } from '../shared/categorie.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent extends BaseResourceListComponent<Categorie> {

  constructor( private categorieService: CategorieService) { 
    super(categorieService)
  }

}
