import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  Name: string;
  category: Number;
  score

  constructor(private router: Router) {
    this.Name = history.state.data.name
    this.category = history.state.data.category
    this.score = history.state.data.score
    console.log("HISTORY STATE:", history.state.data)
    console.log(this.score)
  }

  ngOnInit() {

  }

}