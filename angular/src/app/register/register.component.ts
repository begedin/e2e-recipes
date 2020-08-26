import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { register } from '../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  name = '';
  password = '';

  ngOnInit(): void {}

  async register(): Promise<void> {
    await register(this.name, this.password);
    this.router.navigate(['/']);
  }
}
