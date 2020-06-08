import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { PSBModel } from '@data/schemas/psb/psb.model';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PSB } from '@data/schemas/psb/psb.interface';
import { PsbService } from '@data/services/psb/psb.service';
import * as L from 'leaflet';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-register-psb',
  templateUrl: './register-psb.component.html',
  styleUrls: ['./register-psb.component.css']
})
export class RegisterPsbComponent implements AfterViewInit {

  public showSpinner = false;
  private map: any;
  public formPSB: FormGroup = new PSBModel().FormPSB();
  public device: boolean;
  private isMobile = this.deviceService.isMobile();
  private isTablet = this.deviceService.isTablet();

  constructor(
    private dialogRef: MatDialogRef<RegisterPsbComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private service: PsbService,
    private deviceService: DeviceDetectorService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    let marker: any;
    const Icon = new L.Icon({
      iconSize: [37, 37],
      iconAnchor: [19, 27],
      popupAnchor: [1, -24],
      iconUrl: 'assets/images/marker.png'
    });


    this.map = L.map('map-selection', {
      center: [10.39972, -75.51444],
      zoom: 12.5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      noWrap: true,
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if (this.isMobile || this.isTablet) {
      this.map.locate({}).on('locationfound', (event: any) => {
        marker = new L.marker(event.latlng, {icon: Icon}).addTo(this.map);
        marker.bindPopup('<p>Posición actual</p>');
        marker.openPopup();
        this.formPSB.patchValue({
          latitude: event.lat,
          longitude: event.lng
        });
      }).on('locationerror', _ => {
        if (marker) {
          this.map.removeLayer(marker);
          marker = undefined;
        }
      });
    }

    const markers = L.layerGroup([]).addTo(this.map);
    this.map.on('click', (event: any) => {
      const coords = event.latlng;
      markers.clearLayers();
      const newMarker = L.marker([coords.lat, coords.lng]).addTo(markers);
      this.formPSB.patchValue({
        latitude: coords.lat,
        longitude: coords.lng
      });
    });
  }

  submit(formPSB: FormGroup) {
    if (formPSB.valid) {
      this.showSpinner = true;
      this.service.createPSB(this.toFormData(formPSB.value)).subscribe(
        _ => {
          this.showSpinner = false;
          this.toastr.success('Basusero registrado correctamente', 'Exito');
          this.dialogRef.close();
        },
        _ => {
          this.showSpinner = false;
          this.toastr.warning('Se ha presentado un inconveniente', 'Error');
        }
      );
    }
  }

  toFormData(formValue: PSB) {
    const formData = new FormData();
    const psb = {
      address: formValue.address,
      neighborhood: formValue.neighborhood,
      latitude: (formValue.latitude).toString(),
      longitude: (formValue.longitude).toString()
    };
    formData.append('psb', JSON.stringify(psb));
    formData.append('img', formValue.imageId);
    return formData;
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.formPSB.patchValue({
        imageId: file
      });
      this.cd.markForCheck();
    }
  }


}
