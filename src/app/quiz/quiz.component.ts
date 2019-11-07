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
  
  seconds;
  timer;
  
  questionProgress: number = 0; //number of questions answered
  userAnswerArr = []
  userAnswer = ""
  score:number = 0
  Name
  category
  difficulty
  showResults: boolean = false;


  constructor(private router: Router, private fb: FormBuilder) {
    let user = this.router.getCurrentNavigation().extras.state
    this.Name = this.router.getCurrentNavigation().extras.state.name;
    

  }


//timer function
  startTimer() { 
    this.timer = setInterval(()=> {
      this.seconds++
    }, 1000)
  }
 
  nextQuestion(){
    if(this.questionProgress <= 9){
      console.log(this.questionProgress)
      this.userAnswer = this.quizForm.controls['option'].value
      console.log(this.userAnswer)
      
      this.userAnswerArr[this.questionProgress] = this.userAnswer
      this.quizForm.controls['option'].reset()
      this.userAnswer = ''
      console.log(this.userAnswer)
      console.log(this.userAnswerArr)
      this.questionProgress++;

    } else {
      
    }
  }
  // submit() {
    
  //   this.score = 0;
  //   for (let i = 0; i< this.userAnswerArr.length; i++){
  //     if(this.userAnswerArr[i] === this.correctAnswer[i])
  //     this.score++
  //   }
  //   console.log(this.score)
  //   this.showResults = true

  // }

  newQuiz(){
    this.router.navigate(['/select'],
        {
          state:
          {
            name: this.Name,
            category: this.category,
            difficulty: this.difficulty
            
          }
        });
        console.log(this.Name)
  }

  previousQuestion(){
    if(this.questionProgress > 0){
    this.questionProgress--;

  }

    console.log(this.userAnswerArr)
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      option: new FormControl()
    })
    
  }

}
