import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Login } from './service/Login';
import { Router } from '@angular/router';
const TOKEN = 'TOKEN';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// Node/Express API
REST_API: string = 'http://localhost:3000';
// Http Header
httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient:HttpClient,private router:Router) { }

  login(name:string,email:any){
    return this.httpClient.post<any>(`${this.REST_API}/login`, {name,email})
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.calldashboardApi(res.email).subscribe((res) => {
          this.router.navigate(['dashboard']);
        })
      })
  }

getToken(){
  return localStorage.getItem('access_token');
}

isLoggedIn(): boolean {
  let authToken = localStorage.getItem('access_token');
  return (authToken !== null) ? true : false;
}

calldashboardApi(email:any){
  return this.httpClient.get<any>(`${this.REST_API}/getdashboarddata`,{headers:this.httpHeaders}).pipe(retry(1),catchError(this.handleError))
}

doLogout() {
  let removeToken = localStorage.removeItem('access_token');
  if (removeToken == null) {
    this.router.navigate(['login']);
  }
}
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
