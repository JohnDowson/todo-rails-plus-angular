import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { TodoItem } from "../todo-item";
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
  dirty: EventEmitter<TodoItem> = new EventEmitter();

  edit: boolean = false;
  inspect = !environment.production;



  @ViewChild("editbox") editBox: ElementRef;
  @ViewChild("text") textContents: ElementRef;

  toggleEdit() {
    this.checkDirty()
    this.edit = !this.edit;
    if (this.edit) {
      this.editBox.nativeElement.style = "display: inherit;"
      this.textContents.nativeElement.style = "display: none;"
      this.editBox.nativeElement.focus();
    } else {
      this.editBox.nativeElement.style = "display: none;"
      this.textContents.nativeElement.style = "display: inherit;"
    }
  }

  constructor() { }

  doneToggle() {
    this.todo.completed = !this.todo.completed;
    this.dirty.emit(this.todo) // i don't have time to figure out a robust dirty check
  }

  ngOnInit(): void {
  }

  checkDirty() {
    if (this.edit) {
      alert("Emitting dirty")
      this.dirty.emit(this.todo)
    }
  }

}
