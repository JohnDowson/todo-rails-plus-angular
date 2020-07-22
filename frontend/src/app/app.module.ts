import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoCategoryComponent } from './todo-category/todo-category.component';
import { HttpClientModule } from '@angular/common/http';
import { BackendApiService } from './backend-api/backend-api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoEditorDialog } from './todo-edit-dialog/todo-edit-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { CategoryEditDialog } from './category-edit-dialog/category-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoCategoryComponent,
    TodoEditorDialog,
    CategoryEditDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatListModule,
    DragDropModule,
    MatCheckboxModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
  ],
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
