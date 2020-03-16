import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookServiceService} from "../../service/book-service.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {
  booksList;
  books;
  newBook;
  constructor(private bookService: BookServiceService,
              private formBuilder: FormBuilder) {
    this.newBook = this.formBuilder.group({
      id: null,
      name: [''],
      read: false
    });
  }

  ngOnInit(): void {
    this.getReadingBooks();
  }

  getReadingBooks(){
    this.bookService.getBooks().subscribe(next=>(this.books= next.filter(book=>book.read===false), console.log(this.books) ), error => (this.books = []));
    this.bookService.getBooks().subscribe(next=>(this.booksList= next, console.log(this.booksList) ), error => (this.booksList = []));

  }

  updateBook(index){
    let book = this.books[index];
    book.read = !book.read;
    this.bookService.updateBook(book).subscribe( ()=> this.getReadingBooks());
  }

  onSubmit(data){
      let book: Book = {
        id: this.booksList.length+1,
        name: data.name,
        read: false
      };
      this.bookService.addBook(book).subscribe(next=> (this.getReadingBooks(), this.newBook.name=''));
  }


}
