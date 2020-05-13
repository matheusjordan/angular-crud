import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import toastr from 'toastr';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  currentAction = '';
  isEdit = false;
  submittingForm = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();

    if (this.isEdit) {
      this.loadCategory();
    }
  }

  submit() {
    const category = this.categoryForm.value;

    if (this.isEdit) {
      this.editCategory(category);
    } else {
      this.saveCategory(category);
    }
  }

  // PRIVATE METHODS
  private setCurrentAction() {
    const url = this.router.url;
    this.isEdit = url.includes('edit');

    this.currentAction = this.isEdit ? 'Editar Categoria' : 'Nova Categoria';
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required]]
    });
  }

  private saveCategory(category: Category) {
    this.submittingForm = true;
    this.categoryService.create(category).subscribe(
      () => {
        this.submittingForm = false;
        this.actionsForSucess();
      },
      error => {
        this.submittingForm = false;
        this.actionsForError();
      }
    );
  }

  private editCategory(category: Category) {
    this.submittingForm = true;
    this.categoryService.update(category).subscribe(
      () => {
        this.submittingForm = false;
        this.actionsForSucess();
      },
      error => {
        this.submittingForm = false;
        this.actionsForError();
      }
    );
  }

  private loadCategory() {
    const categoryId = this.getIdFromUrl();

    this.categoryService.getById(categoryId).subscribe(
      category => {
        this.category = category;
        this.categoryForm.patchValue(category);
      },
      error => alert('Falha ao buscar categoria')
    );
  }

  private getIdFromUrl(): number {
    const url = this.router.url;
    const categoryId = +url.split('/')[2];

    return categoryId;
  }

  private actionsForSucess() {
    toastr.success(`Categoria ${this.isEdit ? 'editada' : 'criada'} com sucesso!`);

    if (!this.isEdit) {
      this.categoryForm.reset();
    }
  }

  private actionsForError() {
    toastr.error(`Falha ao ${this.isEdit ? 'editar' : 'criar'} categoria!`);
  }

}
