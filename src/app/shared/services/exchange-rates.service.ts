import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiKey = 'f8db497cfe22ac6a18d61a3282a9fb51';

@Injectable({
  providedIn: 'root'
})

export class ExchangeRatesService {

  private readonly apiEndpoint = 'http://data.fixer.io/api';

  constructor(private readonly http: HttpClient) { }

  getCurrenciesSymbols() {
    return this.http.get(
      `${this.apiEndpoint}/symbols?access_key=${apiKey}`
    );
  }

  getHistericalExchangeRateByCurr(dateSelected: string, symbol : string) :Observable<any> {
      return this.http.get(
        `${this.apiEndpoint}/${dateSelected}?access_key=${apiKey}&symbols=${symbol}`
      );
    
  }

  getExchangeRateByCurr(symbol? : string, dateSelected? : string) :Observable<any> {
    const latestOrHisterical = dateSelected ? dateSelected : 'latest'
    if(symbol){
      return this.http.get(
        `${this.apiEndpoint}/${latestOrHisterical}?access_key=${apiKey}&symbols=${symbol}`
      );
    } else {
      return this.http.get(
        `${this.apiEndpoint}/latest?access_key=${apiKey}`
      );
    }
    
  }


}
