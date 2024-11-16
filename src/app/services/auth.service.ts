import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { LoginResponse } from "../models/Responses/LoginResponse";
import { LoginRequest } from "../models/Requests/LoginRequest";
import { tap } from "rxjs";
import { RegisterUserRequest } from "../models/Requests/RegisterUserRequest";
import { Router } from "@angular/router";
import { PAGINAS } from "../shared/paginas.const";

@Injectable({providedIn: 'root'})
export class AuthService {

    private http = inject(HttpClient)
    private router = inject(Router)
    private url = environment.apiUrl + "/auth"


    login(request: LoginRequest){
        return this.http.post<LoginResponse>(this.url + "/login", request).pipe(
            tap((res) => {
                localStorage.setItem("accessToken", res.token)
            }),
        )
    }

    registro(request: RegisterUserRequest) {
        return this.http.post(this.url + "/register", request)
    }


    logout() {
        localStorage.removeItem("accessToken")
        this.router.navigate([PAGINAS.LOGIN], {replaceUrl: true})
    }


    getToken(){
        return localStorage.getItem("accessToken") 
    }

    isAuthenticated() {
        return !!this.getToken()
    }

}