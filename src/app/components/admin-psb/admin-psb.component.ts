import { Component, OnInit } from '@angular/core';
import { PSB } from '@data/schemas/psb/psb.interface';
import { ToastrService } from 'ngx-toastr';
import { PsbService } from '@data/services/psb/psb.service';
import { environment } from '@env/environment';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditPsbComponent } from '../edit-psb/edit-psb.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-admin-psb',
  templateUrl: './admin-psb.component.html',
  styleUrls: ['./admin-psb.component.css']
})
export class AdminPsbComponent implements OnInit {

  public psb: Array<PSB> = [];
  public api = environment.api;
  private deviceInfo = null;

  constructor(
    private toast: ToastrService,
    private service: PsbService,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService
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
    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';
    dialogConfig.data = psb;

    const dialog = this.dialog.open(EditPsbComponent, dialogConfig);
    dialog.afterClosed().subscribe((result: PSB) => {
      const aux = [];
      if (!result && result !== undefined) {
        this.psb.filter((data: PSB) => {
          if (data._id !== result._id) {
            aux.push(data);
          } else {
            aux.push(data);
          }
        });
        this.psb = aux;
      }
    });
  }

  delete(id: string) {

    const con = confirm('¿Desea eliminar el basurero?');

    if (con === true) {
      this.service.deletePSB(id).subscribe(
        _ => {
          this.toast.success('Basusero eliminado correctamente', 'Éxito');
          const aux = [];
          this.psb.filter((data: PSB) => {
            if (data._id !== id) {
              aux.push(data);
            }
          });
          this.psb = aux;
        },
        _ => {
          this.toast.warning('Se ha presentando un error', 'Error');
        }
      );
    }
  }

}
