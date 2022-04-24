import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) { };

  ngOnInit(): void {
    const user = localStorage.getItem('token');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  registerStudent() {
    this.router.navigateByUrl('/register-student');
  }

  studentsTables() {
    this.router.navigateByUrl('/students-tables');
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
