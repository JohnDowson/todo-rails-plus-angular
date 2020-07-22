import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from '../todo-item/todo-item.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formInvalid, formTouchAll } from '../utils/form-utils';

export interface NewTodoData {
  todo: TodoItem;
  categories: Object;
  edit: boolean;
}

@Component({
  selector: 'app-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.scss']
})
export class TodoEditorDialog implements OnInit {
  formControl: FormGroup;
  constructor(
    @Inject(FormBuilder) public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TodoEditorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewTodoData) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formControl = this.formBuilder.group({
      project_id: [
        this.data.todo.project_id,
        [Validators.required]
      ],
      text: [
        this.data.todo.text,
        [Validators.required]
      ]
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (formInvalid(this.formControl)) {
      formTouchAll(this.formControl)
      return
    }
    this.data.todo.project_id = this.formControl.value.project_id
    this.data.todo.text = this.formControl.value.text
    this.dialogRef.close(this.data)
  }
}