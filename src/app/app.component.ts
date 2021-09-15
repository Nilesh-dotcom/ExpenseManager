import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myform!: FormGroup;
  type!: string;
  friend!: string;
  name!: string;
  date!: number;
  currency!: string;
  amount!: number;
  data: any;
  isEdit = false;
  isDone = false;
  userId: any;
  form!: FormGroup;
  userObj = {
    type: '',
    friend: '',
    name: '',
    date: '',
    currency: '',
    amount: ''
  }
  friendName: any;
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.getLatestData();
    this.myform = new FormGroup({
      type: new FormControl('', [Validators.required]),
      friend: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
      date: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      currency: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    })
  }

  addExpenses(myform: any) {
    console.log(myform);
    this.service.addExpenses(myform).subscribe((response) => {
      this.getLatestData();
    });
    this.myform.reset();
  }
  getLatestData() {
    this.service.showExpenses().subscribe((response) => {
      this.data = response;
    });
  }
  deleteExpenses(expense: any) {
    this.service.deleteExpenses(expense).subscribe((response) => {
      this.getLatestData();
    });
  }
  editExpenses(user: any) {
    this.isEdit = true;
    this.isDone = true;
    this.userId = user.id;
    this.myform.patchValue({
      type: user.type,
      friend: user.friend,
      name: user.name,
      date: user.date,
      currency: user.currency,
      amount: user.amount
    })
  }
  updateExpenses() {
    this.isEdit = !this.isEdit;
    console.log(this.myform.value);
    this.service.updateExpenses(this.myform.value, this.userId).subscribe(() => {
      this.getLatestData();
    })
    this.myform.reset();
  }
  enterKeyPressed(event: { keyCode: number; }) {
    if (event.keyCode == 13) {
      console.log("Enter key is pressed");
      this.friendName = this.myform.get('t1')?.value;
      console.log(this.friendName);
      return true;
    } else {
      return false;
    }
  }
}
