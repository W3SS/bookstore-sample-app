import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute} from '@angular/router';
import { Book } from '../models/book';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
        this.getBookById(params['id']);
      }
    );
  }

  order() {
    this.bookService.order(this.book.id).subscribe((quantity) => {
      this.book.quantity = quantity;
      this.alertService.success('Purchase successful', 'Thank you! Your order have been placed!');
    }, (error) => {
      this.alertService.error('Order Failed', 'Failed to order book. ' + error);
      this.getBookById(this.book.id);
    });
  }

  isBookAvailable() {
    return this.book.quantity >= 1;
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  private getBookById(id: number) {
    this.bookService.getBookById(id).subscribe((data) => {
      this.book = data;
    }, (error) => {
      this.alertService.error('Get Book Failed', 'Failed to get book. ' + error);
    });
  }
}
