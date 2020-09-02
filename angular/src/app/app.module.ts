import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo/todo.component';
import { NewTodoComponent } from './todos/new-todo/new-todo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    NewTodoComponent,
    RegisterComponent,
    TodoComponent,
    TodosComponent,
    ErrorComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
