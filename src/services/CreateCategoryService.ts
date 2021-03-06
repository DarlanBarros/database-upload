import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: { title },
    });

    if (!categoryExists) {
      const category = categoryRepository.create({ title });

      await categoryRepository.save(category);

      return category;
    }

    return categoryExists;
  }
}

export default CreateCategoryService;
