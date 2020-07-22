import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoCategory } from '../todo-category/todo-category.model';

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

  constructor(
    public dialogRef: MatDialogRef<CategoryEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewCategoryData) { }

  onCancel() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}