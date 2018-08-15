import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Book } from '../models/book';

@Injectable()
export class BookService {
    private baseUrl = 'http://localhost:5000/api/books/';

    constructor(private http: HttpClient) { }

    getAllBooks() {
        return this.http.get<Book[]>(this.baseUrl, this.requestOptions());
    }

    getBookById(id: number) {
        return this.http.get<Book>(this.baseUrl + id, this.requestOptions());
    }

    order(id: number) {
        return this.http.post<number>(this.baseUrl + id, this.requestOptions());
    }

    private requestOptions() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return {headers: headers};
    }
}
