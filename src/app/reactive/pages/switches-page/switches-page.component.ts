import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender:[ 'M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(private fb: FormBuilder){ }

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  onSave(){

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    //Crea un nuevo objeto llamado newPerson con todas las propiedades excepto termAndConditions
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = this.myForm.value;
    console.log(this.myForm.value);
    console.log(this.person);
  }

  isValidField( field: string): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }
}
