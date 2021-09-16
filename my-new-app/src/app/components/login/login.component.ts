import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginService } from 'src/app/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  constructor(public fb: FormBuilder,
    public router: Router,private loginservice:LoginService) { 
      this.signinForm = this.fb.group({
        email: [''],
        password: ['']
      })
    }

  ngOnInit(): void {
  }
  loginUser() {
    this.loginservice.login(this.signinForm.value.email,this.signinForm.value.password)
      this.router.navigate(['dashboard']);
    //console.log(this.signinForm.value);
  }
}
