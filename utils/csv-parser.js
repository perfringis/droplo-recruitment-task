const fs = require('fs');
const csv = require('csv-parser');

class CSVParser {
  static async parse(file) {

    const rows = [];

    const readSteam = fs.createReadStream(file.getPath(), { encoding: 'utf8' }).pipe(csv({
      mapHeaders: ({ header }) => header.trim(),
      mapValues: ({ value }) => value.trim(),
    }));

    for await (const row of readSteam) {
      rows.push(row);
    }

    return rows;
  }
}

module.exports = CSVParser;
