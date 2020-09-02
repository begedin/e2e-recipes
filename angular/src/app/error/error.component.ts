import { Component, OnInit } from '@angular/core';
import { state } from '../store';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  get error() {
    return state.error;
  }

  ngOnInit(): void {}
}
