import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { RegisterPsbComponent } from '../register-psb/register-psb.component';
import { Router } from '@angular/router';
import { AuthService } from '@data/services/auth/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnDestroy{

  public token: string;
  private deviceInfo = null;
  public mobileQuery: MediaQueryList;

  public fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(
    private auth: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private route: Router,
    private deviceService: DeviceDetectorService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.token = this.auth.getToken();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  openRegisterModal() {

    const dialogConfig = new MatDialogConfig();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = (isMobile || isTablet) === true ? '80%' : '50%';
    dialogConfig.height = (isMobile || isTablet) === true ? '85%' : 'auto';

    this.dialog.open(RegisterPsbComponent, dialogConfig);
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }

  redirectToAdmin() {
    this.route.navigate(['/admin']);
  }

  logout() {
    this.auth.logout();
  }

}
