import { Component, OnInit, Input } from '@angular/core';
import { Todo, deleteTodo } from 'src/app/store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor() {}

  @Input()
  todo: Todo;

  ngOnInit(): void {}

  deleteTodo(): void {
    deleteTodo(this.todo);
  }
}
