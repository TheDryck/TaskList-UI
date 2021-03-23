import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Todo} from "../models/Todo";
import {Observable} from "rxjs";

/*This file uses services which allows async HTTP requests. These methods allow communication with the API on the backend*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'http://localhost:9000/tasks'; //url of the API or where requests and responses will be sent to/from
  //limit:string = '?_limit=5';

  //passes an Httpclient object into the service that facilitates Http methods whenever the service is run
  constructor(private http:HttpClient) {

  }

  //fetches the existing tasks from the api
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl);
  }

  //allows a specific task's status to be changed; sends the updated task to the api.
  toggleCompleted(todo:Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(this.todosUrl, todo, httpOptions);
  }

  //sends a request to the api to remove a specific task.
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //sends a request to the api to add a new task.
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
