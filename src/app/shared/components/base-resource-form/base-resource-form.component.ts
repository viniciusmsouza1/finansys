import {  OnInit, AfterContentChecked, Injector } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/services/base-resources.service';


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  

  constructor(
    protected injector: Injector,  
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDatatToResourceFn: (jsonData) => T
  ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  protected abstract buildResourceForm(): void; 

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new"){
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected createResource() {
    const resource: T = this.jsonDatatToResourceFn(this.resourceForm.value)

    this.resourceService.create(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      )
  }

  protected updateResource() {
    const resource: T = this.jsonDatatToResourceFn(this.resourceForm.value)
    
    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected actionsForError(error: any): void {
    toastr.error("Ocoreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde!"]
    }
  }

  protected actionsForSuccess(resource: T): void {
    toastr.success("Solicitação processada com sucesso!");

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    )
  }

 

  protected setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new')
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }



  loadResource() {
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
      .subscribe(
        (resource) => {
          this.resource = resource
          this.resourceForm.patchValue(resource)
        },
        (error) => alert('Ocoreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  protected setPageTitle() {
    if(this.currentAction == 'new'){
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPagetitle();
    }
    
  }
  
  protected editionPagetitle(): string {
    return "Edição"
  }
  
  protected creationPageTitle(): string {
    return "Novo"
  }
}
