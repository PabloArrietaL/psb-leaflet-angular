import { Component, OnInit } from '@angular/core';
import { PSB } from '@data/schemas/psb/psb.interface';
import { ToastrService } from 'ngx-toastr';
import { PsbService } from '@data/services/psb/psb.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-admin-psb',
  templateUrl: './admin-psb.component.html',
  styleUrls: ['./admin-psb.component.css']
})
export class AdminPsbComponent implements OnInit {

  public psb: Array<PSB> = [];
  public api = environment.api;

  constructor(
    private toast: ToastrService,
    private service: PsbService
  ) { }

  ngOnInit(): void {
    this.getPSB();
  }

  openImage(image: string) {
    window.open(`${this.api}psb/image/${image}`, 'popup', 'width=600,height=600');
  }

  getPSB() {
    this.service.getPSB().subscribe(
      (data: Array<PSB>) => {
        this.psb = data;
      });
  }

  update(psb: PSB) {
    this.service.updatePSB(psb).subscribe(
      _ => {
        this.toast.success('Basusero actualizado correctamente', 'Éxito');
        this.getPSB();
      },
      _ => {
        this.toast.warning('Se ha presentando un error', 'Error');
      }
    );
  }

  delete(id: number) {
    this.service.deletePSB(id).subscribe(
      _ => {
        this.toast.success('Basusero eliminado correctamente', 'Éxito');
        this.getPSB();
      },
      _ => {
        this.toast.warning('Se ha presentando un error', 'Error');
      }
    );
  }

}
