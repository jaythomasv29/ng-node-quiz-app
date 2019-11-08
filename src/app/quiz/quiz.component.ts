import { QuizService } from './../shared/quiz.service';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'

import shuffle from 'shuffle-array'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  //Quiz Component Properties
  quizForm: FormGroup;
  //timer
  state
  seconds;
  timer;
  questions: any[];
  options: any[];
  questionProgress: number = 0; //number of questions answered
  // correct: any[];
  userAnswerArr = []
  userAnswer = ""
  score: number = 0
  Name
  category
  difficulty
  showResults: boolean = false;
  isLoggedIn: boolean;


  constructor(private router: Router, private fb: FormBuilder, private _quizService: QuizService) {
    this.questionProgress = 0
    //set values from select component using states
    this.state = history.state.data
    this.Name = this.state.name
    this.category = this.state.category;
    this.isLoggedIn = history.state.data.isLoggedIn;
    //set values from api request 
    this.questions = this.state.response.question;
    this.options = this.state.response.options
  }

  //timer function
  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++
    }, 1000)
  }

  nextQuestion() {
    if (this.questionProgress <= 9) {
      console.log(this.questionProgress)
      this.userAnswer = this.quizForm.controls['option'].value
      console.log(this.userAnswer)

      this.userAnswerArr[this.questionProgress] = this.userAnswer
      this.quizForm.controls['option'].reset()
      this.userAnswer = ''
      console.log(this.userAnswer)
      // console.log(this.userAnswerArr)
      this.questionProgress++;

    }
  }
  submit() {
    console.log(this.userAnswerArr)

    try {
      this._quizService.getResults(this.userAnswerArr).then((score) => {
        console.log('score from quiz component', JSON.stringify(score))
        this.score = Number(JSON.stringify(score))
        let stateData = { name: this.Name, category: this.category, score: this.score, isLoggedIn: this.isLoggedIn }
        this.router.navigate(['/result'], { state: { data: stateData } });
      });
    } catch (error) {
      console.error(error)
    }
    console.log('reached submit method')

  }

  newQuiz() {
    this.router.navigate(['/select'],
      {
        state: { data: { name: this.Name, category: this.category, isLoggedIn: this.isLoggedIn } }
      });
  }

  previousQuestion() {
    if (this.questionProgress > 0) {
      this.questionProgress--;

    }

    console.log(this.userAnswerArr)
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      option: new FormControl()
    })

    // console.log(this.questions)
    console.log(this.questionProgress)
  }

}
