import { Component, OnInit } from '@angular/core';
import { fetchTodos, state, Todo } from '../store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor() {}

  get todos(): Todo[] {
    return state.todos;
  }

  ngOnInit(): void {
    fetchTodos();
  }
}
