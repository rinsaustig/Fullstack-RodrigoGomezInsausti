import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

    this.http.post('http://localhost:3000/students/login', credentials)
    .subscribe(res =>{
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigateByUrl('', {replaceUrl: true})
    }, error =>{
      console.log(error);
      alert(error.error.error)
    });

  }
}
