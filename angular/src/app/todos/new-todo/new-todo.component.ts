import { Component, OnInit } from '@angular/core';
import { createTodo } from 'src/app/store';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  constructor() {}

  title: string = '';

  ngOnInit(): void {}

  async createTodo() {
    await createTodo(this.title);
    this.title = '';
  }
}
