import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm:FormGroup;
  submitted= false;
  loading=false;
  errorMessage:boolean = false; 
  successMessage:boolean=false;
  constructor( private fb:FormBuilder,private http:HttpClient,private router:Router) {

  }
  ngOnInit(): void {
    this.initform();
  }

  initform(){
    this.registerForm = this.fb.group({
    firstname: new FormControl("",[Validators.required]),
    lastname: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    email: new FormControl("",[Validators.required,Validators.email]),
  });
  }
  onRegister(form){
    this.submitted = true;
    if(this.registerForm.valid){ 
    this.loading = true;
    this.http.post("http://localhost:5000/student/create",this.registerForm.value).subscribe((res:any)=>{
    if(res.status == true){
      this.registerForm.reset();
      this.successMessage = true;
      this.errorMessage = false;
      this.submitted = false;
    }else if(res.status == false){
      this.successMessage = false;
      this.errorMessage = true;
    }
    this.loading = false;
    },(err)=>{
    console.log(err); 
    })
    }
  }
}
