import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})

export class BasicPageComponent implements OnInit {

  // // By FormGrupo
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  // By FormBuilder
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: ['', [Validators.required, Validators.min(0)]],
    inStorage: ['', [Validators.required, Validators.min(0)]],
  })

  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    // this.myForm.reset(rtx5090)
  }

  isValidField( field: string): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  getFieldError(field: string ): string | null {
    if( !this.myForm.controls[field] ) return null;

    const error = this.myForm.controls[field].errors || {};

    for (const iterator of Object.keys(error)) {
      switch(iterator){
        case 'required': return 'Este campo es requerido.';
        case 'minlength': return `Minimo ${error['minlength'].requiredLength } caracteres.`;
      }
    }
    return null;
  }

  onSave():void {
    if( !this.myForm.valid) return;

    console.log( this.myForm.value );
  }
}
