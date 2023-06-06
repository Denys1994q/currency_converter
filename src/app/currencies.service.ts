import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Motd {
  msg: string,
  url: string
}

export interface CurrenciesData {
  base: string,
  date: string,
  motd: Motd,
  rates: Object,
  success: boolean,
}

@Injectable({ providedIn: 'root' })

export class CurrenciesService {
    constructor(private http: HttpClient) { }

    getCurrencies(): Observable<CurrenciesData> {
      return this.http.get<CurrenciesData>(`https://api.exchangerate.host/latest`)
    }
}
