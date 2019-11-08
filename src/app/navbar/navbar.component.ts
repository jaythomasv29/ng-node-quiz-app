import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Name: string;
  isLoggedIn: boolean;

  constructor(private router: Router) {
    if (history.state.data != undefined) {
      this.Name = history.state.data.name
      this.isLoggedIn = history.state.data.isLoggedIn
    } else {
      this.Name = undefined
      this.isLoggedIn = undefined
    }
    console.log("NAVBAR COMPONENT: ", this.Name, this.isLoggedIn)

  }

  ngOnInit() {
  }

  signOut() {
    this.router.navigate(['/register']);
  }

}