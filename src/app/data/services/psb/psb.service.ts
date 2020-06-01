import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PSB } from '@data/schemas/psb/psb.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PsbService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAll(): Observable<PSB[]> {
    return this.http.get<Array<PSB>>(this.url);
  }

}
