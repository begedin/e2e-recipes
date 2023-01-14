import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { register, state } from '../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = '';
  password = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async register(): Promise<void> {
    await register(this.name, this.password);
    if (state.authenticated) {
      this.router.navigate(['/']);
    }
  }
}
