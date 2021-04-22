import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './shared/services/storage.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  title = 'currency-cal';
  links = [
    {linkText: 'Currency Calculation', routingLink: '/home'},
    {linkText: 'Recent Conversions', routingLink: '/recent-conversions'}
];

  constructor(private router: Router, private storageService: StorageService) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
          if(!router.navigated) {
            storageService.clearHistory('conversions')
          }
        }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
