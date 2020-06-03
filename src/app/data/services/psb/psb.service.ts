import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PSB } from '@data/schemas/psb/psb.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PsbService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getMarkers(map: L.map): void {
    this.http.get<Array<PSB>>(`${this.url}psb/`).subscribe(
      (res: any) => {
        for (const c of res) {
          const lat = Number(c.latitude);
          const lon = Number(c.longitude);
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup( `<img style="max-height:200px;max-width:200px;" src= ${this.url}psb/image/${c.imageId} />`, {maxWidth: 'auto'});
        }
      }
    );
  }

  createPSB(data: FormData) {
    return this.http.post(`${this.url}psb/`, data);
  }

}
