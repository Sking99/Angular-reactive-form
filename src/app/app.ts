import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { count } from 'rxjs';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular-reactive-form';

  reactiveForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed()]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required, CustomValidators.checkUserName]),
    dob: new FormControl(null),
    gender: new FormControl('male'),
    address: new FormGroup({
      street: new FormControl(null, Validators.required),
      country: new FormControl('India', Validators.required),
      city: new FormControl(null),
      region: new FormControl(null),
      postal: new FormControl(null, Validators.required),
    }),
    skills: new FormArray([
      new FormControl(null, Validators.required)
    ]),
    experience: new FormArray([
      new FormGroup({
        company: new FormControl(null),
        position: new FormControl(null),
        totalExp: new FormControl(null),
        start: new FormControl(null),
        end: new FormControl(null)
      })
    ])
  });

  get experienceControls() {
    return (this.reactiveForm.get('experience') as FormArray).controls;
  }

  addExperience() {
    let experienceFG = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null)
    });

    const experienceArray = this.reactiveForm.get('experience') as FormArray;
    experienceArray.push(experienceFG);
  }

  deleteExperience(index: number) {
    const experienceArray = this.reactiveForm.get('experience') as FormArray;
    experienceArray.removeAt(index);
  }

  get skillsControls(){
    return (this.reactiveForm.get('skills') as FormArray).controls;
  }

  addSkill(){
    // const skillsArray = this.reactiveForm.get('skills') as FormArray;
    // skillsArray.push(new FormControl(null, Validators.required));
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

deleteSkills(index: number) {
  const skillsArray = this.reactiveForm.get('skills') as FormArray;
  skillsArray.removeAt(index);
}

  onSubmit() {
    console.log(this.reactiveForm);
  }
}
