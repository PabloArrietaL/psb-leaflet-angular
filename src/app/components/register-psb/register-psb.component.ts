import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PSBModel } from '@data/schemas/psb/psb.model';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PSB } from '@data/schemas/psb/psb.interface';

@Component({
  selector: 'app-register-psb',
  templateUrl: './register-psb.component.html',
  styleUrls: ['./register-psb.component.css']
})
export class RegisterPsbComponent implements OnInit {

  public showSpinner = false;
  public formPSB: FormGroup = new PSBModel().FormPSB();

  constructor(
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<RegisterPsbComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setCoordinates();
  }

  submit(formPSB: FormGroup) {

  }

  setCoordinates() {
    // this.formPSB.controls.address.value
    const address = 'Parque Heredia Candil';
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      // tslint:disable-next-line: no-shadowed-variable
      const position = navigator.geolocation.getCurrentPosition( (position: Position) => {
        this.formPSB.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        this.formPSB.patchValue({
          latitude: null,
          longitude: null
        });
      }
      );
    }
  }


  toFormData(formValue: PSB) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.formPSB.patchValue({
        img: file
      });
      this.cd.markForCheck();
    }
  }


}
