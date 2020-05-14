import { Component, OnInit } from '@angular/core';

import toastr from 'toastr';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  delete(category: Category) {
    const mustDelete = confirm(`Deseja deletar a categoria: ${category.name}?`);

    if (mustDelete) {
      this.deleteCategory(category.id);
    }
  }

  // PRIVATE METHODS

  private getCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Falha ao listar categorias')
    );
  }

  private deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(
      () => {
        this.getCategories();
        toastr.success('Categoria excluida com sucesso!');
      },
      error => alert('Falha ao deletar categoria')
    );
  }

}
