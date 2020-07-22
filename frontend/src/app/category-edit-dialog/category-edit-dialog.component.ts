import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoCategory } from '../todo-category/todo-category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formInvalid, formTouchAll } from "../utils/form-utils";

export interface NewCategoryData {
  category: TodoCategory;
  edit: boolean;
}

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.scss']
})
export class CategoryEditDialog implements OnInit {

  formControl: FormGroup;

  constructor(
    @Inject(FormBuilder) public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewCategoryData) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formControl = this.formBuilder.group({
      title: [
        this.data.category.title,
        [Validators.required]
      ],
    })
  }

  onSubmit() {
    if (formInvalid(this.formControl)) {
      formTouchAll(this.formControl)
      return
    }
    this.data.category.title = this.formControl.value.title
    this.dialogRef.close(this.data)
  }

  onCancel() {
    this.dialogRef.close();
  }
}