import { Injectable, Injector } from '@angular/core';
import { Categorie } from './categorie.model';
import { BaseResourceService } from 'src/app/shared/services/base-resources.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends BaseResourceService<Categorie>{

  constructor( protected injector: Injector) { 
    super("api/categories", injector, Categorie.fromJson)
  }

  
}
