import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormsModule';
  genders = [ 'male' , 'female'];
  signupForm:FormGroup; 
  forbiddenUsernames = ['abcde','efghj'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username' : new FormControl(null,[Validators.required, this.forbiddenName.bind(this)]),
       'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmail),
      }),
      'gender':new FormControl(),
      'hobbies':new FormArray([])
    });
  }
  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    // Dynamically Adding FormControl
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  // Adding Custom Validation
  forbiddenName(control : FormControl): {[s:string]:boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1 ){
      return {'nameIsForbidden':true}
    }
    return null
  }
  // Asynchronous Validation
  forbiddenEmail(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise((
      (resolve,reject) => {
        setTimeout(() => {
          if(control.value === 'pathak.vinay0001@gmail.com'){
            resolve({'emailIsForbidden':true});
          }
          else{
            reject(null);
          }
        })
      }
    ))
    return promise;
  }
}
