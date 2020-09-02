import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { state, logout } from '../store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    await logout();
    this.router.navigate(['/login']);
  }

  get authenticated(): boolean {
    return state.authenticated;
  }
}
