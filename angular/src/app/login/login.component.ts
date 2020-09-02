import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { login, state } from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  name = '';
  password = '';

  ngOnInit(): void {}

  async login(): Promise<void> {
    await login(this.name, this.password);
    if (state.authenticated) {
      this.router.navigate(['/']);
    }
  }
}
