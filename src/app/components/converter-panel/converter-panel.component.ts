import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from 'src/app/currencies.service';
import { CurrenciesData } from 'src/app/currencies.service';
import { RateObj } from 'src/app/currencies.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.sass']
})
export class ConverterPanelComponent implements OnInit {
  ratesTitles: string[] = []
  rates: RateObj = {}
  ratesDate: string = ''
  loading: boolean = false
  error: boolean = false
  amountFirstCurrency: number = 1
  selectFirstCurrency: string = 'UAH'
  amountSecondCurrency: number = 0
  selectSecondCurrency: string = 'EUR'
  UAHtoUSD!: number 

  constructor(
    private CurrenciesService: CurrenciesService
  ) {}

  formatNumber(num: number): string {
    return num.toFixed(2)
}

  ngOnInit() {
    this.loading = true
    this.CurrenciesService.getCurrencies()
    .subscribe({
      next: (response: CurrenciesData) => {
        this.loading = false
        this.rates = response.rates, 
        this.ratesTitles = Object.keys(response.rates)
        this.ratesDate = response.date
        this.showFirstRes()
        this.UAHtoUSD = (1 / +this.rates['USD']) * +this.rates['UAH']
      }, 
      error: () => {
        this.loading = false
        this.error = true
      } 
    })
  }

  showFirstRes() {
    this.amountSecondCurrency = +this.formatNumber(this.amountFirstCurrency * this.rates[this.selectSecondCurrency] /  this.rates[this.selectFirstCurrency])
  }

  showSecondRes() {
    this.amountFirstCurrency = +this.formatNumber(this.amountSecondCurrency * this.rates[this.selectFirstCurrency] /  this.rates[this.selectSecondCurrency])
  }

}
