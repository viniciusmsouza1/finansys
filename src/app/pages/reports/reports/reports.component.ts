import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Categorie } from '../../categories/shared/categorie.model';

import currencyFormatter from "currency-formatter";
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';
import { CategorieService } from '../../categories/shared/categorie.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  renevueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  renevueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  categories: Categorie[] = [];
  entries: Entry[] = [];

  @ViewChild('month', { static: false}) month: ElementRef = null;
  @ViewChild('year', {static: false}) year: ElementRef = null;

  constructor(private entryService: EntryService, private categorieService: CategorieService) { }

  ngOnInit() {
    this.categorieService.getAll()
      .subscribe((categories) => this.categories = categories)
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year)
      alert('Você precisa informar o mês e o ano para gerar os relatórios')
    else
      this.entryService.getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this))  
  }

  setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  calculateBalance() {
    let expenseTotal = 0;
    let renevueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'renevue')
        renevueTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'})
      else
       expenseTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'})
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.renevueTotal = currencyFormatter.format(renevueTotal, {code: 'BRL'});
    this.balance = currencyFormatter.format(renevueTotal - expenseTotal, {code: 'BRL'});
  }

  setChartData() {
    this.renevueChartData = this.getChartData('renevue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#e03131');
  }

  getChartData(entryType: string, title: string, color: string) {

    const chartData = [];

    this.categories.forEach(categorie => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categorieId == categorie.id) && (entry.type == entryType)
      );

      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, {code: 'BRL'}), 0
        )
        chartData.push({
          categorieName: categorie.name,
          totalAmount: totalAmount
        })
      }
    })

    return {
      labels: chartData.map(item => item.categorieName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }

}
