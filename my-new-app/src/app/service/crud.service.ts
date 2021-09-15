import { Injectable } from '@angular/core';
import { User } from './User';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
// Node/Express API
REST_API: string = 'http://localhost:3000';
// Http Header
httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  // Add
  AddUser(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post<User>(API_URL, data)
      .pipe(retry(1),
        catchError(this.handleError)
      )
  }
  // Get all objects
  GetUsers():Observable<User> {
    return this.httpClient.get<User>(`${this.REST_API}/users`).pipe(retry(1));
  }
  // Get single object
  GetUser(id:any): Observable<User> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get<User>(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
  // Update
  updateUser(id:any, data:User): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put<User>(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // Delete
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete<User>(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }

  // login(email:string,password:string):Observable<Login>{
  //   return this.httpClient.post<Login>(`${this.REST_API}/login`, {
  //     email: email,
  //     password: password
  //   }).pipe(retry(1),catchError(this.handleError))
  // }

  // setToken(token: string): void {
  //   localStorage.setItem(TOKEN, token);
  // }

  // isLogged() {
  //   return localStorage.getItem(TOKEN) != null;
  // }
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
