import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { user } from "src/assets/mockData/users.json";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  users = [];
  url
  result:boolean

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:5000/users'
   }

  getCredentials(username, password):boolean {
   
     console.log('inside reg service');
    console.log(username, password)
    fetch(`${this.url}?username=${username}&password=${password}`).then(res => res.json()).then(data =>{

      console.log(data);

      if(data){
        this.router.navigate(['/select'], { state: {name: username}});
      }
    });
         
      return false;
    
      
    
    
    

    // user.forEach(element => {
    //   if (element.name == username &&
    //     element.password == password) {
    //     console.log(element);
    //     this.router.navigate(['/select'], { state: { name: element.name } });
        
    //     return true;
    //   }
    //      });
    //      return false;
    //     }

  }
}