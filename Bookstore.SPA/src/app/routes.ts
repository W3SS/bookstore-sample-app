import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'books', component: BooksComponent},
    {path: 'books/:id', component: BookDetailsComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
