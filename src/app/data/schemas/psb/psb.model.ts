import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

export class PSBModel {
    FormPSB() {
        return new FormGroup({
            address: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            neighborhood: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            latitude: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            longitude: new FormControl('', {
                validators: [Validators.required, Validators.nullValidator]
            }),
            imageId: new FormControl(null, {
                validators: [Validators.required]
            }),
            status: new FormControl('')
        });
    }
}
