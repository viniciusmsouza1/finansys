import { Injectable, Injector } from '@angular/core';

import { Observable, throwError} from 'rxjs'
import { map, catchError, flatMap } from 'rxjs/operators'
import { Entry } from './entry.model';
import { CategorieService } from '../../categories/shared/categorie.service';
import { BaseResourceService } from 'src/app/shared/services/base-resources.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
  

    constructor(protected injector: Injector, protected categorieService: CategorieService) {
      super("api/entries", injector, Entry.fromJson)
   }

  
  create( entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));

  }

  update( entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categorieService.getById(entry.categorieId).pipe(
      flatMap(categorie => {
        entry.categorie = categorie

        return sendFn(entry)
      }),
      catchError(this.handleError)
    )
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterBymonthAndYear(entries, month, year))
    )
  }

  filterBymonthAndYear(entries: Entry[], month: number, year: number): any {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;
      
      if(monthMatches && yearMatches)
        return entries;
    })
  }

 
}
