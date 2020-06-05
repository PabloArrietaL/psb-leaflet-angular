import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';
import { PSB } from '@data/schemas/psb/psb.interface';
import { environment } from '@env/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PsbService {

  private url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMarkers(map: L.map): void {
    this.http.get<Array<PSB>>(`${this.url}psb/`).subscribe(
      (res: any) => {
        for (const c of res) {
          const lat = Number(c.latitude);
          const lon = Number(c.longitude);
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup( `<img style="max-height:4rem;max-width:4rem;" src= ${this.url}psb/image/${c.imageId} />`, {maxWidth: 'auto'});
        }
      }
    );
  }

  createPSB(data: FormData) {
    return this.http.post(`${this.url}psb/`, data);
  }

  getPSB() {
    const headers = {headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.auth.getToken()
    })};
    return this.http.get(`${this.url}admin`, headers);
  }

  deletePSB(id: number) {
    const headers = {headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.auth.getToken()
    })};
    return this.http.delete(`${this.url}admin/${id}`, headers);
  }

  updatePSB(data: PSB) {
    const headers = {headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.auth.getToken()
    })};
    return this.http.put(`${this.url}admin/${data._id}`, {status: 'a'}, headers);
  }

}
