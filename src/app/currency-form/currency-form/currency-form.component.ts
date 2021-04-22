import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conversion } from 'src/app/shared/interfaces/conversions';
import { ExchangeRatesService } from 'src/app/shared/services/exchange-rates.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {

  symbolsCurr  = {}
  calculatedExchangeRate: number = 0
  showCalculatedText = false
  maxDate: Date
  recentConversionList: Array<Conversion>;

  constructor(private exchangeRatesApiService: ExchangeRatesService,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string, private storageService: StorageService) { 
      this.maxDate = new Date();
      this.recentConversionList = storageService.getRecentconversion('conversions') ? storageService.getRecentconversion('conversions') : []
    }

    currencyConverterForm: FormGroup = this.formBuilder.group({
      amount: [1, Validators.required],
      fromCurrencyField: ["", Validators.required],
      toCurrencyField: ["EUR"],
      datefield: [""]
    });

  ngOnInit(): void {
    this.getCurrencies();
    this.checkFormChanges()
  }

  checkFormChanges() : void {
      this.currencyConverterForm.valueChanges.subscribe(x => {
        this.showCalculatedText = false
    })
  }

  getLatestExchangeRate(amountValue:number, fromCurrencyValue: string, dateSelected?: string) {
    this.exchangeRatesApiService
      .getExchangeRateByCurr(fromCurrencyValue, dateSelected)
      .subscribe(
        (excRates: any): void => {
          let exchangeRates =  excRates['rates']
          let exchangeRateValueInEur = exchangeRates[fromCurrencyValue]
          this.calculatedExchangeRate = parseFloat((amountValue/exchangeRateValueInEur).toFixed(5))
          this.showCalculatedText = true
          this.addRecentConversion()
        },
        (error): void => {
          console.error(`Error: ${error.message}`);
        }
      );
  }

  addRecentConversion(): void {
    let recentConversion : Conversion = {
      amount : this.currencyConverterForm.controls['amount'].value,
      fromCurrency: this.currencyConverterForm.controls['fromCurrencyField'].value,
      toCurrency: this.currencyConverterForm.controls['toCurrencyField'].value,
      exchangeDate : !this.currencyConverterForm.controls['datefield'].value ? 
         formatDate(new Date(),'yyyy-MM-dd',this.locale) : formatDate(this.currencyConverterForm.controls['datefield'].value,'yyyy-MM-dd',this.locale),
      convertedAmount: this.calculatedExchangeRate
    };

    this.recentConversionList.push(recentConversion)
    console.log(this.recentConversionList)
    this.storageService.setRecentConversion('conversions', this.recentConversionList)
  }


  convert(): void {
    const amountValue = this.currencyConverterForm.controls['amount'].value
    const fromCurrencyValue = this.currencyConverterForm.controls['fromCurrencyField'].value
    if(!this.currencyConverterForm.controls['datefield'].value) {
      this.getLatestExchangeRate(amountValue, fromCurrencyValue);
    } else {
      const formattedDate = formatDate(this.currencyConverterForm.controls['datefield'].value,'yyyy-MM-dd',this.locale);
      this.getLatestExchangeRate(amountValue, fromCurrencyValue, formattedDate);
    }
  }

  getCurrencies() {
    this.exchangeRatesApiService
      .getCurrenciesSymbols()
      .subscribe(
        (symbols : any): void => {
          this.symbolsCurr = symbols['symbols']
        },
        (error): void => {
          console.error(`Error: ${error.message}`);
        }
      );
  }

}


