import { Injectable } from '@angular/core';
import {Book} from "../book/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private readonly API_URL= 'http://[::]:8081/books';
  constructor( private http: HttpClient) { }


  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.API_URL);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(`${this.API_URL}/${book.id}`, book);
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }


}


