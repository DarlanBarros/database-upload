import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';

import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionRepository);

    const createCategory = new CreateCategoryService();

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('type must be income or outcome', 400);
    }

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Impossible to create this transaction', 400);
    }

    const categoryS = await createCategory.execute(category);
    // { id: category_id }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryS,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
