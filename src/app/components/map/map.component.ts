import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { PsbService } from '@data/services/psb/psb.service';
import { PSB } from '@data/schemas/psb/psb.interface';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  public points: Array<PSB>;

  constructor(private service: PsbService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.service.getMarkers(this.map);
  }

  private initMap(): void {

    this.map = L.map('map', {
      center: [ 10.39972, -75.51444],
      zoom: 12.5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      noWrap: true,
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

  }

}
