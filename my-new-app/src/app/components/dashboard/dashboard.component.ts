
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
activeEmail:any;
  constructor(public loginservice:LoginService,public route:ActivatedRoute,public router:Router) { 
    let email = this.route.snapshot.paramMap.get('email');
    this.loginservice.calldashboardApi(email).subscribe(res => {
      this.activeEmail = res.email;
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginservice.doLogout();
  }
}
