import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCategoryComponent } from './todo-category.component';

describe('TodoCategoryComponent', () => {
  let component: TodoCategoryComponent;
  let fixture: ComponentFixture<TodoCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
