import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Country } from '../types/api'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api = 'https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json'

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get<Country[]>(`${this.api}/all`)
  }

  getCountryByName(name: string) {
    return this.http.get<Country[]>(`${this.api}/name/${name}`).pipe(
      map(([res]) => res)
    )
  }

  getCountriesByCodes(codes: string[]) {
    console.log(`${this.api}/alhpa?codes=${codes.join(';')}`);
    return this.http.get<Country[]>(
      `${this.api}/alpha?codes=${codes.join(';')}`
    )
  }
}
