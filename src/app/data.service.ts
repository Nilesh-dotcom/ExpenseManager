import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Expenses } from './expenses';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  addExpenses(data: any) {

    return this.http.post("http://localhost:3000/expenses/", data);

  }
  showExpenses() {

    return this.http.get("http://localhost:3000/expenses");

  }

  deleteExpenses(expense:any){

    return this.http.delete("http://localhost:3000/expenses/"+expense.id);
  }

  updateExpenses(user:any,id:any){

    return this.http.put("http://localhost:3000/expenses/"+id,user);
  }

}
