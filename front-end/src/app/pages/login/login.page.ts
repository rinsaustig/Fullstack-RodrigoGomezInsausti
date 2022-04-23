import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  url = environment.url.login;
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post(this.url, credentials)
    .subscribe(res =>{
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigateByUrl('', {replaceUrl: true})
    }, error =>{
      console.log(error);
      alert(error.error.error)
    });

  }
}
