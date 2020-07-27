import ConvertCSV from './ConvertCSVService';
import Transaction from '../models/Transaction';

import CreateTransaction from './CreateTransactionService';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const converCSV = new ConvertCSV();
    const data = await converCSV.loadCSV(filePath);

    const createTransaction = new CreateTransaction();

    data.forEach(element => {
      createTransaction.execute(element);
    });

    return data;
  }
}

export default ImportTransactionsService;
