import { Component, OnInit } from '@angular/core';
import {BookServiceService} from "../../service/book-service.service";

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.css']
})
export class ReadListComponent implements OnInit {
  books;
  constructor(private bookService: BookServiceService) { }


  ngOnInit(): void {
    this.getReadBooks();
  }

  getReadBooks(){
    this.bookService.getBooks().subscribe(next=>(this.books= next.filter(book=>book.read===true) , console.log(this.books) ), error => (this.books = []));
  }

  updateBook(index){
    let book = this.books[index];
    book.read = !book.read;
    this.bookService.updateBook(book).subscribe( ()=> this.getReadBooks());
  }

}
