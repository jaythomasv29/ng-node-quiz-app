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
        this.url = 'http://localhost:5000'
    }
    //getQuestion method
    getQuestion(category) {

        return this.http.get(`${this.url}/quiz?category=${category}`

        )
    }
    async getResults(userAnswerArr) {
        console.log("GETREULTS METHOND", userAnswerArr)

        let response = await fetch(`${this.url}/results`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(userAnswerArr)
            }
        )
        console.log("RESPONSE FROM GET_RESULTS SCORE:")
        return await response.json();

    }

}