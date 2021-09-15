import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { LoginService } from "../login.service";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginservice: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        const authToken = this.loginservice.getToken();
        if(authToken){
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
    else{
        return next.handle(req);
    }
    }
}