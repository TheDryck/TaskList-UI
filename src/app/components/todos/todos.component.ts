import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) {
    this.todos = []
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      //console.log(this.todos);
    });
  }

  //This function is responsible for deleting a task from the List of Tasks
  deleteTodo(todo:Todo){
    //removes the task from the list - loop thru and only return items whose ID isnt the ID of the "deleted" task
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //removes the task from the backend
    this.todoService.deleteTodo(todo).subscribe();
    /*the UI deletion could be put inside the subscribe function. The difference is that it would disappear from the
    browser only after the request is successful*/
  }

  //This function adds a Task to the list
  addTodo(todo:Todo){
    this.todoService.addTodo(todo).subscribe(todo =>{
      this.todos.push(todo);
    });
  }

}
