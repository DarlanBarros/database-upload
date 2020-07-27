/* eslint-disable no-param-reassign */
import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const data: Balance = transactions.reduce(
      (acumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            acumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        return acumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    const incomes = data.income;
    const outcomes = data.outcome;

    const total = incomes - outcomes;

    const balance = {
      income: incomes,
      outcome: outcomes,
      total,
    };
    return balance;
  }
}

export default TransactionsRepository;
