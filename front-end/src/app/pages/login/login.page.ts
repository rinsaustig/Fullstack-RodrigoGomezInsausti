import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  url = environment.url.login;
  email: string;
  password: string;
  subRef$: Subscription;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let credentials = {
      email: this.email,
      password: this.password
    };

    this.subRef$ = this.http.post(this.url, credentials)
    .subscribe(res =>{
      localStorage.setItem('token', JSON.stringify(res));
      this.router.navigateByUrl('', {replaceUrl: true})
    }, error =>{
      console.log(error);
      alert(error.error.error)
    });

  }


  ngOnDestroy() {
    if(this.subRef$)
    this.subRef$.unsubscribe();
  }
}
