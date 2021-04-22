import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeRatesService } from '../shared/services/exchange-rates.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { exchangeRateList } from '../shared/interfaces/exchange-rates';


@Component({
  selector: 'app-exchange-rates-list',
  templateUrl: './exchange-rates-list.component.html',
  styleUrls: ['./exchange-rates-list.component.scss']
})


export class ExchangeRatesListComponent implements OnInit {

  displayedColumns: string[] = ['currency', 'exchangeRate'];
  dataSource! :  MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private exchangeRatesApiService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.getExchangeRate()
  }

  getExchangeRate() {
    this.exchangeRatesApiService
      .getExchangeRateByCurr()
      .subscribe(
        (excRates : any): void => {
          console.log(excRates)
          if(excRates['rates']){
            let output : exchangeRateList []= Object.entries(excRates['rates']).map(([key, value]) => ({key,value}));
            this.dataSource = new MatTableDataSource(output)
            this.dataSource.paginator = this.paginator;

          }
        },
        (error): void => {
          console.error(`Error: ${error.message}`);
        }
      );
  }

}
