import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PSBModel } from '@data/schemas/psb/psb.model';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PSB } from '@data/schemas/psb/psb.interface';
import { PsbService } from '@data/services/psb/psb.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-register-psb',
  templateUrl: './register-psb.component.html',
  styleUrls: ['./register-psb.component.css']
})
export class RegisterPsbComponent implements AfterViewInit {

  public showSpinner = false;
  private map: any;
  public formPSB: FormGroup = new PSBModel().FormPSB();

  constructor(
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<RegisterPsbComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private service: PsbService) { }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    this.map = L.map('map-selection', {
      center: [ 10.39972, -75.51444],
      zoom: 12.5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      noWrap: true,
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    const markers = L.layerGroup([]).addTo(this.map);
    this.map.on('click', (event: any) => {
      const coords = event.latlng;
      markers.clearLayers();
      const marker = L.marker([coords.lat, coords.lng]).addTo(markers);
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
