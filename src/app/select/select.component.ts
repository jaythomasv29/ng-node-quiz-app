import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from "../shared/quiz.service"
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  Name: string;
  category: any;
  isLoggedIn: boolean;

  constructor(private _quizService: QuizService, private router: Router) {
    this.Name = history.state.data.name
    this.isLoggedIn = history.state.data.isLoggedIn
    console.log("SELECT COMPONENT: ", this.Name, this.isLoggedIn)
  }
  ngOnInit() {
  }

  onSubmitForm() {
    try {
      this._quizService.getQuestion(this.category).subscribe((response) => {
        let data = {
          name: this.Name,
          isLoggedIn: this.isLoggedIn,
          category: this.category,
          response: response
        }
        this.router.navigate(['/quiz'], { state: { data: data } });
      })
    } catch (error) {
      console.error(error)
      throw (error)
    }

  }

}
