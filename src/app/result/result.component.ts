import { Router } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
Name
category
score  

  constructor(private router: Router) { 
    this.Name = this.router.getCurrentNavigation().extras.state.name;
    this.category = this.router.getCurrentNavigation().extras.state.category;
    this.score = this.router.getCurrentNavigation().extras.state.score;

  }

  ngOnInit() {
    console.log(this.score)
    console.log(this.Name)
    console.log(this.category)
  }

}