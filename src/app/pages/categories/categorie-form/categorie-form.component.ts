import { Component, Injector } from '@angular/core';
import { Categorie } from '../shared/categorie.model';
import { CategorieService } from '../shared/categorie.service';
import { Validators  } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';


@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent extends BaseResourceFormComponent<Categorie> {

  
  constructor(
    protected categorieService: CategorieService,
    protected injector: Injector
  ) { 
    super(injector, new Categorie(), categorieService, Categorie.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Nova Categoria"
  }

  protected editionPagetitle(): string {
    const categoryName = this.resource.name || ""
    return "Editando categoria: " + categoryName;
  }
 
}
