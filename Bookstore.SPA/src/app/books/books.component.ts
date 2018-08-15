import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any;
  baseUrl = 'http://localhost:5000/api/books/';

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    }, (error) => {
      this.alertService.error('Failed to get books', error);
    });
  }
}
