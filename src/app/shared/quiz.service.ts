import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})



@Injectable()
export class QuizService {

    url;
    constructor(private http: HttpClient) {
        this.url = 'http://localhost:5000/quiz'
    }
    //getQuestion method
    getQuestion(category) {

        return this.http.get(`${this.url}?category=${category}`

        )
    }

}