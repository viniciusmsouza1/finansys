import { Component, Injector, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Validators  } from '@angular/forms';
import { Categorie } from '../../categories/shared/categorie.model';
import { CategorieService } from '../../categories/shared/categorie.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  
  categories: Array<Categorie>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
    dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
    dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    protected injector: Injector,
    protected entryService: EntryService,
    protected categorieService: CategorieService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson )
   }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categorieId: [null, [Validators.required]],
    });
  }

  loadCategories() {
    this.categorieService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

 
  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Lançamento"
  }

  protected editionPagetitle(): string {
    const resourceName = this.resource.name || ""
    return "Editando Lançamento: " + resourceName;
  }


  
}
