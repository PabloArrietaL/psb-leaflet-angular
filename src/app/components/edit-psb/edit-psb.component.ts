import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PSBModel } from '@data/schemas/psb/psb.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PsbService } from '@data/services/psb/psb.service';
import { PSB } from '@data/schemas/psb/psb.interface';

@Component({
  selector: 'app-edit-psb',
  templateUrl: './edit-psb.component.html',
  styleUrls: ['./edit-psb.component.css']
})
export class EditPsbComponent implements OnInit {

  public showSpinner = false;
  public formPSB: FormGroup = new PSBModel().FormPSB();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PSB,
    private dialogRef: MatDialogRef<EditPsbComponent>,
    private toast: ToastrService,
    private service: PsbService
  ) { }

  ngOnInit(): void {
    this.setValues();
  }

  setValues() {
    this.formPSB.controls.address.disable();
    this.formPSB.controls.neighborhood.disable();
    this.formPSB.controls.latitude.disable();
    this.formPSB.controls.longitude.disable();
    this.formPSB.controls.imageId.disable();
    this.formPSB.setValue({
      address: this.data.address,
      neighborhood: this.data.neighborhood,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      imageId: this.data.imageId,
      status: this.data.status.toLowerCase()
    });
  }

  submit(formPSB: FormGroup) {
    if (formPSB.valid) {
      const data: PSB = formPSB.value;
      data._id = this.data._id;
      this.showSpinner = true;
      this.service.updatePSB(data).subscribe(
        _ => {
          this.showSpinner = false;
          this.toast.success('Basusero actualizado correctamente', 'Éxito');
          this.dialogRef.close(data);
        },
        _ => {
          this.showSpinner = false;
          this.toast.warning('Se ha presentando un error', 'Error');
        }
      );
    }
  }

}
