import { FormGroup, FormControl, Validators } from '@angular/forms';

export class AuthModel {

  LoginForm() {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator]
      })
    });
  }
}

