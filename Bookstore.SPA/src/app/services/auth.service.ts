import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
    private baseUrl = 'http://localhost:5000/api/auth/';
    private userToken: any;

    constructor(private http: HttpClient) { }

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((data: any) => {
            if (data) {
                localStorage.setItem('token', data.token);
                this.userToken = data.tokenString;
            }
        });
    }

    logout() {
        this.userToken = null;
        localStorage.removeItem('token');
    }

    register(model: any) {
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
    }

    loggedIn(): boolean {
        return this.getToken() != null;
    }

    getToken(): string {
        if (this.userToken == null) {
            this.userToken = localStorage.getItem('token');
        }

        return this.userToken;
    }

    private requestOptions() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return {headers: headers};
    }
}
