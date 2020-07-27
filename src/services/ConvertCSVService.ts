import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';

class ConvertCSV {
  async loadCSV(csvFilePath: string): Promise<any[]> {
    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      ltrim: true,
      rtrim: true,
      columns: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Transaction[] = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }
}

export default ConvertCSV;
