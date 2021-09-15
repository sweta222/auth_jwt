import { Component, OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';
import {Router} from '@angular/router';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-new-app';
  signinForm: FormGroup;
  constructor( public fb: FormBuilder,
    public router: Router,private loginservice:LoginService){
      this.signinForm = this.fb.group({
        name: [''],
        email: ['']
      })
    }
  ngOnInit(){}
  loginUser() {
    this.loginservice.login(this.signinForm.value.name,this.signinForm.value.email)
      this.router.navigate(['dashboard']);
    //console.log(this.signinForm.value);
  }
}
