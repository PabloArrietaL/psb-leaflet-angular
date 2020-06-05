import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthModel } from '@data/schemas/auth/auth.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@data/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new AuthModel().LoginForm();
  public loading = false;

  constructor(
    private service: AuthService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    const token = this.service.getToken();
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  submit(loginForm: FormGroup) {
    this.loading = true;
    if (loginForm.valid) {
      this.service.login(loginForm.value).subscribe(
        (response: {auth_token: string}) => {
          this.loading = false;
          localStorage.setItem('token', response.auth_token);
          this.router.navigate(['/home']);
        },
        _ => {
          this.loading = false;
          this.toast.warning('Verifique sus credenciales', 'Error');
        }
      );
    }

  }

}
