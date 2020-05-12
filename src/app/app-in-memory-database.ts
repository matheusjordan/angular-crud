import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryModel } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: CategoryModel[] = [
      { id: 1, name: 'Freelas', description: 'Trabalhos como Freelancer' },
      { id: 2, name: 'Saúde', description: 'Planos de saúde e Remedios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia e etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de salário' }
    ];

    return { categories };
  }
}
