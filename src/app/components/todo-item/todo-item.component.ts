import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Todo} from "../../models/Todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  errorMssg:any;


  constructor(private todoService:TodoService) {
    this.todo = new Todo();
  }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  //changes the completed status
  onToggle(todo:Todo){
    //strikethrough in browser
    todo.completed = !todo.completed;

    //change status on backend
    this.todoService.toggleCompleted(todo).subscribe({
      next: todo => {console.log(todo)},
      error: error => {
        this.errorMssg = error.message;
        console.error("Error!", error);
      }
    });
  }

  //removes the item
  onDelete(todo:Todo){
    //console.log('deleted')
    this.deleteTodo.emit(todo);
  }
}
