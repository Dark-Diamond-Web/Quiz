import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  SelectedQues: Boolean = false;
  data: Boolean = true;
  Dissable: Boolean = true;
  Enable: Boolean = false;
  FinalResult: Boolean = false;
  Que: any;
  Que_Length: any;
  Question: any;
  Answer: any;
  Answer_ID: any;
  Step: any = 0;
  Selected_Answer_Bucket:any[] = []
  SelectedAnswer: any;
  FinalAns:any;  

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.GetQuizData()
      .subscribe(val => {
        this.Que = val;
        this.Que_Length = this.Que.questions.length;
        this.Question = [this.Que.questions[0]];
        this.Answer = this.Que.questions[0].correctAnswer;
        this.Answer_ID = this.Que.questions[0].id
        this.FinalAns = this.Que.questions; 
      })
  }

  upsertItem(Answer_ID: any,SelectedAnswer:any) {
    const itemIndex = this.Selected_Answer_Bucket.findIndex(item => item.id === Answer_ID);
    if (itemIndex > -1) { 
      this.Selected_Answer_Bucket[itemIndex] = { ...this.Selected_Answer_Bucket[itemIndex], ...{id: this.Answer_ID, ans: this.SelectedAnswer} };
    } else { 
      this.Selected_Answer_Bucket.push({id: this.Answer_ID, ans: this.SelectedAnswer});
    } 
  }

  Selected_Answer(Data: String) {  
    this.SelectedAnswer = Data;  
    this.upsertItem(this.Answer_ID,this.SelectedAnswer) 
    this.Dissable = false;
    this.Enable = true;
  }

  next() { 
    this.Step = this.Step + 1; 
    if(this.Step !== 3) { 
      this.service.GetQuizData()
      .subscribe(val => {
        this.Que = val;
        this.Que_Length = this.Que.questions.length;
        this.Question = [this.Que.questions[this.Step]];
        this.Answer = this.Que.questions[this.Step].correctAnswer;
        this.Answer_ID = this.Que.questions[this.Step].id
        this.Dissable = true;
        this.Enable = false;
      }) 
    }
    if(this.Step == 3) {
      this.data = false;
      this.SelectedQues = true;
    } 
  }

  Submit() {
    this.service.SubmitAnswer(this.Selected_Answer_Bucket)
    .subscribe(val=>{
      console.log(val)
      this.FinalResult = true;
      this.data = false;
      this.SelectedQues = false;
    })
  }
 
}
