import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('',[
    Validators.required
  ]);

  constructor( private fb: FormBuilder ){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }


  isValidFieldInArray( formArray: FormArray, index: number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched
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

  onDeleteFavorite(index: number): void{
    this.favoriteGames.removeAt(index);
  }

  onAddFavorite(): void{
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onSubmit(): void{
    if( !this.myForm.valid ){
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
