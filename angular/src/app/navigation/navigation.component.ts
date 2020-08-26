import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { state, logout } from '../store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logout(): void {
    logout();
  }

  get authenticated(): boolean {
    return state.authenticated;
  }
}
