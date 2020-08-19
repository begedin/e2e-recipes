import { Component, OnInit } from '@angular/core';
import { fetchTodos, state, Todo } from '../store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    fetchTodos();
  }

  get todos(): Todo[] {
    return state.todos;
  }
}
