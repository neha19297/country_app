import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country, Currency, Language } from 'src/app/types/api';
import { tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country$: Observable<Country>
  borderCountries$: Observable<Country[]>

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.country$ = this.apiService.getCountryByName(params.country).pipe(
        tap(res => console.log(res)),
        mergeMap(res => {
          this.borderCountries$ = this.apiService.getCountriesByCodes(res.borders)
          return of(res)
        })
      )
    })
  }

  displayCurrencies(currencies: Currency[]) {
    return currencies.map(currency => currency.name).join(', ')
  }

  displayLanguages(languages: Language[]) {
    return languages.map(language => language.name).join(', ')
  }

}
