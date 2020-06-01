import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { RegisterPsbComponent } from '../register-psb/register-psb.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnDestroy{

  public mobileQuery: MediaQueryList;

  public fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  openRegisterModal() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = 'auto';

    this.dialog.open(RegisterPsbComponent, dialogConfig);
  }

  openLogin() {

  }

}
