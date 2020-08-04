import ConvertCSV from './ConvertCSVService';
import Transaction from '../models/Transaction';

import CreateTransaction from './CreateTransactionService';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const converCSV = new ConvertCSV();
    const data = await converCSV.loadCSV(filePath);

    const createTransaction = new CreateTransaction();
    const transactions: Transaction[] = [];

    data.forEach(async element => {
      const transaction = await createTransaction.execute(element);
      transactions.push(transaction);
    });

    return transactions;
  }
}

export default ImportTransactionsService;
