import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-recent-conversions-list',
  templateUrl: './recent-conversions-list.component.html',
  styleUrls: ['./recent-conversions-list.component.scss']
})
export class RecentConversionsListComponent implements OnInit {

  displayedColumns: string[] = ['amount', 'fromCurrency', 'convertedAmount', 'toCurrency', 'exchangeDate'];
  dataSource! :  MatTableDataSource<any>;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    let recentConvList = this.storageService.getRecentconversion('conversions')
    this.dataSource = new MatTableDataSource(recentConvList)
    console.log(recentConvList)
  }

 

}
