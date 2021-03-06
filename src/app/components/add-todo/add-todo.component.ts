import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  /*This component emits or passes the result of an addition event up one level to the containing component*/
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  title:string;

  constructor() {
    this.title = '';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const todo = {
      title: this.title,
      completed: false
    }

    this.addTodo.emit(todo);
  }

}
