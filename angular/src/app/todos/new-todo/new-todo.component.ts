import { Component, OnInit } from '@angular/core';
import { createTodo } from 'src/app/store';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  title = '';

  constructor() {}

  ngOnInit(): void {}

  async createTodo(): Promise<void> {
    await createTodo(this.title);
    this.title = '';
  }
}
