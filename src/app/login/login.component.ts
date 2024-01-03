import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup;
  submitted= false;
  loading=false;
  errorMessage:boolean = false;
  successMessage:boolean = false; 
  constructor( private fb:FormBuilder,private http:HttpClient,private router:Router) {

  }
  ngOnInit(): void {
    this.initform();
  }

  initform(){
    this.loginForm = this.fb.group({
    password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    email: new FormControl("",[Validators.required,Validators.email]),
  });
  }
  SubmitForm(form){
    this.submitted = true;
    console.log(this.loginForm)
    if(this.loginForm.valid){ 
    this.loading = true;
    let model={
      'email': this.loginForm.get('email').value,
      'password': this.loginForm.get('password').value
    }
    this.http.post("http://localhost:5000/student/login",model).subscribe((res:any)=>{
      if(res.status == true){
        this.successMessage = true;
        this.errorMessage = false;
        setTimeout(()=>{
          this.loginForm.reset();
          this.submitted = false;
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        },2000);      
      }else if(res.status == false){
        this.successMessage = false;
        this.errorMessage = true;
      }
    },(err)=>{
    console.log(err); 
    })
    }
  }

}
