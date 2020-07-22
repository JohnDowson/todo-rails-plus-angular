import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from "./todo-item.model";
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: TodoItem;
  @Output()
  done: EventEmitter<TodoItem> = new EventEmitter();
  @Output()
  edit: EventEmitter<TodoItem> = new EventEmitter();
  inspect = !environment.production;
  constructor() { }

  doneToggle() {
    this.todo.completed = !this.todo.completed;
    this.done.emit(this.todo)
  }

  ngOnInit(): void {
  }

  emitEdit() {
    this.edit.emit(this.todo)
  }
}
