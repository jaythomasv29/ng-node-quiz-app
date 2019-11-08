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


  constructor(private router: Router, private fb: FormBuilder, private _quizService: QuizService) {
    this.questionProgress = 0
    this.state = this.router.getCurrentNavigation().extras.state
    this.Name = this.router.getCurrentNavigation().extras.state.name;
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

      });
    } catch (error) {
      console.error(error)
    }
    console.log('reached submit method')
    this.router.navigate(['/result'], { state: {name: this.Name, category:this.category, score:this.score}});

  }

  newQuiz() {
    this.router.navigate(['/select'],
      {
        state:
        {
          name: this.Name,
          category: this.category
          // difficulty: this.difficulty

        }
      });
    // console.log(this.Name)
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
