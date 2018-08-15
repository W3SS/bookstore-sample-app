import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AlertService } from './services/alert.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { TokenInterceptorProvider } from './services/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      BooksComponent,
      BookDetailsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      ToasterModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      BookService,
      AlertService,
      ToasterService,
      TokenInterceptorProvider,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
