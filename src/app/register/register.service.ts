import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:5000/users'
  }

  getCredentials(username, password): boolean {

    console.log('Inside reg service: ', username, password)
    try {
      fetch(`${this.url}?username=${username}&password=${password}`)
        .then(res => res.json())
        .then(isValid => {
          console.log(isValid);
          let data = {
            name: username,
            isLoggedIn: isValid
          }
          if (isValid) {
            this.router.navigate(['/select'], { state: { data: data } });
          }
        });
    } catch (error) {
      console.error(error)
    }
    return false;
  }
}