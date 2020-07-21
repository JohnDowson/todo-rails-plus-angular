import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from "../todo-item";
import { TodoCategory } from '../todo-category';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.scss']
})
export class TodoCategoryComponent implements OnInit {
  @Input()
  category: TodoCategory;
  @Output()
  dirty: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  constructor() { }
  emitDirty(todo: TodoItem) {
    this.dirty.emit(todo)
  }
  ngOnInit(): void {
  }

}
